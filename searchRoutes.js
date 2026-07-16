import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

// GET /api/search?category=Flowers
router.get("/", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const { category } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        const gifts = await db
            .collection("gifts")
            .find(filter)
            .toArray();

        res.status(200).json(gifts);

    } catch (err) {
        res.status(500).json({
            error: "Failed to search gifts"
        });
    }
});

export default router;
