import { Router } from "express";

export const dealsRouter = Router();

// Temporary in-memory store for testing
const deals: Array<{ id: string; name: string }> = [];

dealsRouter.get("/", (_req, res) => {
  res.json({ data: deals });
});

dealsRouter.post("/", (req, res) => {
  const { name } = req.body;
  const id = `deal_${Date.now()}`;
  const deal = { id, name: name || "Untitled deal" };
  deals.push(deal);
  res.status(201).json({ data: deal });
});
