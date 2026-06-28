'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Layers, 
  Mail, 
  ExternalLink, 
  FileText, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import TypedText from '@/components/TypedText';

const Github = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<string[]>(['home', 'about', 'services', 'projects', 'contact']);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Header scrolled state
      setIsScrolled(window.scrollY > 20);

      // Active link highlighting
      const scrollPosition = window.scrollY + 160;
      for (const sectionId of sectionsRef.current) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const openResume = () => {
    window.open("https://drive.google.com/file/d/14tzu4jdrrziSNwgrretQL4KY6NclbSDT/view?usp=drive_link", "_blank");
  };

  const techStack = [
    'HTML5', 'CSS3', 'JavaScript [ES6+]', 'TypeScript', 'React', 'Next.js', 
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'Sequelize', 'Git', 'GitHub'
  ];

  // Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans grid-bg overflow-x-hidden w-full selection:bg-indigo-600/15 selection:text-indigo-900">
      {/* Background glow blobs - soft pastel lights */}
      <div className="glow-blob top-[5%] left-[5%]"></div>
      <div className="glow-blob-secondary top-[35%] right-[5%]"></div>
      <div className="glow-blob bottom-[15%] left-[10%]"></div>

      {/* Header / Navbar */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4 ${
        isScrolled ? 'backdrop-blur-lg bg-white/75 border-b border-slate-200/50 shadow-sm' : 'bg-transparent'
      }`}>
        <nav className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/70 shadow-sm transition-all duration-300" aria-label="Primary navigation">
          <a className="flex items-center gap-3 font-display font-bold text-lg group text-slate-900" href="#home" onClick={(e) => handleLinkClick(e, '#home')} aria-label="Sachin Gupta home">
            <span className="grid w-9 h-9 place-items-center rounded-lg bg-slate-900 text-white shadow-md group-hover:bg-indigo-600 transition-colors duration-200">
              SG
            </span>
            <span className="tracking-wide group-hover:text-indigo-600 transition-colors duration-200">Sachin</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1.5">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => {
              const href = `#${item.toLowerCase()}`;
              const active = activeSection === item.toLowerCase();
              return (
                <li key={item}>
                  <a
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                      active 
                        ? 'bg-indigo-50/80 text-indigo-600 border border-indigo-200/40 shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border border-transparent'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hamburger Button for Mobile */}
          <button 
            className="md:hidden p-2 rounded-xl border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer" 
            type="button" 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"} 
            aria-expanded={isMenuOpen} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-24 inset-x-4 p-4 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl z-50">
            <ul className="flex flex-col gap-2">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => {
                const href = `#${item.toLowerCase()}`;
                const active = activeSection === item.toLowerCase();
                return (
                  <li key={item}>
                    <a
                      href={href}
                      onClick={(e) => handleLinkClick(e, href)}
                      className={`flex justify-center items-center h-12 rounded-xl font-semibold transition-colors ${
                        active 
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-28 pb-16 relative z-10">
          <motion.div 
            className="md:col-span-7 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/60 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 w-fit shadow-3xs">
              <Sparkles size={12} className="animate-pulse" />
              Full Stack Developer
            </div>
            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.1]">
              Hi, I'm <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Sachin Gupta</span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-500 mt-4 h-12">
              I build <TypedText strings={["full stack apps.", "responsive interfaces.", "MERN projects.", "clean backend APIs."]} />
            </h2>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl mt-6 leading-relaxed">
              I create responsive, scalable web applications with thoughtful interfaces,
              clean APIs, and smooth user experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="flex items-center justify-center gap-2 px-6 h-12 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-md shadow-slate-900/10 hover:shadow-indigo-600/20 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto">
                <Mail size={16} />
                Get In Touch
              </a>
              <a href="https://github.com/sachingupta7557" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 h-12 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl font-bold hover:-translate-y-0.5 transition-all duration-200 shadow-2xs w-full sm:w-auto">
                <Github size={16} />
                GitHub
              </a>
              <button onClick={openResume} className="flex items-center justify-center gap-2 px-6 h-12 bg-slate-100/50 border border-indigo-200/30 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-3xs w-full sm:w-auto">
                <FileText size={16} />
                View Resume
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-lg mt-12 border-t border-slate-200 pt-8" aria-label="Developer highlights">
              <div>
                <strong className="block text-slate-800 text-lg font-extrabold">Full Stack</strong>
                <span className="block text-slate-500 text-xs mt-1 uppercase font-semibold">Developer</span>
              </div>
              <div>
                <strong className="block text-slate-800 text-lg font-extrabold">4+</strong>
                <span className="block text-slate-500 text-xs mt-1 uppercase font-semibold">Projects</span>
              </div>
              <div>
                <strong className="block text-slate-800 text-lg font-extrabold">Clean</strong>
                <span className="block text-slate-500 text-xs mt-1 uppercase font-semibold">Responsive UI</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-5 flex justify-center items-center relative py-12 md:py-0"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            aria-hidden="true"
          >
            {/* Main Image Container */}
            <div className="relative w-72 sm:w-80 md:w-full aspect-square max-w-[360px] rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-3 shadow-xl shadow-slate-200/40">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 relative flex items-end justify-center">
                <Image 
                  src="/images/Developer2.png" 
                  alt="Sachin Gupta" 
                  fill
                  className="object-contain pt-6 animate-float"
                  sizes="(max-width: 768px) 320px, 360px"
                  priority
                />
              </div>

              {/* Floating tech cards - hidden on extra small screens for layout overflow protection */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-36 p-3 rounded-2xl border border-slate-200/70 bg-white/95 backdrop-blur-sm shadow-md sm:flex hidden flex-col gap-1 hover:border-slate-300 transition-colors animate-float">
                <span className="text-slate-800 text-sm font-extrabold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  React
                </span>
                <span className="text-slate-500 text-2xs font-semibold leading-tight">Modern UI systems</span>
              </div>

              <div className="absolute -bottom-2 -right-4 sm:-bottom-4 sm:-right-6 w-36 p-3 rounded-2xl border border-slate-200/70 bg-white/95 backdrop-blur-sm shadow-md sm:flex hidden flex-col gap-1 hover:border-slate-300 transition-colors animate-float-delayed">
                <span className="text-slate-800 text-sm font-extrabold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Node.js
                </span>
                <span className="text-slate-500 text-2xs font-semibold leading-tight">Scalable backend APIs</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section 
          id="about" 
          className="py-24 border-t border-slate-200/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex flex-col mb-12">
            <div className="text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-2">About Me</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 leading-tight">
              Developer focused on clean builds and useful products.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xs flex flex-col justify-center">
              <p className="text-slate-650 text-base leading-relaxed">
                Full Stack Developer skilled in JavaScript, React.js, Node.js, Next.js, TypeScript, 
                and both SQL and NoSQL databases. I enjoy turning ideas into polished,
                user-friendly applications that feel fast, reliable, and easy to use.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mt-6">
                My work sits at the intersection of interface design, frontend
                engineering, and backend problem solving.
              </p>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xs flex flex-col">
              <h3 className="text-slate-800 font-display font-semibold text-lg border-b border-slate-100 pb-3 mb-5">
                Tech I Work With
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="inline-flex px-3 py-1.5 text-xs font-bold text-indigo-600 rounded-xl bg-indigo-50/60 border border-indigo-100 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-200 shadow-3xs cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          id="services" 
          className="py-24 border-t border-slate-200/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex flex-col mb-12">
            <div className="text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-2">What I Do</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 leading-tight">
              Complete web development from idea to launch.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-300 group flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">01</span>
                <span className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Code2 size={22} />
                </span>
              </div>
              <h3 className="text-slate-800 font-display font-semibold text-xl mb-4 group-hover:text-indigo-600 transition-colors">
                Frontend Development
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Beautiful, responsive interfaces using React, Next.js, Tailwind CSS, HTML, and JavaScript.
              </p>
            </article>

            <article className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-cyan-350 hover:shadow-md transition-all duration-300 group flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">02</span>
                <span className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                  <Server size={22} />
                </span>
              </div>
              <h3 className="text-slate-800 font-display font-semibold text-xl mb-4 group-hover:text-cyan-600 transition-colors">
                Backend Development
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Reliable RESTful APIs, database architectures, server logic, and secure authentication flows.
              </p>
            </article>

            <article className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-md transition-all duration-300 group flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">03</span>
                <span className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Layers size={22} />
                </span>
              </div>
              <h3 className="text-slate-800 font-display font-semibold text-xl mb-4 group-hover:text-purple-600 transition-colors">
                Full Stack Projects
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                End-to-end applications built with clean code practices, routing, global states, and deployment setups.
              </p>
            </article>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-24 border-t border-slate-200/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex flex-col mb-12">
            <div className="text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-2">Selected Work</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 leading-tight">
              Projects with practical features and responsive design.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <article className="rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-350 hover:shadow-lg hover:shadow-indigo-100/30 transition-all duration-300 group flex flex-col">
              <Link href="/welcome" className="relative block h-56 bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-300"></div>
                <Image 
                  src="/images/Developer_1.png" 
                  alt="Portfolio website preview" 
                  width={340}
                  height={200}
                  className="object-contain max-h-48 w-auto h-auto group-hover:scale-103 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Next.js', 'Tailwind CSS', 'TypeScript'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-2xs font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-slate-800 font-display font-semibold text-xl mb-2 group-hover:text-indigo-600 transition-colors">
                  Portfolio Website
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  Modern developer portfolio site leveraging Next.js App Router, Tailwind CSS, TypeScript, and elegant animations.
                </p>
                <Link href="/welcome" className="inline-flex items-center gap-2 text-indigo-650 hover:text-indigo-500 text-sm font-bold w-fit">
                  Explore Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>

            {/* Project 2 */}
            <article className="rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-cyan-350 hover:shadow-lg hover:shadow-cyan-100/30 transition-all duration-300 group flex flex-col">
              <a href="https://book-my-tutor-five.vercel.app/" target="_blank" rel="noreferrer" className="relative block h-56 bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-300"></div>
                <Image 
                  src="/images/header_img3.png" 
                  alt="Book-My-Tutor website preview" 
                  width={340}
                  height={200}
                  className="object-contain max-h-48 w-auto h-auto group-hover:scale-103 transition-transform duration-500"
                />
              </a>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {['MERN Stack', 'JWT Auth', 'CRUD API'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-2xs font-extrabold text-cyan-600 bg-cyan-50 border border-cyan-100/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-slate-800 font-display font-semibold text-xl mb-2 group-hover:text-cyan-600 transition-colors">
                  Book-My-Tutor Website
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  Full-stack tutor booking platform with JWT authentication, custom dashboard interface, search functionality, and bookings database.
                </p>
                <a href="https://book-my-tutor-five.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-650 hover:text-cyan-500 text-sm font-bold w-fit">
                  Live Preview
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </article>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-24 border-t border-slate-200/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl border border-slate-200 bg-gradient-to-tr from-indigo-50/50 via-white to-pink-50/30 overflow-hidden shadow-md">
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-4">Contact</div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 leading-tight">
                Have a project or opportunity?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mt-4">
                Let's connect and build something useful, polished, and ready for real users.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 w-full sm:w-auto">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=guptasachin9574@gmail.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 h-12 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-md shadow-slate-900/10 hover:shadow-indigo-600/20 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto">
                  <Mail size={16} />
                  Email Me
                </a>
                <a href="https://github.com/sachingupta7557" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 h-12 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-800 rounded-xl font-bold hover:-translate-y-0.5 transition-all duration-200 shadow-2xs w-full sm:w-auto">
                  <Github size={16} />
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto border-t border-slate-200/60 py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm font-semibold tracking-wide">
        <p>&copy; {new Date().getFullYear()} Portfolio. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
