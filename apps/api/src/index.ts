import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { json } from "body-parser";

import { dealsRouter } from "./modules/deals/deals.router";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(json());

const port = process.env.API_PORT || 4000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "hist-api" });
});

app.use("/api/deals", dealsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`HiSt API running on http://localhost:${port}`);
});
