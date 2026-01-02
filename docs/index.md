---
id: index
title: PodPDF API Documentation
sidebar_label: 🏠 Home
slug: /
---

# PodPDF API Documentation

Generate professional PDFs from HTML and Markdown in seconds.

**Simple REST API · No Setup Required · Start Free**

[Get Started →](/guides/getting-started) [View API Reference →](/api-reference/quickjob)

---

## Why PodPDF?

:::info Key Features
- ⚡ **Fast & Simple** - Send HTML, Markdown, or images, get a PDF. No complex setup or dependencies.
- 🖼️ **Multiple Input Types** - Convert HTML, Markdown, or images (PNG/JPEG) to PDF
- 🔄 **Flexible Processing** - Choose instant sync generation or async with webhook notifications.
- 💰 **Affordable** - Free tier included. Pay only for what you use with paid plans.
:::

---

## Quick Example

Generate your first PDF in under a minute:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Hello World</h1><p>My first PDF!</p>"
  }' \
  --output document.pdf
```

That's it! You now have a PDF file.

[See more examples →](/examples/curl-examples)

---

## Common Use Cases

- 📄 **Invoices & Receipts** - Generate customer invoices on the fly
- 📊 **Reports** - Create data-driven PDF reports from HTML
- 🎓 **Certificates** - Issue certificates and credentials
- 📋 **Documents** - Convert content to downloadable PDFs
- 🖼️ **Image Collections** - Convert photos and images to PDF albums

---

## Getting Started

### 1. Get Your API Key
Sign up and get your API key from the dashboard (dashboard only).  
[Learn about API keys →](/authentication)

### 2. Make Your First Request
Follow our 5-minute quickstart guide.  
[Get started →](/guides/getting-started)

### 3. Explore the API
Browse all available endpoints and features.  
[API Reference →](/api-reference/quickjob)

---

## Key Features

### 🎯 Two Generation Modes

**QuickJob** - Instant synchronous generation  
Perfect for simple documents (up to 25 pages maximum, < 30 seconds)  
[Learn more →](/api-reference/quickjob)

**LongJob** - Asynchronous with webhooks  
Ideal for large documents with webhook notifications  
[Learn more →](/api-reference/longjob)

### 🔐 Simple Authentication

API key-based authentication - just add your key to the request header.  
[Authentication guide →](/authentication)

### 📈 Flexible Pricing

- **Free Tier:** 100 PDFs to get started
- **Paid Plans:** Unlimited PDFs, pay per use

View plans in your dashboard

---

## Need Help?

- 📚 [Getting Started Guide](/guides/getting-started) - 5-minute quickstart
- 🔑 [API Key Management](/authentication) - Get and manage your keys
- 💻 [Code Examples](/examples/curl-examples) - Copy-paste ready examples
- ❓ [Error Handling](/guides/error-handling) - Troubleshooting guide
- 🔗 [API Reference](/api-reference/quickjob) - Complete endpoint documentation

---

**Ready to generate PDFs?** [Get started now →](/guides/getting-started)

