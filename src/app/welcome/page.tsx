'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans grid-bg flex items-center justify-center p-6 overflow-hidden selection:bg-indigo-600/15 selection:text-indigo-900">
      {/* Background glow blobs */}
      <div className="glow-blob top-[15%] left-[20%]"></div>
      <div className="glow-blob-secondary bottom-[15%] right-[20%]"></div>

      <motion.div 
        className="relative z-10 w-full max-w-lg p-8 sm:p-12 rounded-3xl border border-slate-200/80 bg-white/60 backdrop-blur-xl shadow-xl text-center hover:border-slate-300 transition-all duration-300 group"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 bg-cyan-50/60 text-cyan-650 text-2xs font-bold uppercase tracking-wider mb-6">
          <Sparkles size={10} className="animate-pulse" />
          Project Link Demo
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight mb-4">
          You're already on the portfolio page
        </h1>
        
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
          Thanks for clicking the link. Feel free to explore the projects and learn more about my work.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-md shadow-slate-900/15 hover:shadow-indigo-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go To Portfolio
        </Link>
      </motion.div>
    </div>
  );
}
