---
sidebar_position: 2
---

# Quick Start

Minimal examples to get you started fast.

## Generate PDF from HTML

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"html","html":"<h1>Hello</h1>"}' \
  --output output.pdf
```

## Generate PDF from Markdown

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"markdown","markdown":"# Hello\n\nWorld"}' \
  --output output.pdf
```

## Generate PDF from Images

```bash
# Single image
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo.jpg" \
  --output photo.pdf

# Multiple images
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -F "input_type=image" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg" \
  -F 'options={"format":"A4","fit":"contain"}' \
  --output album.pdf
```

## With Custom Options

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "html",
    "html": "<h1>Custom PDF</h1>",
    "options": {
      "format": "A4",
      "margin": {"top":"20mm","right":"20mm","bottom":"20mm","left":"20mm"},
      "landscape": false
    }
  }' \
  --output custom.pdf
```

## Using Environment Variables

```bash
# Set your API key
export PODPDF_API_KEY="your_api_key_here"

# Use it in requests
curl -X POST https://api.podpdf.com/quickjob \
  -H "X-API-Key: $PODPDF_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"html","html":"<h1>Hello</h1>"}' \
  --output output.pdf
```

[More examples →](/examples/curl-examples)
