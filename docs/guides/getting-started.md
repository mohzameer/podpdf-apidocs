---
sidebar_position: 1
---

# Getting Started

Generate your first PDF with PodPDF in under 5 minutes!

## What You'll Build

By the end of this guide, you'll be able to:
- ✅ Get your PodPDF API key
- ✅ Generate your first PDF from HTML
- ✅ Understand which endpoint to use
- ✅ Customize PDF options

## Prerequisites

- A valid email address
- cURL or any HTTP client
- Basic knowledge of REST APIs

## Step 1: Get Your API Key

:::info Dashboard Only
API keys are only available through the dashboard. You cannot generate them via the API.
:::

### Sign Up

1. Go to [https://podpdf.com/signup](https://podpdf.com/signup)
2. Create your account with email and password
3. Verify your email address

### Get Your API Key from Dashboard

1. Sign in to your [dashboard](https://podpdf.com/dashboard)
2. Navigate to **Settings** → **API Keys**
3. Click **Create New Key** if you don't have one
4. Copy your API key (shown only once)

:::warning One-Time Display
API keys are only displayed once when created. Save it immediately! If you lose it, create a new one from the dashboard.
:::

:::tip Store Securely
Keep your API key secure! Store it in environment variables, not in your code.
:::

## Step 2: Generate Your First PDF

Now let's create a simple PDF from HTML:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>My First PDF</h1><p>This is amazing!</p>"
  }' \
  --output my-first.pdf
```

**Success!** 🎉 You now have `my-first.pdf` on your computer.

## Step 3: Try Markdown

You can also generate PDFs from Markdown:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "markdown",
    "markdown": "# My Report\n\n## Section 1\n\nThis is **bold** and this is *italic*."
  }' \
  --output my-markdown.pdf
```

## Step 4: Customize Options

Add custom margins and formatting:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type": application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Custom PDF</h1><p>With custom margins!</p>",
    "options": {
      "format": "A4",
      "margin": {
        "top": "20mm",
        "right": "20mm",
        "bottom": "20mm",
        "left": "20mm"
      },
      "printBackground": true,
      "landscape": false
    }
  }' \
  --output custom.pdf
```

## Step 5: Generate an Invoice

Here's a practical example - generating an invoice:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<!DOCTYPE html><html><head><style>body{font-family:Arial;padding:40px}.header{border-bottom:2px solid #333;padding-bottom:20px}.invoice-details{margin:30px 0}.total{font-size:24px;font-weight:bold;text-align:right}</style></head><body><div class=\"header\"><h1>INVOICE</h1><p>Invoice #12345<br>Date: Dec 29, 2025</p></div><div class=\"invoice-details\"><p><strong>Bill To:</strong><br>John Doe<br>john@example.com</p><table width=\"100%\" style=\"margin-top:30px;border-collapse:collapse;\"><tr style=\"border-bottom:1px solid #ddd;\"><th align=\"left\">Description</th><th align=\"right\">Amount</th></tr><tr><td>PDF Generation Service</td><td align=\"right\">$100.00</td></tr></table></div><div class=\"total\">Total: $100.00</div></body></html>"
  }' \
  --output invoice.pdf
```

## Choosing Between QuickJob and LongJob

### Use `/quickjob` when:
- ✅ Document is small (< 10 pages)
- ✅ Need PDF immediately (< 30 seconds)
- ✅ Synchronous workflow fits your needs

### Use `/longjob` when:
- ✅ Document is large (> 10 pages)
- ✅ Can wait for generation (async)
- ✅ Want webhook notifications when complete

[Learn more about LongJob →](/api-reference/longjob)

## Using Environment Variables

For security, store your API key in environment variables:

### Linux/Mac

```bash
export PODPDF_API_KEY="your_api_key_here"

curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: $PODPDF_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"html","html":"<h1>Hello</h1>"}' \
  --output output.pdf
```

### Node.js

Create a `.env` file:
```
PODPDF_API_KEY=your_api_key_here
```

Use in your code:
```javascript
require('dotenv').config();

const apiKey = process.env.PODPDF_API_KEY;

fetch('https://api.podpdf.com/quickjob', {
  headers: {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json'
  }
});
```

## What's Next?

### Explore More Features
- 📚 [View All API Endpoints](/api-reference/quickjob)
- 🎨 [See More Code Examples](/examples/curl-examples)
- 💰 [Check Plan Limits](/api-reference/plans)

### Common Use Cases
- Generate customer invoices
- Create PDF reports from data
- Issue certificates and credentials
- Convert blog posts to PDF

### Need Help?
- [API Key Management](/authentication)
- [Error Handling Guide](/guides/error-handling)
- [API Reference](/api-reference/quickjob)

## Free Tier Limits

Your free account includes:
- 📊 **100 PDFs** - All-time quota (does not reset monthly)
- ⚡ **20 requests/minute** - Rate limit
- 📄 **Up to 100 pages** - Per PDF
- 📦 **5 MB max** - Input size limit

:::tip Need More?
[Upgrade to a paid plan](/api-reference/plans) for unlimited PDFs and higher limits.
:::

## Troubleshooting

### Error: 401 Unauthorized
- Check that your API key is correct
- Make sure you're using the `X-API-Key` header
- Verify your key hasn't been revoked

### Error: 403 Quota Exceeded
- You've used all 100 free PDFs
- [Upgrade to a paid plan](/api-reference/plans)

### Error: 408 Timeout
- Your document is too large for QuickJob
- Use [LongJob](/api-reference/longjob) instead

[More troubleshooting →](/guides/error-handling)

## Congratulations! 🎉

You've successfully:
- ✅ Got your API key
- ✅ Generated your first PDF
- ✅ Learned the basics
- ✅ Created a real invoice

Start building amazing PDF generation features into your app!
