# POST /longjob

Generate PDFs asynchronously with queueing and webhook notifications. Use this endpoint for larger documents or when you need webhook callbacks.

## Description

The `/longjob` endpoint processes PDF generation asynchronously. Your job is queued and processed in the background. When complete, you'll receive a webhook notification (if configured) and can retrieve the PDF from a temporary URL.

**When to use `/longjob`:**
- For larger documents that may take longer than 30 seconds
- When you want webhook notifications when the PDF is ready
- For documents that need to be stored and accessed later
- When you don't need the PDF immediately in the response

**When to use `/quickjob` instead:**
- For small documents that complete quickly
- When you need the PDF immediately in the response
- For real-time PDF generation
- **For converting images to PDF** (images not supported in LongJob)

:::warning Image Support
LongJob does **NOT** support image uploads (multipart/form-data). Use `/quickjob` for image-to-PDF conversion. Images process fast enough (~0.5-2s per image) to complete within the 30-second QuickJob timeout.
:::

## Authentication

This endpoint requires authentication. Include your access token in the Authorization header:

```http
Authorization: Bearer <accessToken>
```

See the [Authentication Guide](/authentication) for details on obtaining tokens.

## Request

### Endpoint

```
POST /longjob
```

### Headers

```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

### Request Body

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="html" label="HTML">

```json
{
  "input_type": "html",
  "html": "<!DOCTYPE html><html><head><title>Large Report</title></head><body><h1>Large Report</h1><p>Content...</p></body></html>",
  "options": {
    "format": "A4",
    "margin": {
      "top": "20mm",
      "right": "20mm",
      "bottom": "20mm",
      "left": "20mm"
    },
    "printBackground": true,
    "scale": 1.0
  },
  "webhook_url": "https://example.com/webhook"
}
```

  </TabItem>
  <TabItem value="markdown" label="Markdown">

```json
{
  "input_type": "markdown",
  "markdown": "# Large Report\n\nThis is **markdown** content...",
  "options": {
    "format": "A4",
    "margin": {
      "top": "20mm",
      "right": "20mm",
      "bottom": "20mm",
      "left": "20mm"
    },
    "printBackground": true,
    "scale": 1.0
  },
  "webhook_url": "https://example.com/webhook"
}
```

  </TabItem>
</Tabs>

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `input_type` | string | Yes | Must be `"html"` or `"markdown"` (images not supported) |
| `html` | string | Yes* | Full HTML content to render (required if `input_type` is `"html"`) |
| `markdown` | string | Yes* | Markdown content to render (required if `input_type` is `"markdown"`) |
| `options` | object | No | PDF generation options (same as `/quickjob` HTML/Markdown options) |
| `webhook_url` | string | No | Override your default webhook URL for this job. Must be a valid HTTPS URL. If not provided, uses your default webhook URL. |

:::info Supported Input Types
- ✅ HTML
- ✅ Markdown
- ❌ Images (use `/quickjob` instead)
:::

## Response

### Success Response

**Status:** `202 Accepted`

**Content-Type:** `application/json`

```json
{
  "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
  "status": "queued",
  "message": "Job queued for processing",
  "estimated_completion": "2025-12-21T10:35:00Z"
}
```

**Fields:**
- `job_id` (string): Unique identifier for this job. Use this to check status via `GET /jobs/{job_id}`
- `status` (string): Always `"queued"` on initial response
- `message` (string): Confirmation message
- `estimated_completion` (string): ISO 8601 timestamp estimate (may vary based on queue depth)

:::info Page Limit Check
The PDF page count is validated before queuing. If the page limit is exceeded, you'll receive a `400 Bad Request` error immediately. The job is only queued if the page limit check passes.
:::

### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| `400 Bad Request` | `PAGE_LIMIT_EXCEEDED` | PDF exceeds maximum page limit (checked before queuing) |
| `400 Bad Request` | - | Invalid `webhook_url` (not HTTPS or malformed URL) |
| `400 Bad Request` | - | Invalid/missing `input_type`, missing content, or input size exceeds limit |
| `401 Unauthorized` | - | Missing or invalid authentication token |
| `403 Forbidden` | `ACCOUNT_NOT_FOUND` | Account not found |
| `403 Forbidden` | `RATE_LIMIT_EXCEEDED` | Rate limit exceeded (free tier: 20 requests/minute) |
| `403 Forbidden` | `QUOTA_EXCEEDED` | Free tier quota exhausted (upgrade required) |
| `429 Too Many Requests` | - | Too many requests (global rate limit) |
| `500 Internal Server Error` | - | Server-side error |

See the [Error Handling Guide](/guides/error-handling) for more details.

## Checking Job Status

After submitting a job, you can check its status using:

- **Polling**: Use `GET /jobs/{job_id}` to check status periodically
- **Webhooks**: Configure a webhook URL to receive notifications when the job completes

See the [Jobs API](/api-reference/jobs) documentation for details on checking job status.

## Webhooks

When your job completes, you'll receive a webhook notification (if configured) with the PDF URL and job details. See the [Webhooks Guide](/api-reference/webhooks) for complete webhook documentation.

## Examples

### cURL

```bash
curl -X POST https://api.podpdf.com/longjob \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Large Document</h1><p>Content...</p>",
    "options": {
      "format": "A4"
    },
    "webhook_url": "https://example.com/webhook"
  }'
```

### JavaScript

```javascript
const response = await fetch('https://api.podpdf.com/longjob', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    input_type: 'html',
    html: '<h1>Large Document</h1><p>Content...</p>',
    options: {
      format: 'A4'
    },
    webhook_url: 'https://example.com/webhook'
  })
});

const result = await response.json();
console.log('Job ID:', result.job_id);
console.log('Status:', result.status);

// Poll for status or wait for webhook
```

### Python

```python
import requests

url = 'https://api.podpdf.com/longjob'
headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}
data = {
    'input_type': 'html',
    'html': '<h1>Large Document</h1><p>Content...</p>',
    'options': {
        'format': 'A4'
    },
    'webhook_url': 'https://example.com/webhook'
}

response = requests.post(url, headers=headers, json=data)
result = response.json()

print(f'Job ID: {result["job_id"]}')
print(f'Status: {result["status"]}')

# Poll for status or wait for webhook
```

## Usage Tips

- **Webhook configuration**: Set a default webhook URL in your account settings, or provide one per request
- **Status checking**: Use `GET /jobs/{job_id}` to poll for job status if you're not using webhooks
- **PDF URLs**: Completed PDFs are available via signed URLs that expire after 1 hour
- **Page limits**: Page count is validated before queuing to prevent unnecessary processing
- **Queue time**: Estimated completion time may vary based on current queue depth

