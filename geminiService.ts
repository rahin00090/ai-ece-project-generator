
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectData } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateProject(inputs: {
  semester: string;
  skillLevel: string;
  interestArea: string;
  budget: string;
  projectType: string;
}): Promise<ProjectData | { error: string }> {
  try {
    const prompt = `You are a professional ECE Project Guide. Generate a COMPLETE and STRUCTURED ECE project for a student with these details:
    - Semester: ${inputs.semester}
    - Skill Level: ${inputs.skillLevel}
    - Interest Area: ${inputs.interestArea}
    - Budget: ${inputs.budget} INR
    - Project Type: ${inputs.projectType}

    The project must be innovative, practical, and use modern ECE technologies (IoT, AI, Embedded, VLSI, etc.).
    Include realistic components and costs in INR that fit within the ${inputs.budget} budget.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            problemDefinition: { type: Type.STRING },
            workingLogic: { type: Type.ARRAY, items: { type: Type.STRING } },
            hardwareComponents: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  use: { type: Type.STRING },
                  cost: { type: Type.NUMBER }
                },
                required: ["name", "use", "cost"]
              }
            },
            softwareTools: { type: Type.ARRAY, items: { type: Type.STRING } },
            futureScope: { type: Type.ARRAY, items: { type: Type.STRING } },
            report: {
              type: Type.OBJECT,
              properties: {
                abstract: { type: Type.STRING },
                introduction: { type: Type.STRING },
                proposedSystem: { type: Type.STRING },
                workingMethodology: { type: Type.STRING },
                hardwareDescription: { type: Type.STRING },
                softwareDescription: { type: Type.STRING },
                expectedOutput: { type: Type.STRING },
                advantages: { type: Type.ARRAY, items: { type: Type.STRING } },
                applications: { type: Type.ARRAY, items: { type: Type.STRING } },
                conclusion: { type: Type.STRING }
              },
              required: ["abstract", "introduction", "proposedSystem", "workingMethodology", "hardwareDescription", "softwareDescription", "expectedOutput", "advantages", "applications", "conclusion"]
            }
          },
          required: ["title", "problemDefinition", "workingLogic", "hardwareComponents", "softwareTools", "futureScope", "report"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as ProjectData;
  } catch (error) {
    console.error("Error generating project:", error);
    return { error: "Failed to architect your project. Please try again." };
  }
}

export async function analyzeProjectImage(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { text: "Analyze this image for safety hazards such as fire, smoke, or gas leaks. Determine if a hazard exists, its type, and confidence level." },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image
            }
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hazard_detected: { type: Type.BOOLEAN },
            type: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["hazard_detected", "type", "confidence"],
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error analyzing image:", error);
    return { error: "Failed to analyze image" };
  }
}
