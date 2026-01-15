import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DevFoundry',
  tagline: 'Build Your Way to Financial Independence: Software as Accessible Leverage',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // GitHub Pages deployment config
  url: 'https://episk-pos.github.io',
  baseUrl: '/DevFoundry/',
  organizationName: 'episk-pos',
  projectName: 'devfoundry',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Umami analytics (self-hosted)
  scripts: [
    {
      src: 'https://analytics.episkopos.community/script.js',
      defer: true,
      'data-website-id': '80688f0a-9a5a-4457-b95b-b66497f278df',
    },
  ],

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/episk-pos/devfoundry/tree/main/website/',
          showLastUpdateTime: true,
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/devfoundry-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DevFoundry',
      logo: {
        alt: 'DevFoundry Logo',
        src: 'img/logo--no-text.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/episk-pos/devfoundry',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'The Thesis',
              to: '/docs/thesis',
            },
            {
              label: 'Curriculum',
              to: '/docs/overview',
            },
            {
              label: 'Mental Models',
              to: '/docs/mental-models/protocol-thinking',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Glossary',
              to: '/docs/glossary',
            },
            {
              label: 'Architectural Views',
              to: '/docs/architectural-views',
            },
            {
              label: 'Diagram Standards',
              to: '/docs/diagram-standards',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/episk-pos/devfoundry',
            },
          ],
        },
      ],
      copyright: `Code: AGPLv3 | Content: CC BY 4.0 | Built with Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'javascript', 'markdown'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
