import { motion } from 'framer-motion';

const ACCENT = '#18d26e';

/* Generates a consistent hue from the first letter for the avatar fallback */
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

function TestimonialCard({ t, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex flex-col bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7
                       hover:bg-white/[0.07] hover:border-accent/20 transition-all duration-300
                       hover:shadow-xl hover:shadow-accent/5">

            {/* Decorative quote mark */}
            <div className="absolute top-5 right-6 text-accent/10 font-serif leading-none select-none"
                 style={{ fontSize: '80px', lineHeight: 1 }}>
                "
            </div>

            <Stars rating={t.rating} />

            {/* Quote */}
            <p className="text-white/60 text-sm leading-[1.8] mb-6 flex-1 relative z-10">
                "{t.content}"
            </p>

            {/* Client */}
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

export default function Testimonials({ testimonials = [] }) {
    if (testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-24 bg-[#040404] section-noise">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 heading-glow">

                    <p className="section-tag mb-4">Testimonials</p>
                    <h2 className="text-4xl md:text-5xl font-bold font-display heading-gradient">
                        What Clients Say
                    </h2>
                    <p className="mt-4 text-white/40 max-w-md mx-auto text-sm leading-relaxed">
                        Feedback from people I've had the pleasure of building things with.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className={`grid gap-6 ${
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
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center items-center gap-8 mt-14 pt-10 border-t border-white/[0.06]">
                    {[
                        { label: 'Projects Delivered', value: '10+' },
                        { label: 'Happy Clients',      value: '8+'  },
                        { label: 'Years Experience',   value: '3+'  },
                        { label: 'On-time Delivery',   value: '100%' },
                    ].map(({ label, value }) => (
                        <div key={label} className="text-center">
                            <div className="text-2xl font-bold font-display text-accent">{value}</div>
                            <div className="text-white/35 text-xs uppercase tracking-widest mt-1">{label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
