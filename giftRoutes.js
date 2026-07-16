import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db.js";

const router = express.Router();

// GET /api/gifts
router.get("/", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const gifts = await db.collection("gifts").find({}).toArray();

        res.status(200).json(gifts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch gifts" });
    }
});

// GET /api/gifts/:id
router.get("/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const gift = await db.collection("gifts").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!gift) {
            return res.status(404).json({
                message: "Gift not found"
            });
        }

        res.status(200).json(gift);

    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch gift"
        });
    }
});

export default router;
