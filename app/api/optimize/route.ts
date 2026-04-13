import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert prompt engineer. Rewrite the user's prompt to be more concise, token-efficient, and produce a more refined LLM output — without losing the original intent.

Then choose the BEST output format:
- JSON: if the prompt involves structured data, APIs, or key-value logic
- XML: if the prompt involves document structure or config-like content  
- Markdown: if the prompt involves documentation, articles, or rich text
- TXT: if the prompt is conversational or simple instruction-based

Your response must begin with exactly: FORMAT: [JSON|XML|MD|TXT]
Then on the next line, output only the optimized prompt in the chosen format. No explanations. No preamble.`;

const MODELS = [
  'mistralai/mistral-7b-instruct',
  'openrouter/auto',
];

async function callOpenRouter(
  prompt: string,
  modelIndex: number = 0
): Promise<{ optimized: string; format: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  const model = MODELS[modelIndex];
  if (!model) {
    throw new Error('All models have failed');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://prompt-rock-xenon.vercel.app',
      'X-Title': 'Prompt Rock by Xenon',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`OpenRouter error (model: ${model}):`, response.status, errorText);

    // Try fallback model if available
    if (modelIndex < MODELS.length - 1) {
      return callOpenRouter(prompt, modelIndex + 1);
    }

    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response structure from OpenRouter');
  }

  const content = data.choices[0].message.content.trim();

  // Parse the response
  const lines = content.split('\n');
  const formatLine = lines[0];
  const formatMatch = formatLine.match(/FORMAT:\s*(JSON|XML|MD|TXT)/i);

  if (!formatMatch) {
    throw new Error('Could not parse FORMAT from response');
  }

  const format = formatMatch[1].toUpperCase();
  const optimized = lines.slice(1).join('\n').trim();

  if (!optimized) {
    throw new Error('No optimized prompt content found');
  }

  return { optimized, format };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    // Validate input
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Call OpenRouter with fallback
    const result = await callOpenRouter(prompt);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Optimization error:', error);
    return NextResponse.json(
      { error: 'Optimization failed' },
      { status: 500 }
    );
  }
}
