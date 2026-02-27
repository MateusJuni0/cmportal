import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  agents,
  InsertAgent,
  leads,
  InsertLead,
  clients,
  InsertClient,
  financialData,
  InsertFinancialData,
  whatsappAccounts,
  InsertWhatsAppAccount,
  logs,
  InsertLog,
  cmsContent,
  InsertCMSContent,
  landingPages,
  InsertLandingPage,
  trainingData,
  InsertTrainingData,
  generatedContent,
  InsertGeneratedContent,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Agents queries
export async function getAgents(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(agents).where(eq(agents.userId, userId));
}

export async function getAgentById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(agents).where(eq(agents.id, id)).limit(1);
  return result[0];
}

export async function createAgent(data: InsertAgent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(agents).values(data);
  return result;
}

// Leads queries
export async function getLeads(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).where(eq(leads.userId, userId));
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}

export async function createLead(data: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(leads).values(data);
}

// Clients queries
export async function getClients(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clients).where(eq(clients.userId, userId));
}

export async function getClientById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  return result[0];
}

export async function createClient(data: InsertClient) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(clients).values(data);
}

// Financial queries
export async function getFinancialData(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(financialData).where(eq(financialData.userId, userId));
}

export async function createFinancialData(data: InsertFinancialData) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(financialData).values(data);
}

// WhatsApp queries
export async function getWhatsAppAccounts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(whatsappAccounts).where(eq(whatsappAccounts.userId, userId));
}

export async function createWhatsAppAccount(data: InsertWhatsAppAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(whatsappAccounts).values(data);
}

// Logs queries
export async function getLogs(userId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(logs).where(eq(logs.userId, userId)).orderBy(logs.timestamp).limit(limit);
}

export async function createLog(data: InsertLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(logs).values(data);
}

// CMS queries
export async function getCMSContent(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cmsContent).where(eq(cmsContent.userId, userId));
}

export async function createCMSContent(data: InsertCMSContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(cmsContent).values(data);
}

// Landing Pages queries
export async function getLandingPages(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(landingPages).where(eq(landingPages.userId, userId));
}

export async function createLandingPage(data: InsertLandingPage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(landingPages).values(data);
}

// Training data queries
export async function getTrainingData(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trainingData).where(eq(trainingData.userId, userId));
}

export async function createTrainingData(data: InsertTrainingData) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(trainingData).values(data);
}

// Generated content queries
export async function getGeneratedContent(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(generatedContent).where(eq(generatedContent.userId, userId));
}

export async function createGeneratedContent(data: InsertGeneratedContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(generatedContent).values(data);
}
