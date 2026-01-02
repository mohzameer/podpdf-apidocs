---
sidebar_position: 2
---

# Authentication

How to authenticate with the PodPDF API using API keys.

## Overview

PodPDF uses **API key authentication**. All API requests require a valid API key in the request header.

```http
X-API-Key: your_api_key_here
```

## Quick Start

1. **Get Your API Key** - Sign up and copy your API key from the dashboard
2. **Use Your Key** - Include it in all API requests

## How It Works

Every request to the PodPDF API must include your API key in the `X-API-Key` header:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Hello World</h1>"
  }' \
  --output document.pdf
```

## Getting Your API Key

:::info Dashboard Only
API keys are only available through the dashboard. You cannot generate API keys via the API itself.
:::

### Step 1: Sign Up

1. Go to [https://podpdf.com/signup](https://podpdf.com/signup)
2. Create your account
3. Verify your email

### Step 2: Get Your API Key from Dashboard

1. Sign in to [https://podpdf.com/dashboard](https://podpdf.com/dashboard)
2. Navigate to the **API Keys** section
3. Copy your API key (it will be shown only once)

:::warning Save Your Key
API keys are only displayed once when created. Save it securely immediately. If you lose it, you'll need to generate a new one.
:::

:::tip Keep It Secret
Your API key is like a password. Never share it publicly or commit it to version control.
:::

## Using Your API Key

Include your API key in the `X-API-Key` header for all requests:

### cURL Example

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"html","html":"<h1>Test</h1>"}' \
  --output test.pdf
```

### JavaScript Example

```javascript
const fetch = require('node-fetch');

async function generatePDF() {
  const response = await fetch('https://api.podpdf.com/quickjob', {
    method: 'POST',
    headers: {
      'X-API-Key': 'your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input_type: 'html',
      html: '<h1>Hello World</h1>'
    })
  });

  const buffer = await response.buffer();
  // Save or process the PDF
}
```

### Python Example

```python
import requests

def generate_pdf():
    response = requests.post(
        'https://api.podpdf.com/quickjob',
        headers={
            'X-API-Key': 'your_api_key_here',
            'Content-Type': 'application/json'
        },
        json={
            'input_type': 'html',
            'html': '<h1>Hello World</h1>'
        }
    )
    
    if response.status_code == 200:
        with open('output.pdf', 'wb') as f:
            f.write(response.content)
```

## Security Best Practices

### ✅ DO:
- **Store securely** - Use environment variables or secret management
- **Use HTTPS** - Always make requests over HTTPS
- **Rotate regularly** - Generate new keys periodically
- **Monitor usage** - Check your dashboard for unusual activity
- **Use different keys** - Separate keys for development and production

### ❌ DON'T:
- **Commit to git** - Never commit API keys to source control
- **Share publicly** - Don't post keys in forums or documentation
- **Hardcode** - Don't hardcode keys in your application
- **Use in client-side code** - Never expose keys in frontend JavaScript

## Managing API Keys

:::info Dashboard Management Only
All API key management (viewing, creating, revoking) must be done through the dashboard. There are no API endpoints for key management.
:::

### Viewing Your Keys

Access your API keys from the dashboard:
1. Sign in to [https://podpdf.com/dashboard](https://podpdf.com/dashboard)
2. Go to **Settings** → **API Keys**
3. View all your active keys

### Creating New Keys

You can create multiple API keys for different environments (e.g., development, production):

1. Sign in to the dashboard
2. Go to **Settings** → **API Keys**
3. Click **Create New Key**
4. Give it a descriptive name (e.g., "Production" or "Development")
5. Copy and save the key securely

:::warning One-Time Display
API keys are only shown once when created. If you lose it, you'll need to generate a new one from the dashboard.
:::

### Revoking Keys

If a key is compromised or no longer needed:

1. Sign in to the dashboard
2. Go to **Settings** → **API Keys**
3. Find the key you want to revoke
4. Click **Revoke** or **Delete**
5. Generate a new key from the dashboard if needed

## Environment Variables

### Recommended Setup

Store your API key in environment variables:

**Linux/Mac (.bashrc or .zshrc):**
```bash
export PODPDF_API_KEY="your_api_key_here"
```

**Windows (Command Prompt):**
```cmd
set PODPDF_API_KEY=your_api_key_here
```

**Node.js (.env file):**
```
PODPDF_API_KEY=your_api_key_here
```

Then use in your code:

```javascript
const apiKey = process.env.PODPDF_API_KEY;

fetch('https://api.podpdf.com/quickjob', {
  headers: {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json'
  }
});
```

## Common Errors

### 401 Unauthorized
API key is missing or invalid.

**Solution:**
- Check that you're including the `X-API-Key` header
- Verify your API key is correct
- Generate a new key if needed

### 403 Forbidden  
Account issue or quota exceeded.

**Solution:**
- Check your account status in the dashboard
- Verify you haven't exceeded your plan limits
- Upgrade if you've hit the free tier quota

### 429 Too Many Requests
Rate limit exceeded.

**Solution:**
- Free tier: 20 requests per minute
- Wait before retrying
- Consider upgrading for higher limits

## Testing Your API Key

Quick test to verify your API key works:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Test</h1><p>If you can read this, your API key works!</p>"
  }' \
  --output test.pdf
```

If successful, you'll get a `test.pdf` file.

## Rate Limits

API key authentication is subject to rate limits:

| Plan | Rate Limit | Quota |
|------|------------|-------|
| **Free** | 20 requests/minute | 100 PDFs total |
| **Paid** | Unlimited | Unlimited PDFs |

View plans and pricing in your dashboard

## Need Help?

**Lost your API key?**  
Generate a new one from the dashboard: **Settings** → **API Keys** → **Create New Key**

**API key not working?**  
- Verify you're using the correct key
- Check that it hasn't been revoked
- Make sure you're using the `X-API-Key` header

## Next Steps

- [Generate Your First PDF →](/guides/getting-started)
- [View API Reference →](/api-reference/quickjob)
- [See Code Examples →](/examples/curl-examples)
- [Error Handling Guide →](/guides/error-handling)
