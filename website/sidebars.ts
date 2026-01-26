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
      label: 'Curriculum',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Part I: Foundations',
          collapsed: false,
          items: [
            'curriculum/part-1-foundations/terminal-basics',
            'curriculum/part-1-foundations/what-software-is',
            'curriculum/part-1-foundations/anatomy-of-projects',
            'curriculum/part-1-foundations/how-the-web-works',
            'curriculum/part-1-foundations/types-as-communication',
            'curriculum/part-1-foundations/build-tools',
            'curriculum/part-1-foundations/frontend-frameworks-react',
            {
              type: 'category',
              label: 'Extracurricular',
              collapsed: true,
              items: [
                'curriculum/part-1-foundations/extracurricular/terminal-going-further',
                'curriculum/part-1-foundations/extracurricular/types-across-languages',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: false,
      items: [
        'examples/hello-world-console/index',
        'examples/lemonade-cli/index',
        'examples/lemonade-static-web/index',
        'examples/lemonade-cli-typescript/index',
      ],
    },
    {
      type: 'category',
      label: 'Prompt Templates',
      collapsed: true,
      items: [
        'prompts/index',
        'prompts/getting-started',
        'prompts/architecture-first',
        'prompts/debugging',
        'prompts/reading-code',
        'prompts/designing-features',
        'prompts/iterative-refinement',
      ],
    },
    {
      type: 'category',
      label: 'Mental Models',
      collapsed: true,
      items: [
        'mental-models/protocol-thinking',
        'mental-models/friction-to-opportunity',
        'mental-models/build-vs-borrow',
        'mental-models/portfolio-strategy',
        'mental-models/architecture-first',
        'mental-models/flow-based-dev',
      ],
    },
    {
      type: 'category',
      label: 'Exercises',
      collapsed: true,
      items: [
        'exercises/index',
      ],
    },
    {
      type: 'category',
      label: 'Architecture Decisions',
      collapsed: true,
      items: [
        'adr/index',
        'adr/frontend-stack',
        'adr/backend-stack',
        'adr/diagram-conventions',
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
    {
      type: 'category',
      label: 'Community',
      collapsed: true,
      items: [
        'community/index',
        'community/problems/index',
        'community/projects/index',
        'community/showcases/index',
        'community/resources/index',
      ],
    },
  ],
};

export default sidebars;
