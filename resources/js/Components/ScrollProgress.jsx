import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            style={{ scaleX, transformOrigin: 'left' }}
            className="fixed top-0 left-0 right-0 h-[3px] z-[60]
                       bg-gradient-to-r from-accent via-accent-light to-accent
                       shadow-[0_0_8px_rgba(24,210,110,0.7)]"
        />
    );
}
