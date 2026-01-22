// js/features/ai.js
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// TinyLlama is the only model small enough for 4GB RAM
const MODEL_ID = "TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC";

export class AIModule {
    constructor() {
        this.engine = null;
        this.ready = false;
        this.safeMode = false;
    }

    async init(uiCallback) {
        // 1. Safety Check for Hardware
        if (navigator.hardwareConcurrency < 4) {
            console.warn("Low specs detected. Activating Safe Mode.");
            this.safeMode = true;
            uiCallback("Optimizing for Device...");
            this.ready = true;
            return;
        }

        try {
            uiCallback("Loading Neural Network...");
            this.engine = await CreateMLCEngine(MODEL_ID, {
                initProgressCallback: (info) => uiCallback(info.text)
            });
            this.ready = true;
        } catch (error) {
            console.error("AI Load Failed. Using Fallback.", error);
            this.safeMode = true; // Switch to fake mode if real AI crashes
            this.ready = true;
        }
    }

    async generate(userText, history) {
        if (!this.ready) return "System initializing...";

        if (this.safeMode) {
            return await this.generateSafeResponse(userText);
        }

        // Real AI Generation
        const messages = [
            { role: "system", content: "You are Lyra, a sophisticated AI assistant from Lyceum Corp." },
            ...history,
            { role: "user", content: userText }
        ];

        const chunks = await this.engine.chat.completions.create({
            messages, temperature: 0.7,
        });
        return chunks.choices[0].message.content;
    }

    // --- SAFE MODE LOGIC (Smart Script) ---
    async generateSafeResponse(text) {
        await new Promise(r => setTimeout(r, 1000)); // Fake thinking delay
        
        const t = text.toLowerCase();
        
        if (t.includes("hello") || t.includes("hi")) 
            return "Greetings. I am Lyra. How may I assist you today?";
        
        if (t.includes("who are you")) 
            return "I am Lyra, an advanced neural interface developed by Lyceum Corporation.";
            
        if (t.includes("image") || t.includes("draw")) 
            return "[System]: Image generation requires cloud connectivity. I am currently in offline mode.";

        // Generic fallback
        return `I have processed your input: "${text}". As I am running in hardware-safe mode on this device, my cognitive functions are limited.`;
    }
}