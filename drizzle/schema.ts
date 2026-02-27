import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

// Core user table backing auth flow
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Agents table
export const agents = mysqlTable("agents", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  personality: text("personality"),
  status: mysqlEnum("status", ["online", "offline", "training"]).default("offline").notNull(),
  skills: json("skills").$type<string[]>().notNull(),
  avatar: varchar("avatar", { length: 512 }),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = typeof agents.$inferInsert;

// Leads table
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  score: int("score").default(0).notNull(),
  source: mysqlEnum("source", ["instagram", "linkedin", "zaask", "google", "direct", "other"]).default("direct").notNull(),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "proposal", "closed"]).default("new").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

// Clients table
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  status: mysqlEnum("status", ["active", "trial", "inactive", "churned"]).default("active").notNull(),
  plan: mysqlEnum("plan", ["starter", "professional", "enterprise"]).default("starter").notNull(),
  startDate: timestamp("startDate").defaultNow().notNull(),
  trialEndDate: timestamp("trialEndDate"),
  monthlyValue: decimal("monthlyValue", { precision: 10, scale: 2 }).default("0").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

// Financial data table
export const financialData = mysqlTable("financial_data", {
  id: int("id").autoincrement().primaryKey(),
  date: varchar("date", { length: 50 }).notNull(),
  revenue: decimal("revenue", { precision: 12, scale: 2 }).default("0").notNull(),
  costs: decimal("costs", { precision: 12, scale: 2 }).default("0").notNull(),
  profit: decimal("profit", { precision: 12, scale: 2 }).default("0").notNull(),
  apiCosts: decimal("apiCosts", { precision: 12, scale: 2 }).default("0").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FinancialData = typeof financialData.$inferSelect;
export type InsertFinancialData = typeof financialData.$inferInsert;

// WhatsApp accounts table
export const whatsappAccounts = mysqlTable("whatsapp_accounts", {
  id: int("id").autoincrement().primaryKey(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull().unique(),
  status: mysqlEnum("status", ["active", "warming", "limited", "banned"]).default("active").notNull(),
  messagesSent: int("messagesSent").default(0).notNull(),
  messagesReceived: int("messagesReceived").default(0).notNull(),
  warmingProgress: int("warmingProgress").default(0).notNull(),
  lastActivity: timestamp("lastActivity").defaultNow().notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WhatsAppAccount = typeof whatsappAccounts.$inferSelect;
export type InsertWhatsAppAccount = typeof whatsappAccounts.$inferInsert;

// Logs table
export const logs = mysqlTable("logs", {
  id: int("id").autoincrement().primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  level: mysqlEnum("level", ["info", "warning", "error", "success", "debug"]).default("info").notNull(),
  message: text("message").notNull(),
  agent: varchar("agent", { length: 255 }),
  agentId: int("agentId"),
  data: json("data").$type<any>(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Log = typeof logs.$inferSelect;
export type InsertLog = typeof logs.$inferInsert;

// CMS content table
export const cmsContent = mysqlTable("cms_content", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content"),
  contentType: mysqlEnum("contentType", ["page", "post", "component"]).default("page").notNull(),
  published: boolean("published").default(false).notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CMSContent = typeof cmsContent.$inferSelect;
export type InsertCMSContent = typeof cmsContent.$inferInsert;

// Landing pages table
export const landingPages = mysqlTable("landing_pages", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  template: varchar("template", { length: 255 }).default("blank").notNull(),
  content: json("content").$type<any>(),
  published: boolean("published").default(false).notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LandingPage = typeof landingPages.$inferSelect;
export type InsertLandingPage = typeof landingPages.$inferInsert;

// Training data table
export const trainingData = mysqlTable("training_data", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["pdf", "url", "text"]).default("text").notNull(),
  size: varchar("size", { length: 50 }),
  status: mysqlEnum("status", ["pending", "processing", "completed", "error"]).default("pending").notNull(),
  progress: int("progress").default(0).notNull(),
  content: text("content"),
  userId: int("userId").notNull(),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TrainingData = typeof trainingData.$inferSelect;
export type InsertTrainingData = typeof trainingData.$inferInsert;

// Generated content table (for Creative Lab)
export const generatedContent = mysqlTable("generated_content", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["image", "copy", "video"]).default("image").notNull(),
  prompt: text("prompt").notNull(),
  result: text("result"),
  status: mysqlEnum("status", ["generating", "completed", "failed"]).default("generating").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GeneratedContent = typeof generatedContent.$inferSelect;
export type InsertGeneratedContent = typeof generatedContent.$inferInsert;
