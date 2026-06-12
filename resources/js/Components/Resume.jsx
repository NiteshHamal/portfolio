import { motion } from 'framer-motion';

function TimelineItem({ title, period, place, points, delay }) {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay }}
            className="relative pl-8 pb-8 border-l-2 border-white/10 last:border-transparent last:pb-0">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-2 border-dark" />
            <span className="inline-block text-xs font-display font-semibold bg-white/10 text-white/70 px-3 py-1 rounded mb-2">{period}</span>
            <h4 className="text-accent font-bold font-display text-lg mb-1">{title}</h4>
            <p className="text-white/50 text-sm italic mb-3">{place}</p>
            {points && points.length > 0 && (
                <ul className="space-y-1">
                    {points.map((p, i) => (
                        <li key={i} className="text-white/60 text-sm flex gap-2">
                            <i className="bi bi-chevron-right text-accent text-xs mt-1 shrink-0" />{p}
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
}

export default function Resume({ data = {} }) {
    const { education = [], experience = [] } = data;

    return (
        <section id="resume" className="py-24 bg-[#080808]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
                    <span className="text-accent text-sm font-display tracking-[4px] uppercase">My Story</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mt-3">Resume</h2>
                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-xl font-bold font-display text-white mb-8 flex items-center gap-3">
                            <i className="bi bi-mortarboard text-accent" /> Education
                        </h3>
                        {education.map((e, i) => <TimelineItem key={i} {...e} delay={i * 0.1} />)}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-display text-white mb-8 flex items-center gap-3">
                            <i className="bi bi-briefcase text-accent" /> Experience
                        </h3>
                        {experience.map((e, i) => <TimelineItem key={i} {...e} delay={i * 0.1} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}
