export const profile = {
  name: 'Rituraj Kumar',
  title: 'Full-Stack Developer',
  location: 'New Delhi',
  email: 'kumar.rituraj181@gmail.com',
  github: 'https://github.com/Rituraj-Kumar1',
  linkedin: 'https://www.linkedin.com/in/rituraj-kumar-0268b132a',
  leetcode: 'https://leetcode.com/u/learn0x1',
  resumeUrl: '/Rituraj_Resume.pdf',
  bio: "I’m a Computer Science undergrad at IIIT Vadodara–ICD, passionate about building intelligent, scalable, and user-focused web applications. I specialize in full-stack development using the MERN stack and love integrating AI and real-time features to create modern digital experiences.",
};

export const about = {
  short:
    "Hi, I’m Rituraj Kumar, a full-stack developer who enjoys creating clean, responsive, and functional web applications. I like taking small ideas and turning them into something real through code — that process of building and refining is what keeps me hooked.",
  highlights: [
    'I work mainly with the MERN stack and enjoy experimenting with new tools and frameworks that make development smoother and more efficient.',
    'Lately, I’ve been exploring how AI can enhance user experiences and make web apps more intuitive and intelligent.',
    'I’m always curious about how things work behind the scenes — from backend APIs and databases to the way interfaces interact with users.',
    'Each project I work on teaches me something new about building better, faster, and more thoughtful products.',
    'Technologies I’ve been working with recently: JavaScript (ES6+), React, Node.js, Express.js, MongoDB, Firebase, Tailwind CSS.',
  ],
};

export const experience = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'Kinder Glam',
    companyUrl: 'https://www.kinderglam.in/',
    period: 'May 2025 – July 2025',
    summary: 'At Kinder Glam, I built core e-commerce functionalities from scratch, including:',
    points: [
      'Shopping Cart & Checkout Flow: Designed dynamic cart logic and multi-step checkout UI with live price updates.',
      'Secure Payments: Integrated Razorpay gateway with server-side validation for seamless transactions.',
      'User Engagement: Built chat support and product review components with media uploads.',
      'Backend Architecture: Developed 25+ APIs and database schemas for orders, payments, and tickets.',
      'Performance Optimization: Achieved <150 ms API responses and <50 ms UI updates for cart interactions.',
    ],
  },
  {
    role: 'Secretary',
    company: "Uktam: The Orator’s Society",
    period: 'June 2023 – April 2025',
    points: [
      'Led a 10-member organizing team to conduct 12+ inter-college public speaking events (300+ attendees).',
      'Increased participation by 25% and secured 3 sponsorships for flagship events.',
      'Mentored new members in event coordination and on-stage communication.',
    ],
  },
];

export const education = [
  {
    degree: 'B.Tech – Computer Science and Engineering',
    school: 'IIIT Vadodara – International Campus Diu',
    period: 'Expected 2026',
    details: 'CPI: 7.26 / 10.0. Key Courses: DSA, OOP, DBMS, OS, AI, ML, Networks, Software Engineering',
  },
];

export const skills = {
  Languages: ['C', 'C++', 'HTML', 'JavaScript (ES6+)', 'Python'],
  Frontend: ['React.js', 'Tailwind CSS', 'Redux'],
  Backend: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT'],
  'Database & Cloud': ['MongoDB', 'Firebase', 'SQL', 'Mongoose'],
  'Tools & Platforms': ['Git', 'GitHub', 'Postman', 'Figma', 'VS Code'],
};

export const projects = [
  {
    title: 'PixrAI – AI Text-to-Image Generator',
    description:
      'AI-powered image generation platform using MERN and ClipDrop API. Integrated Stripe for credit-based payments and achieved 99% uptime.',
    tech: ['MERN', 'Stripe', 'ClipDrop API'],
    featured: true,
    links: { demo: 'https://pixrai.vercel.app/', github: 'https://github.com/Rituraj-Kumar1/PixrAi' },
    image: '/PixrAiUI.jpg',
  },
  {
    title: 'AI-Flix – Intelligent Movie Recommendation Platform',
    description:
      'Netflix-style app with Firebase auth, Redux session management, and AI-driven movie search that personalizes results with 85% accuracy.',
    tech: ['React', 'Firebase', 'Redux', 'Tailwind CSS'],
    featured: true,
    links: { demo: 'https://ai-flix-theta.vercel.app/', github: 'https://github.com/Rituraj-Kumar1/AIFlix' },
    image: '/AIFlixUI.jpg',
  },
  {
    title: 'DevConnect – Real-Time Social Network',
    description:
      'MERN-based social platform with real-time messaging using Socket.IO and secure JWT authentication. Backend optimized for 40% faster response.',
    tech: ['MERN', 'Socket.IO', 'JWT'],
    featured: true,
    links: { demo: 'http://13.61.7.169/', github: 'https://github.com/Rituraj-Kumar1/DevConnect' },
    image: '/DevConnectUI.jpg',
  },
];

export const contactCta =
  "I’m always open to new opportunities, collaborations, or just a good tech chat. Whether you want to discuss a project idea or potential internship, feel free to reach out — I’ll be happy to connect.";
