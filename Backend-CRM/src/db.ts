import pkg from "pg";
const { Pool } = pkg;
import { env } from "./config/env";

export const pool = new Pool({ connectionString: env.DATABASE_URL });