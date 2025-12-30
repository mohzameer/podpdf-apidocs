/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
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
      ],
    },
  ],
};

export default sidebars;

