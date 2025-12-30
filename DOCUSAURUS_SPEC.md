# Docusaurus API Documentation Specification

## Overview
This document outlines the specification for creating user-focused API documentation for PodPDF - a PDF generation SaaS API. The documentation is designed for developers integrating PodPDF into their applications, focusing on practical usage and integration.

## Content Principles

### User-Focused Approach
- **Focus on "how to use"** - Users need to know how to integrate PodPDF and generate PDFs
- **Practical examples first** - Show real-world use cases and copy-paste ready code
- **Clear value propositions** - Explain what each endpoint does and when to use it
- **Simple language** - Use plain language accessible to all developers
- **Quick wins** - Help users generate their first PDF within minutes

### What to Include
- ✅ Getting started guide (signup to first PDF)
- ✅ Authentication flow (how to get and use tokens)
- ✅ Endpoint descriptions with practical examples
- ✅ Request/response examples (HTML and Markdown)
- ✅ Error handling and troubleshooting
- ✅ Code examples in multiple languages (cURL, JavaScript, Python)
- ✅ Best practices and tips
- ✅ Plan features and pricing information
- ✅ Webhook integration guide
- ✅ Rate limits and quotas

### What to Exclude
- ❌ Internal architecture and infrastructure
- ❌ Database implementation details
- ❌ Backend processing implementation
- ❌ Server-side technical stack
- ❌ Environment-specific configurations

## Project Structure

```
podpdf-apidocs/
├── docusaurus.config.js          # Docusaurus configuration
├── package.json                   # Dependencies and scripts
├── sidebars.js                    # Sidebar navigation configuration
├── README.md                      # Project README
├── docs/                          # Documentation pages (docs-only mode)
│   ├── index.md                  # Homepage: API Overview & Getting Started
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
        ├── logo.png              # Brand logo (placeholder provided)
        ├── favicon.ico           # Site favicon (placeholder provided)
        └── .gitkeep              # Keeps directory in git
```

**Note:** 
- Using **docs-only mode** - no separate landing page needed
- `docs/index.md` becomes the homepage at `/`
- API documentation is the first thing users see
- Placeholder images are provided in `static/img/`. Replace these with your brand assets before deployment.

## Content Organization

### 1. Homepage & Core Pages

#### `docs/index.md` - **Homepage (Landing Page)**
This is the first page users see when visiting your site.

**Content Structure:**
- **Hero Section:** Bold headline: "Generate PDFs from HTML and Markdown"
- **Quick Value Prop:** "Simple REST API. No complex setup. Start in 5 minutes."
- **Key Features:** 3-4 main features with icons
  - ⚡ Instant PDF generation from HTML/Markdown
  - 🔄 Async processing for large documents
  - 🎯 Simple authentication with JWT
  - 💰 Free tier + pay-as-you-go pricing
- **Quick Start Code Example:** Show a simple cURL example
- **Common Use Cases:** Invoices, Reports, Certificates, Documents
- **Next Steps:** Clear CTAs to "Get Started" and "View API Reference"

**Complete Homepage Template (`docs/index.md`):**
```markdown
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

<div style={{display: 'flex', gap: '2rem', marginTop: '2rem'}}>
  <div>
    <h3>⚡ Fast & Simple</h3>
    <p>Send HTML or Markdown, get a PDF. No complex setup or dependencies.</p>
  </div>
  <div>
    <h3>🔄 Flexible Processing</h3>
    <p>Choose instant sync generation or async with webhook notifications.</p>
  </div>
  <div>
    <h3>💰 Affordable</h3>
    <p>Free tier included. Pay only for what you use with paid plans.</p>
  </div>
</div>

---

## Quick Example

Generate your first PDF in under a minute:

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "Authorization: Bearer YOUR_TOKEN" \
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

- **📄 Invoices & Receipts** - Generate customer invoices on the fly
- **📊 Reports** - Create data-driven PDF reports from HTML
- **🎓 Certificates** - Issue certificates and credentials
- **📋 Documents** - Convert content to downloadable PDFs

---

## Getting Started

<div style={{marginTop: '2rem'}}>

### 1. **Create an Account**
Sign up and get your API credentials in seconds.
[Learn about authentication →](/authentication)

### 2. **Make Your First Request**
Follow our 5-minute quickstart guide.
[Get started →](/guides/getting-started)

### 3. **Explore the API**
Browse all available endpoints and features.
[API Reference →](/api-reference/quickjob)

</div>

---

## Key Features

### 🎯 Two Generation Modes

**QuickJob** - Instant synchronous generation  
Perfect for small documents (< 30 seconds, up to 100 pages)  
[Learn more →](/api-reference/quickjob)

**LongJob** - Asynchronous with webhooks  
Ideal for large documents with webhook notifications  
[Learn more →](/api-reference/longjob)

### 🔐 Simple Authentication

JWT token-based authentication with easy signup and token refresh.  
[Authentication guide →](/authentication)

### 📈 Flexible Pricing

- **Free Tier:** 100 PDFs to get started
- **Paid Plans:** Unlimited PDFs, pay per use
[View plans →](/api-reference/plans)

---

## Need Help?

- 📚 [Getting Started Guide](/guides/getting-started) - 5-minute quickstart
- 💻 [Code Examples](/examples/curl-examples) - Copy-paste ready examples
- ❓ [Error Handling](/guides/error-handling) - Troubleshooting guide
- 🔗 [API Reference](/api-reference/quickjob) - Complete endpoint documentation

---

**Ready to generate PDFs?** [Get started now →](/guides/getting-started)
```

This homepage template provides:
- Clear value proposition
- Quick code example
- Use cases
- Clear navigation to key sections
- No separate landing page needed

#### `docs/authentication.md`
- How to sign up and get started
- How to sign in and get your API tokens
- Using Bearer tokens in API requests
- Token refresh when tokens expire
- Simple authentication flow diagram

### 2. API Reference Pages

#### `docs/api-reference/quickjob.md`
- Endpoint: `POST /quickjob`
- **When to use:** Small documents, need PDF immediately (< 30 seconds)
- Description: Generate PDF and get it directly in response
- Authentication: How to use your Bearer token
- Request examples with tabs for HTML/Markdown
- Response: Binary PDF with page count header
- Error handling and common issues
- Usage tips: Best for invoices, receipts, simple reports

#### `docs/api-reference/longjob.md`
- Endpoint: `POST /longjob`
- **When to use:** Large documents, prefer async processing
- Description: Queue PDF generation, get notified when ready
- How webhook notifications work
- Request examples with tabs for HTML/Markdown
- Response: Job ID for tracking
- How to check job status
- Usage tips: Best for reports, multi-page documents

#### `docs/api-reference/jobs.md`
- `GET /jobs/{job_id}` - Check status of a specific job
- `GET /jobs` - List all your jobs
- How to track PDF generation progress
- Understanding job statuses: queued, processing, completed, failed

#### `docs/api-reference/accounts.md`
- `GET /accounts/me` - View your account details and usage
- `PUT /accounts/me/upgrade` - Upgrade to unlimited PDFs
- `PUT /accounts/me/webhook` - Set your webhook URL
- `DELETE /accounts/me` - Delete your account
- Organized with clear sections for each operation

#### `docs/api-reference/plans.md`
- `GET /plans` - List all available plans
- `GET /plans/{plan_id}` - Get specific plan details
- Plan comparison table (Free vs Paid)
- Features and limits explained
- Pricing information

#### `docs/api-reference/billing.md`
- `GET /accounts/me/billing` - View current month's usage
- `GET /accounts/me/bills` - View billing history
- Understanding your usage and costs
- How billing works for paid plans

#### `docs/api-reference/auth-endpoints.md`
- `POST /signup` - Create your account
- `POST /confirm-signup` - Verify your email
- `POST /signin` - Get your API tokens
- `POST /refresh` - Refresh expired tokens
- Step-by-step authentication flow

#### `docs/api-reference/webhooks.md`
- What are webhooks and why use them
- Webhook payload format
- How to set up webhook endpoint
- Testing webhooks
- Best practices for handling notifications

### 3. Guides Section

#### `docs/guides/getting-started.md`
- **5-minute quickstart guide**
- Step 1: Sign up for an account
- Step 2: Get your API tokens
- Step 3: Generate your first PDF
- Choosing between quickjob (instant) and longjob (async)
- Next steps and best practices

#### `docs/guides/quick-start.md`
- **Copy-paste ready code examples**
- Generate PDF from HTML (minimal example)
- Generate PDF from Markdown (minimal example)
- Add custom margins and formatting
- Examples in cURL, JavaScript, and Python

#### `docs/guides/error-handling.md`
- Understanding error responses
- Common error codes and what they mean
- Rate limit exceeded: What to do
- Quota exceeded: Upgrade to paid plan
- Troubleshooting guide
- How to get help

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
    {
      type: 'doc',
      id: 'index',
      label: '🏠 Home',
    },
    {
      type: 'category',
      label: '🚀 Getting Started',
      items: [
        'guides/getting-started',
        'guides/quick-start',
        'authentication',
      ],
    },
    {
      type: 'category',
      label: '📚 API Reference',
      collapsed: false,
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
      label: '📖 Guides',
      items: [
        'guides/error-handling',
      ],
    },
    {
      type: 'category',
      label: '💻 Code Examples',
      items: [
        'examples/curl-examples',
        'examples/sdk-examples',
      ],
    },
  ],
};
```

**Navigation Flow:**
1. **Home** - Overview and quick start (always visible)
2. **Getting Started** - Onboarding guides first
3. **API Reference** - All endpoints (expanded by default)
4. **Guides** - Additional help and best practices
5. **Code Examples** - Complete working examples

**Note:** The homepage (`index.md`) is shown at the root URL (`/`) with no `/docs` prefix in docs-only mode.

## Configuration Requirements

### 1. `docusaurus.config.js` - Docs-Only Mode

Configure Docusaurus to use **docs-only mode** (no separate landing page):

```javascript
module.exports = {
  title: 'PodPDF API',
  tagline: 'Simple PDF Generation API',
  url: 'https://api-docs.podpdf.com',
  baseUrl: '/',
  
  // Docs-only mode configuration
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Docs at root path
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: undefined, // Remove edit links
        },
        blog: false, // Disable blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'PodPDF API',
      logo: {
        alt: 'PodPDF Logo',
        src: 'img/logo.png',
        // If logo doesn't exist, title will be displayed
      },
      items: [
        {
          href: 'https://podpdf.com',
          label: 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://github.com/yourorg/podpdf',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/guides/getting-started',
            },
            {
              label: 'API Reference',
              to: '/api-reference/quickjob',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Dashboard',
              href: 'https://podpdf.com',
            },
            {
              label: 'Support',
              href: 'https://podpdf.com/support',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PodPDF. Built with Docusaurus.`,
    },
  },
  
  // Favicon is optional - browser will use default if not found
  favicon: 'img/favicon.ico',
};
```

**Key Configuration Notes:**
- `routeBasePath: '/'` - Makes docs the homepage (no `/docs` prefix)
- `blog: false` - Disables blog feature (not needed)
- Homepage is `docs/index.md` (automatically shown at `/`)
- No separate landing page component needed

### 2. Theme Customization
- Custom color scheme (brand colors)
- Logo and favicon (placeholder files provided in `static/img/`)
- Footer links
- Navbar items

**Placeholder Images:**
- Default placeholder logo and favicon are included in `static/img/`
- Replace with your brand assets when available
- Configuration gracefully handles missing images

### 3. Search Configuration
- Algolia DocSearch (if available) or local search
- Search indexing for all API endpoints

## Content Conversion Strategy

### 1. **Endpoint Documentation Template**
Each endpoint page should follow this structure, designed for quick understanding:

```markdown
# POST /quickjob - Generate PDF Instantly

<MethodBadge method="POST" />
<StatusBadge status="200" />

## What It Does
Clear explanation of what this endpoint does and **when to use it**.

:::tip When to Use This Endpoint
Use `/quickjob` for small documents that you need immediately (under 30 seconds).
For larger documents, use `/longjob` instead.
:::

## Quick Example

```bash
curl -X POST https://api.podpdf.com/quickjob \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input_type":"html","html":"<h1>Hello World</h1>"}'
```

## Authentication
Include your Bearer token in the Authorization header.

## Request

### Request Body Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="html" label="HTML Input">
    [Complete HTML example with explanation]
  </TabItem>
  <TabItem value="markdown" label="Markdown Input">
    [Complete Markdown example with explanation]
  </TabItem>
</Tabs>

### Request Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| input_type | string | Yes | Either "html" or "markdown" |
| ... | ... | ... | ... |

## Response

### Success Response (200 OK)
- You receive a PDF file directly
- Headers include page count and job ID

### Common Errors
| Error Code | What It Means | How to Fix |
|------------|---------------|------------|
| 401 | Invalid token | Check your authentication |
| 403 | Rate limit exceeded | Wait or upgrade plan |
| ... | ... | ... |

## Complete Examples

### JavaScript (Node.js)
[Full working example]

### Python
[Full working example]

### cURL
[Full working example]

## Tips & Best Practices
- Keep HTML under 5MB for best performance
- Include all CSS inline in your HTML
- Use quickjob for documents under 10 pages
```

### 2. **Content Enhancements**
- **Real-world examples:** Invoice generation, report creation, certificate generation
- **Visual aids:** Simple diagrams showing request/response flow
- **Use case guides:** "How to generate an invoice", "How to create a report"
- **Code examples ready to copy:** Full working examples in cURL, JavaScript, Python
- **Success indicators:** Show users exactly what success looks like

### 3. **Cross-References**
- Link between related endpoints with context
- Link to authentication guide from all endpoints
- Link to error handling guide from error sections
- Link to webhook setup from longjob endpoint
- Link to plan upgrade from quota error sections

## Styling and UX

### 1. **Visual Enhancements**
- **HTTP method badges:** Clear visual indicators (GET, POST, PUT, DELETE)
- **Status code badges** with intuitive color coding:
  - 2xx: Green (Success - everything worked!)
  - 4xx: Yellow/Orange (Check your request)
  - 5xx: Red (Service issue - try again)
- **Plan indicators:** Clearly mark Free vs Paid features
- **Quick-scan layout:** Users can find what they need fast

### 2. **Responsive Design**
- Mobile-friendly tables and code examples
- Collapsible sections for easier mobile navigation
- Code blocks that don't require horizontal scrolling
- Touch-friendly interactive elements

### 3. **Accessibility**
- Clear heading hierarchy for screen readers
- Alt text for all images and diagrams
- Keyboard navigation support
- High contrast code blocks

## Implementation Checklist

### Phase 1: Setup (2-3 hours)
- [ ] Initialize Docusaurus project (`npx create-docusaurus@latest`)
- [ ] Configure `docusaurus.config.js` with **docs-only mode** (`routeBasePath: '/'`)
- [ ] Set `blog: false` in preset configuration
- [ ] Set up sidebar structure with categories (see sidebar example above)
- [ ] Configure theme and brand colors
- [ ] Add logo and favicon (placeholders provided in `static/img/`)
- [ ] Copy static directory to project

### Phase 2: Core Content (6-8 hours)
- [ ] **Write index.md (Homepage):** Hero section, quick start, use cases, CTAs
- [ ] **Write getting-started.md:** 5-minute guide to first PDF
- [ ] **Write authentication.md:** Signup → Signin → Use tokens (simple flow)
- [ ] **Write quickjob.md:** Instant PDF generation with examples
- [ ] **Write longjob.md:** Async PDF generation with webhook guide
- [ ] **Write jobs.md:** How to check job status
- [ ] **Write accounts.md:** Manage account and settings
- [ ] **Write plans.md:** Free vs Paid comparison
- [ ] **Write billing.md:** Understanding usage and costs
- [ ] **Write auth-endpoints.md:** All authentication endpoints
- [ ] **Write webhooks.md:** How to receive notifications

### Phase 3: Examples & Guides (3-4 hours)
- [ ] Add complete cURL examples
- [ ] Add JavaScript/Node.js examples
- [ ] Add Python examples
- [ ] Write error-handling.md with common issues
- [ ] Write quick-start.md with minimal copy-paste code
- [ ] Add use case guides (invoice, report generation)

### Phase 4: Enhancement (2-3 hours)
- [ ] Add tabs for HTML/Markdown examples
- [ ] Add admonitions (tips, warnings, notes)
- [ ] Add visual badges for HTTP methods and status codes
- [ ] Add cross-references between related pages
- [ ] Add "Next Steps" sections to guide users

### Phase 5: Polish & Deploy (2-3 hours)
- [ ] Review all content for clarity and accuracy
- [ ] Test all code examples
- [ ] Test all internal links
- [ ] Configure search (Algolia or local)
- [ ] Test mobile responsiveness
- [ ] Deploy to hosting (Vercel, Netlify, GitHub Pages)
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

### 1. **Interactive API Testing**
- **API Playground:** Test endpoints directly in the docs
- **Live response viewer:** See real API responses
- **Pre-filled examples:** One-click to try
- Benefits: Users can experiment without writing code

### 2. **Code Generators**
- **SDK code generator:** Generate client code in multiple languages
- **Request builder:** Visual interface to build requests
- Benefits: Faster integration, fewer errors

### 3. **Use Case Gallery**
- **Real-world examples:** Invoice, report, certificate templates
- **Downloadable templates:** HTML/Markdown starter templates
- **Video tutorials:** Screen recordings of common tasks
- Benefits: Users can copy proven solutions

### 4. **Community Features**
- **Blog:** API updates, tips, and best practices
- **Changelog:** Version history and new features
- **Community forum:** Users help each other
- Benefits: Engaged user community, reduced support load

### 5. **Analytics & Feedback**
- **Search analytics:** See what users look for
- **Feedback buttons:** "Was this helpful?" on each page
- **Usage tracking:** Popular pages and user journeys
- Benefits: Data-driven documentation improvements

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

### User Success Indicators
- ✅ **Time to first PDF:** Users can generate their first PDF within 5 minutes
- ✅ **Self-service:** Users can find answers without support tickets
- ✅ **Code examples work:** All examples are copy-paste ready and tested
- ✅ **Clear next steps:** Users know what to do after each step
- ✅ **Mobile accessible:** Documentation readable on all devices

### Technical Quality
- ✅ All endpoints documented with practical examples
- ✅ Authentication flow crystal clear
- ✅ Error messages explained with solutions
- ✅ Search finds relevant content quickly
- ✅ Page load under 2 seconds
- ✅ No broken links or missing images

### Business Impact
- ✅ Reduced support inquiries
- ✅ Faster user onboarding
- ✅ Higher API adoption rate
- ✅ Positive developer experience

## Timeline Estimate

- **Setup & Configuration**: 2-3 hours
- **Core Content Writing**: 6-8 hours
- **Examples & Guides**: 3-4 hours
- **Enhancement & Polish**: 2-3 hours
- **Testing & Deployment**: 2-3 hours
- **Total**: 15-21 hours

## Static Assets & Placeholder Images

### Included Placeholder Files
The following placeholder files are provided in `static/img/`:

1. **`logo.png`** - Placeholder logo (200x60 blue PNG with "PodPDF" text)
2. **`favicon.ico`** - Placeholder favicon file
3. **`.gitkeep`** - Ensures directory is tracked in git

### Using Placeholders

**Option 1: Use placeholders as-is for initial development**
```javascript
// docusaurus.config.js
navbar: {
  logo: {
    alt: 'PodPDF Logo',
    src: 'img/logo.png', // Uses placeholder
  },
}
```

**Option 2: Replace with your brand assets**
1. Replace `static/img/logo.png` with your brand logo
2. Replace `static/img/favicon.ico` with your favicon
3. Keep same filenames - no config changes needed

**Option 3: Make logo optional (text-only navbar)**
```javascript
// docusaurus.config.js
navbar: {
  title: 'PodPDF API',
  // Omit logo field - will show text only
}
```

### Recommended Image Specifications
- **Logo:** SVG format (scalable), ~200x60px recommended
- **Favicon:** ICO or PNG, 32x32px or 64x64px
- **Social preview image:** PNG/JPG, 1200x630px (for og:image)

## Next Steps

### Immediate Actions
1. ✅ **Static directory created** with placeholder images
2. ✅ **Specification updated** for user-focused API documentation
3. **Next:** Initialize Docusaurus project
4. **Then:** Start with high-priority content (intro, getting-started, quickjob)

### Recommended Workflow
1. **Week 1:** Setup + Core content (intro, auth, main endpoints)
2. **Week 2:** Examples + Guides (code examples, use cases)
3. **Week 3:** Enhancement + Polish (styling, search, mobile testing)
4. **Week 4:** Deploy + Iterate based on user feedback

### Quick Start Commands
```bash
# 1. Initialize Docusaurus
npx create-docusaurus@latest podpdf-docs classic --yes

# 2. Navigate to project
cd podpdf-docs

# 3. Copy static directory (from your spec repo)
cp -r ../podpdf-apidocs/static/ .

# 4. Update docusaurus.config.js for docs-only mode
# - Set routeBasePath: '/' in docs preset
# - Set blog: false
# - Update title, url, baseUrl

# 5. Update sidebars.js 
# - Change 'intro' to 'index'
# - Add categories as shown in spec

# 6. Create docs/index.md (homepage)
# - This becomes your landing page at /

# 7. Start development server
npm start

# 8. Build for production
npm run build

# 9. Test production build
npm run serve
```

**Important:** In docs-only mode:
- Homepage is `docs/index.md` (shown at `/`)
- No separate landing page needed
- No `/docs` prefix in URLs
- Users see API docs immediately

