import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert prompt engineer. Your task is to rewrite the user's prompt into a detailed, high-quality prompt optimized for Claude.

Claude-specific enhancement guidelines:
- Open with a clear role definition: "You are a [domain expert]..."
- State the task explicitly and early — Claude performs best with direct, unambiguous instructions
- Use XML tags to structure complex inputs (e.g., <context>, <instructions>, <constraints>, <examples>)
- Add a <thinking> or step-by-step reasoning instruction if the task involves analysis, logic, or multi-step work
- Define the target audience, tone, and desired depth
- Specify what Claude should NOT do (negative constraints reduce hallucination and scope creep)
- If the task has multiple parts, number them explicitly
- End with a clear output contract: what format, length, and structure the final response should take
- Prefer precise, literal language over vague terms like "good" or "detailed" — Claude responds better to specifics

Then select the BEST output format:
- JSON: structured data, APIs, key-value logic, machine-readable output
- XML: hierarchical content, config-like structures, document framing
- MD: documentation, articles, tutorials, reports, rich formatted text
- TXT: conversational prompts, simple instructions, natural language tasks

Your response must begin with exactly: FORMAT: [JSON|XML|MD|TXT]
Next line: the fully rewritten, Claude-optimized prompt only.
No preamble. No explanation. No commentary.`;

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
