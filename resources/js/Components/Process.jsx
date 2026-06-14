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

                {/* Heading */}
                <SectionHeading tag="My Approach" title="How I Work" />

                {/* Steps */}
                <div className="flex flex-col md:flex-row items-stretch gap-4">
                    {STEPS.map((step, i) => (
                        <div key={step.num} className="flex flex-col md:flex-row items-stretch flex-1 gap-4">

                            {/* Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 36 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative flex-1 rounded-2xl border border-white/[0.07]
                                           bg-white/[0.03] hover:bg-accent/[0.05] hover:border-accent/25
                                           p-5 md:p-7 overflow-hidden cursor-default
                                           transition-all duration-300 hover:shadow-xl hover:shadow-accent/8">

                                {/* Faded number watermark */}
                                <span className="absolute -bottom-4 -right-2
                                                 text-[6rem] font-bold font-display leading-none
                                                 text-white/[0.04] group-hover:text-accent/[0.08]
                                                 transition-colors duration-500 select-none pointer-events-none">
                                    {step.num}
                                </span>

                                {/* Top accent line */}
                                <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl
                                                bg-gradient-to-r from-transparent via-accent to-transparent
                                                opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    {/* Step number badge */}
                                    <span className="inline-block text-xs font-display font-bold
                                                     text-accent/60 tracking-[3px] uppercase mb-5">
                                        {step.num}
                                    </span>

                                    {/* Icon */}
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

                            {/* Connector — right arrow on desktop, down arrow on mobile */}
                            {i < STEPS.length - 1 && (
                                <div className="flex items-center justify-center shrink-0 text-white/20">
                                    <i className="bi bi-chevron-down text-lg md:hidden" />
                                    <i className="bi bi-chevron-right text-xl hidden md:block" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
