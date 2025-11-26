import "dotenv/config";

// CommonJS-style requires to play nice with Node 22 + ts-node-dev
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Router
const dealsRouter = require("./modules/deals/deals.router").dealsRouter;

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());

const port = process.env.API_PORT || 4000;

app.get("/health", (_req: any, res: any) => {
  res.json({ status: "ok", service: "hist-api" });
});

app.use("/api/deals", dealsRouter);

app.use((_req: any, res: any) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`HiSt API running on http://localhost:${port}`);
});
