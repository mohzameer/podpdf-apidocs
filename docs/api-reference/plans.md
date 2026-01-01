---
sidebar_position: 5
---

# Plans & Pricing

View available plans and pricing information.

## Endpoints

- `GET /plans` - List all active plans
- `GET /plans/{plan_id}` - Get details for a specific plan

## List All Plans

**`GET /plans`**

Get a list of all active plans.

**Example Request:**
```bash
curl -X GET https://api.podpdf.com/plans
```

**Example Response:**
```json
{
  "plans": [
    {
      "plan_id": "free-basic",
      "name": "Free Basic",
      "type": "free",
      "monthly_quota": 50,
      "price_per_pdf": 0,
      "rate_limit_per_minute": 20,
      "enabled_conversion_types": ["html"],
      "max_webhooks": 1,
      "description": "Free tier with 50 PDFs all-time quota (not monthly - cumulative, does not reset). Rate limit: 20 requests per minute.",
      "is_active": true
    },
    {
      "plan_id": "paid-standard",
      "name": "Paid Standard",
      "type": "paid",
      "monthly_quota": null,
      "price_per_pdf": 0.01,
      "rate_limit_per_minute": null,
      "enabled_conversion_types": ["html", "markdown"],
      "max_webhooks": 5,
      "description": "Paid plan with unlimited PDFs. Price: $0.01 per PDF. Unlimited rate limit.",
      "is_active": true
    }
  ],
  "count": 2
}
```

## Get Specific Plan

**`GET /plans/{plan_id}`**

Get details for a specific plan.

**Example Request:**
```bash
curl -X GET https://api.podpdf.com/plans/free-basic
```

**Example Response:**
```json
{
  "plan": {
    "plan_id": "free-basic",
    "name": "Free Basic",
    "type": "free",
    "monthly_quota": 50,
    "price_per_pdf": 0,
    "rate_limit_per_minute": 20,
    "enabled_conversion_types": ["html"],
    "max_webhooks": 1,
    "description": "Free tier with 50 PDFs all-time quota (not monthly - cumulative, does not reset). Rate limit: 20 requests per minute.",
    "is_active": true
  }
}
```

## Plan Fields

| Field | Type | Description |
|-------|------|-------------|
| `plan_id` | string | Unique plan identifier (e.g., `"free-basic"`, `"paid-standard"`) |
| `name` | string | Human-readable plan name |
| `type` | string | Plan type: `"free"` or `"paid"` |
| `monthly_quota` | number\|null | Number of PDFs included per month for free plans. `null` for unlimited paid plans. |
| `price_per_pdf` | number | Price per PDF in USD. `0` for free plans. |
| `rate_limit_per_minute` | number\|null | Per-user rate limit in requests per minute. `null` for unlimited. |
| `enabled_conversion_types` | array\|null | List of conversion types enabled for this plan. Valid values: `"html"`, `"markdown"`, `"image"`. If `null` or not specified, all conversion types are enabled (backward compatible). |
| `max_webhooks` | number\|null | Maximum number of webhooks allowed for this plan. Defaults to `1` for free plans and `5` for paid plans if not specified. `null` indicates unlimited (for enterprise plans). |
| `description` | string\|null | Plan description |
| `is_active` | boolean | Whether the plan is active and available |

## Conversion Types

The `enabled_conversion_types` field determines which input types you can use:

- **`html`** - Convert HTML to PDF
- **`markdown`** - Convert Markdown to PDF
- **`image`** - Convert images (PNG/JPEG) to PDF

If your plan has `enabled_conversion_types` configured, you can only use the conversion types listed. If the field is `null` or not specified, all conversion types are enabled.

**Example:**
- Free plan with `enabled_conversion_types: ["html"]` - Can only use HTML input
- Paid plan with `enabled_conversion_types: ["html", "markdown"]` - Can use HTML and Markdown, but not images
- Plan with `enabled_conversion_types: null` - Can use all conversion types (HTML, Markdown, and images)

If you try to use a conversion type that's not enabled for your plan, you'll receive a `403 Forbidden` error with code `CONVERSION_TYPE_NOT_ENABLED`.

## Webhook Limits

The `max_webhooks` field determines how many webhooks you can create:

- **Free tier plans:** Typically 1 webhook
- **Paid tier plans:** Typically 5 webhooks
- **Enterprise tier plans:** Unlimited (null)

If you reach your webhook limit, creating a new webhook returns `403 Forbidden` with error code `WEBHOOK_LIMIT_EXCEEDED`.

## Usage Notes

- **Public Endpoint:** This endpoint does not require authentication. Plan details are public information.
- **Active Plans Only:** The list endpoint (`GET /plans`) only returns plans where `is_active` is `true`.
- **Sorting:** Plans are sorted by type (free plans first) then alphabetically by name.
- **Null Values:** Some fields may be `null`:
  - `monthly_quota`: `null` for paid plans (unlimited)
  - `rate_limit_per_minute`: `null` for paid plans (unlimited) or plans without rate limits
  - `max_webhooks`: `null` for enterprise plans (unlimited)
  - `enabled_conversion_types`: `null` means all conversion types are enabled
  - `description`: `null` if no description is set

## Error Responses

| Status | Error Code | Description |
|--------|------------|-------------|
| `404 Not Found` | `NOT_FOUND` | Plan not found (for specific plan endpoint) |
| `500 Internal Server Error` | - | Server-side failure |

## Examples

### JavaScript

```javascript
// List all plans
const response = await fetch('https://api.podpdf.com/plans');
const data = await response.json();
console.log('Available plans:', data.plans);

// Get specific plan
const planResponse = await fetch('https://api.podpdf.com/plans/free-basic');
const planData = await planResponse.json();
console.log('Plan details:', planData.plan);
```

### Python

```python
import requests

# List all plans
response = requests.get('https://api.podpdf.com/plans')
plans = response.json()
print('Available plans:', plans['plans'])

# Get specific plan
plan_response = requests.get('https://api.podpdf.com/plans/free-basic')
plan = plan_response.json()
print('Plan details:', plan['plan'])
```

## Need Help?

- [API Reference →](/api-reference/quickjob)
- [Account Management →](/api-reference/accounts)
- [Webhooks →](/api-reference/webhooks)
