// ============================================================
// PROJECT IMAGES
// Ganti nama atau path gambar proyek di sini — satu tempat aja.
// File gambar ada di: public/images/projects/
// ============================================================
export const projectImages = {
  myKanz:     "/images/projects/MyKanz.png",
  monitoring: "/images/projects/Monitoring.png",
  bitMove:    "/images/projects/Bitmove.png",
  sipirang:   "/images/projects/Sipirang.png",
};

export const siteConfig = {
  name: "Rois", // Dummy placeholder, change later
  email: "roisanwar44@gmail.com", // Dummy placeholder
  navLinks: [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ],
  socials: {
    github: "https://github.com/roisanwr",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/roisanwr",
  },
};

export const heroData = {
  greeting: "Hi, my name is",
  name: "Rois Anwar.", // Dummy placeholder
  typedStrings: [
    "intuitive UI.",
    "Local AI models.",
    "scalable systems.",
    "smart AI tools.",
  ],
  description:
    "I’m a developer passionate about turning ideas into working digital products. Driven by curiosity and adaptability, I am currently diving deep into full-stack development and local AI models.",
  ctaText: "Find more about me!",
  ctaLink: "https://github.com/roisanwr",
};

export const aboutData = {
  paragraphs: [
    "Hello! I'm Rois. My journey into software development wasn't a straight, predictable line. It actually started back in high school, driven by a simple ambition: I wanted to break into a newly formed IT division of a prominent student organization. That goal pushed me to scrap together my first lines of HTML and CSS, and hack my way through WordPress. It was messy and full of trial and error, but that raw desire to figure things out and build solutions became the foundation of my career.",
    "There was a point where the rapid rise of AI made me question the future of software development, it felt like the industry was shrinking and traditional coding would soon become obsolete. But taking a step back, I realized a crucial truth while AI disrupts, it also drastically lowers the barrier to entry for those willing to adapt. I immersed myself in the AI ecosystem, mastering how to leverage it to build faster and smarter. Today, my focus isn't just on writing syntax; it's about integrating generative AI to optimize complex systems, and I am currently diving deep into building and deploying local AI models.",
  ],
  technologies: [
    "JavaScript",
    "TypeScript",
    "React",
    "Laravel",
    "Node.js",
    "Python",
  ],
  profileImage: "/images/fotoku.jpeg",
};

export const experienceData = [
  {
    id: "future-association",
    company: "FUTURE (English Student Association)",
    role: "President",
    duration: "2021 — 2023",
    achievements: [
    "Led the student association for two consecutive years, orchestrating language development programs and fostering a culture of English proficiency.",
    "Directed organizational strategy and managed team coordination to execute impactful student-led initiatives.",
    ],
  },
  {
    id: "pondok-it",
    company: "Pondok IT Oase Ilmu",
    role: "UI/UX & Multimedia Design Instructor",
    duration: "Jul 2024 — 2025",
    achievements: [
    "Developed and executed an end-to-end multimedia curriculum covering UI/UX principles, graphic design, and video editing tailored specifically for junior high school students.",
    "Mentored students by translating complex digital product design concepts into accessible learning modules, fostering early technical literacy and creative problem-solving skills.",
    "Managed end-to-end classroom facilitation, ensuring clear delivery of technical materials and guiding students through practical, hands-on digital projects.",
    ],
  },
  {
    id: "mada-wikri",
    company: "PT Mada Wikri Tunggal",
    role: "Full-Stack Developer Intern",
    duration: "Feb 2026 — Present",
    achievements: [
    "Supported the digitalization of manual company workflows by developing and maintaining internal web applications.",
    "Provided daily IT support and direct troubleshooting for hardware, software, and network issues across departments.",
    "Assisted in designing UI/UX and creating multimedia assets for the company.",
    ],
  },

];

export const workData = [
  {
  title: "MyKanz - Personal Finance & Portfolio Tracker",
  isFeatured: true,
  description: "A comprehensive personal finance application to centrally track cash flows across multiple wallets. It integrates a live-pricing investment dashboard to monitor real-time asset performance, and streamlines data entry through a Smart Wallet Routing system that automatically logs transactions via Gmail Push notifications and a Telegram bot.",
  tech: ["Next.js", "Prisma", "Gmail API", "Telegram Bot"],
  githubLink: "#",
  externalLink: "#",
  image: projectImages.myKanz,
  },
  {
  title: "Permit & Compliance Portal",
  isFeatured: true,
  description: "A unified platform that streamlines corporate compliance by centralizing permit document management across multiple plant locations. It features an interactive map and progress dashboard to visualize geographical distribution and monitor real-time approval statuses, alongside an automated background alert system that proactively notifies stakeholders of expirations via Email and WhatsApp.",
  tech: ["Maps API", "WhatsApp API", "Email API", "Background Jobs"],
  githubLink: "#",
  externalLink: "#",
  image: projectImages.monitoring,
  },
  {
  title: "BitMove - Gamified Fitness & Mission Platform",
  isFeatured: true,
  description: "A gamified fitness and workout tracking platform designed to deliver an interactive experience for users managing daily quests and training programs. It integrates secure authentication and a robust data architecture, alongside an interactive analytics dashboard to visualize workout progress and track performance quotas effectively.",
  tech: ["Next.js", "React", "Supabase", "Prisma", "Next-Auth", "Recharts"],
  githubLink: "#",
  externalLink: "#",
  image: projectImages.bitMove,
  },
];

export const contactData = {
  header: "04. What's Next?",
  title: "Get In Touch",
  description:
    "Although I’m currently open to new opportunities and projects. Whether you have a problem to solve, a system to build, or just want to talk about tech and AI or just want to say hi, my inbox is always open. feel free to reach out.",
  ctaText: "Say Hello",
  ctaLink: "mailto:hello@roisanwar44@gmail.com", // Dummy placeholder
};

export const footerData = {
  text: "Built by Rois Anwar",
  links: [
     
  ],
};
