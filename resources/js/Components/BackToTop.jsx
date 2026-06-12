import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="btt"
                    onClick={scrollTop}
                    initial={{ opacity: 0, scale: 0.6, y: 12 }}
                    animate={{ opacity: 1, scale: 1,   y: 0  }}
                    exit={{    opacity: 0, scale: 0.6, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{  scale: 0.92 }}
                    aria-label="Back to top"
                    className="fixed bottom-8 right-8 z-50
                               w-11 h-11 rounded-full
                               bg-accent text-white
                               flex items-center justify-center
                               shadow-lg shadow-accent/40
                               hover:bg-accent-light hover:shadow-accent/60
                               transition-colors duration-200">
                    <i className="bi bi-arrow-up text-base" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
