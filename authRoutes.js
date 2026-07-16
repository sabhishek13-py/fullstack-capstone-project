import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db.js";

const router = express.Router();

/*
 * POST /api/register
 */
router.post("/register", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const { name, email, password } = req.body;

        const existingUser = await db
            .collection("users")
            .findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        await db.collection("users").insertOne({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

/*
 * POST /api/login
 */
router.post("/login", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const { email, password } = req.body;

        const user = await db.collection("users").findOne({
            email,
            password
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Dummy token for mock exam
        const token = "sample-jwt-token-123456";

        res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

/*
 * PUT /api/update/:id
 */
router.put("/update/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();

        const { name, email } = req.body;

        await db.collection("users").updateOne(
            {
                _id: new ObjectId(req.params.id)
            },
            {
                $set: {
                    name,
                    email
                }
            }
        );

        res.json({
            message: "Profile updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

export default router;
