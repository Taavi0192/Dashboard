// app/api/lesson-plan/route.ts
import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const units = parseInt(formData.get('units') as string, 10);
    const difficulty = formData.get('difficulty') as string;

    if (!file || !units || !difficulty) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const pdfData = await pdfParse(buffer);
    const pdfText = pdfData.text;

    // Prepare the prompt (same as before)

    // Call Hugging Face Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}` },
      method: 'POST',
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', errorText);
      return NextResponse.json({ message: 'Error from Hugging Face API', details: errorText }, { status: response.status });
    }

    const result = await response.json();
    const lessonPlan = result.generated_text || result[0]?.generated_text;

    if (!lessonPlan) {
      return NextResponse.json({ message: 'Failed to generate lesson plan' }, { status: 500 });
    }

    return NextResponse.json({ lessonPlan }, { status: 200 });
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    return NextResponse.json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
  }

}
