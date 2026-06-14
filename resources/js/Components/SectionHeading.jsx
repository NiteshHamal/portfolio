import { motion } from 'framer-motion';

export default function SectionHeading({ tag, title, subtitle, className = '' }) {
    return (
        <div className={`text-center mb-16 ${className}`}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="block text-accent text-sm font-display tracking-[4px] uppercase">
                {tag}
            </motion.span>

            <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl font-bold font-display heading-gradient mt-3">
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-4 text-white/40 max-w-md mx-auto text-sm leading-relaxed">
                    {subtitle}
                </motion.p>
            )}

            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.15, ease: 'easeInOut' }}
                style={{ originX: '50%' }}
                className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </div>
    );
}
