import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/thesis">
            Read the Thesis
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/curriculum/part-1-foundations/what-software-is"
            style={{marginLeft: '1rem'}}>
            Start Learning
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
    icon: '🚀',
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
    icon: '🏗️',
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
    icon: '🌊',
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
    icon: '🔗',
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
    icon: '📊',
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
    icon: '🤖',
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
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>{icon}</div>
          <div className="padding-horiz--md">
            <Heading as="h3">{title}</Heading>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningPath(): ReactNode {
  return (
    <section className={styles.learningPath}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          The Learning Journey
        </Heading>
        <div className={styles.pathContainer}>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>CLI</h3>
              <p>Build your first program. Understand Input → Processing → Output.</p>
            </div>
          </div>
          <div className={styles.pathArrow}>→</div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Static Web</h3>
              <p>HTML, CSS, JavaScript. Learn the browser triad.</p>
            </div>
          </div>
          <div className={styles.pathArrow}>→</div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>SPA</h3>
              <p>React components, state management, modern frontend.</p>
            </div>
          </div>
          <div className={styles.pathArrow}>→</div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3>Fullstack</h3>
              <p>Express backend, REST APIs, database persistence.</p>
            </div>
          </div>
          <div className={styles.pathArrow}>→</div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepContent}>
              <h3>Deployed</h3>
              <p>Live on the internet. CI/CD, environment config.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickNav(): ReactNode {
  return (
    <section className={styles.quickNav}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Quick Navigation
        </Heading>
        <div className="row">
          <div className="col col--3">
            <Link to="/docs/overview" className={styles.navCard}>
              <h3>📚 Curriculum</h3>
              <p>Full learning roadmap</p>
            </Link>
          </div>
          <div className="col col--3">
            <Link to="/docs/glossary" className={styles.navCard}>
              <h3>📖 Glossary</h3>
              <p>Software vocabulary</p>
            </Link>
          </div>
          <div className="col col--3">
            <Link to="/docs/adr" className={styles.navCard}>
              <h3>📝 ADRs</h3>
              <p>Architecture decisions</p>
            </Link>
          </div>
          <div className="col col--3">
            <Link to="/docs/community" className={styles.navCard}>
              <h3>👥 Community</h3>
              <p>Problems & projects</p>
            </Link>
          </div>
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
