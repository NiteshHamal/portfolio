import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import SectionHeading from './SectionHeading';

function ServiceCard({ icon, title, desc, delay, index }) {
    const cardRef = useRef(null);
    useEffect(() => {
        if (cardRef.current && !window.matchMedia('(hover: none)').matches) {
            VanillaTilt.init(cardRef.current, { max: 12, speed: 400, glare: true, 'max-glare': 0.15 });
        }
        return () => cardRef.current?.vanillaTilt?.destroy();
    }, []);

    const num = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0 round 16px)' }}
            whileInView={{ clipPath: 'inset(0%   0 0 0 round 16px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            ref={cardRef}
            className="card-glass text-center p-10 group cursor-default select-none relative overflow-hidden">

            {/* Faded number watermark */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2
                             text-[7rem] font-bold font-display leading-none
                             text-white/[0.04] group-hover:text-white/[0.07]
                             transition-colors duration-500 select-none pointer-events-none">
                {num}
            </span>

            <div className="relative z-10">
                <div className="w-16 h-16 bg-accent rounded-xl mx-auto mb-6 flex items-center justify-center
                    group-hover:scale-110 transition-all duration-300 shadow-lg shadow-accent/30 relative">
                    <i className={`bi ${icon} text-2xl text-white`} />
                    <div className="absolute inset-0 rounded-xl bg-accent/20 blur-md -z-10 group-hover:blur-xl transition-all duration-300" />
                </div>
                <h4 className="text-xl font-bold font-display text-white mb-4 group-hover:text-accent transition-colors duration-300">{title}</h4>
                <div className="text-white/50 text-sm leading-relaxed prose-bio" dangerouslySetInnerHTML={{ __html: desc }} />
            </div>
        </motion.div>
    );
}

export default function Services({ data = [] }) {
    return (
        <section id="services" className="py-24 bg-dark section-noise">
            <div className="max-w-6xl mx-auto px-6">
                <SectionHeading tag="What I Do" title="My Services" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((s, i) => <ServiceCard key={i} {...s} index={i} delay={i * 0.15} />)}
                </div>
            </div>
        </section>
    );
}
