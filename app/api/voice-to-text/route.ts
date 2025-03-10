import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const response = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: file,
      response_format: "json",
    });

    return new Response(JSON.stringify({ transcript: response.text }));
  } catch (error) {
    console.error("Error processing audio:", error);
    return new Response(JSON.stringify({ error: "Failed to process audio" }), {
      status: 500,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
