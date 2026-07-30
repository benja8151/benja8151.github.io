// Single source of truth for site content, in two locales (en + sl).
// Language-neutral data (images, tech tokens, social links) is shared; only the
// human-readable copy differs per locale. Components read the active locale via
// `getContent(Astro.currentLocale)`.

export type Locale = 'en' | 'sl';
export const locales: Locale[] = ['en', 'sl'];
export const defaultLocale: Locale = 'en';

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

export interface SectionMeta {
  eyebrow: string;
  title: string;
}

export interface UI {
  nav: { about: string; skills: string; experience: string; projects: string; education: string; contact: string };
  cvShort: string;
  downloadCv: string;
  emailLabel: string;
  proficient: string;
  familiar: string;
  sections: {
    about: SectionMeta;
    skills: SectionMeta;
    experience: SectionMeta;
    projects: SectionMeta;
    education: SectionMeta;
    contact: SectionMeta & { footer: string };
  };
  langName: string;
  metaDescription: string;
}

export interface Content {
  profile: Profile;
  about: string[];
  skills: SkillGroup[];
  experience: ExperienceRole[];
  projects: Project[];
  education: EducationEntry[];
  sections: { id: string; label: string }[];
  ui: UI;
}

// --- Shared, language-neutral data ----------------------------------------
const social: SocialLinks = {
  github: 'https://github.com/benja8151',
  linkedin: 'https://www.linkedin.com/in/benjamin-smrdelj-14a637146/',
  email: 'benjamin.smrdelj@gmail.com',
};
const profileImage = '/assets/profile.png';

const FRAME = 'Pre-framed PNG (device frame included), portrait ~765\u00d71518';
const nuMockups: ProjectImageSlot[] = [
  { src: '/assets/the-nu/screen-1.png', alt: 'NU Pro app screen 1', dimensions: FRAME },
  { src: '/assets/the-nu/screen-2.png', alt: 'NU Pro app screen 2', dimensions: FRAME },
  { src: '/assets/the-nu/screen-3.png', alt: 'NU Pro app screen 3', dimensions: FRAME },
  { src: '/assets/the-nu/screen-4.png', alt: 'NU Pro app screen 4', dimensions: FRAME },
  { src: '/assets/the-nu/screen-5.png', alt: 'NU Pro app screen 5', dimensions: FRAME },
  { src: '/assets/the-nu/screen-6.png', alt: 'NU Pro app screen 6', dimensions: FRAME },
  { src: '/assets/the-nu/screen-7.png', alt: 'NU Pro app screen 7', dimensions: FRAME },
];
const amzsMockups: ProjectImageSlot[] = [
  { src: '/assets/amzs/screen-1.png', alt: 'AMZS NOMO screen 1', dimensions: FRAME },
  { src: '/assets/amzs/screen-2.png', alt: 'AMZS NOMO screen 2', dimensions: FRAME },
  { src: '/assets/amzs/screen-3.png', alt: 'AMZS NOMO screen 3', dimensions: FRAME },
];
const nuLogo: ProjectImageSlot = { src: '/assets/logos/the-nu.png', alt: 'NU Pro logo', dimensions: '360\u00d7360 (square, transparent PNG)' };
const avantLogo: ProjectImageSlot = { src: '/assets/logos/avant2go.png', alt: 'Avant2GO logo', dimensions: '360\u00d7360 (square, transparent PNG)' };
const amzsLogo: ProjectImageSlot = { src: '/assets/logos/amzs.png', alt: 'AMZS logo', dimensions: '360\u00d7360 (square, transparent PNG)' };
const avantShowcase: ProjectImageSlot = { src: '/assets/avant2go/product.png', alt: 'Avant2GO product artwork', dimensions: 'Transparent PNG, portrait-ish (e.g. 900\u00d71000); shown centered, object-contain' };

const navIds = ['about', 'skills', 'experience', 'projects', 'education', 'contact'] as const;
function buildSections(nav: UI['nav']) {
  return navIds.map((id) => ({ id, label: nav[id] }));
}

// --- English ---------------------------------------------------------------
const en: Content = {
  profile: {
    name: 'Benjamin Smrdelj',
    tagline: 'Full-Stack & Mobile Engineer',
    location: 'Pivka, Slovenia',
    intro:
      'Flutter · React · Go · Node.js · AWS. I lead mobile app development and build production backend systems — working fluently across mobile, backend, and cloud.',
    social,
    image: profileImage,
    imageAlt: 'Portrait of Benjamin Smrdelj',
    cvPdf: '/Benjamin-Smrdelj-CV-EN.pdf',
  },
  about: [
    'Full-stack software engineer with deep experience across mobile, backend, and cloud. I specialize in Flutter, Go, Node.js, and serverless AWS architectures, with a track record leading mobile app development and backend systems in production.',
    'Currently finishing a master\u2019s in Computer and Information Science — applying machine learning to chemical reaction classification. Paired with a chemical-engineering background, it lets me work fluently at the intersection of the two fields.',
    'Responsible, reliable, and precise, with a self-critical streak that keeps me improving. Independent by nature, but I collaborate easily — open to input and happy to bring my own ideas to a team.',
  ],
  skills: [
    { category: 'Mobile / Frontend', proficient: ['Flutter', 'React'], familiar: ['React Native', 'Angular', 'Swift', 'Kotlin'] },
    { category: 'Backend', proficient: ['Go', 'Node.js', 'REST APIs'], familiar: ['Express', 'Fastify'] },
    { category: 'Cloud & Databases', proficient: ['AWS Lambda', 'DynamoDB', 'Kinesis', 'S3', 'CloudFormation', 'MongoDB'], familiar: ['Redis', 'Docker'] },
    { category: 'Languages', proficient: ['Dart', 'Go', 'TypeScript', 'JavaScript'], familiar: ['Python', 'C#', 'C++'] },
    { category: 'AI Tools', proficient: ['Kiro (CLI + IDE)', 'OpenCode'], familiar: ['Codex', 'Claude Code', 'OpenSpec', 'OpenRouter', 'Pi'] },
    { category: 'Other', proficient: ['Git', 'Codemagic', 'GitHub Actions', 'Sentry', 'Firebase', 'Figma'], familiar: ['Cypress', 'Stripe', 'Django'] },
  ],
  experience: [
    {
      id: 'postojna', role: 'Cave Guard', company: 'Postojna Cave d.d.', period: 'Seasonal, 2014\u20132016', minimal: true,
      summary: 'First work experience — seasonal student work responsible for visitor safety and assisting elderly and disabled guests; early exposure to teamwork and public-facing communication.',
      highlights: [],
    },
    {
      id: 'comtrade', role: 'Junior Software Engineer', company: 'Comtrade d.o.o.', companyNote: 'later Endava', period: '2019\u20132020',
      summary: 'Started as a student developer working across web and mobile client projects.',
      highlights: [
        'Built features on client web projects using React and Node.js',
        'Worked with the Cypress framework on end-to-end testing for an e-commerce platform',
        'Sole mobile developer (in a 3-person team) on a multi-modal route-planning app for AMZS — evaluated Swift, Kotlin, React Native, Ionic, and Flutter before selecting Flutter for the project — my first experience with mobile development, during Flutter\u2019s transition from v1 to v2',
      ],
    },
    {
      id: 'endava', role: 'Senior Software Engineer', company: 'Endava Digital Solutions', period: '2020\u20132022',
      summary: 'Promoted to lead developer on Avant2GO — a car-sharing and car-rental platform serving 50,000+ registered users — after Endava\u2019s acquisition of Comtrade in 2020.',
      highlights: [
        'Worked as a backend developer on a high-responsibility production product where reliability and responsiveness were critical',
        'Owned the Node.js/MongoDB backend and integrated Stripe payments',
        'Coordinated the development team — planned and assigned work, and reviewed the team\u2019s contributions',
      ],
    },
    {
      id: 'the-nu', role: 'Lead Mobile Engineer', company: 'The NU', companyNote: 'originally Longevize', period: '2022\u2013present',
      summary: 'Mobile lead at an early-stage longevity startup, owning the Flutter app end-to-end and contributing heavily to the backend.',
      highlights: [
        'Led end-to-end development of The NU\u2019s Flutter app, built as a customizable, multi-flavored codebase supporting multiple branded variants',
        'Contributed to a backend migration from Node.js to Go and built the wearable-data ingestion backend in Go: data aggregation, processing and storage pipeline — handling 10,000+ processed messages per day',
        'Maintained 90%+ test coverage across the mobile app\u2019s BLoC-based business logic and the Go wearables backend',
        'Helped design the serverless AWS infrastructure, including cost-efficient DynamoDB indexing and query design',
        'Set up CI/CD pipelines (Codemagic, GitHub Actions) and integrated monitoring and crash reporting (Sentry, Firebase Crashlytics/Analytics)',
        'Established a spec-driven workflow with AI coding agents (Kiro, Codex, OpenCode + OpenSpec)',
      ],
    },
  ],
  projects: [
    {
      id: 'the-nu', name: 'NU Pro', tagline: 'Longevity platform · Flutter + Go', role: 'Lead Mobile Engineer', stack: ['Flutter', 'Go', 'AWS'], featured: true,
      description: 'A multi-flavored Flutter app for an early-stage longevity startup, backed by a Go wearable-data ingestion pipeline on serverless AWS. I own the mobile app end-to-end and built the backend that processes 10,000+ messages per day.',
      logo: nuLogo, mockups: nuMockups,
    },
    {
      id: 'avant2go', name: 'Avant2GO', tagline: 'Car-sharing platform · Node.js + MongoDB', role: 'Senior Software Engineer', stack: ['Node.js', 'MongoDB', 'Stripe'],
      description: 'A car-sharing and car-rental platform serving 50,000+ registered users. I owned the Node.js / MongoDB backend, integrated Stripe payments, and coordinated the development team.',
      logo: avantLogo, mockups: [], showcase: avantShowcase,
    },
    {
      id: 'amzs', name: 'AMZS NOMO', tagline: 'Multi-modal routing · Flutter', role: 'Junior Software Engineer', stack: ['Flutter'],
      description: 'A multi-modal route-planning mobile app for AMZS, built as the sole mobile developer. This was the project where I evaluated the mobile landscape and selected Flutter during its v1\u2192v2 transition.',
      logo: amzsLogo, mockups: amzsMockups,
    },
  ],
  education: [
    { period: '2018\u2013present', program: 'M.Sc. Computer & Information Science', institution: 'University of Ljubljana — FRI (final stage)' },
    { period: '2014\u20132018', program: 'B.Sc. Chemical Engineering', institution: 'University of Ljubljana — FKKT' },
    { period: '2010\u20132014', program: 'Secondary school graduate', institution: '\u0160kofijska gimnazija Vipava' },
  ],
  sections: [],
  ui: {
    nav: { about: 'About', skills: 'Skills', experience: 'Experience', projects: 'Projects', education: 'Education', contact: 'Contact' },
    cvShort: 'CV',
    downloadCv: 'Download CV',
    emailLabel: 'Email',
    proficient: 'Proficient',
    familiar: 'Familiar with',
    sections: {
      about: { eyebrow: 'About', title: 'Working across the stack' },
      skills: { eyebrow: 'Skills', title: 'Tools & technologies' },
      experience: { eyebrow: 'Experience', title: 'A path through the stack' },
      projects: { eyebrow: 'Showcase', title: "Products I've built" },
      education: { eyebrow: 'Education', title: 'Academic background' },
      contact: {
        eyebrow: 'Contact',
        title: 'Open to interesting mobile and full-stack work. The fastest way to reach me is email.',
        footer: 'Built with Astro \u0026 Tailwind',
      },
    },
    langName: 'English',
    metaDescription: 'Portfolio of Benjamin Smrdelj, a Full-Stack & Mobile Engineer specializing in Flutter, Go, Node.js and serverless AWS. Building production mobile apps and backend systems.',
  },
};
en.sections = buildSections(en.ui.nav);

// --- Slovenian -------------------------------------------------------------
const sl: Content = {
  profile: {
    name: 'Benjamin Smrdelj',
    tagline: 'Full-stack & mobilni inženir',
    location: 'Pivka, Slovenija',
    intro:
      'Flutter · React · Go · Node.js · AWS. Vodim razvoj mobilnih aplikacij in gradim produkcijske zaledne sisteme — tekoče se gibljem med razvojem mobilnih, zalednih in oblačnih aplikacij.',
    social,
    image: profileImage,
    imageAlt: 'Portret Benjamina Smrdelja',
    cvPdf: '/Benjamin-Smrdelj-CV-SLO.pdf',
  },
  about: [
    'Sem full-stack programski inženir z bogatimi izkušnjami na področju mobilnega, zalednega in oblačnega razvoja. Specializiran sem za Flutter, Go, Node.js in brezstrežniško AWS arhitekturo, z izkušnjami vodenja razvoja mobilnih aplikacij in zalednih sistemov v produkciji.',
    'Trenutno zaključujem magistrski študij računalništva in informatike — strojno učenje uporabljam za klasifikacijo kemijskih reakcij. V kombinaciji s kemijsko-inženirskim ozadjem mi to omogoča tekoče delo na presečišču obeh področij.',
    'Odgovoren, zanesljiv in natančen, s samokritično žilico, ki me žene k nenehnemu izboljševanju. Po naravi sem samostojen, a zlahka sodelujem — sem odprt za predloge in vesel, da v ekipo prispevam svoje ideje.',
  ],
  skills: [
    { category: 'Mobilni razvoj / Frontend', proficient: ['Flutter', 'React'], familiar: ['React Native', 'Angular', 'Swift', 'Kotlin'] },
    { category: 'Backend', proficient: ['Go', 'Node.js', 'REST API-ji'], familiar: ['Express', 'Fastify'] },
    { category: 'Oblak & baze podatkov', proficient: ['AWS Lambda', 'DynamoDB', 'Kinesis', 'S3', 'CloudFormation', 'MongoDB'], familiar: ['Redis', 'Docker'] },
    { category: 'Programski jeziki', proficient: ['Dart', 'Go', 'TypeScript', 'JavaScript'], familiar: ['Python', 'C#', 'C++'] },
    { category: 'AI orodja', proficient: ['Kiro (CLI + IDE)', 'OpenCode'], familiar: ['Codex', 'Claude Code', 'OpenSpec', 'OpenRouter', 'Pi'] },
    { category: 'Drugo', proficient: ['Git', 'Codemagic', 'GitHub Actions', 'Sentry', 'Firebase', 'Figma'], familiar: ['Cypress', 'Stripe', 'Django'] },
  ],
  experience: [
    {
      id: 'postojna', role: 'Čuvaj v jami', company: 'Postojnska jama d.d.', period: 'Sezonsko delo, 2014\u20132016', minimal: true,
      summary: 'Prve delovne izkušnje — sezonsko študentsko delo, kjer sem bil odgovoren za varnost obiskovalcev ter pomoč starejšim in gibalno oviranim gostom — zgodnji stik z delom v kolektivu in javno komunikacijo.',
      highlights: [],
    },
    {
      id: 'comtrade', role: 'Junior programski inženir', company: 'Comtrade d.o.o.', companyNote: 'kasneje Endava', period: '2019\u20132020',
      summary: 'Kot študent sem kariero začel z razvojem spletnih in mobilnih projektov za različne stranke.',
      highlights: [
        'Razvijal spletne funkcionalnosti z uporabo tehnologij, kot sta React in Node.js',
        'Delal z ogrodjem Cypress za end-to-end testiranje spletne trgovine električnih koles',
        'Mobilni razvijalec (v 3-članski ekipi) aplikacije za načrtovanje multimodalnih poti za AMZS — ocenil sem različna mobilna ogrodja (Swift, Kotlin, React Native, Ionic in Flutter), preden sem za projekt izbral Flutter — moja prva izkušnja z mobilnim razvojem, v času prehoda Flutterja med različicama v1 in v2',
      ],
    },
    {
      id: 'endava', role: 'Senior programski inženir', company: 'Endava Digital Solutions', period: '2020\u20132022',
      summary: 'Po prevzemu podjetja Comtrade s strani Endave leta 2020 sem napredoval v vodilnega razvijalca na projektu Avant2GO — platformi za deljenje in izposojo avtomobilov z več kot 50.000 uporabniki.',
      highlights: [
        'Delal kot zaledni razvijalec v visoko odgovornem produkcijskem okolju, kjer sta bila zanesljivost in odzivnost ključna',
        'Odgovoren za Node.js/MongoDB zaledje in integracijo Stripe plačil',
        'Koordiniral razvojno ekipo — načrtoval in dodeljeval delo ter pregledoval prispevke ekipe',
      ],
    },
    {
      id: 'the-nu', role: 'Vodja mobilnega razvoja', company: 'The NU', companyNote: 'prej Longevize', period: '2022\u2013danes',
      summary: 'Vodilni programski inženir za razvoj mobilne programske opreme v zagonskem podjetju za dolgoživost — odgovoren za celoten razvoj Flutter aplikacije in močno vpet tudi v razvoj zalednih sistemov.',
      highlights: [
        'Vodil razvoj mobilne Flutter aplikacije podjetja The NU — zgrajena kot prilagodljiva aplikacija z več različicami za različne blagovne znamke',
        'Sodeloval pri migraciji zaledja iz Node.js na Go ter razvil zaledni sistem za zajem podatkov iz nosljivih naprav — cevovod za agregacijo, obdelavo in shranjevanje podatkov, ki obdeluje več kot 10.000 sporočil na dan',
        'Vzdrževal več kot 90 % testno pokritost poslovne logike v mobilni aplikaciji (arhitektura BLoC) in zalednega sistema v Go-ju',
        'Pomagal pri zasnovi brezstrežniške AWS infrastrukture, vključno z učinkovitim indeksiranjem in poizvedbami v DynamoDB',
        'Nastavil CI/CD cevovode (Codemagic, GitHub Actions) in storitve za spremljanje delovanja ter poročanje o napakah (Sentry, Firebase Crashlytics/Analytics)',
        'Uvedel specifikacijsko usmerjen delovni proces z AI agenti za programiranje (Kiro, Codex, OpenCode + OpenSpec)',
      ],
    },
  ],
  projects: [
    {
      id: 'the-nu', name: 'NU Pro', tagline: 'Platforma za dolgoživost · Flutter + Go', role: 'Vodja mobilnega razvoja', stack: ['Flutter', 'Go', 'AWS'], featured: true,
      description: 'Več-različična Flutter aplikacija za zagonsko podjetje za dolgoživost, podprta z Go cevovodom za zajem podatkov iz nosljivih naprav na brezstrežniškem AWS. Aplikacijo razvijam od začetka do konca in sem zgradil zaledje, ki obdeluje več kot 10.000 sporočil na dan.',
      logo: nuLogo, mockups: nuMockups,
    },
    {
      id: 'avant2go', name: 'Avant2GO', tagline: 'Car-sharing platforma · Node.js + MongoDB', role: 'Senior programski inženir', stack: ['Node.js', 'MongoDB', 'Stripe'],
      description: 'Platforma za deljenje in izposojo avtomobilov z več kot 50.000 registriranimi uporabniki. Odgovoren sem bil za Node.js / MongoDB zaledje, integriral plačila Stripe in koordiniral razvojno ekipo.',
      logo: avantLogo, mockups: [], showcase: avantShowcase,
    },
    {
      id: 'amzs', name: 'AMZS NOMO', tagline: 'Multimodalno načrtovanje poti · Flutter', role: 'Junior programski inženir', stack: ['Flutter'],
      description: 'Mobilna aplikacija za načrtovanje multimodalnih poti za AMZS, ki sem jo razvil kot edini mobilni razvijalec. Na tem projektu sem ocenil mobilne tehnologije in izbral Flutter v času prehoda z v1 na v2.',
      logo: amzsLogo, mockups: amzsMockups,
    },
  ],
  education: [
    { period: '2018\u2013danes', program: 'Magistrski študij računalništva in informatike', institution: 'Fakulteta za računalništvo in informatiko, Univerza v Ljubljani (v zaključni fazi)' },
    { period: '2014\u20132018', program: 'Diplomirani inženir kemijskega inženirstva', institution: 'Fakulteta za kemijo in kemijsko tehnologijo, Univerza v Ljubljani' },
    { period: '2010\u20132014', program: 'Splošna matura', institution: '\u0160kofijska gimnazija Vipava' },
  ],
  sections: [],
  ui: {
    nav: { about: 'O meni', skills: 'Znanja', experience: 'Izkušnje', projects: 'Projekti', education: 'Izobrazba', contact: 'Kontakt' },
    cvShort: 'CV',
    downloadCv: 'Prenesi življenjepis',
    emailLabel: 'E-pošta',
    proficient: 'Obvladam',
    familiar: 'Poznam',
    sections: {
      about: { eyebrow: 'O meni', title: 'Full-stack razvijalec' },
      skills: { eyebrow: 'Znanja', title: 'Orodja in tehnologije' },
      experience: { eyebrow: 'Izkušnje', title: 'Moja karierna pot' },
      projects: { eyebrow: 'Predstavitev', title: 'Produkti, kjer sem sodeloval' },
      education: { eyebrow: 'Izobrazba', title: 'Akademsko ozadje' },
      contact: {
        eyebrow: 'Kontakt',
        title: 'Odprt sem za zanimive mobilne in full-stack projekte. Najhitreje me dosežete po e-pošti.',
        footer: 'Izdelano z Astro \u0026 Tailwind',
      },
    },
    langName: 'Slovenščina',
    metaDescription: 'Portfelj Benjamina Smrdelja, full-stack in mobilnega inženirja, specializiranega za Flutter, Go, Node.js in brezstrežniški AWS. Gradnja produkcijskih mobilnih aplikacij in zalednih sistemov.',
  },
};
sl.sections = buildSections(sl.ui.nav);

const content: Record<Locale, Content> = { en, sl };

export function getContent(locale?: string | null): Content {
  return locale === 'sl' ? content.sl : content.en;
}

/** Path prefix for a locale ('' for the default en, '/sl' for Slovenian). */
export function localePath(locale: Locale): string {
  return locale === 'sl' ? '/sl/' : '/';
}
