import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = ['Home', 'About', 'Resume', 'Services', 'Portfolio', 'Contact'];

export default function SectionDots() {
    const [active,  setActive]  = useState('Home');
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const onScroll = () => {
            const els = sections.map(s => document.getElementById(s.toLowerCase()));
            for (let i = els.length - 1; i >= 0; i--) {
                if (els[i] && window.scrollY >= els[i].offsetTop - 160) {
                    setActive(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) =>
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50
                        hidden lg:flex flex-col items-center gap-4">
            {sections.map(section => {
                const isActive = active === section;
                return (
                    <div key={section} className="relative flex items-center justify-end">

                        {/* Tooltip */}
                        <AnimatePresence>
                            {hovered === section && (
                                <motion.span
                                    initial={{ opacity: 0, x: 6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{    opacity: 0, x: 6 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-6 whitespace-nowrap
                                               bg-[#111] border border-white/10 text-white/80
                                               text-xs font-display px-2.5 py-1 rounded-md
                                               pointer-events-none shadow-lg">
                                    {section}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Dot — 44×44 tap target, visual stays 20×20 */}
                        <button
                            onClick={() => scrollTo(section)}
                            onMouseEnter={() => setHovered(section)}
                            onMouseLeave={() => setHovered(null)}
                            aria-label={`Go to ${section}`}
                            className="relative flex items-center justify-center w-11 h-11">

                            <span className="relative flex items-center justify-center w-5 h-5">
                                {/* Outer ring */}
                                <span className={`absolute inset-0 rounded-full border transition-all duration-300
                                    ${isActive ? 'border-accent scale-100' : 'border-white/25 scale-75 hover:border-white/50'}`} />

                                {/* Inner fill */}
                                <motion.span
                                    animate={{
                                        scale:           isActive ? 1   : 0.45,
                                        backgroundColor: isActive ? '#18d26e' : 'rgba(255,255,255,0.3)',
                                    }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className="w-2 h-2 rounded-full"
                                />

                                {/* Active glow */}
                                {isActive && (
                                    <motion.span
                                        layoutId="dot-glow"
                                        className="absolute inset-0 rounded-full bg-accent/20 blur-sm"
                                    />
                                )}
                            </span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
