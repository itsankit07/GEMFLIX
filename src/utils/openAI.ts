import { GoogleGenerativeAI } from "@google/generative-ai";

import { OPENAI_API_KEY } from "../types/constants";

const genAI = new GoogleGenerativeAI(OPENAI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
