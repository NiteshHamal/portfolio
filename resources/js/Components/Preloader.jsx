import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    // Skip entirely for reduced-motion users; otherwise show once per session
    const [visible, setVisible] = useState(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        return !sessionStorage.getItem('preloaded');
    });

    useEffect(() => {
        if (!visible) return;
        sessionStorage.setItem('preloaded', '1');
        const t = setTimeout(() => setVisible(false), 2000);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="preloader"
                    exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[200] bg-[#040404]
                               flex flex-col items-center justify-center gap-8">

                    {/* N. logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="relative">

                        <span className="text-[80px] font-bold font-display text-white leading-none tracking-tight">
                            N<span className="text-accent">.</span>
                        </span>

                        {/* Glow behind the letter */}
                        <span className="absolute inset-0 text-[80px] font-bold font-display
                                         text-accent leading-none tracking-tight
                                         blur-2xl opacity-20 select-none pointer-events-none">
                            N.
                        </span>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 1.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="h-full bg-accent rounded-full
                                       shadow-[0_0_8px_rgba(24,210,110,0.8)]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
