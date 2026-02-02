import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logoUrl = useBaseUrl('/img/logo--no-text.png');
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <img
          src={logoUrl}
          alt="DevFoundry Logo"
          className={styles.heroLogo}
        />
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className={styles.btnPrimary} to="/docs/overview">
            Start Learning
          </Link>
          <Link className={styles.btnSecondary} to="/docs/thesis">
            Read the Thesis
          </Link>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Software as Leverage',
    icon: 'rocket.svg',
    description: (
      <>
        Software is the most accessible form of leverage ever created.
        With modern AI tools, any individual can build software solutions.
        The barrier isn't capital—it's understanding.
      </>
    ),
    link: '/docs/thesis',
  },
  {
    title: 'Architecture First',
    icon: 'building.svg',
    description: (
      <>
        Learn to think in flows, not procedures. Understand how software
        systems work before diving into syntax. Design architecture before
        writing code.
      </>
    ),
    link: '/docs/mental-models/architecture-first',
  },
  {
    title: 'Flow-Based Development',
    icon: 'wave.svg',
    description: (
      <>
        Every program follows: Input → Processing → Output. Master this
        pattern and you'll understand any software system. Visualize
        everything with diagrams.
      </>
    ),
    link: '/docs/mental-models/flow-based-dev',
  },
  {
    title: 'Protocol Thinking',
    icon: 'link.svg',
    description: (
      <>
        See systems as actors with boundaries and incentives. Understand
        where protocols break. Turn noticed friction into opportunity.
      </>
    ),
    link: '/docs/mental-models/protocol-thinking',
  },
  {
    title: 'Build Your Portfolio',
    icon: 'bar-chart.svg',
    description: (
      <>
        Don't bet everything on one idea. Build a portfolio of small,
        sustainable income streams. Serial solopreneurship toward
        financial independence.
      </>
    ),
    link: '/docs/mental-models/portfolio-strategy',
  },
  {
    title: 'LLM-Accelerated',
    icon: 'cpu.svg',
    description: (
      <>
        Learn to work effectively with AI coding assistants. Provide
        architecture context, get better results. AI becomes a true
        collaborator.
      </>
    ),
    link: '/docs/prompts',
  },
];

function Feature({title, icon, description, link}: FeatureItem) {
  const iconUrl = useBaseUrl(`/img/icons/${icon}`);
  return (
    <Link to={link} className={styles.featureLink}>
      <div className={styles.featureCard}>
        <div className={styles.featureIconWrapper}>
          <img src={iconUrl} alt="" className={styles.featureIcon} />
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </Link>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionHeading}>
          Core Principles
        </Heading>
        <p className={styles.sectionSubheading}>
          The mental models that power everything you'll build
        </p>
        <div className={styles.featuresGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

const timelineSteps = [
  {title: 'CLI', description: 'Build your first program. Understand Input → Processing → Output.'},
  {title: 'Static Web', description: 'HTML, CSS, JavaScript. Learn the browser triad.'},
  {title: 'SPA', description: 'React components, state management, modern frontend.'},
  {title: 'Fullstack', description: 'Express backend, REST APIs, database persistence.'},
  {title: 'Deployed', description: 'Live on the internet. CI/CD, environment config.'},
];

function LearningPath(): ReactNode {
  return (
    <section className={styles.learningPath}>
      <div className="container">
        <Heading as="h2" className={styles.sectionHeading}>
          The Learning Journey
        </Heading>
        <p className={styles.sectionSubheading}>
          Five stages from first program to production deployment
        </p>
        <div className={styles.timelineContainer}>
          {timelineSteps.map((step, idx) => (
            <div key={idx} className={styles.timelineStep}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineConnector} />
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type NavItem = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

const navItems: NavItem[] = [
  {title: 'Curriculum', description: 'Full learning roadmap', icon: 'book-open.svg', link: '/docs/overview'},
  {title: 'Glossary', description: 'Software vocabulary', icon: 'book.svg', link: '/docs/glossary'},
  {title: 'ADRs', description: 'Architecture decisions', icon: 'file-text.svg', link: '/docs/adr'},
  {title: 'Community', description: 'Problems & projects', icon: 'users.svg', link: '/docs/community'},
];

function NavCard({title, description, icon, link}: NavItem) {
  const iconUrl = useBaseUrl(`/img/icons/${icon}`);
  return (
    <Link to={link} className={styles.navCard}>
      <div className={styles.navIconWrapper}>
        <img src={iconUrl} alt="" className={styles.navIcon} />
      </div>
      <div className={styles.navContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

function QuickNav(): ReactNode {
  return (
    <section className={styles.quickNav}>
      <div className="container">
        <Heading as="h2" className={styles.sectionHeading}>
          Quick Navigation
        </Heading>
        <p className={styles.sectionSubheading}>
          Jump straight to what you need
        </p>
        <div className={styles.quickNavGrid}>
          {navItems.map((item, idx) => (
            <NavCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Build Your Way to Financial Independence"
      description="DevFoundry: From first principles to LLM-accelerated software creation. Learn to build software, notice friction, and create value.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <LearningPath />
        <QuickNav />
      </main>
    </Layout>
  );
}
