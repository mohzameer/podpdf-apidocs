---
sidebar_position: 1
---

# POST /quickjob

Generate PDFs instantly (< 30 seconds) - Perfect for simple documents (up to 25 pages maximum).

## When to Use

✅ **Use QuickJob when:**
- Document is simple and small (up to 25 pages maximum)
- Need PDF immediately
- Synchronous workflow
- Converting images to PDF (up to 25 images maximum)

❌ **Use LongJob instead when:**
- Document is large (more than 25 pages)
- Can use async processing
- Want webhook notifications

:::info Image Support
QuickJob supports image-to-PDF conversion! Upload PNG or JPEG images and get a PDF with one image per page. Images process fast (~0.5-2s per image).
:::

## Quick Example

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Invoice</h1><p>Amount: $100</p>"
  }' \
  --output invoice.pdf
```

## Authentication

Required. Include your API key:

```http
X-API-Key: your_api_key_here
```

[Learn about API keys →](/authentication)

## Request

### Endpoint
```
POST https://api.podpdf.com/quickjob
```

### Request Body

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="html" label="HTML Input">

```json
{
  "input_type": "html",
  "html": "<!DOCTYPE html><html><head><title>Invoice</title></head><body><h1>Invoice</h1><p>Thank you!</p></body></html>",
  "options": {
    "format": "A4",
    "margin": {
      "top": "20mm",
      "right": "20mm",
      "bottom": "20mm",
      "left": "20mm"
    },
    "printBackground": true
  }
}
```

  </TabItem>
  <TabItem value="markdown" label="Markdown Input">

```json
{
  "input_type": "markdown",
  "markdown": "# Invoice\n\n**Customer:** John Doe\n**Amount:** $100\n\nThank you!",
  "options": {
    "format": "A4",
    "margin": {
      "top": "20mm",
      "right": "20mm",
      "bottom": "20mm",
      "left": "20mm"
    },
    "printBackground": true
  }
}
```

  </TabItem>
  <TabItem value="images" label="Images (Multipart)">

**Content-Type:** `multipart/form-data`

```bash
# cURL example - multiple images
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo1.png" \
  -F "images=@photo2.jpg" \
  -F 'options={"format":"A4","fit":"contain"}'
```

```javascript
// JavaScript/Browser example
const formData = new FormData();
formData.append('input_type', 'image');
formData.append('images', file1);  // File from input[type=file]
formData.append('images', file2);
formData.append('options', JSON.stringify({
  format: 'A4',
  margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  fit: 'contain'
}));

const response = await fetch('https://api.podpdf.com/quickjob', {
  method: 'POST',
  headers: { 'X-API-Key': apiKey },
  body: formData
});
```

**Each image becomes one page in the PDF.**

  </TabItem>
</Tabs>

### Request Fields

**For HTML/Markdown (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `input_type` | string | ✅ | `"html"`, `"markdown"`, or `"image"`. Must be enabled for your plan (see `enabled_conversion_types` in plan details). |
| `html` | string | ✅* | HTML content (*required if input_type is html) |
| `markdown` | string | ✅* | Markdown content (*required if input_type is markdown) |
| `options` | object | ❌ | PDF generation options |
| `options.format` | string | ❌ | Paper format: `"A4"`, `"Letter"`, etc. (default: `"A4"`) |
| `options.margin` | object | ❌ | Margins for the PDF |
| `options.margin.top` | string | ❌ | Top margin (e.g., `"20mm"`) |
| `options.margin.right` | string | ❌ | Right margin |
| `options.margin.bottom` | string | ❌ | Bottom margin |
| `options.margin.left` | string | ❌ | Left margin |
| `options.printBackground` | boolean | ❌ | Print background graphics (default: `true`) |
| `options.scale` | number | ❌ | Scale of rendering (default: `1.0`) |
| `options.landscape` | boolean | ❌ | Landscape orientation (default: `false`) |

**For Images (Multipart form-data):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `input_type` | string | ✅ | Must be `"image"` |
| `images` | file(s) | ✅ | One or more PNG or JPEG image files (repeat field for multiple) |
| `options` | string | ❌ | JSON string with options |
| `options.format` | string | ❌ | Page size (default: `"A4"`) |
| `options.margin` | object | ❌ | Margins (default: `10mm` all sides) |
| `options.fit` | string | ❌ | How to fit image: `"contain"` (default), `"cover"`, `"fill"`, `"none"` |
| `options.landscape` | boolean | ❌ | Landscape orientation (default: `false`) |

**Image Limits:**
- Maximum 5MB per image
- Maximum 10MB total payload
- Maximum 10000×10000 pixels per image
- Each image = 1 page in the PDF
- Maximum images per request: Same as page limit (e.g., 100 images in production)

## Response

### Success (200 OK)

You receive the PDF file directly as binary data.

**Headers:**
```http
Content-Type: application/pdf
Content-Disposition: inline; filename="document.pdf"
X-PDF-Pages: 5
X-Job-Id: 9f0a4b78-2c0c-4d14-9b8b-123456789abc
```

:::tip Page Count
The `X-PDF-Pages` header tells you how many pages were generated.
:::

### Timeout (408 Request Timeout)

If generation takes longer than 30 seconds:

```json
{
  "error": {
    "code": "QUICKJOB_TIMEOUT",
    "message": "Job processing exceeded 30-second timeout. Please use /longjob endpoint for larger documents.",
    "details": {
      "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
      "timeout_seconds": 30,
      "suggestion": "use_longjob_endpoint"
    }
  }
}
```

:::warning Timeout? Use LongJob
If you hit the timeout, your document is too large for QuickJob.  
[Use the LongJob endpoint instead →](/api-reference/longjob)
:::

### Error Responses

| Status | Code | Meaning | Solution |
|--------|------|---------|----------|
| 400 | `INVALID_INPUT_TYPE` | Invalid or missing input_type | Use "html", "markdown", or "image" |
| 400 | `MISSING_CONTENT` | Missing html, markdown, or images | Provide content |
| 400 | `PAGE_LIMIT_EXCEEDED` | PDF exceeds max pages | Reduce content or use LongJob |
| 400 | `INVALID_IMAGE_FORMAT` | Image is not PNG or JPEG | Use PNG or JPEG only |
| 400 | `INVALID_IMAGE_DATA` | Image is corrupted or invalid | Check image file |
| 400 | `IMAGE_TOO_LARGE` | Image exceeds 5MB or 10000×10000px | Resize or compress image |
| 400 | `MISSING_IMAGES` | No image files provided | Include at least one image |
| 400 | `INVALID_MULTIPART` | Malformed multipart request | Check Content-Type and form data |
| 401 | `UNAUTHORIZED` | Invalid or missing API key | Check your API key |
| 403 | `ACCOUNT_NOT_FOUND` | Account doesn't exist | Create an account |
| 403 | `CONVERSION_TYPE_NOT_ENABLED` | Conversion type not enabled for plan | Check plan's `enabled_conversion_types` |
| 403 | `RATE_LIMIT_EXCEEDED` | Too many requests | Wait 1 minute (free tier: 20/min) |
| 403 | `QUOTA_EXCEEDED` | Free tier quota used up | [Upgrade to paid plan](/api-reference/plans) |
| 408 | `QUICKJOB_TIMEOUT` | Took too long | Use /longjob instead |
| 429 | `TOO_MANY_REQUESTS` | API throttle limit | Wait and retry |
| 500 | `INTERNAL_SERVER_ERROR` | Server error | Try again later |

## Complete Examples

### Images to PDF (cURL)

```bash
# Single image
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: $PODPDF_API_KEY" \
  -F "input_type=image" \
  -F "images=@photo.jpg" \
  -F 'options={"format":"A4","fit":"contain"}' \
  --output photo.pdf

# Multiple images (photo album)
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: $PODPDF_API_KEY" \
  -F "input_type=image" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg" \
  -F "images=@photo3.jpg" \
  -F 'options={"format":"A4","margin":{"top":"5mm","right":"5mm","bottom":"5mm","left":"5mm"}}' \
  --output album.pdf
```

### Images to PDF (JavaScript)

```javascript
const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function imagesToPDF() {
  const formData = new FormData();
  formData.append('input_type', 'image');
  formData.append('images', fs.createReadStream('photo1.jpg'));
  formData.append('images', fs.createReadStream('photo2.jpg'));
  formData.append('options', JSON.stringify({
    format: 'A4',
    fit: 'contain',
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  }));

  const response = await fetch('https://api.podpdf.com/quickjob', {
    method: 'POST',
    headers: {
      'X-API-Key': process.env.PODPDF_API_KEY,
    },
    body: formData
  });

  if (response.ok) {
    const buffer = await response.buffer();
    fs.writeFileSync('output.pdf', buffer);
    console.log('PDF created successfully!');
  }
}

imagesToPDF();
```

### Images to PDF (Python)

```python
import requests
import os

def images_to_pdf():
    api_key = os.getenv('PODPDF_API_KEY')
    
    files = [
        ('images', ('photo1.jpg', open('photo1.jpg', 'rb'), 'image/jpeg')),
        ('images', ('photo2.jpg', open('photo2.jpg', 'rb'), 'image/jpeg')),
    ]
    
    data = {
        'input_type': 'image',
        'options': '{"format":"A4","fit":"contain"}'
    }
    
    response = requests.post(
        'https://api.podpdf.com/quickjob',
        headers={'X-API-Key': api_key},
        files=files,
        data=data
    )
    
    if response.status_code == 200:
        with open('output.pdf', 'wb') as f:
            f.write(response.content)
        print('PDF created successfully!')

images_to_pdf()
```

### JavaScript (Node.js)

```javascript
const fetch = require('node-fetch');
const fs = require('fs');

async function generatePDF() {
  const response = await fetch('https://api.podpdf.com/quickjob', {
    method: 'POST',
    headers: {
      'X-API-Key': process.env.PODPDF_API_KEY, // Use environment variable
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input_type: 'html',
      html: '<h1>Hello World</h1><p>My first PDF!</p>'
    })
  });

  if (response.ok) {
    const buffer = await response.buffer();
    fs.writeFileSync('output.pdf', buffer);
    console.log('PDF created successfully!');
  } else {
    console.error('Error:', await response.json());
  }
}

generatePDF();
```

### Python

```python
import requests
import os

def generate_pdf():
    api_key = os.getenv('PODPDF_API_KEY')  # Use environment variable
    
    response = requests.post(
        'https://api.podpdf.com/quickjob',
        headers={
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        },
        json={
            'input_type': 'html',
            'html': '<h1>Hello World</h1><p>My first PDF!</p>'
        }
    )
    
    if response.status_code == 200:
        with open('output.pdf', 'wb') as f:
            f.write(response.content)
        print('PDF created successfully!')
    else:
        print('Error:', response.json())

generate_pdf()
```

### cURL

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Hello World</h1><p>My first PDF!</p>"
  }' \
  --output output.pdf
```

### PHP

```php
<?php
$apiKey = getenv('PODPDF_API_KEY');

$data = array(
    'input_type' => 'html',
    'html' => '<h1>Hello World</h1><p>My first PDF!</p>'
);

$ch = curl_init('https://api.podpdf.com/quickjob');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'X-API-Key: ' . $apiKey,
    'Content-Type: application/json'
));
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode == 200) {
    file_put_contents('output.pdf', $response);
    echo "PDF created successfully!";
} else {
    echo "Error: " . $response;
}
?>
```

## Tips & Best Practices

### ✅ DO:
- Keep HTML under 5MB for best performance
- Include all CSS inline in your HTML
- Test with small documents first
- Use quickjob for simple documents (up to 25 pages or 25 images maximum)
- Handle timeout errors gracefully
- Store API keys in environment variables
- **Images:** Use PNG or JPEG format, keep under 5MB each
- **Images:** Each image becomes one page (great for photo albums)

### ❌ DON'T:
- Don't use external CSS/JS links (they won't load)
- Don't generate large reports with quickjob
- Don't forget to check the X-PDF-Pages header
- Don't ignore timeout responses
- Don't hardcode API keys in your code
- **Images:** Don't use unsupported formats (GIF, WebP, etc.)
- **Images:** Don't exceed 10000×10000 pixel dimensions

## Image Fit Options

When converting images to PDF, you can control how images fit on the page:

- **`contain`** (default) - Fit entire image on page, maintain aspect ratio
- **`cover`** - Fill entire page, may crop image
- **`fill`** - Stretch to fill (may distort)
- **`none`** - Use natural image size

Example:
```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: $PODPDF_API_KEY" \
  -F "input_type=image" \
  -F "images=@photo.jpg" \
  -F 'options={"fit":"cover"}' \
  --output photo.pdf
```

## Limits

| Limit | Free Tier | Paid Plan |
|-------|-----------|-----------|
| Rate Limit | 20 req/min | Unlimited |
| Quota | 100 PDFs total | Unlimited |
| Max Pages | 100 pages | 100 pages |
| Max Input Size | ~5 MB | ~5 MB |
| Timeout | 30 seconds | 30 seconds |

:::tip Need More?
[Upgrade to unlimited PDFs →](/api-reference/plans)
:::

## Next Steps

- [Try Async Generation →](/api-reference/longjob)
- [Check Job Status →](/api-reference/jobs)
- [View Your Account →](/api-reference/accounts)
- [See More Examples →](/examples/curl-examples)
