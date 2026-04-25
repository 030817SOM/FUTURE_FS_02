import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import authRoutes from "./routes/auth";
import leadRoutes from "./routes/leads";


const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
