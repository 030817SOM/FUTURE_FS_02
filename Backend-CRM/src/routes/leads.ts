import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";

const router = express.Router();
router.use(requireAuth);

function scope(req: any) {
  return req.userRole === "admin" ? "" : `AND owner_id='${req.userId}'`;
}

router.get("/", async (req: any, res) => {
  const result = await pool.query(`SELECT * FROM leads WHERE 1=1 ${scope(req)} ORDER BY created_at DESC`);
  res.json(result.rows);
});

router.post("/", async (req: any, res) => {
  const { name, email, source } = req.body;

  const result = await pool.query(
    `INSERT INTO leads (owner_id, name, email, source)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [req.userId, name, email, source]
  );

  res.status(201).json(result.rows[0]);
});

router.patch("/:id", async (req: any, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await pool.query(
    `UPDATE leads SET status=$1 WHERE id=$2 ${scope(req)} RETURNING *`,
    [status, id]
  );

  if (!result.rowCount) return res.status(404).json({ error: { code: "NOT_FOUND" } });

  res.json(result.rows[0]);
});

router.delete("/:id", async (req: any, res) => {
  const { id } = req.params;

  const result = await pool.query(`DELETE FROM leads WHERE id=$1 ${scope(req)}`, [id]);

  if (!result.rowCount) return res.status(404).json({ error: { code: "NOT_FOUND" } });

  res.status(204).send();
});

export default router;