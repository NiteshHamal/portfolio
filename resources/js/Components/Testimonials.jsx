import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './SectionHeading';

function Counter({ value }) {
    const match  = value.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : value;

    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(target);
            return;
        }
        const duration = 1800;
        const startTime = performance.now();
        const tick = (now) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const ACCENT = '#18d26e';

function letterHue(name = '') {
    const code = (name.charCodeAt(0) || 65) - 65;
    return Math.round((code / 26) * 360);
}

function Stars({ rating = 5 }) {
    return (
        <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill={i < rating ? ACCENT : 'none'}
                        stroke={i < rating ? ACCENT : 'rgba(255,255,255,0.15)'}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}
        </div>
    );
}

function Avatar({ name = '', src }) {
    const initials = name
        .trim()
        .split(' ')
        .slice(0, 2)
        .map(w => w[0]?.toUpperCase() ?? '')
        .join('');

    const hue = letterHue(name);

    if (src) {
        return (
            <img
                src={`/storage/${src}`}
                alt={name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/30"
            />
        );
    }

    return (
        <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base ring-2 ring-white/10 select-none"
            style={{ background: `hsl(${hue},55%,28%)` }}>
            {initials}
        </div>
    );
}

function TestimonialCard({ t, index, alwaysVisible = false }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.55,
                delay: alwaysVisible ? 0 : index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative flex flex-col bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 md:p-7
                       hover:bg-white/[0.07] hover:border-accent/20 transition-all duration-300
                       hover:shadow-xl hover:shadow-accent/5 h-full">

            {/* Decorative quote mark */}
            <div className="absolute top-5 right-6 text-accent/10 font-serif leading-none select-none"
                 style={{ fontSize: '80px', lineHeight: 1 }}>
                "
            </div>

            <Stars rating={t.rating} />

            <p className="text-white/60 text-sm leading-[1.8] mb-6 flex-1 relative z-10">
                "{t.content}"
            </p>

            <div className="flex items-center gap-3 mt-auto pt-5 border-t border-white/[0.07]">
                <Avatar name={t.name} src={t.avatar} />
                <div>
                    <div className="text-white font-semibold font-display text-sm">{t.name}</div>
                    {t.role && (
                        <div className="text-accent text-xs mt-0.5">{t.role}</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

const STATS = [
    { label: 'Projects Delivered', value: '10+' },
    { label: 'Happy Clients',      value: '8+'  },
    { label: 'Years Experience',   value: '3+'  },
    { label: 'On-time Delivery',   value: '100%' },
];

export default function Testimonials({ testimonials = [] }) {
    if (testimonials.length === 0) return null;

    const [activeCard, setActiveCard] = useState(0);
    const scrollRef = useRef(null);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.clientWidth * 0.85 + 16;
        setActiveCard(Math.round(el.scrollLeft / cardWidth));
    }, []);

    const scrollToCard = (i) => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.clientWidth * 0.85 + 16;
        el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    };

    return (
        <section id="testimonials" className="py-24 bg-[#040404] section-noise">
            <div className="max-w-6xl mx-auto px-6">

                <SectionHeading
                    tag="Testimonials"
                    title="What Clients Say"
                    subtitle="Feedback from people I've had the pleasure of building things with." />

                {/* ── Mobile: horizontal snap carousel ── */}
                <div className="md:hidden">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
                        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                        {testimonials.map((t, i) => (
                            <div key={t.id} className="snap-center shrink-0 w-[85vw]">
                                <TestimonialCard t={t} index={i} alwaysVisible />
                            </div>
                        ))}
                    </div>

                    {testimonials.length > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-5">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToCard(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
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

                {/* ── Desktop: grid ── */}
                <div className={`hidden md:grid gap-6 ${
                    testimonials.length === 1
                        ? 'max-w-xl mx-auto'
                        : testimonials.length === 2
                        ? 'md:grid-cols-2 max-w-3xl mx-auto'
                        : 'md:grid-cols-2 lg:grid-cols-3'
                }`}>
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={t.id} t={t} index={i} />
                    ))}
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-14 pt-10 border-t border-white/[0.06]">
                    {STATS.map(({ label, value }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                            className="text-center min-w-[72px]">
                            <div className="text-2xl font-bold font-display text-accent tabular-nums">
                                <Counter value={value} />
                            </div>
                            <div className="text-white/35 text-[10px] uppercase tracking-widest mt-1">{label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
