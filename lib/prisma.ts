import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neonConfig } from "@neondatabase/serverless"
import ws from "ws"

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set")
    return new PrismaClient()
  }

  neonConfig.webSocketConstructor = ws

  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  })

  return new PrismaClient({ adapter })
}

export const client =
  globalThis.prisma ?? (globalThis.prisma = createPrismaClient())