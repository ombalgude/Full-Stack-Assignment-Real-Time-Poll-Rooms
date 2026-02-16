import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ 
    connectionString, 
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
    console.warn('Unexpected error on idle Prisma Pg pool client', err);
});

const adapter = new PrismaPg(pool);
export const prismaClient = new PrismaClient({ adapter });