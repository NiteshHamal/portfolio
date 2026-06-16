import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import SectionHeading from './SectionHeading';

function ServiceCard({ icon, title, desc, delay, index, mobile = false }) {
    const cardRef = useRef(null);
    useEffect(() => {
        if (cardRef.current && !window.matchMedia('(hover: none)').matches) {
            VanillaTilt.init(cardRef.current, { max: 12, speed: 400, glare: true, 'max-glare': 0.15 });
        }
        return () => cardRef.current?.vanillaTilt?.destroy();
    }, []);

    const num = String(index + 1).padStart(2, '0');

    const inner = (
        <div ref={cardRef}
            className={`card-glass text-center group cursor-default select-none relative overflow-hidden h-full
                        ${mobile ? 'p-6' : 'p-8 md:p-10'}`}>

            {/* Faded number watermark */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2
                             text-[7rem] font-bold font-display leading-none
                             text-white/[0.04] group-hover:text-white/[0.07]
                             transition-colors duration-500 select-none pointer-events-none">
                {num}
            </span>

            {/* Top accent line on hover */}
            <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-xl
                            bg-gradient-to-r from-transparent via-accent to-transparent
                            opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="w-14 h-14 bg-accent rounded-xl mx-auto mb-5 flex items-center justify-center
                    group-hover:scale-110 transition-all duration-300 shadow-lg shadow-accent/30 relative">
                    <i className={`bi ${icon} text-2xl text-white`} />
                    <div className="absolute inset-0 rounded-xl bg-accent/20 blur-md -z-10 group-hover:blur-xl transition-all duration-300" />
                </div>
                <h4 className="text-lg font-bold font-display text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {title}
                </h4>
                <div className="text-white/50 text-sm leading-relaxed prose-bio"
                    dangerouslySetInnerHTML={{ __html: desc }} />
            </div>
        </div>
    );

    if (mobile) return inner;

    return (
        <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0 round 16px)' }}
            whileInView={{ clipPath: 'inset(0%   0 0 0 round 16px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {inner}
        </motion.div>
    );
}

export default function Services({ data = [] }) {
    const [activeCard, setActiveCard] = useState(0);
    const scrollRef   = useRef(null);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.clientWidth * 0.78 + 16;
        setActiveCard(Math.round(el.scrollLeft / cardWidth));
    }, []);

    const scrollToCard = (i) => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.clientWidth * 0.78 + 16;
        el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    };

    return (
        <section id="services" className="py-24 bg-dark section-noise">
            <div className="max-w-6xl mx-auto px-6">
                <SectionHeading tag="What I Do" title="My Services" />

                {/* ── Mobile + tablet: horizontal snap carousel ── */}
                <div className="lg:hidden">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
                        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                        {data.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.94 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className="snap-center shrink-0 w-[78vw] md:w-[44vw]">
                                <ServiceCard {...s} index={i} delay={0} mobile />
                            </motion.div>
                        ))}
                    </div>

                    {/* Scroll dots */}
                    {data.length > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-5">
                            {data.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToCard(i)}
                                    aria-label={`Go to service ${i + 1}`}
                                    className={`rounded-full transition-all duration-300 ${
                                        i === activeCard
                                            ? 'w-5 h-2 bg-accent'
                                            : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Desktop: 3-col grid ── */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                    {data.map((s, i) => <ServiceCard key={i} {...s} index={i} delay={i * 0.15} />)}
                </div>
            </div>
        </section>
    );
}
