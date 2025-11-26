const express = require("express");

type Deal = {
  id: string;
  name: string;
};

export const dealsRouter = express.Router();

// In-memory store for now; we'll replace this with a DB later
const deals: Deal[] = [];

dealsRouter.get("/", (_req: any, res: any) => {
  res.json({ data: deals });
});

dealsRouter.post("/", (req: any, res: any) => {
  const { name } = req.body;

  const id = `deal_${Date.now()}`;
  const deal: Deal = {
    id,
    name: name || "Untitled deal"
  };

  deals.push(deal);

  res.status(201).json({ data: deal });
});

dealsRouter.get("/:id", (req: any, res: any) => {
  const { id } = req.params;
  const deal = deals.find((d) => d.id === id);

  if (!deal) {
    return res.status(404).json({ error: "Deal not found" });
  }

  res.json({ data: deal });
});
