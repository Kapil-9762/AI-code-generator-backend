import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
const router = Router();

router.post("/generate", async(req,res)=> {
    const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(200).json({message:"prompt is required."})
        }
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        });
        const data = response.text;
        res.status(200).json({data});
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});

export default router;