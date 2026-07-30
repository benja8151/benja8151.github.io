// Single source of truth for site content, adapted from cv.md.
// The experience timeline is ordered chronologically (oldest -> newest) for the rail,
// then rendered so the reader moves forward in time.

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  intro: string;
  social: SocialLinks;
  image: string;
  imageAlt: string;
  cvPdf: string;
}

export interface SkillGroup {
  category: string;
  proficient: string[];
  familiar: string[];
}

export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  companyNote?: string;
  period: string;
  summary: string;
  highlights: string[];
  minimal?: boolean;
}

export interface ProjectImageSlot {
  src: string;
  alt: string;
  /** Documented intended dimensions for the swappable asset. */
  dimensions: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  logo: ProjectImageSlot;
  mockups: ProjectImageSlot[];
  /** Single transparent image shown instead of the screenshot carousel. */
  showcase?: ProjectImageSlot;
  featured?: boolean;
}

export interface EducationEntry {
  period: string;
  program: string;
  institution: string;
}

export const profile: Profile = {
  name: 'Benjamin Smrdelj',
  tagline: 'Full-Stack & Mobile Engineer',
  location: 'Pivka, Slovenia',
  intro:
    'Flutter · React · Go · Node.js · AWS. I lead mobile app development and build production backend systems — working fluently across mobile, backend, and cloud.',
  social: {
    github: 'https://github.com/benja8151',
    linkedin: 'https://www.linkedin.com/in/benjamin-smrdelj-14a637146/',
    email: 'benjamin.smrdelj@gmail.com',
  },
  image: '/assets/profile.png',
  imageAlt: 'Portrait of Benjamin Smrdelj',
  cvPdf: '/Benjamin-Smrdelj-CV.pdf',
};

// Condensed, web-tightened version of the CV About Me text.
export const about: string[] = [
  'Full-stack software engineer with deep experience across mobile, backend, and cloud. I specialize in Flutter, Go, Node.js, and serverless AWS architectures, with a track record leading mobile app development and backend systems in production.',
  'Currently finishing a master\u2019s in Computer and Information Science — applying machine learning to chemical reaction classification. Paired with a chemical-engineering background, it lets me work fluently at the intersection of the two fields.',
  'Responsible, reliable, and precise, with a self-critical streak that keeps me improving. Independent by nature, but I collaborate easily — open to input and happy to bring my own ideas to a team.',
];

export const skills: SkillGroup[] = [
  {
    category: 'Mobile / Frontend',
    proficient: ['Flutter', 'React'],
    familiar: ['React Native', 'Angular', 'Swift', 'Kotlin'],
  },
  {
    category: 'Backend',
    proficient: ['Go', 'Node.js', 'REST APIs'],
    familiar: ['Express', 'Fastify'],
  },
  {
    category: 'Cloud & Databases',
    proficient: ['AWS Lambda', 'DynamoDB', 'Kinesis', 'S3', 'CloudFormation', 'MongoDB'],
    familiar: ['Redis', 'Docker'],
  },
  {
    category: 'Languages',
    proficient: ['Dart', 'Go', 'TypeScript', 'JavaScript'],
    familiar: ['Python', 'C#', 'C++'],
  },
  {
    category: 'AI Tools',
    proficient: ['Kiro (CLI + IDE)', 'OpenCode'],
    familiar: ['Codex', 'Claude Code', 'OpenSpec', 'OpenRouter', 'Pi'],
  },
  {
    category: 'Other',
    proficient: ['Git', 'Codemagic', 'GitHub Actions', 'Sentry', 'Firebase', 'Figma'],
    familiar: ['Cypress', 'Stripe', 'Django'],
  },
];

// Chronological order (oldest first). Rendered forward in time along the rail.
export const experience: ExperienceRole[] = [
  {
    id: 'postojna',
    role: 'Cave Guard',
    company: 'Postojna Cave d.d.',
    period: 'Seasonal, 2014\u20132016',
    summary:
      'First work experience — seasonal student work responsible for visitor safety; early exposure to teamwork and public-facing communication.',
    highlights: [],
    minimal: true,
  },
  {
    id: 'comtrade',
    role: 'Junior Software Engineer',
    company: 'Comtrade d.o.o.',
    companyNote: 'later Endava',
    period: '2019\u20132020',
    summary:
      'Started as a student developer working across web and mobile client projects.',
    highlights: [
      'Built features on client web projects with React and Node.js',
      'Worked with Cypress on end-to-end testing for an e-commerce platform',
      'Sole mobile developer on a multi-modal route-planning app for AMZS',
      'Evaluated Swift, Kotlin, React Native, Ionic and Flutter before choosing Flutter — my first mobile project, during Flutter\u2019s v1\u2192v2 transition',
    ],
  },
  {
    id: 'endava',
    role: 'Senior Software Engineer — Avant2GO',
    company: 'Endava Digital Solutions',
    period: '2020\u20132022',
    summary:
      'Promoted to lead developer on Avant2GO — a car-sharing and rental platform serving 50,000+ registered users — after Endava\u2019s acquisition of Comtrade in 2020.',
    highlights: [
      'Worked largely as a backend developer on a high-responsibility production product where reliability was critical',
      'Owned the Node.js / MongoDB backend and integrated Stripe payments',
      'Coordinated the development team — planned and assigned work, and reviewed contributions',
    ],
  },
  {
    id: 'the-nu',
    role: 'Lead Mobile Engineer',
    company: 'The NU',
    companyNote: 'originally Longevize',
    period: '2022\u2013present',
    summary:
      'Mobile lead at an early-stage longevity startup, owning the Flutter app end-to-end and contributing heavily to the backend.',
    highlights: [
      'Led end-to-end development of The NU\u2019s Flutter app — a customizable, multi-flavored codebase supporting multiple branded variants',
      'Built the wearable-data ingestion backend in Go (Thryve / Terra aggregation + processing pipeline) handling 10,000+ processed messages per day',
      'Maintained 90%+ test coverage across the BLoC-based mobile logic and the Go backend (bloc_test, mocktail, Testify)',
      'Helped design the serverless AWS infrastructure (Lambda, CloudFormation, DynamoDB) with cost-efficient indexing and query design',
      'Contributed to a backend migration from Node.js to Go',
      'Set up CI/CD (Codemagic, GitHub Actions) and integrated monitoring (Sentry, Firebase Crashlytics/Analytics)',
      'Established a spec-driven workflow with AI coding agents (Kiro, Codex, OpenCode + OpenSpec)',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'the-nu',
    name: 'NU Pro',
    tagline: 'Longevity platform · Flutter + Go',
    description:
      'A multi-flavored Flutter app for an early-stage longevity startup, backed by a Go wearable-data ingestion pipeline on serverless AWS. I own the mobile app end-to-end and built the backend that processes 10,000+ messages per day.',
    role: 'Lead Mobile Engineer',
    stack: ['Flutter', 'Go', 'AWS'],
    featured: true,
    logo: {
      src: '/assets/logos/the-nu.png',
      alt: 'NU Pro logo',
      dimensions: '360\u00d7360 (square, transparent PNG)',
    },
    mockups: [
      {
        src: '/assets/the-nu/screen-1.png',
        alt: 'NU Pro app — welcome screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
      {
        src: '/assets/the-nu/screen-2.png',
        alt: 'NU Pro app — home screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
      {
        src: '/assets/the-nu/screen-3.png',
        alt: 'NU Pro app — digital twin screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
      {
        src: '/assets/the-nu/screen-4.png',
        alt: 'NU Pro app — insights screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
      {
        src: '/assets/the-nu/screen-5.png',
        alt: 'NU Pro app — food screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
      {
        src: '/assets/the-nu/screen-6.png',
        alt: 'NU Pro app — health profile screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
    {
        src: '/assets/the-nu/screen-7.png',
        alt: 'NU Pro app — health wallet screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
    ],
  },
  {
    id: 'avant2go',
    name: 'Avant2GO',
    tagline: 'Car-sharing platform · Node.js + MongoDB',
    description:
      'A car-sharing and car-rental platform serving 50,000+ registered users. I owned the Node.js / MongoDB backend, integrated Stripe payments, and coordinated the development team.',
    role: 'Senior Software Engineer',
    stack: ['Node.js', 'MongoDB', 'Stripe'],
    logo: {
      src: '/assets/logos/avant2go.png',
      alt: 'Avant2GO logo',
      dimensions: '360\u00d7360 (square, transparent PNG)',
    },
    mockups: [],
    showcase: {
      src: '/assets/avant2go/product.png',
      alt: 'Avant2GO product artwork',
      dimensions: 'Transparent PNG, portrait-ish (e.g. 900\u00d71000); shown centered, object-contain',
    },
  },
  {
    id: 'amzs',
    name: 'AMZS NOMO',
    tagline: 'Multi-modal routing · Flutter',
    description:
      'A multi-modal route-planning mobile app for AMZS, built as the sole mobile developer. This was the project where I evaluated the mobile landscape and selected Flutter during its v1\u2192v2 transition.',
    role: 'Junior Software Engineer',
    stack: ['Flutter'],
    logo: {
      src: '/assets/logos/amzs.png',
      alt: 'AMZS logo',
      dimensions: '360\u00d7360 (square, transparent PNG)',
    },
    mockups: [
      {
        src: '/assets/amzs/screen-1.png',
        alt: 'AMZS route planner — map screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
      {
        src: '/assets/amzs/screen-2.png',
        alt: 'AMZS route planner — route selection screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
      {
        src: '/assets/amzs/screen-3.png',
        alt: 'AMZS route planner — route overview screen',
        dimensions: 'Pre-framed PNG (device frame included), portrait ~765\u00d71518',
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    period: '2018\u2013present',
    program: 'M.Sc. Computer & Information Science',
    institution: 'University of Ljubljana — FRI (final stage)',
  },
  {
    period: '2014\u20132018',
    program: 'B.Sc. Chemical Engineering',
    institution: 'University of Ljubljana — FKKT',
  },
  {
    period: '2010\u20132014',
    program: 'Secondary school graduate',
    institution: '\u0160kofijska gimnazija Vipava',
  },
];

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;
