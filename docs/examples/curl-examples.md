---
sidebar_position: 1
---

# cURL Examples

Copy-paste ready cURL examples for common use cases.

## Basic Examples

### Generate PDF from HTML

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Hello World</h1><p>This is a test PDF.</p>"
  }' \
  --output hello.pdf
```

### Generate PDF from Markdown

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "markdown",
    "markdown": "# Hello World\n\nThis is **bold** and this is *italic*."
  }' \
  --output markdown.pdf
```

### Generate PDF from Images

```bash
# Single image
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo.jpg" \
  --output photo.pdf

# Multiple images (photo album)
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg" \
  -F "images=@photo3.jpg" \
  --output album.pdf
```

## Business Documents

### Invoice

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<!DOCTYPE html><html><head><style>body{font-family:Arial;padding:40px;max-width:800px;margin:0 auto}.header{border-bottom:2px solid #333;padding-bottom:20px;margin-bottom:30px}.header h1{margin:0;font-size:36px}.invoice-meta{text-align:right;color:#666}.bill-to{margin:30px 0}.items{width:100%;border-collapse:collapse;margin:30px 0}.items th{background:#f5f5f5;padding:10px;text-align:left;border-bottom:2px solid #ddd}.items td{padding:10px;border-bottom:1px solid #eee}.total{text-align:right;font-size:24px;font-weight:bold;margin-top:30px;padding-top:20px;border-top:2px solid #333}</style></head><body><div class=\"header\"><h1>INVOICE</h1><div class=\"invoice-meta\"><strong>Invoice #:</strong> INV-001<br><strong>Date:</strong> Dec 29, 2025<br><strong>Due Date:</strong> Jan 28, 2026</div></div><div class=\"bill-to\"><strong>Bill To:</strong><br>John Doe<br>Acme Corporation<br>123 Business St<br>City, ST 12345</div><table class=\"items\"><tr><th>Description</th><th>Quantity</th><th>Rate</th><th>Amount</th></tr><tr><td>Web Development Services</td><td>40 hrs</td><td>$100/hr</td><td>$4,000.00</td></tr><tr><td>Hosting (Annual)</td><td>1</td><td>$500</td><td>$500.00</td></tr></table><div class=\"total\">Total: $4,500.00</div></body></html>"
  }' \
  --output invoice.pdf
```

### Receipt

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<!DOCTYPE html><html><head><style>body{font-family:monospace;padding:20px;max-width:400px;margin:0 auto}.header{text-align:center;border-bottom:2px dashed #333;padding-bottom:10px;margin-bottom:20px}.item{display:flex;justify-content:space-between;margin:5px 0}.total{border-top:2px solid #333;margin-top:20px;padding-top:10px;font-weight:bold}</style></head><body><div class=\"header\"><h2>RECEIPT</h2><p>Thank you for your purchase!</p></div><div class=\"item\"><span>Coffee</span><span>$4.50</span></div><div class=\"item\"><span>Croissant</span><span>$3.00</span></div><div class=\"item\"><span>Tax</span><span>$0.60</span></div><div class=\"total\"><div class=\"item\"><span>TOTAL</span><span>$8.10</span></div></div><p style=\"text-align:center;margin-top:30px;color:#666\">Receipt #12345<br>Dec 29, 2025 10:30 AM</p></body></html>"
  }' \
  --output receipt.pdf
```

## Custom Formatting

### A4 with Custom Margins

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Custom Margins</h1><p>This PDF has custom margins.</p>",
    "options": {
      "format": "A4",
      "margin": {
        "top": "30mm",
        "right": "25mm",
        "bottom": "30mm",
        "left": "25mm"
      }
    }
  }' \
  --output custom-margins.pdf
```

### Letter Size Landscape

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Landscape Document</h1><p>This is in landscape orientation.</p>",
    "options": {
      "format": "Letter",
      "landscape": true,
      "margin": {
        "top": "20mm",
        "right": "20mm",
        "bottom": "20mm",
        "left": "20mm"
      }
    }
  }' \
  --output landscape.pdf
```

### With Background Graphics

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<!DOCTYPE html><html><head><style>body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:50px;font-family:Arial}</style></head><body><h1>Styled PDF</h1><p>This PDF has background colors!</p></body></html>",
    "options": {
      "printBackground": true
    }
  }' \
  --output styled.pdf
```

## Image Examples

### Images with Custom Fit Options

```bash
# Contain (default) - Fit entire image, maintain aspect ratio
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo.jpg" \
  -F 'options={"format":"A4","fit":"contain"}' \
  --output contained.pdf

# Cover - Fill entire page, may crop
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo.jpg" \
  -F 'options={"format":"A4","fit":"cover"}' \
  --output covered.pdf

# None - Use natural image size
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo.jpg" \
  -F 'options={"format":"A4","fit":"none"}' \
  --output natural.pdf
```

### Images with Custom Margins

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg" \
  -F 'options={"format":"A4","margin":{"top":"5mm","right":"5mm","bottom":"5mm","left":"5mm"},"fit":"contain"}' \
  --output album-margins.pdf
```

### Landscape Images

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@landscape-photo.jpg" \
  -F 'options={"format":"A4","landscape":true,"fit":"contain"}' \
  --output landscape-photo.pdf
```

## Using Environment Variables

### Set API Key Once

```bash
# Linux/Mac
export PODPDF_API_KEY="your_api_key_here"

# Windows (Command Prompt)
set PODPDF_API_KEY=your_api_key_here

# Windows (PowerShell)
$env:PODPDF_API_KEY="your_api_key_here"
```

### Use in Requests

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: $PODPDF_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"html","html":"<h1>Using env var</h1>"}' \
  --output output.pdf
```

## Error Handling

### Check Response Status

```bash
curl -w "\nHTTP Status: %{http_code}\n" \
  -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"html","html":"<h1>Test</h1>"}' \
  --output test.pdf
```

### Save Error Response

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"invalid"}' \
  > error-response.json 2>&1
  
cat error-response.json
```

## Need Help?

- [API Reference →](/api-reference/quickjob)
- [Error Handling →](/guides/error-handling)
- [Getting Started Guide →](/guides/getting-started)
- [API Key Management →](/authentication)
