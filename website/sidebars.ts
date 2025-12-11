import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  docsSidebar: [
    {
      type: 'doc',
      id: 'overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'thesis',
      label: 'The Thesis',
    },
    {
      type: 'doc',
      id: 'how-to-use-this-repo',
      label: 'How to Use This Repo',
    },
    {
      type: 'category',
      label: 'Mental Models',
      collapsed: false,
      items: [
        'mental-models/protocol-thinking',
        'mental-models/friction-to-opportunity',
        'mental-models/portfolio-strategy',
        'mental-models/architecture-first',
        'mental-models/flow-based-dev',
      ],
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
    {
      type: 'doc',
      id: 'architectural-views',
      label: 'Architectural Views',
    },
    {
      type: 'doc',
      id: 'diagram-standards',
      label: 'Diagram Standards',
    },
  ],

  // Curriculum sidebar
  curriculumSidebar: [
    {
      type: 'category',
      label: 'Part I: Foundations',
      collapsed: false,
      items: [
        'curriculum/part-1-foundations/what-software-is',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: false,
      items: [
        'examples/hello-world-console/index',
      ],
    },
  ],

  // Community sidebar - simplified for now
  communitySidebar: [
    {
      type: 'doc',
      id: 'overview',
      label: 'Back to Docs',
    },
  ],
};

export default sidebars;
