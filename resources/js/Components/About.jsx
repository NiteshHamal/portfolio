import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';


function CountUp({ target, duration = 1800 }) {
    const [count, setCount] = useState(0);
    const ref   = useRef(null);
    const fired = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || fired.current) return;
            fired.current = true;
            obs.disconnect();

            const start     = performance.now();
            const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(eased * target));
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.4 });

        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{count}</span>;
}

export default function About({ data = {}, skills = [], stats = [] }) {
    const {
        subtitle  = 'Web & Backend Developer',
        bio1      = '',
        bio2      = '',
        photo     = '/images/niteshhamal.png',
        cv_url    = '/Nitesh-Hamal-CV.pdf',
        birthday  = '',
        age       = '',
        website   = '',
        degree    = '',
        phone     = '',
        email     = '',
        city      = '',
        freelance = '',
    } = data;

    const details = [
        ['Birthday', birthday],
        ['Age',      age],
        ['Website',  website],
        ['Degree',   degree],
        ['Phone',    phone],
        ['Email',    email],
        ['City',     city],
        ['Freelance',freelance],
    ].filter(([, v]) => v);

    return (
        <section id="about" className="py-24 bg-dark section-noise">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16 heading-glow">
                    <span className="text-accent text-sm font-display tracking-[4px] uppercase">Who I Am</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display heading-gradient mt-3">About Me</h2>
                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-accent/20 rounded-2xl blur-xl group-hover:bg-accent/30 transition-all duration-500" />
                            <img src={photo} alt="Profile"
                                className="relative rounded-2xl w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <h3 className="text-2xl font-bold font-display text-accent mb-4">{subtitle}</h3>
                        {bio1 && <p className="text-white/60 leading-relaxed mb-6 italic">{bio1}</p>}
                        {bio2 && <p className="text-white/60 leading-relaxed mb-8">{bio2}</p>}

                        {details.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
                                {details.map(([k, v]) => (
                                    <div key={k} className="flex items-center gap-2">
                                        <i className="bi bi-chevron-right text-accent text-xs" />
                                        <span className="text-white/40">{k}:</span>
                                        <span className="text-white/80 font-medium truncate">{v}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <a href={cv_url} download
                            className="btn-primary inline-flex items-center gap-2">
                            <i className="bi bi-download" /> Download CV
                        </a>
                    </motion.div>
                </div>

                {skills.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
                        <h3 className="text-2xl font-bold font-display text-white mb-10 text-center">My Skills</h3>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 gap-4"
                            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}>
                            {[...skills]
                                .sort((a, b) => b.val - a.val)
                                .map(({ name, val }) => {
                                    const isCore = val >= 75;
                                    const dots   = Math.round(val / 20);
                                    const initial = name.charAt(0).toUpperCase();
                                    return (
                                        <motion.div key={name}
                                            variants={{
                                                hidden: { opacity: 0, y: 24, scale: 0.92 },
                                                show:   { opacity: 1, y: 0,  scale: 1    },
                                            }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className={`group relative rounded-2xl p-5 overflow-hidden
                                                        cursor-default select-none border
                                                        transition-all duration-300
                                                        hover:scale-[1.03] hover:shadow-xl
                                                        ${isCore
                                                            ? 'bg-accent/[0.04] border-accent/20 hover:border-accent/50 hover:bg-accent/[0.08] hover:shadow-accent/10'
                                                            : 'bg-white/[0.03] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.06] hover:shadow-white/5'
                                                        }`}>

                                            {/* Top accent bar */}
                                            <div className={`absolute top-0 inset-x-0 h-[2px] rounded-t-2xl
                                                ${isCore
                                                    ? 'bg-gradient-to-r from-transparent via-accent to-transparent'
                                                    : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                                }`} />

                                            {/* Faint letter watermark */}
                                            <span className="absolute -bottom-3 -right-1 text-[4.5rem] font-bold font-display
                                                             leading-none pointer-events-none select-none
                                                             text-white/[0.04] group-hover:text-accent/[0.09]
                                                             transition-colors duration-500">
                                                {initial}
                                            </span>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <p className={`text-sm font-display font-semibold text-center mb-4
                                                               transition-colors duration-300
                                                               ${isCore ? 'text-white/90 group-hover:text-accent' : 'text-white/55 group-hover:text-white/85'}`}>
                                                    {name}
                                                </p>
                                                <div className="flex justify-center gap-1.5">
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <div key={i}
                                                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300
                                                                ${i < dots
                                                                    ? isCore ? 'bg-accent' : 'bg-white/45'
                                                                    : 'bg-white/10'
                                                                }`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                        </motion.div>
                    </motion.div>
                )}

                {stats.length > 0 && (
                    <div className="grid grid-cols-3 gap-6">
                        {stats.map(({ icon, value, label }, i) => (
                            <motion.div key={label}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="card-glass text-center py-10 relative">
                                <i className={`bi ${icon} absolute -top-5 left-1/2 -translate-x-1/2 text-accent text-2xl bg-dark/80 p-3 rounded-full border border-white/10`} />
                                <div className="text-4xl font-bold font-display text-white mt-4">
                                    <CountUp target={parseInt(value) || 0} />+
                                </div>
                                <div className="text-white/50 text-sm mt-1 font-display">{label}</div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
