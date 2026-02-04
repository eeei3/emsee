import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle("postgresql://username:password@localhost:5432/default_database");

export default db;
