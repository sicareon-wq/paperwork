import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'sicareon@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await db.user.upsert({
    where: { email: adminEmail },
    update: { password: passwordHash, role: 'MASTER' },
    create: { email: adminEmail, password: passwordHash, role: 'MASTER' },
  });

  await db.biodata.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      name: 'Muhammad Kasyfu Najib',
      location: 'Blitar, East Java, Indonesia',
      headline: 'AI Evaluator | Data Annotator | QA Tester (AI)',
      summary:
        'Entry-level AI Evaluator and Data Annotator with hands-on experience in chatbot logic testing, adversarial red teaming, and multimodal (image, text, and audio) data annotation using CVAT. Active contributor across Outlier, Toloka, Mindrift, and Appen, maintaining an average annotation quality score of 78.6/100 across 300 completed tasks. Proficient in Python, JavaScript, Linux environments, and structured AI model evaluation. Available for remote freelance or contract roles.',
      phone: '+62 851-5855-1178',
      email: 'sicareon@gmail.com',
      linkedin: 'https://www.linkedin.com/in/muhammad-kasyfu-najib',
      github: 'https://www.github.com/sicareon-wq',
      experience: [
        {
          title: 'AI Model Tester & Evaluator',
          organization: 'Freelance',
          period: 'January 2025 – Present',
          bullets: [
            'Evaluated chatbot logic and conversational workflows across 5+ AI models (GPT, Gemini, DeepSeek, Claude, OpenCode, and Hermes), systematically documenting errors and edge cases.',
            'Performed boundary and red-teaming tests to identify unsafe, biased, or inconsistent chatbot responses.',
            'Provided structured feedback and technical documentation to support model alignment and performance improvement.',
          ],
        },
        {
          title: 'AI Data Annotator',
          organization: 'Freelance (Outlier, Toloka, Mindrift, Appen)',
          period: 'June 2026 – Present',
          bullets: [
            'Annotated and labeled multimodal image, text, and audio datasets using CVAT and platform-specific annotation tools.',
            'Maintained a 78.6/100 average quality score across 300 completed annotation tasks.',
            'Ensured high data accuracy and labeling consistency in strict accordance with project guidelines.',
          ],
        },
        {
          title: 'Retail Staff',
          organization: 'Alfamidi',
          period: 'June 2025 – August 2025',
          bullets: [
            'Managed daily retail store operations and processed customer point-of-sale transactions accurately.',
            'Maintained product displays, visual merchandising standards, and inventory organization.',
          ],
        },
        {
          title: 'Customer Service & Logistics',
          organization: 'Freelance',
          period: 'October 2024 – May 2025',
          bullets: [
            'Customer Service Crew (November 2024 – May 2025): Handled customer inquiries, resolved service issues, and supported daily operational workflows.',
            'Logistics Courier (October 2024): Coordinated last-mile package delivery and daily route logistics tasks.',
          ],
        },
      ] as any,
      projects: [
        {
          title: 'AI Chatbot Evaluation Case Study',
          description:
            'Evaluated GPT, Gemini, DeepSeek, and Claude responses for reasoning logic, safety compliance, and output consistency. Documented 50+ structured test cases and edge-case scenarios.',
        },
        {
          title: 'Annotation Quality Portfolio',
          description:
            'Completed 300 image, text, and audio annotation tasks with a verified 78.6/100 average quality score. Maintained labeling consistency and guideline compliance across multiple crowd-training platforms.',
        },
        {
          title: 'GitHub Portfolio',
          description:
            'Maintained an active repository (github.com/sicareon-wq) containing programming scripts and AI evaluation documentation.',
        },
      ] as any,
      education: [
        {
          institution: 'SMK Al Mahrusiyah 3 Ngampel Kediri',
          major: 'Computer and Network Engineering (Teknik Komputer dan Jaringan)',
          period: 'Graduated 2024',
          gpa: '83.6/100',
        },
      ] as any,
      certifications: [
        {
          title: 'Junior Graphic Design Training',
          issuer: 'BLK (Balai Pelatihan Kerja)',
          period: 'August 2024 – September 2024',
        },
        {
          title: 'MikroTik Certified Network Associate (MTCNA)',
          issuer: 'MikroTik',
          period: 'September 2023',
          note: 'Completed vocational certification in Computer and Network Engineering (MikroTik VLAN) with a competent score.',
        },
      ] as any,
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Python (4+ years)',
        'Rust',
        'React',
        'Tailwind CSS',
        'Vite (2+ years)',
        'CVAT',
        'Image Annotation',
        'Text Annotation',
        'Audio Annotation',
        'Chatbot Evaluation',
        'Red Teaming',
        'QA Testing (2+ years)',
        'NLP Basics',
        'Linux (Kali, Debian, Ubuntu, antiX, Arch, Mint)',
        'Adobe Illustrator',
        'Canva',
        'Inkscape',
        'GIMP',
        'Article Writing & Research',
        'Digital Documentation',
        'Basic Cybersecurity Reporting',
        'Network Documentation (Linux)',
      ] as any,
      languages: ['Indonesian (Native)', 'English (Intermediate – Professional Working)', 'Javanese (Native)'] as any,
      achievements: [
        'Achieved a 78.6/100 average annotation quality score across 300 sample data points.',
        'Completed MikroTik VLAN vocational certification with a competent status.',
        'Graduated with an 83.6/100 GPA from a vocational high school in Computer and Network Engineering.',
      ] as any,
    },
  });

  const portfolios = [
    {
      slug: 'ai-chatbot-evaluation-case-study',
      title: 'AI Chatbot Evaluation Case Study',
      summary: 'Evaluation of GPT, Gemini, DeepSeek, and Claude for reasoning, safety, and consistency.',
      description:
        'Evaluated GPT, Gemini, DeepSeek, and Claude responses for reasoning logic, safety compliance, and output consistency. Documented 50+ structured test cases and edge-case scenarios.',
      category: 'AI Evaluation',
      tags: ['AI', 'Chatbot', 'Red Teaming', 'QA'],
      featured: true,
    },
    {
      slug: 'annotation-quality-portfolio',
      title: 'Annotation Quality Portfolio',
      summary: '300 multimodal annotation tasks with a verified 78.6/100 average quality score.',
      description:
        'Completed 300 image, text, and audio annotation tasks with a verified 78.6/100 average quality score across Outlier, Toloka, Mindrift, and Appen.',
      category: 'Data Annotation',
      tags: ['CVAT', 'Annotation', 'Multimodal', 'QA'],
      featured: true,
    },
    {
      slug: 'github-portfolio',
      title: 'GitHub Portfolio',
      summary: 'Active repository with programming scripts and AI evaluation documentation.',
      description:
        'Maintained an active repository (github.com/sicareon-wq) containing programming scripts and AI evaluation documentation.',
      category: 'Software',
      tags: ['GitHub', 'Python', 'JavaScript'],
      featured: false,
    },
  ];

  for (const p of portfolios) {
    await db.portfolio.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        description: p.description,
        category: p.category,
        tags: p.tags,
        featured: p.featured,
      },
      create: p,
    });
  }

  const researches = [
    {
      slug: 'ai-evaluation-notes',
      title: 'Notes on AI Model Evaluation',
      excerpt: 'Practical notes on evaluating chatbot logic, safety, and consistency.',
      content:
        'This post collects practical notes from evaluating multiple AI models (GPT, Gemini, DeepSeek, Claude, OpenCode, Hermes) for reasoning logic, safety compliance, and output consistency, including red-teaming and boundary testing approaches.',
      category: 'AI Evaluation',
    },
    {
      slug: 'networking-notes',
      title: 'Networking & Subnetting Basics',
      excerpt: 'Quick reference for IPv4 subnetting and host counts.',
      content:
        'A short reference on IPv4 subnetting: network and broadcast addresses, subnet masks, and host counts for common CIDR blocks (e.g. /24 = 254 hosts, /30 = 2 hosts).',
      category: 'Networking',
    },
  ];

  for (const r of researches) {
    await db.research.upsert({
      where: { slug: r.slug },
      update: {
        title: r.title,
        excerpt: r.excerpt,
        content: r.content,
        category: r.category,
        published: true,
      },
      create: { ...r, published: true },
    });
  }

  await db.playgroundWidget.upsert({
    where: { slug: 'subnet-calculator' },
    update: { name: 'Subnet Calculator', type: 'subnet-calculator', order: 0 },
    create: {
      name: 'Subnet Calculator',
      slug: 'subnet-calculator',
      type: 'subnet-calculator',
      config: {},
      order: 0,
    },
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
