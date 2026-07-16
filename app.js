import express from "express";
import cors from "cors";

import giftRoutes from "./routes/giftRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/gifts", giftRoutes);
app.use("/api/search", searchRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Gift Store API is running...");
});

export default app;
