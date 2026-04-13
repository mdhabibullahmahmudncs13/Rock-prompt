# API Documentation

## Overview

Prompt Rock exposes a single REST API endpoint for prompt optimization. This endpoint accepts a raw prompt and returns an optimized version with automatic format selection.

## Endpoint

### POST `/api/optimize`

Optimizes a prompt using AI and selects the best output format.

## Request

**Content-Type:** `application/json`

**Body:**
```json
{
  "prompt": "Your original prompt here"
}
```

### Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `prompt`  | string | Yes      | The raw prompt to optimize (non-empty) |

### Example Request

```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Act as a professional code reviewer. Review the code for security, performance, and best practices issues. Use bullet points for findings."}'
```

## Response

### Success (200 OK)

```json
{
  "optimized": "Review code for security, performance, and best practices. Use bullet points.",
  "format": "TXT"
}
```

### Response Fields

| Field        | Type   | Description |
|--------------|--------|-------------|
| `optimized`  | string | The refined prompt in the selected format |
| `format`     | string | The chosen format: `JSON`, `XML`, `MD`, or `TXT` |

### Format Types

The API automatically selects one of these formats:

- **`JSON`** — For structured data, APIs, key-value logic, configuration
- **`XML`** — For document structure, config files, hierarchical data
- **`MD`** — For documentation, articles, rich text, markdown content
- **`TXT`** — For conversational prompts, simple instructions, general use

## Error Responses

### 400 Bad Request

Missing or empty prompt parameter.

```json
{
  "error": "Prompt is required"
}
```

### 500 Internal Server Error

OpenRouter API failure or response parsing error.

```json
{
  "error": "Optimization failed"
}
```

Check server logs for detailed error information.

## Request/Response Examples

### Example 1: Code Review Prompt

**Request:**
```json
{
  "prompt": "You are a senior code reviewer. Review this JavaScript function for bugs, performance issues, and code quality. Use concise bullet points."
}
```

**Response:**
```json
{
  "optimized": "Senior code reviewer: audit JS function for bugs, performance, quality. Use bullet points.",
  "format": "TXT"
}
```

### Example 2: Data Processing Instruction

**Request:**
```json
{
  "prompt": "I have a CSV file with user data. I need to validate emails, remove duplicates, and format phone numbers consistently. Show me step-by-step how to do this."
}
```

**Response:**
```json
{
  "optimized": "{\n  \"task\": \"CSV data processing\",\n  \"steps\": [\n    \"Validate emails\",\n    \"Remove duplicates\",\n    \"Format phone numbers\"\n  ]\n}",
  "format": "JSON"
}
```

### Example 3: Documentation Request

**Request:**
```json
{
  "prompt": "Write comprehensive API documentation for a REST endpoint that creates user accounts. Include request/response examples, error codes, and authentication requirements."
}
```

**Response:**
```json
{
  "optimized": "# API Documentation\n\n## POST /users\nCreate a user account.\n\n### Request\n- Email (required)\n- Password (required)\n\n### Response\n- User ID\n- Created timestamp\n\n### Errors\n- 400: Invalid email\n- 409: User exists",
  "format": "MD"
}
```

## Rate Limits

Currently, there are **no rate limits** on the API. However:

- **OpenRouter limits:** Your API key may have limits based on your plan
- **Vercel limits:** Serverless function timeout is 30 seconds

## Authentication

The API uses **server-side authentication** via `OPENROUTER_API_KEY` environment variable.

**Client-side requests don't require headers.** The API key is injected on the server.

## CORS

The API is configured for same-origin requests. Cross-origin requests from other domains will be blocked for security.

## Performance

- **Typical response time:** 2-8 seconds
- **Max function duration:** 30 seconds (Vercel limit)
- **Timeout behavior:** Request returns 500 if optimization exceeds time limit

## Timeout Handling

If optimization takes longer than 30 seconds:

```json
{
  "error": "Optimization failed"
}
```

Consider:
- Using a shorter, simpler prompt
- Checking OpenRouter service status
- Waiting and retrying

## SDK / Client Libraries

### JavaScript/TypeScript

```typescript
async function optimizePrompt(prompt: string) {
  const response = await fetch('/api/optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return response.json();
}

// Usage
const result = await optimizePrompt('Your prompt here');
console.log(result.optimized);
console.log(result.format);
```

### Python

```python
import requests
import json

def optimize_prompt(prompt):
    response = requests.post(
        'http://localhost:3000/api/optimize',
        headers={'Content-Type': 'application/json'},
        json={'prompt': prompt}
    )
    
    if response.status_code != 200:
        raise Exception(response.json()['error'])
    
    return response.json()

# Usage
result = optimize_prompt('Your prompt here')
print(result['optimized'])
print(result['format'])
```

### cURL

```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Your prompt here"}'
```

## Webhook Support

Currently not supported. Requests are synchronous only.

## Versioning

API version: **v1** (no versioning in URL path)

Breaking changes will be communicated via the README and version bumps.

## Status Codes

| Code | Meaning | Notes |
|------|---------|-------|
| 200  | OK | Optimization succeeded |
| 400  | Bad Request | Invalid or missing prompt |
| 500  | Server Error | OpenRouter failure or timeout |

## Related Resources

- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Main README](./README.md)
