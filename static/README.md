# Static Assets Directory

This directory contains static assets for the PodPDF API documentation site.

## Current Files

### `img/logo.png`
Placeholder logo for the navbar. This is a simple blue PNG with "PodPDF" text.

**To replace:**
- Create your brand logo as PNG or SVG
- Replace this file with your logo
- Keep the same filename (`logo.png`) or update `docusaurus.config.js`

**Recommended specs:**
- Format: PNG (with transparency) or SVG
- Size: 200x60px or similar aspect ratio (high-DPI: 400x120px @2x)
- Transparent background recommended
- Optimize/compress before adding

### `img/favicon.ico`
Placeholder favicon for browser tabs.

**To replace:**
- Create a 32x32 or 64x64 pixel icon
- Use ICO or PNG format
- Replace this file with your favicon
- Keep the same filename or update `docusaurus.config.js`

## Using These Assets

The Docusaurus configuration (`docusaurus.config.js`) references these files:

```javascript
module.exports = {
  themeConfig: {
    navbar: {
      title: '', // No title - logo only
      logo: {
        alt: 'PodPDF Logo',
        src: 'img/logo.png',
      },
    },
  },
  // Favicon
  favicon: 'img/favicon.ico',
};
```

## Optional Assets

You may want to add:
- `img/social-preview.png` - For social media sharing (1200x630px)
- `img/tutorial/*.png` - Screenshots for tutorials
- `fonts/` - Custom fonts (if needed)
- `css/` - Additional stylesheets

## Notes

- All files in this directory are publicly accessible
- Images are served directly without processing
- SVG is preferred for logos (scalable without quality loss)
- Optimize images before adding (compress PNG/JPG files)
- The `.gitkeep` file ensures empty directories are tracked by git
