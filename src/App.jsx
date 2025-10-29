import React, { useEffect, useState, useRef } from 'react';
import { motion as m } from 'framer-motion';
import Lenis from 'lenis';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaExternalLinkAlt, FaGithub as FaGithubSolid } from 'react-icons/fa';
import {
  SiLeetcode,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiFirebase,
  SiGit,
  SiGithub as SiGithubLogo,
  SiPostman,
  SiFigma,
  SiMongoose,
  SiMysql,
} from 'react-icons/si';
import { profile, about, experience, education, skills, projects, contactCta } from './content.js';
import Loader from './components/Loader.jsx';
import AnimatedLaptop from './components/AnimatedLaptop.jsx'; // Make sure you created this file

const Reveal = ({ children, delay = 0 }) => (
  <m.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut', delay }} viewport={{ once: true, margin: '-10% 0px' }}>
    {children}
  </m.div>
);

const Section = ({ id, index, title, children }) => (
  <section id={id} className="scroll-mt-24 py-16">
    <div className="max-w-[1000px] mx-auto">
      <Reveal>
        <h2 className="text-slate-200 text-xl md:text-2xl font-semibold flex items-center gap-3 mb-6 tracking-tight">
          <span className="text-accent font-mono">{String(index).padStart(2, '0')}.</span>
          <span className="">{title}</span>
          <span className="h-px bg-slate-800/70 flex-1" />
        </h2>
        {children}
      </Reveal>
    </div>
  </section>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState('loader'); // 'loader' | 'hexMove' | 'typing' | 'reveal'
  const headerHexRef = useRef(null);
  const [typedName, setTypedName] = useState('');
  const fullNameRest = 'ituraj Kumar';
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [activeExp, setActiveExp] = useState(0);
  const tablistRef = useRef(null);
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ y: 0, h: 40 });
  const [didInitIndicator, setDidInitIndicator] = useState(false);
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Ensure the Experience rail is highlighted on first render
  useEffect(() => {
    if (didInitIndicator) return;
    let tries = 0;
    const measure = () => {
      const list = tablistRef.current;
      const first = tabRefs.current && tabRefs.current[0];
      if (list && first) {
        const lr = list.getBoundingClientRect();
        const br = first.getBoundingClientRect();
        if (br.height > 0) {
          setIndicator({ y: br.top - lr.top, h: br.height });
          setDidInitIndicator(true);
          return;
        }
      }
      if (tries++ < 10) requestAnimationFrame(measure);
    };
    requestAnimationFrame(measure);
  }, [didInitIndicator]);

  useEffect(() => {
    const update = () => {
      const list = tablistRef.current;
      const el = tabRefs.current[activeExp];
      if (!list || !el) return;
      const listRect = list.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({ y: elRect.top - listRect.top, h: elRect.height });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeExp]);

  // Typing effect once hex move completes
  useEffect(() => {
    if (phase !== 'typing') return;
    if (prefersReduced) {
      setTypedName(fullNameRest);
      setPhase('reveal');
      return;
    }
    // reset typed name at start
    setTypedName('');
    let i = 0;
    let cancelled = false;
    const typeNext = () => {
      if (cancelled) return;
      if (i >= fullNameRest.length) {
        setPhase('reveal');
        return;
      }
      const ch = fullNameRest[i];
      setTypedName(prev => prev + ch);
      i += 1;
      const isSpace = ch === ' ';
      const base = 55; // ms per char desktop
      const mobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
      const perChar = mobile ? 65 : base;
      const extraPause = isSpace ? 200 : 0;
      setTimeout(typeNext, perChar + extraPause);
    };
    typeNext();
    return () => {
      cancelled = true;
    };
  }, [phase, fullNameRest, prefersReduced]);

  const links = [
    { href: `mailto:${profile.email}`, icon: <FiMail />, label: 'Email' },
    { href: profile.github, icon: <FiGithub />, label: 'GitHub' },
    { href: profile.linkedin, icon: <FiLinkedin />, label: 'LinkedIn' },
    profile.leetcode ? { href: profile.leetcode, icon: <SiLeetcode />, label: 'LeetCode' } : null,
    (profile.twitter || 'https://x.com/Rituraj_0405') ? { href: (profile.twitter || 'https://x.com/Rituraj_0405'), icon: <FiTwitter />, label: 'Twitter' } : null,
    (profile.instagram || 'https://instagram.com/rituraj_1603') ? { href: (profile.instagram || 'https://instagram.com/rituraj_1603'), icon: <FiInstagram />, label: 'Instagram' } : null,
  ];

  // Map common skill labels to icons
  const getSkillIcon = (label) => {
    const k = String(label).toLowerCase();
    if (k.includes('react')) return <SiReact className="text-[#61dafb]" />;
    if (k.includes('node')) return <SiNodedotjs className="text-[#3c873a]" />;
    if (k.includes('express')) return <SiExpress className="text-slate-300" />;
    if (k.includes('mongo')) return <SiMongodb className="text-[#4db33d]" />;
    if (k.includes('mongoose')) return <SiMongoose className="text-[#880000]" />;
    if (k.includes('tailwind')) return <SiTailwindcss className="text-[#38bdf8]" />;
    if (k.includes('redux')) return <SiRedux className="text-[#764abc]" />;
    if (k.includes('javascript')) return <SiJavascript className="text-[#f7df1e]" />;
    if (k === 'c++' || k.includes('cplusplus')) return <SiCplusplus className="text-[#00599C]" />;
    if (k === 'c') return <SiCplusplus className="text-slate-300" />;
    if (k.includes('python')) return <SiPython className="text-[#3776ab]" />;
    if (k.includes('html')) return <SiHtml5 className="text-[#e34f26]" />;
    if (k.includes('css')) return <SiCss3 className="text-[#1572b6]" />;
    if (k.includes('firebase')) return <SiFirebase className="text-[#ffca28]" />;
    if (k === 'git') return <SiGit className="text-[#f34f29]" />;
    if (k === 'github') return <SiGithubLogo className="text-slate-300" />;
    if (k.includes('postman')) return <SiPostman className="text-[#ff6c37]" />;
    if (k.includes('figma')) return <SiFigma className="text-[#a259ff]" />;
    if (k.includes('sql') || k.includes('mysql')) return <SiMysql className="text-[#00618a]" />;
    return null;
  };
  // Category icons
  const getCategoryIcon = (group) => {
    const k = String(group).toLowerCase();
    if (k.startsWith('language')) return <SiJavascript className="text-[#f7df1e]" />;
    if (k.startsWith('front')) return <SiReact className="text-[#61dafb]" />;
    if (k.startsWith('back')) return <SiNodedotjs className="text-[#3c873a]" />;
    if (k.includes('database')) return <SiMongodb className="text-[#4db33d]" />;
    if (k.includes('tools')) return <SiPostman className="text-[#ff6c37]" />;
    return null;
  };
  const nav = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {isLoading && (
        <Loader
          onFinish={() => {
            // Begin hex move immediately to keep it one continuous animation
            if (prefersReduced) {
              setTypedName(fullNameRest);
              setPhase('reveal');
            } else {
              setPhase('hexMove');
            }
            setIsLoading(false);
          }}
        />
      )}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-slate-800/60 bg-slate-950/60 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center text-slate-300 text-base font-medium relative -translate-x-[72px] md:-translate-x-[120px] lg:-translate-x-[152px] xl:-translate-x-[184px]">
            <div ref={headerHexRef} className={`relative w-12 h-12 transition-opacity ${phase === 'hexMove' ? 'duration-0 opacity-0' : 'duration-300 opacity-100'}`}>
              <svg className="absolute inset-0 animate-hex-pop z-0" viewBox="0 0 100 100" aria-hidden>
                <defs>
                  <clipPath id="hexClip"><rect x="0" y="0" width="86" height="100" /></clipPath>
                </defs>
                <polygon clipPath="url(#hexClip)" className="animate-stroke-draw" points="50,3 95,25 95,75 50,97 5,75 5,25" fill="none" stroke="#a8b2d1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"></polygon>
              </svg>
              <span className="absolute inset-0 grid place-items-center text-xl font-extrabold text-accent">R</span>
            </div>
            <span className="relative z-10 -ml-4">{typedName}</span>
          </div>
          <nav className="translate-x-10 md:translate-x-20 lg:translate-x-28 xl:translate-x-36">
            <ul className="flex items-center gap-6 text-sm text-slate-300">
              {nav.map((n, i) => (
                <li key={n.href}>
                  <a href={n.href} className="group inline-flex items-center gap-2 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded">
                    <span className="text-accent font-mono">{String(i + 1).padStart(2, '0')}.</span>
                    <span className="link-underline">{n.label}</span>
                  </a>
                </li>
              ))}
              {profile.resumeUrl && (
                <li>
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 border-accent/70 text-accent hover:bg-accent hover:text-white transition">
                    Resume
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <div className="relative min-h-screen max-w-[1600px] mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-10 md:pb-16">
        {phase === 'reveal' && (
          <>
            <div className="hidden lg:flex fixed lg:left-5 xl:left-10 bottom-0 z-30 flex-col items-center text-slate-400">
              <ul className="flex flex-col items-center space-y-[24px] mb-[24px]">
                {links.filter(Boolean).map((l) => (
                  <li key={l.label}>
                    <a href={l.href} aria-label={l.label} target="_blank" rel="noreferrer" className="p-[10px] hover:-translate-y-[3px] transition-transform hover:text-accent">
                      <span className="text-[20px] inline-block align-middle">{l.icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="h-[90px] w-px" style={{backgroundColor:'#a8b2d1'}} />
            </div>

            <div className="hidden lg:flex fixed lg:right-5 xl:right-10 bottom-0 z-30 flex-col items-center text-slate-400">
              <a href={`mailto:${profile.email}`} className="p-[10px] font-mono font-semibold text-[14px] tracking-[0.1em] [writing-mode:vertical-rl] hover:-translate-y-[3px] transition-transform hover:text-accent">
                {profile.email}
              </a>
              <div className="h-[90px] w-[2px] mt-[12px]" style={{backgroundColor:'#a8b2d1'}} />
            </div>
          </>
        )}
        {phase === 'reveal' && (
        <main id="content">
          
          <section id="hero" className="relative min-h-[calc(100vh-56px)] flex items-center">
            
            {/* --- This is your existing text block --- */}
            <div className="relative z-10 max-w-[1000px] pl-[25px] sm:pl-[50px] md:pl-[100px] lg:pl-[150px] transform translate-x-8 md:translate-x-12 lg:translate-x-16 -translate-y-8 md:-translate-y-12">
              <Reveal>
                <p className="text-accent font-mono mb-5">Hi, my name is</p>
                <h1 className="text-slate-100 font-bold leading-tight text-[clamp(40px,8vw,80px)]">{profile.name}</h1>
                <h2 className="text-slate-400 font-semibold leading-tight mt-2 text-[clamp(32px,7vw,52px)]">I build things for the web.</h2>
                <p className="text-slate-300 mt-6 max-w-2xl leading-7">{about.short}</p>
                <div className="mt-8">
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-accent/50 text-accent hover:bg-accent hover:text-white transition">Get In Touch</a>
                </div>
              </Reveal>
            </div>

            {/* --- This is the new laptop block --- */}
            <div className="absolute top-[calc(50%-30px)] -translate-y-1/2 right-[8%] max-w-md z-0 hidden lg:block pointer-events-none">
              <Reveal delay={0.4}>
                <AnimatedLaptop />
              </Reveal>
            </div>
          </section>
          
          <Section id="about" index={1} title="About Me">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7">
                <p className="text-slate-300 leading-7">Hi, I’m Rituraj Kumar, a full-stack developer who enjoys creating clean, responsive, and functional web applications. I like taking small ideas and turning them into something real through code — that process of building and refining is what keeps me hooked.</p>
                <p className="text-slate-300 leading-7 mt-4">I work mainly with the MERN stack and enjoy experimenting with new tools and frameworks that make development smoother and more efficient. Lately, I’ve been exploring how AI can enhance user experiences and make web apps more intuitive and intelligent.</p>
                <p className="text-slate-300 leading-7 mt-4">Here are a few technologies I’ve been working with recently:</p>
                <ul className="mt-3 grid grid-cols-2 gap-y-2 text-slate-300">
                  {['JavaScript (ES6+)', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Tailwind CSS'].map((t) => (
                    <li key={t} className="flex gap-2 items-start">
                      <span className="text-accent mt-1">▹</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5 md:justify-self-end">
                <div className="group relative w-[260px] md:w-[300px]">
                  <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-accent/60 transition-all duration-300 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-70"></div>
                  <div className="relative rounded-lg overflow-hidden ring-1 ring-slate-800 bg-slate-900 transition-transform duration-300 group-hover:scale-[1.04]">
                    <img src="/Profile.jpg" alt="Rituraj Kumar" className="block w-full h-auto grayscale contrast-125 transition duration-300 group-hover:grayscale-0" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="experience" index={2} title="Where I've Worked">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <div className="relative flex">
                  <div className="absolute left-1 top-0 bottom-0 w-px bg-slate-800" aria-hidden></div>
                  <ul ref={tablistRef} role="tablist" className="relative z-10 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pl-4 pr-2 min-w-[220px]">
                    {/* animated active bar coinciding with the main rail */}
                    <m.span
                      aria-hidden
                      className="hidden md:block absolute left-1 w-[3px] bg-accent rounded"
                      style={{ top: 0 }}
                      initial={{ y: 0, height: indicator.h || 40 }}
                      animate={{ y: indicator.y, height: indicator.h }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.9, delay: 0.04 }}
                    />
                    {experience.map((e, i) => (
                      <li key={e.company} role="presentation">
                        <button
                          ref={(el) => {
                            tabRefs.current[i] = el;
                            // On first mount, sync indicator to the first active tab immediately
                            if (!didInitIndicator && i === 0 && el && tablistRef.current) {
                              const listRect = tablistRef.current.getBoundingClientRect();
                              const elRect = el.getBoundingClientRect();
                              setIndicator({ y: elRect.top - listRect.top, h: elRect.height });
                              setDidInitIndicator(true);
                            }
                          }}
                          role="tab"
                          aria-selected={activeExp === i}
                          onClick={() => setActiveExp(i)}
                          className={`font-mono text-[14px] md:text-[15px] font-semibold tracking-wide whitespace-nowrap md:w-full text-left px-4 py-2.5 rounded md:rounded-none md:rounded-r-md border md:border-0 border-slate-800/60 transition
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
                          ${activeExp === i ? 'bg-slate-900/60 text-accent' : 'text-slate-400/70 hover:text-slate-200'}`}
                        >
                          {e.company}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:col-span-8">
                {experience[activeExp] && (
                  <m.div key={activeExp} role="tabpanel" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 1, delay: 0.06 }} className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
                    <h3 className="text-slate-100 text-xl font-semibold">
                      {experience[activeExp].role} <span className="text-slate-400">@</span>{' '}
                      
                      {/* --- THIS IS THE CORRECTED LINE --- */}
                      {experience[activeExp].companyUrl ? (
                        <a href={experience[activeExp].companyUrl} target="_blank" rel="noreferrer" className="text-accent link-underline">
                          {experience[activeExp].company}
                        </a>
                      ) : (
                        <span className="text-accent">{experience[activeExp].company}</span>
                      )}
                    </h3>
                    <p className="text-slate-400 font-mono text-[13px] mt-1">{experience[activeExp].period}</p>
                    {experience[activeExp].summary && <p className="text-slate-300 mt-4 leading-7">{experience[activeExp].summary}</p>}
                    <ul className="mt-4 grid gap-3 text-slate-300">
                      {experience[activeExp].points.map((p, idx) => (
                        <li key={idx} className="flex gap-3 leading-7">
                          <span className="text-accent mt-1">▹</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </div>
            </div>
          </Section>

          {/* ----- MODIFIED SKILLS SECTION ----- */}
          <Section id="skills" index={4} title="Skills">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 } } }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {Object.entries(skills).map(([group, list], idx) => {
                  const sub = Array.isArray(list) ? list.join(', ') : '';

                  let layoutClass = 'lg:col-span-2'; // Default for items 0, 1, 2
                  if (idx === 3) {
                    // 4th item
                    layoutClass = 'lg:col-start-2 lg:col-span-2';
                  } else if (idx === 4) {
                    // 5th item
                    layoutClass = 'lg:col-start-4 lg:col-span-2';
                  }
                  
                  return (
                    <m.div
                      key={group}
                      className={`rounded-2xl border border-slate-800 p-6 bg-[#0b1120]/60 text-slate-200 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 ${layoutClass}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-md grid place-items-center bg-slate-900 border border-slate-800 text-lg">
                          {getCategoryIcon(group)}
                        </div>
                        <h3 className="text-slate-100 font-semibold text-[15px]">{group}</h3>
                      </div>
                      <p className="text-slate-400 text-xs mt-1.5">{sub}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {list.map((item) => (
                          <li key={item} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] bg-slate-800/60 rounded-lg transition-all duration-200 hover:bg-indigo-600/80 hover:text-white">
                            <span className="text-[14px]">{getSkillIcon(item)}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          </Section>
          {/* ----- END OF MODIFIED SECTION ----- */}

          <Section id="projects" index={3} title="Some Things I’ve Built">
            <div className="grid gap-10">
              {projects.filter(p => p.featured).map((p, idx) => (
                <div key={p.title} className="group relative">
                  <div className={`grid md:grid-cols-12 gap-4 items-center`}>
                    <m.div
                      initial={{ opacity: 0, x: idx % 2 === 1 ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      className={`relative md:col-span-7 ${idx % 2 === 1 ? 'md:order-2' : ''}`}
                    >
                      <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                        <img src={p.image} alt={p.title} className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      </div>
                    </m.div>
                    <m.div
                      initial={{ opacity: 0, x: idx % 2 === 1 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      className={`md:col-span-5 ${idx % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}
                    >
                      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg">
                        <h3 className="text-slate-100 text-xl font-semibold">{p.title}</h3>
                        <p className="text-slate-300 mt-2 leading-7">{p.description}</p>
                        <ul className={`flex flex-wrap gap-2 mt-4 text-slate-400 text-sm ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                          {p.tech.map((t) => (
                            <li key={t} className="px-2 py-1 rounded bg-slate-800/60">{t}</li>
                          ))}
                        </ul>
                        <div className={`mt-4 flex gap-5 justify-center`}>
                          {p.links.demo && (
                            <a
                              href={p.links.demo}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Live Demo"
                              className="inline-flex items-center text-slate-300 hover:text-accent transition"
                            >
                              <FaExternalLinkAlt className="text-xl" />
                            </a>
                          )}
                          {p.links.github && (
                            <a
                              href={p.links.github}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="GitHub Repository"
                              className="inline-flex items-center text-slate-300 hover:text-accent transition"
                            >
                              <FaGithubSolid className="text-2xl" />
                            </a>
                          )}
                        </div>
                      </div>
                    </m.div>
                  </div>
                </div>
              ))}

              <div className="grid md:grid-cols-3 gap-6">
                {projects.filter(p => !p.featured).map((p, idx) => (
                  <m.div 
                    key={p.title} 
                    initial={{ opacity: 0, y: 32 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, amount: 0.3 }} 
                    transition={{ duration: 0.55, ease: 'easeOut' }} 
                    className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col"
                  >
                    {p.image && (
                      <m.div 
                        initial={{ opacity: 0, x: -60 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true, amount: 0.3 }} 
                        transition={{ duration: 0.55, ease: 'easeOut' }} 
                        className="mb-4 rounded-lg overflow-hidden border border-slate-800 bg-slate-900"
                      >
                        <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
                      </m.div>
                    )}
                    <m.h4 
                      initial={{ opacity: 0, x: 60 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true, amount: 0.3 }} 
                      transition={{ duration: 0.55, ease: 'easeOut' }} 
                      className="text-slate-100 font-semibold"
                    >
                      {p.title}
                    </m.h4>
                    <m.p 
                      initial={{ opacity: 0, x: 60 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true, amount: 0.3 }} 
                      transition={{ duration: 0.55, ease: 'easeOut' }} 
                      className="text-slate-300 mt-2 flex-1"
                    >
                      {p.description}
                    </m.p>
                    <m.ul 
                      initial={{ opacity: 0, x: 60 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true, amount: 0.3 }} 
                      transition={{ duration: 0.55, ease: 'easeOut' }} 
                      className="flex flex-wrap gap-2 mt-3 text-slate-400 text-sm"
                    >
                      {p.tech.map((t) => (
                        <li key={t} className="px-2 py-1 rounded bg-slate-800/60">{t}</li>
                      ))}
                    </m.ul>
                    <div className="mt-4 flex gap-5 justify-center">
                      {p.links.demo && (
                        <a
                          href={p.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live Demo"
                          className="inline-flex items-center text-slate-300 hover:text-accent transition"
                        >
                          <FaExternalLinkAlt className="text-xl" />
                        </a>
                      )}
                      {p.links.github && (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub Repository"
                          className="inline-flex items-center text-slate-300 hover:text-accent transition"
                        >
                          <FaGithubSolid className="text-2xl" />
                        </a>
                      )}
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </Section>

          

          <section id="contact" className="py-24">
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-mono text-accent text-sm tracking-[0.2em] mb-3">04. What's Next?</p>
              <h2 className="text-slate-100 font-bold text-[clamp(32px,6vw,56px)] mb-4">Get In Touch</h2>
              <p className="text-slate-400 leading-7 mb-10">I’m open to full-time, part-time, or freelance opportunities and always excited to collaborate on innovative projects or ideas. Whether you’d like to discuss a potential role, brainstorm a side project, or just have a good tech chat, my inbox is always open — I’d love to connect and build something impactful together.</p>
              <a href={`mailto:${profile.email}`} className="group relative inline-block text-accent">
                <span className="relative z-20 inline-flex items-center justify-center px-7 py-3 rounded border-[3px] border-accent/80 bg-slate-950 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                  <span className="font-mono font-semibold tracking-wide">Say Hello</span>
                </span>
                {/* colored fill plate appears only when popped */}
                <span className="absolute inset-0 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: '#4346a9' }} aria-hidden></span>
                {/* static accent frame behind, aligned initially */}
                <span className="absolute inset-0 rounded border border-accent/80" aria-hidden></span>
              </a>
            </div>
          </section>
          <footer className="py-10 text-center mt-6">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-block text-slate-400 hover:text-accent font-mono font-semibold text-sm md:text-base transition-transform duration-300 hover:-translate-y-[2px] hover:scale-[1.06]">
              Designed & Built by Rituraj Kumar
            </a>
          </footer>
        </main>
        )}
      </div>

      {/* Floating shared hex overlay for transition */}
      {phase === 'hexMove' && (
        <FloatingHex headerHexRef={headerHexRef} onDone={() => setPhase('typing')} />
      )}
    </>
  );
}

// Floating hex component that animates from center to header hex
function FloatingHex({ headerHexRef, onDone }) {
  const [target, setTarget] = useState({ x: 0, y: 0, scale: 1 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const headerEl = headerHexRef.current;
    if (!headerEl) return;
    const rect = headerEl.getBoundingClientRect();
    const headerCenterX = rect.left + rect.width / 2;
    const headerCenterY = rect.top + rect.height / 2;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const startX = vw / 2;
    const startY = vh / 2;
    // Fine-tune offsets if visual landing is off by a pixel or two
    const OFFSET_X = -16; // twice the last left nudge
    const OFFSET_Y = -25; // thrice the last upward nudge
    setTarget({ x: headerCenterX - startX + OFFSET_X, y: headerCenterY - startY + OFFSET_Y, scale: rect.width / 48 }); // 48px baseline size
    setReady(true);
  }, [headerHexRef]);

  if (!ready) return null;

  return (
    <m.div
      // Start slightly larger and ease into target with a small overshoot settle
      initial={{ x: 0, y: 0, scale: 84/48, opacity: 0 }}
      animate={{
        x: target.x,
        y: target.y,
        scale: [84/48, target.scale * 1.035, target.scale],
        opacity: 1,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 1.1,
        times: [0, 0.86, 1],
        opacity: { duration: 0.4, ease: 'easeOut' },
      }}
      onAnimationComplete={() => setTimeout(onDone, 80)}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none"
      aria-hidden
    >
      <div className="relative" style={{ width: 48, height: 48 }}>
        <svg className="absolute inset-0 z-0" viewBox="0 0 100 100">
          {/* Full hex during transition; no clipPath here */}
          <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" fill="none" stroke="#a8b2d1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"></polygon>
        </svg>
        <span className="absolute inset-0 grid place-items-center text-xl font-extrabold text-accent">R</span>
      </div>
    </m.div>
  );
}