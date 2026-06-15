import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const STEPS = [
    {
        num:  '01',
        icon: 'bi-search',
        title: 'Discovery',
        desc:  'Deep-diving into your goals, target audience, and requirements through focused consultation before anything is built.',
    },
    {
        num:  '02',
        icon: 'bi-vector-pen',
        title: 'Design',
        desc:  'Planning the architecture, user flows, and visual direction — so development moves fast and purposefully.',
    },
    {
        num:  '03',
        icon: 'bi-code-slash',
        title: 'Build',
        desc:  'Writing clean, scalable code with modern technologies, regular updates, and an eye on performance from day one.',
    },
    {
        num:  '04',
        icon: 'bi-rocket-takeoff',
        title: 'Deploy',
        desc:  'Thorough testing, smooth launch, and continued support so your product stays stable long after going live.',
    },
];

export default function Process() {
    return (
        <section id="process" className="py-24 bg-[#080808] section-noise">
            <div className="max-w-6xl mx-auto px-6">

                <SectionHeading tag="My Approach" title="How I Work" />

                {/* ── Mobile: vertical animated timeline ── */}
                <div className="md:hidden">
                    <div className="relative pl-14">

                        {/* Vertical connecting line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{ originY: 0 }}
                            className="absolute left-[18px] top-4 bottom-4 w-px
                                       bg-gradient-to-b from-accent/70 via-accent/25 to-transparent" />

                        <div className="space-y-5">
                            {STEPS.map((step, i) => (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative group">

                                    {/* Timeline node */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.35, delay: i * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute -left-[38px] top-5
                                                   w-7 h-7 rounded-full
                                                   bg-[#080808] border-2 border-accent/50
                                                   group-hover:border-accent group-hover:shadow-md group-hover:shadow-accent/30
                                                   flex items-center justify-center
                                                   transition-all duration-300 z-10">
                                        <span className="text-accent text-[10px] font-bold font-mono">{i + 1}</span>
                                    </motion.div>

                                    {/* Card */}
                                    <div className="group relative bg-white/[0.03] border border-white/[0.07]
                                                   hover:bg-accent/[0.05] hover:border-accent/25
                                                   rounded-2xl p-5 overflow-hidden
                                                   transition-all duration-300">

                                        {/* Top accent line */}
                                        <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl
                                                       bg-gradient-to-r from-transparent via-accent to-transparent
                                                       opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 shrink-0 rounded-xl bg-accent/10 border border-accent/20
                                                           group-hover:bg-accent group-hover:border-accent
                                                           flex items-center justify-center
                                                           transition-all duration-300">
                                                <i className={`bi ${step.icon} text-accent group-hover:text-white text-base transition-colors duration-300`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-mono font-bold text-accent/50 tracking-[2px]">
                                                        {step.num}
                                                    </span>
                                                </div>
                                                <h3 className="text-white font-bold font-display text-base mb-1.5
                                                               group-hover:text-accent transition-colors duration-300">
                                                    {step.title}
                                                </h3>
                                                <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Desktop: horizontal flow ── */}
                <div className="hidden md:flex flex-row items-stretch gap-4">
                    {STEPS.map((step, i) => (
                        <div key={step.num} className="flex flex-row items-stretch flex-1 gap-4">

                            <motion.div
                                initial={{ clipPath: 'inset(100% 0 0 0 round 16px)' }}
                                whileInView={{ clipPath: 'inset(0%   0 0 0 round 16px)' }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative flex-1 rounded-2xl border border-white/[0.07]
                                           bg-white/[0.03] hover:bg-accent/[0.05] hover:border-accent/25
                                           p-7 overflow-hidden cursor-default
                                           transition-all duration-300 hover:shadow-xl hover:shadow-accent/8">

                                <span className="absolute -bottom-4 -right-2
                                                 text-[6rem] font-bold font-display leading-none
                                                 text-white/[0.04] group-hover:text-accent/[0.08]
                                                 transition-colors duration-500 select-none pointer-events-none">
                                    {step.num}
                                </span>

                                <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl
                                                bg-gradient-to-r from-transparent via-accent to-transparent
                                                opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    <span className="inline-block text-xs font-display font-bold
                                                     text-accent/60 tracking-[3px] uppercase mb-5">
                                        {step.num}
                                    </span>

                                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20
                                                    flex items-center justify-center mb-5
                                                    group-hover:bg-accent group-hover:border-accent
                                                    transition-all duration-300">
                                        <i className={`bi ${step.icon} text-accent text-lg
                                                       group-hover:text-white transition-colors duration-300`} />
                                    </div>

                                    <h3 className="text-white font-bold font-display text-lg mb-3
                                                   group-hover:text-accent transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/45 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>

                            {i < STEPS.length - 1 && (
                                <div className="flex items-center justify-center shrink-0 text-white/20">
                                    <i className="bi bi-chevron-right text-xl" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
