import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../db";
import { signToken } from "../utils/jwt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, displayName } = req.body;

  const existing = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
  if (existing.rowCount) {
    return res.status(409).json({ error: { code: "EMAIL_TAKEN" } });
  }

  const hash = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `INSERT INTO users (email, password_hash, display_name)
     VALUES ($1,$2,$3) RETURNING *`,
    [email, hash, displayName]
  );

  const user = result.rows[0];
  const token = signToken({ sub: user.id, role: user.role });

  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      role: user.role
    },
    token
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: { code: "INVALID_CREDENTIALS" } });
  }

  const token = signToken({ sub: user.id, role: user.role });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      role: user.role
    },
    token
  });
});

export default router;