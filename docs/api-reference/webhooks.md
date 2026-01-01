---
sidebar_position: 8
---

# Webhooks

Receive notifications when jobs complete, fail, or change status.

## Overview

Configure webhooks to receive real-time notifications about your PDF generation jobs. The webhook system supports:

- **Multiple webhooks** per user (plan-based limits) - Create different webhooks for different purposes (production, staging, monitoring, etc.)
- **Event-based subscriptions** - Subscribe only to events you care about (e.g., only `job.completed` or `job.failed`)
- **Delivery tracking** - View delivery history, success/failure counts, and statistics
- **Activation control** - Enable/disable webhooks as needed (`is_active` field)
- **Status monitoring** - Track last triggered time, last success, and last failure for each webhook

## Multiple Webhooks Support

You can create **multiple webhooks** for different purposes:

- **Production webhook** - For live job notifications
- **Staging webhook** - For testing and development
- **Monitoring webhook** - For alerts and logging
- **Different events** - Separate webhooks for different event types

Each webhook can subscribe to different events and have its own URL, allowing you to route notifications to different endpoints based on your needs.

## Plan-Based Limits

Maximum webhooks per user is determined by their plan:

- **Free tier plans:** 1 webhook
- **Paid tier plans:** 5 webhooks (default)
- **Enterprise tier plans:** 50 webhooks (or unlimited if `max_webhooks` is `null`)

The limit is configured in your plan's `max_webhooks` field. If you reach the limit, creating a new webhook returns `403 Forbidden` with error code `WEBHOOK_LIMIT_EXCEEDED`, including details:
- `plan_id` - Your current plan ID
- `plan_type` - Plan type (free/paid)
- `current_count` - Number of webhooks you currently have
- `max_allowed` - Maximum webhooks allowed for your plan
- `upgrade_required` - Whether you need to upgrade to get more webhooks

## Event Types

You can subscribe to the following events:

| Event | Description | When Triggered |
|-------|-------------|----------------|
| `job.completed` | Job successfully completed | Long job finishes PDF generation |
| `job.failed` | Job failed during processing | PDF generation error, Chromium crash, etc. |
| `job.timeout` | Quick job exceeded timeout | Quick job takes longer than 30 seconds |
| `job.queued` | Job queued for processing | Long job submitted and queued |
| `job.processing` | Job started processing | Long job extracted from queue and processing |

## Quick Start

### 1. Create a Webhook

```bash
curl -X POST https://api.podpdf.com/accounts/me/webhooks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Webhook",
    "url": "https://api.example.com/webhooks/podpdf",
    "events": ["job.completed", "job.failed"],
    "is_active": true
  }'
```

**Response:**
```json
{
  "webhook_id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
  "name": "Production Webhook",
  "url": "https://api.example.com/webhooks/podpdf",
  "events": ["job.completed", "job.failed"],
  "is_active": true,
  "created_at": "2025-12-24T10:00:00Z",
  "updated_at": "2025-12-24T10:00:00Z",
  "last_triggered_at": null,
  "success_count": 0,
  "failure_count": 0,
  "last_success_at": null,
  "last_failure_at": null
}
```

**Webhook Status Fields:**
- `is_active` (boolean) - Whether webhook is active. Inactive webhooks are not called.
- `success_count` (number) - Total successful deliveries (starts at 0)
- `failure_count` (number) - Total failed deliveries (starts at 0)
- `last_triggered_at` (string|null) - ISO 8601 timestamp when webhook was last triggered (null if never triggered)
- `last_success_at` (string|null) - ISO 8601 timestamp of last successful delivery (null if no successes)
- `last_failure_at` (string|null) - ISO 8601 timestamp of last failed delivery (null if no failures)

### 2. Receive Webhook Notifications

When a job completes, you'll receive a POST request to your webhook URL:

**Headers:**
```http
Content-Type: application/json
User-Agent: PodPDF-Webhook/1.0
X-Webhook-Event: job.completed
X-Webhook-Id: 01ARZ3NDEKTSV4RRFFQ69G5FAV
X-Webhook-Delivery-Id: 01ARZ3NDEKTSV4RRFFQ69G5FAY
X-Webhook-Timestamp: 2025-12-21T10:32:15Z
```

**Payload (job.completed):**
```json
{
  "event": "job.completed",
  "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
  "status": "completed",
  "job_type": "long",
  "mode": "html",
  "pages": 150,
  "truncated": false,
  "s3_url": "https://s3.amazonaws.com/podpdf-dev-pdfs/9f0a4b78-2c0c-4d14-9b8b-123456789abc.pdf?X-Amz-Signature=...",
  "s3_url_expires_at": "2025-12-21T11:32:15Z",
  "created_at": "2025-12-21T10:30:00Z",
  "completed_at": "2025-12-21T10:32:15Z",
  "timestamp": "2025-12-21T10:32:15Z"
}
```

### 3. Respond to Webhook

Your endpoint should return `200 OK` to confirm receipt:

```javascript
// Express.js example
app.post('/webhooks/podpdf', (req, res) => {
  const event = req.headers['x-webhook-event'];
  const deliveryId = req.headers['x-webhook-delivery-id'];
  
  // Process webhook asynchronously
  processWebhook(req.body, deliveryId);
  
  // Return 200 immediately
  res.status(200).json({ received: true });
});
```

## API Endpoints

### Create Webhook

**`POST /accounts/me/webhooks`**

Create a new webhook configuration.

**Request:**
```json
{
  "name": "Production Webhook",
  "url": "https://api.example.com/webhooks/podpdf",
  "events": ["job.completed", "job.failed"],
  "is_active": true
}
```

**Fields:**
- `name` (string, optional) - Descriptive name for the webhook
- `url` (string, required) - HTTPS URL for webhook endpoint (1-2048 characters)
- `events` (array, optional) - Event types to subscribe to. Default: `["job.completed"]`
  - Valid values: `job.completed`, `job.failed`, `job.timeout`, `job.queued`, `job.processing`
- `is_active` (boolean, optional) - Whether webhook is active (default: `true`)

### List Webhooks

**`GET /accounts/me/webhooks`**

List all webhooks for your account. Returns webhooks with full status information.

**Query Parameters:**
- `is_active` (boolean, optional) - Filter by active status (`true` or `false`)
- `event` (string, optional) - Filter webhooks that subscribe to this event type
  - Valid values: `job.completed`, `job.failed`, `job.timeout`, `job.queued`, `job.processing`
- `limit` (number, optional) - Maximum results (default: 50, max: 100)
- `next_token` (string, optional) - Pagination token from previous response

**Response:**
```json
{
  "webhooks": [
    {
      "webhook_id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
      "name": "Production Webhook",
      "url": "https://api.example.com/webhooks/podpdf",
      "events": ["job.completed", "job.failed"],
      "is_active": true,
      "created_at": "2025-12-24T10:00:00Z",
      "updated_at": "2025-12-24T10:00:00Z",
      "last_triggered_at": "2025-12-24T15:30:00Z",
      "success_count": 150,
      "failure_count": 2,
      "last_success_at": "2025-12-24T15:30:00Z",
      "last_failure_at": "2025-12-24T14:20:00Z"
    }
  ],
  "count": 1,
  "next_token": null
}
```

### Get Webhook

**`GET /accounts/me/webhooks/{webhook_id}`**

Get details of a specific webhook, including all status fields.

**Response:**
```json
{
  "webhook": {
    "webhook_id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "name": "Production Webhook",
    "url": "https://api.example.com/webhooks/podpdf",
    "events": ["job.completed", "job.failed"],
    "is_active": true,
    "created_at": "2025-12-24T10:00:00Z",
    "updated_at": "2025-12-24T10:00:00Z",
    "last_triggered_at": "2025-12-24T15:30:00Z",
    "success_count": 150,
    "failure_count": 2,
    "last_success_at": "2025-12-24T15:30:00Z",
    "last_failure_at": "2025-12-24T14:20:00Z"
  }
}
```

### Update Webhook

**`PUT /accounts/me/webhooks/{webhook_id}`**

Update an existing webhook configuration. All fields are optional - only provided fields are updated.

**Request:**
```json
{
  "name": "Updated Webhook",
  "url": "https://api.example.com/webhooks/podpdf-v2",
  "events": ["job.completed"],
  "is_active": true
}
```

**Fields:**
- `name` (string, optional) - Update webhook name
- `url` (string, optional) - Update webhook URL (must be HTTPS, 1-2048 characters)
- `events` (array, optional) - Update subscribed events
- `is_active` (boolean, optional) - Update active status. Set to `false` to temporarily disable webhook without deleting it.

**Response:**
```json
{
  "webhook_id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
  "name": "Updated Webhook",
  "url": "https://api.example.com/webhooks/podpdf-v2",
  "events": ["job.completed"],
  "is_active": true,
  "created_at": "2025-12-24T10:00:00Z",
  "updated_at": "2025-12-24T16:00:00Z",
  "success_count": 150,
  "failure_count": 2
}
```

:::tip Disable Without Deleting
Set `is_active: false` to temporarily disable a webhook. Inactive webhooks are not called, but their configuration and statistics are preserved. You can re-enable them later by setting `is_active: true`.
:::

### Delete Webhook

**`DELETE /accounts/me/webhooks/{webhook_id}`**

Delete a webhook configuration.

### Get Webhook History

**`GET /accounts/me/webhooks/{webhook_id}/history`**

Get delivery history for a webhook. History records are automatically deleted after 90 days (TTL).

**Query Parameters:**
- `status` (string, optional) - Filter by delivery status
  - Valid values: `success`, `failed`, `timeout`
- `event_type` (string, optional) - Filter by event type
  - Valid values: `job.completed`, `job.failed`, `job.timeout`, `job.queued`, `job.processing`
- `limit` (number, optional) - Maximum results (default: 50, max: 100)
- `next_token` (string, optional) - Pagination token from previous response

**Response:**
```json
{
  "history": [
    {
      "delivery_id": "01ARZ3NDEKTSV4RRFFQ69G5FAY",
      "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
      "event_type": "job.completed",
      "status": "success",
      "status_code": 200,
      "retry_count": 0,
      "delivered_at": "2025-12-24T15:30:00Z",
      "duration_ms": 245,
      "payload_size_bytes": 1024
    },
    {
      "delivery_id": "01ARZ3NDEKTSV4RRFFQ69G5FAZ",
      "job_id": "8e1b5c89-3d1d-5e25-ac9c-234567890def",
      "event_type": "job.completed",
      "status": "failed",
      "status_code": 500,
      "error_message": "HTTP 500",
      "retry_count": 3,
      "delivered_at": "2025-12-24T14:20:00Z",
      "duration_ms": 7500,
      "payload_size_bytes": 1024
    }
  ],
  "count": 2,
  "next_token": null
}
```

**Delivery History Fields:**
- `delivery_id` (string) - Unique delivery identifier (ULID) - use for idempotency
- `job_id` (string) - Job ID that triggered this webhook
- `event_type` (string) - Event type that triggered webhook
- `status` (string) - Delivery status: `success`, `failed`, or `timeout`
- `status_code` (number, optional) - HTTP status code from webhook endpoint
- `error_message` (string, optional) - Error message if delivery failed
- `retry_count` (number) - Number of retry attempts (0-3)
- `delivered_at` (string) - ISO 8601 timestamp when delivery completed
- `duration_ms` (number) - Total delivery duration in milliseconds
- `payload_size_bytes` (number) - Size of webhook payload in bytes

## Webhook Payloads

### job.completed

Triggered when a long job successfully completes.

```json
{
  "event": "job.completed",
  "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
  "status": "completed",
  "job_type": "long",
  "mode": "html",
  "pages": 150,
  "truncated": false,
  "s3_url": "https://s3.amazonaws.com/podpdf-dev-pdfs/9f0a4b78-2c0c-4d14-9b8b-123456789abc.pdf?X-Amz-Signature=...",
  "s3_url_expires_at": "2025-12-21T11:32:15Z",
  "created_at": "2025-12-21T10:30:00Z",
  "completed_at": "2025-12-21T10:32:15Z",
  "timestamp": "2025-12-21T10:32:15Z"
}
```

### job.failed

Triggered when a job fails during processing.

```json
{
  "event": "job.failed",
  "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
  "status": "failed",
  "job_type": "long",
  "mode": "html",
  "error_message": "PDF generation failed: Chromium process crashed",
  "created_at": "2025-12-21T10:30:00Z",
  "failed_at": "2025-12-21T10:32:15Z",
  "timestamp": "2025-12-21T10:32:15Z"
}
```

### job.timeout

Triggered when a quick job exceeds 30-second timeout.

```json
{
  "event": "job.timeout",
  "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
  "status": "timeout",
  "job_type": "quick",
  "mode": "html",
  "timeout_seconds": 30,
  "created_at": "2025-12-21T10:30:00Z",
  "timeout_at": "2025-12-21T10:30:30Z",
  "timestamp": "2025-12-21T10:30:30Z"
}
```

### job.queued

Triggered when a long job is queued for processing.

```json
{
  "event": "job.queued",
  "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
  "status": "queued",
  "job_type": "long",
  "mode": "html",
  "created_at": "2025-12-21T10:30:00Z",
  "timestamp": "2025-12-21T10:30:00Z"
}
```

### job.processing

Triggered when a long job starts processing.

```json
{
  "event": "job.processing",
  "job_id": "9f0a4b78-2c0c-4d14-9b8b-123456789abc",
  "status": "processing",
  "job_type": "long",
  "mode": "html",
  "created_at": "2025-12-21T10:30:00Z",
  "started_at": "2025-12-21T10:30:05Z",
  "timestamp": "2025-12-21T10:30:05Z"
}
```

## Webhook Delivery

### Retry Logic

- **3 retries** with exponential backoff (1s, 2s, 4s)
- Retries on:
  - Network errors
  - Timeout (10 seconds)
  - HTTP 5xx errors
  - HTTP 429 (Too Many Requests)
- Does NOT retry on:
  - HTTP 2xx (success)
  - HTTP 4xx (client errors, except 429)

### Delivery Guarantees

- **At-least-once delivery:** Webhooks may be delivered multiple times
- **Best-effort delivery:** Failed webhooks are retried, but delivery is not guaranteed if all retries fail
- **Ordering:** Webhooks are delivered in event order, but delivery order is not guaranteed across different webhooks
- **Idempotency:** Use `delivery_id` from `X-Webhook-Delivery-Id` header to deduplicate

### Webhook Receiver Best Practices

1. **Validate payload structure** - Check required fields and types
2. **Use delivery_id for idempotency** - Store `X-Webhook-Delivery-Id` to prevent duplicate processing
3. **Return 200 OK quickly** - Process webhook asynchronously if needed
4. **Handle all event types** - Even if you only subscribe to some events
5. **Log all deliveries** - For debugging and monitoring

## Webhook Status Fields

Each webhook includes status tracking fields:

| Field | Type | Description |
|-------|------|-------------|
| `is_active` | boolean | Whether webhook is active. Inactive webhooks are not called. |
| `success_count` | number | Total successful deliveries (starts at 0, increments on each success) |
| `failure_count` | number | Total failed deliveries (starts at 0, increments on each failure after all retries) |
| `last_triggered_at` | string\|null | ISO 8601 timestamp when webhook was last triggered (null if never triggered) |
| `last_success_at` | string\|null | ISO 8601 timestamp of last successful delivery (null if no successes) |
| `last_failure_at` | string\|null | ISO 8601 timestamp of last failed delivery (null if no failures) |

## Delivery Status

Webhook delivery history includes status information:

| Status | Description |
|--------|-------------|
| `success` | Webhook was successfully delivered (HTTP 2xx response) |
| `failed` | Webhook delivery failed after all retries (HTTP 4xx/5xx, network error, timeout) |
| `timeout` | Webhook delivery timed out (10 second timeout) |

## Error Responses

| Status | Error Code | Description |
|--------|------------|-------------|
| `400 Bad Request` | `INVALID_WEBHOOK_URL` | URL must be HTTPS (1-2048 characters) |
| `400 Bad Request` | `INVALID_EVENTS` | Invalid event type or empty events array |
| `401 Unauthorized` | - | Missing or invalid JWT token |
| `403 Forbidden` | `ACCOUNT_NOT_FOUND` | User account not found |
| `403 Forbidden` | `WEBHOOK_LIMIT_EXCEEDED` | Maximum webhooks reached for plan (includes plan details) |
| `403 Forbidden` | `WEBHOOK_ACCESS_DENIED` | Webhook belongs to different user |
| `404 Not Found` | `WEBHOOK_NOT_FOUND` | Webhook not found |
| `500 Internal Server Error` | - | Server-side failure |

## Examples

### JavaScript (Express.js)

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Store processed delivery IDs to prevent duplicates
const processedDeliveries = new Set();

app.post('/webhooks/podpdf', (req, res) => {
  const deliveryId = req.headers['x-webhook-delivery-id'];
  const event = req.headers['x-webhook-event'];
  
  // Idempotency check
  if (processedDeliveries.has(deliveryId)) {
    return res.status(200).json({ received: true, duplicate: true });
  }
  
  // Process webhook asynchronously
  processWebhook(req.body, event, deliveryId)
    .then(() => {
      processedDeliveries.add(deliveryId);
    })
    .catch(err => {
      console.error('Webhook processing error:', err);
    });
  
  // Return 200 immediately
  res.status(200).json({ received: true });
});

async function processWebhook(payload, event, deliveryId) {
  switch (event) {
    case 'job.completed':
      console.log('Job completed:', payload.job_id);
      console.log('PDF URL:', payload.s3_url);
      // Download PDF, update database, etc.
      break;
    case 'job.failed':
      console.log('Job failed:', payload.job_id);
      console.log('Error:', payload.error_message);
      // Log error, notify user, etc.
      break;
    // Handle other events...
  }
}

app.listen(3000);
```

### Python (Flask)

```python
from flask import Flask, request, jsonify
import hashlib

app = Flask(__name__)
processed_deliveries = set()

@app.route('/webhooks/podpdf', methods=['POST'])
def webhook():
    delivery_id = request.headers.get('X-Webhook-Delivery-Id')
    event = request.headers.get('X-Webhook-Event')
    payload = request.json
    
    # Idempotency check
    if delivery_id in processed_deliveries:
        return jsonify({'received': True, 'duplicate': True}), 200
    
    # Process webhook asynchronously
    process_webhook(payload, event, delivery_id)
    
    return jsonify({'received': True}), 200

def process_webhook(payload, event, delivery_id):
    if event == 'job.completed':
        print(f"Job completed: {payload['job_id']}")
        print(f"PDF URL: {payload['s3_url']}")
        # Download PDF, update database, etc.
    elif event == 'job.failed':
        print(f"Job failed: {payload['job_id']}")
        print(f"Error: {payload['error_message']}")
        # Log error, notify user, etc.
    
    processed_deliveries.add(delivery_id)

if __name__ == '__main__':
    app.run(port=3000)
```

## Need Help?

- [API Reference →](/api-reference/quickjob)
- [Error Handling →](/guides/error-handling)
- [Getting Started Guide →](/guides/getting-started)
