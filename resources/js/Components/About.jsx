import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import SectionHeading from './SectionHeading';

function SkillBar({ name, val, index, animate }) {
    const isCore = val >= 75;
    const delay  = `${index * 0.055}s`;
    const ease   = 'cubic-bezier(0.22, 1, 0.36, 1)';

    return (
        <div className="group">
            <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-display font-semibold transition-colors duration-300
                                  ${isCore ? 'text-white/90 group-hover:text-accent' : 'text-white/55 group-hover:text-white/80'}`}>
                    {name}
                </span>
                <span className="text-xs font-mono tabular-nums text-accent/60 group-hover:text-accent transition-colors duration-300">
                    {val}%
                </span>
            </div>

            <div className="relative h-[5px]">
                <div className="absolute inset-0 rounded-full bg-white/[0.06]" />

                <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                        width:      animate ? `${val}%` : '0%',
                        transition: `width 1.3s ${ease} ${delay}`,
                        background: isCore
                            ? 'linear-gradient(90deg, rgba(24,210,110,0.4) 0%, #18d26e 100%)'
                            : 'linear-gradient(90deg, rgba(24,210,110,0.2) 0%, rgba(24,210,110,0.6) 100%)',
                    }}
                />

                {/* Glow tip */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full pointer-events-none"
                    style={{
                        left:       animate ? `calc(${val}% - 5px)` : '-5px',
                        transition: `left 1.3s ${ease} ${delay}`,
                        background: '#18d26e',
                        boxShadow:  isCore
                            ? '0 0 10px 3px rgba(24,210,110,0.7)'
                            : '0 0 6px 2px rgba(24,210,110,0.4)',
                    }}
                />
            </div>
        </div>
    );
}

export default function About({ data = {}, skills = [] }) {
    const photoRef   = useRef(null);
    const skillsRef  = useRef(null);
    const skillsInView = useInView(skillsRef, { once: true, margin: '-40px' });

    useEffect(() => {
        if (!photoRef.current) return;
        if (window.matchMedia('(hover: none)').matches) return;
        VanillaTilt.init(photoRef.current, {
            max: 10, speed: 400, glare: true, 'max-glare': 0.1, scale: 1.04,
        });
        return () => photoRef.current?.vanillaTilt?.destroy();
    }, []);

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
        <section id="about" className="py-20 md:py-24 bg-dark section-noise">
            <div className="max-w-6xl mx-auto px-6">
                <SectionHeading tag="Who I Am" title="About Me" />

                {/* ── Photo + bio grid ── */}
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-20">

                    {/* Photo */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

                        <div ref={photoRef} className="relative group">
                            {/* Accent glow */}
                            <div className="absolute -inset-1 bg-accent/20 rounded-2xl blur-xl
                                            group-hover:bg-accent/30 transition-all duration-500" />

                            {/* Corner brackets */}
                            <div className="absolute -top-2.5 -left-2.5 w-6 h-6 border-t-2 border-l-2 border-accent rounded-tl z-10 pointer-events-none" />
                            <div className="absolute -top-2.5 -right-2.5 w-6 h-6 border-t-2 border-r-2 border-accent rounded-tr z-10 pointer-events-none" />
                            <div className="absolute -bottom-2.5 -left-2.5 w-6 h-6 border-b-2 border-l-2 border-accent rounded-bl z-10 pointer-events-none" />
                            <div className="absolute -bottom-2.5 -right-2.5 w-6 h-6 border-b-2 border-r-2 border-accent rounded-br z-10 pointer-events-none" />

                            <img
                                src={photo}
                                alt="Profile"
                                className="relative rounded-2xl w-full object-cover
                                           transition-transform duration-500 group-hover:scale-[1.02]"
                            />

                            {/* Floating experience badge — mobile */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="absolute -bottom-4 -right-4 z-20
                                           bg-[#0c0c0c] border border-accent/30 rounded-2xl
                                           px-4 py-3 shadow-xl shadow-black/60 text-center">
                                <div className="text-accent font-bold text-xl font-display leading-none">3+</div>
                                <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">Years Exp.</div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bio + details */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>

                        <h3 className="text-xl md:text-2xl font-bold font-display text-accent mb-4">
                            {subtitle}
                        </h3>

                        {bio1 && (
                            <div
                                className="text-white/60 text-sm md:text-base leading-relaxed mb-4 italic prose-bio"
                                dangerouslySetInnerHTML={{ __html: bio1 }}
                            />
                        )}
                        {bio2 && (
                            <div
                                className="text-white/60 text-sm md:text-base leading-relaxed mb-6 prose-bio"
                                dangerouslySetInnerHTML={{ __html: bio2 }}
                            />
                        )}

                        {details.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8 text-sm">
                                {details.map(([k, v]) => (
                                    <div key={k} className="flex items-start gap-2 min-w-0">
                                        <i className="bi bi-chevron-right text-accent text-xs mt-[3px] shrink-0" />
                                        <span className="text-white/40 shrink-0">{k}:</span>
                                        <span className="text-white/80 font-medium truncate min-w-0">{v}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <a
                            href={cv_url}
                            download
                            className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                            <i className="bi bi-download" />
                            Download CV
                        </a>
                    </motion.div>
                </div>

                {/* ── Skills ── */}
                {skills.length > 0 && (
                    <motion.div
                        ref={skillsRef}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 md:mb-20">

                        <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-8 md:mb-10 text-center">
                            My Skills
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">
                            {[...skills]
                                .sort((a, b) => b.val - a.val)
                                .map(({ name, val }, i) => (
                                    <SkillBar
                                        key={name}
                                        name={name}
                                        val={val}
                                        index={i}
                                        animate={skillsInView}
                                    />
                                ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
