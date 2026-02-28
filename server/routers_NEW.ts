import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAgents,
  createAgent,
  getLeads,
  createLead,
  getClients,
  createClient,
  getFinancialData,
  createFinancialData,
  getWhatsAppAccounts,
  createWhatsAppAccount,
  getLogs,
  createLog,
  getCMSContent,
  createCMSContent,
  getLandingPages,
  createLandingPage,
  getTrainingData,
  createTrainingData,
  getGeneratedContent,
  createGeneratedContent,
} from "./db";

import { githubRouter } from "./github";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";

export const appRouter = router({
  system: systemRouter,
  github: githubRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Dashboard router
  dashboard: router({
    getStats: protectedProcedure.query(async ({ ctx }) => {
      const agents = await getAgents(ctx.user.id);
      const leads = await getLeads(ctx.user.id);
      const clients = await getClients(ctx.user.id);
      const financial = await getFinancialData(ctx.user.id);

      return {
        activeAgents: agents.filter(a => a.status === "online").length,
        totalLeads: leads.length,
        totalClients: clients.length,
        totalRevenue: financial.reduce((sum, f) => sum + parseFloat(f.revenue.toString()), 0),
      };
    }),
  }),

  // Agents router
  agents: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getAgents(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        role: z.string(),
        personality: z.string().optional(),
        status: z.enum(["online", "offline", "training"]).optional(),
        skills: z.array(z.string()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createAgent({
          ...input,
          userId: ctx.user.id,
          skills: input.skills || [],
        });
      }),
  }),

  // Leads router
  leads: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getLeads(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        company: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        score: z.number().optional(),
        source: z.enum(["instagram", "linkedin", "zaask", "google", "direct", "other"]).optional(),
        status: z.enum(["new", "contacted", "qualified", "proposal", "closed"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createLead({
          ...input,
          userId: ctx.user.id,
          score: input.score || 0,
          source: input.source || "direct",
          status: input.status || "new",
        });
      }),
  }),

  // Clients router
  clients: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getClients(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email().optional(),
        company: z.string().optional(),
        phone: z.string().optional(),
        status: z.enum(["active", "trial", "inactive", "churned"]).optional(),
        plan: z.enum(["starter", "professional", "enterprise"]).optional(),
        monthlyValue: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createClient({
          ...input,
          userId: ctx.user.id,
          status: input.status || "active",
          plan: input.plan || "starter",
          monthlyValue: input.monthlyValue?.toString() || "0",
        });
      }),
  }),

  // Financial router
  financial: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getFinancialData(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        date: z.string(),
        revenue: z.number(),
        costs: z.number(),
        profit: z.number(),
        apiCosts: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createFinancialData({
          ...input,
          userId: ctx.user.id,
          revenue: input.revenue.toString(),
          costs: input.costs.toString(),
          profit: input.profit.toString(),
          apiCosts: input.apiCosts.toString(),
        });
      }),
  }),

  // WhatsApp router
  whatsapp: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getWhatsAppAccounts(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        phoneNumber: z.string(),
        status: z.enum(["active", "warming", "limited", "banned"]).optional(),
        warmingProgress: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createWhatsAppAccount({
          ...input,
          userId: ctx.user.id,
          status: input.status || "warming",
          warmingProgress: input.warmingProgress || 0,
          messagesSent: 0,
          messagesReceived: 0,
        });
      }),
  }),

  // Logs router
  logs: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ ctx, input }) => {
        return getLogs(ctx.user.id, input?.limit || 100);
      }),
    create: protectedProcedure
      .input(z.object({
        level: z.enum(["info", "warning", "error", "success", "debug"]),
        message: z.string(),
        agent: z.string().optional(),
        agentId: z.number().optional(),
        data: z.any().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createLog({
          ...input,
          userId: ctx.user.id,
        });
      }),
  }),

  // CMS router
  cms: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getCMSContent(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string().optional(),
        contentType: z.enum(["page", "post", "component"]).optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createCMSContent({
          ...input,
          userId: ctx.user.id,
          contentType: input.contentType || "page",
          published: input.published || false,
        });
      }),
  }),

  // Landing Pages router
  landingPages: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getLandingPages(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        template: z.string().optional(),
        content: z.any().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createLandingPage({
          ...input,
          userId: ctx.user.id,
          template: input.template || "blank",
          published: input.published || false,
        });
      }),
  }),

  // Training router
  training: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getTrainingData(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        type: z.enum(["pdf", "url", "text"]),
        size: z.string().optional(),
        content: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createTrainingData({
          ...input,
          userId: ctx.user.id,
          status: "pending",
          progress: 0,
        });
      }),
  }),

  // Creative Lab router
  creative: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getGeneratedContent(ctx.user.id);
    }),
    generate: protectedProcedure
      .input(z.object({
        type: z.enum(["image", "copy", "video"]),
        prompt: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        let result = '';
        
        if (input.type === "image") {
          const res = await generateImage({ prompt: input.prompt });
          result = res.url || '';
        } else if (input.type === "copy") {
          const res = await invokeLLM({
            messages: [
              { role: "system", content: "Você é um copywriter elite da CMTecnologia. Escreva sempre em Português-PT com foco em conversão." },
              { role: "user", content: input.prompt }
            ]
          });
          result = typeof res.choices[0].message.content === 'string' 
            ? res.choices[0].message.content 
            : JSON.stringify(res.choices[0].message.content);
        } else {
          result = "Processamento de vídeo em breve...";
        }

        return createGeneratedContent({
          ...input,
          userId: ctx.user.id,
          status: "completed",
          result,
        });
      }),
  }),

  // Innovation router (placeholder for future expansion)
  innovation: router({
    getMarketIntel: protectedProcedure.query(async ({ ctx }) => {
      return { data: "Market intelligence data" };
    }),
  }),

  // Nexus router (placeholder for future expansion)
  nexus: router({
    getOmniscience: protectedProcedure.query(async ({ ctx }) => {
      return { data: "Omniscience data" };
    }),
  }),
});

export type AppRouter = typeof appRouter;