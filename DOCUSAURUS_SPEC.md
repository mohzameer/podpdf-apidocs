# Docusaurus API Documentation Specification

## Overview
This document outlines the specification for converting the PodPDF API documentation from `ENDPOINTS.md` to a Docusaurus-based documentation site.

## Project Structure

```
podpdf-apidocs/
├── docusaurus.config.js          # Docusaurus configuration
├── package.json                   # Dependencies and scripts
├── sidebars.js                    # Sidebar navigation configuration
├── README.md                      # Project README
├── docs/                          # Documentation pages
│   ├── intro.md                  # Introduction/Getting Started
│   ├── authentication.md         # Authentication guide
│   ├── api-reference/            # API endpoint documentation
│   │   ├── quickjob.md
│   │   ├── longjob.md
│   │   ├── jobs.md
│   │   ├── accounts.md
│   │   ├── plans.md
│   │   ├── billing.md
│   │   ├── auth-endpoints.md
│   │   └── webhooks.md
│   ├── guides/                   # How-to guides
│   │   ├── getting-started.md
│   │   ├── quick-start.md
│   │   └── error-handling.md
│   └── examples/                 # Code examples
│       ├── curl-examples.md
│       └── sdk-examples.md
├── src/                           # Custom React components (optional)
│   ├── components/
│   │   ├── ApiEndpoint.jsx       # Reusable endpoint component
│   │   ├── CodeBlock.jsx         # Enhanced code blocks
│   │   └── StatusBadge.jsx       # HTTP status code badges
│   └── css/
│       └── custom.css            # Custom styling
└── static/                        # Static assets
    └── img/
        └── logo.svg
```

## Content Organization

### 1. Main Documentation Pages

#### `docs/intro.md`
- Overview of PodPDF API
- Key features
- Quick links to important sections
- Architecture overview (API Gateway + Lambda)

#### `docs/authentication.md`
- JWT Bearer Token authentication
- How to obtain tokens
- Token refresh flow
- Account creation flow (Cognito Post Confirmation)

### 2. API Reference Pages

#### `docs/api-reference/quickjob.md`
- Endpoint: `POST /quickjob`
- Description, authentication, request/response
- Use Docusaurus tabs for HTML/Markdown examples
- Validation rules
- Error responses

#### `docs/api-reference/longjob.md`
- Endpoint: `POST /longjob`
- Similar structure to quickjob
- Webhook configuration details

#### `docs/api-reference/jobs.md`
- `GET /jobs/{job_id}`
- `GET /jobs`
- Combined in one page with sections

#### `docs/api-reference/accounts.md`
- `POST /accounts` (legacy/optional)
- `GET /accounts/me`
- `PUT /accounts/me/upgrade`
- `PUT /accounts/me/webhook`
- `DELETE /accounts/me`
- Organized with collapsible sections

#### `docs/api-reference/plans.md`
- `GET /plans`
- `GET /plans/{plan_id}`
- Plan comparison table

#### `docs/api-reference/billing.md`
- `GET /accounts/me/billing`
- `GET /accounts/me/bills`
- Billing concepts and examples

#### `docs/api-reference/auth-endpoints.md`
- `POST /signup`
- `POST /confirm-signup`
- `POST /signin`
- `POST /refresh`
- Authentication flow diagram

#### `docs/api-reference/webhooks.md`
- Webhook payload format
- Retry logic
- Webhook configuration
- Security considerations

### 3. Guides Section

#### `docs/guides/getting-started.md`
- Step-by-step setup
- First API call
- Account creation flow

#### `docs/guides/quick-start.md`
- Minimal working examples
- Copy-paste ready code

#### `docs/guides/error-handling.md`
- Common error codes
- Error response format
- Troubleshooting tips

## Docusaurus Features to Implement

### 1. **Tabs Component**
Use for:
- HTML vs Markdown request examples
- Different response scenarios (success, error, timeout)
- Multiple code examples (curl, JavaScript, Python)

### 2. **Admonitions**
Use for:
- ⚠️ Warnings (e.g., legacy endpoints, deprecated features)
- 💡 Tips (best practices)
- ℹ️ Info (important notes)
- ✅ Success (confirmation messages)

### 3. **Code Blocks**
- Syntax highlighting for JSON, HTTP, bash
- Line numbers for long examples
- Copy button (built-in Docusaurus feature)

### 4. **Collapsible Sections**
- Use `<details>` and `<summary>` for optional/advanced sections
- Long endpoint documentation can be collapsed

### 5. **Tables**
- Request/response field tables
- Error code reference tables
- Plan comparison tables

### 6. **MDX Components** (Optional)
- Custom `<ApiEndpoint />` component for consistent formatting
- `<StatusBadge />` for HTTP status codes
- `<MethodBadge />` for HTTP methods (GET, POST, etc.)

## Sidebar Structure

```javascript
// sidebars.js
module.exports = {
  docs: [
    'intro',
    'authentication',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/quickjob',
        'api-reference/longjob',
        'api-reference/jobs',
        'api-reference/accounts',
        'api-reference/plans',
        'api-reference/billing',
        'api-reference/auth-endpoints',
        'api-reference/webhooks',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/getting-started',
        'guides/quick-start',
        'guides/error-handling',
      ],
    },
  ],
};
```

## Configuration Requirements

### 1. `docusaurus.config.js`
- Site metadata (title, tagline, URL)
- Theme configuration
- Plugins:
  - `@docusaurus/plugin-content-docs`
  - `@docusaurus/theme-classic`
  - Optional: `@docusaurus/plugin-google-analytics`

### 2. Theme Customization
- Custom color scheme (brand colors)
- Logo and favicon
- Footer links
- Navbar items

### 3. Search Configuration
- Algolia DocSearch (if available) or local search
- Search indexing for all API endpoints

## Content Conversion Strategy

### 1. **Endpoint Documentation Template**
Each endpoint page should follow this structure:

```markdown
# POST /quickjob

<MethodBadge method="POST" />
<StatusBadge status="200" />

## Description
Brief description of the endpoint.

## Authentication
[Authentication requirements]

## Request

### Endpoint
```
POST /quickjob
```

### Headers
[Header requirements]

### Request Body

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="html" label="HTML">
    [HTML example]
  </TabItem>
  <TabItem value="markdown" label="Markdown">
    [Markdown example]
  </TabItem>
</Tabs>

### Request Fields
[Field table]

## Response

### Success Response
[Response example]

### Error Responses
[Error examples]

## Examples

### cURL
[curl example]

### JavaScript
[JavaScript example]

## Validation Rules
[Validation details]
```

### 2. **Content Enhancements**
- Add more code examples (JavaScript, Python, etc.)
- Add interactive examples (if using MDX)
- Add diagrams for complex flows (authentication, webhook flow)
- Add "Try it" links if API playground exists

### 3. **Cross-References**
- Link between related endpoints
- Link to authentication page from all endpoints
- Link to error handling guide from error sections
- Link to webhook page from longjob endpoint

## Styling and UX

### 1. **Visual Enhancements**
- HTTP method badges (GET, POST, PUT, DELETE)
- Status code badges with color coding:
  - 2xx: Green
  - 4xx: Yellow/Orange
  - 5xx: Red
- Authentication required indicators
- Rate limit indicators

### 2. **Responsive Design**
- Mobile-friendly tables
- Collapsible sections for mobile
- Proper code block wrapping

### 3. **Accessibility**
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support

## Migration Checklist

### Phase 1: Setup
- [ ] Initialize Docusaurus project
- [ ] Configure `docusaurus.config.js`
- [ ] Set up sidebar structure
- [ ] Configure theme and branding

### Phase 2: Content Migration
- [ ] Convert intro/overview content
- [ ] Convert authentication documentation
- [ ] Convert all API endpoint pages
- [ ] Convert webhook documentation
- [ ] Create guides section

### Phase 3: Enhancement
- [ ] Add tabs for multiple examples
- [ ] Add admonitions for important notes
- [ ] Create custom components (if needed)
- [ ] Add cross-references
- [ ] Add code examples in multiple languages

### Phase 4: Polish
- [ ] Review all content for accuracy
- [ ] Test all links
- [ ] Optimize images/assets
- [ ] Configure search
- [ ] Add analytics (if needed)

### Phase 5: Deployment
- [ ] Set up build process
- [ ] Configure deployment (GitHub Pages, Netlify, etc.)
- [ ] Set up custom domain (if needed)
- [ ] Test production build

## Technical Requirements

### Dependencies
```json
{
  "dependencies": {
    "@docusaurus/core": "^3.0.0",
    "@docusaurus/preset-classic": "^3.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.0.0"
  }
}
```

### Node.js Version
- Node.js 18+ recommended
- npm or yarn package manager

## Optional Enhancements

### 1. **API Playground**
- Interactive API testing interface
- Requires backend API endpoint

### 2. **Versioning**
- Support for multiple API versions
- Version switcher in navbar

### 3. **Multi-language Support**
- Internationalization (i18n) if needed
- Language switcher

### 4. **Blog Integration**
- API updates and changelog
- Announcements

### 5. **Custom Domain**
- Custom domain setup
- SSL certificate configuration

## File Naming Conventions

- Use kebab-case for all file names
- Endpoint names: `quickjob.md`, `longjob.md`
- Group related endpoints: `accounts.md` (contains multiple account endpoints)
- Guides: `getting-started.md`, `error-handling.md`

## Content Formatting Standards

### Headers
- Use H1 for page title
- Use H2 for main sections
- Use H3 for subsections
- Maintain consistent hierarchy

### Code Blocks
- Always specify language for syntax highlighting
- Use appropriate language tags: `json`, `http`, `bash`, `javascript`, `python`

### Tables
- Use markdown tables for field descriptions
- Include type, required/optional, description columns

### Links
- Use relative links for internal documentation
- Use absolute links for external resources
- Ensure all links are valid

## Success Metrics

- All 18 endpoints documented
- All authentication flows documented
- Webhook documentation complete
- Search functionality working
- Mobile-responsive design
- Fast page load times
- Good SEO (if public)

## Timeline Estimate

- **Setup & Configuration**: 2-4 hours
- **Content Migration**: 8-12 hours
- **Enhancements**: 4-6 hours
- **Testing & Polish**: 2-4 hours
- **Total**: 16-26 hours

## Next Steps

1. Review and approve this specification
2. Initialize Docusaurus project
3. Begin content migration following the structure above
4. Iterate based on feedback

