import fs from "fs";
import pdf from "pdf-extraction"; // ✅ use pdf-extraction instead of pdf-parse
import mammoth from "mammoth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// ✅ Helper: extract text from PDF or DOCX
const extractTextFromFile = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  if (filePath.endsWith(".pdf")) {
    const data = await pdf(buffer);
    return data.text;
  } else if (filePath.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error("Unsupported file format. Only PDF or DOCX allowed.");
  }
};

// ✅ Resume Analysis Controller
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume file" });
    }

    const resumeText = await extractTextFromFile(req.file.path);

    const prompt = `
      You are a professional career coach.
      Analyze the following resume and provide structured feedback in JSON format:
      {
        "summary": "Short summary of the candidate",
        "strengths": ["list of strengths"],
        "weaknesses": ["list of weaknesses"],
        "improvement_suggestions": ["actionable tips to improve resume"]
      }

      Resume:
      ${resumeText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const suggestions = result.response.text();

    // cleanup temp uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("❌ Error in analyzeResume:", error.message);
    res.status(500).json({
      message: "Error analyzing resume",
      error: error.message,
    });
  }
};

// ✅ Job Matching Controller (only job text now)
export const matchJob = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume file" });
    }

    const { jobDescriptionText } = req.body;

    if (!jobDescriptionText || !jobDescriptionText.trim()) {
      return res
        .status(400)
        .json({ message: "Please provide a job description text" });
    }

    const resumeText = await extractTextFromFile(req.file.path);

    const prompt = `
      You are a professional HR analyst.
      Compare the following candidate resume with the given job description.
      Return a structured JSON response like:
      {
        "match_score": "percentage match between 0-100",
        "key_strengths": ["skills that match"],
        "gaps": ["skills missing or weak"],
        "suggestions": ["advice to better align resume with job"]
      }

      Resume:
      ${resumeText}

      Job Description:
      ${jobDescriptionText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    // cleanup temp uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({ analysis });
  } catch (error) {
    console.error("❌ Error in matchJob:", error.message);
    res.status(500).json({
      message: "Error matching job",
      error: error.message,
    });
  }
};
