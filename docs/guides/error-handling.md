---
sidebar_position: 3
---

# Error Handling

How to handle errors and troubleshoot issues.

## Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 401 | Unauthorized | Check your token |
| 403 | Forbidden | Check quota or account |
| 429 | Too many requests | Wait and retry |
| 500 | Server error | Try again later |

## Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

[Full API Reference →](/api-reference/quickjob)

