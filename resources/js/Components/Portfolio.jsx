import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filters = ['all', 'website', 'webapp', 'backend', 'app'];

export default function PortfolioSection({ projects = [] }) {
    const [active, setActive] = useState('all');
    const filtered = active === 'all' ? projects : projects.filter(p => p.tag === active);

    return (
        <section id="portfolio" className="py-24 bg-[#080808] section-noise">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16 heading-glow">
                    <span className="text-accent text-sm font-display tracking-[4px] uppercase">My Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mt-3">Portfolio</h2>
                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
                </motion.div>

                {/* Filters */}
                <div className="flex justify-center gap-3 mb-12 flex-wrap">
                    {filters.map(f => (
                        <button key={f} onClick={() => setActive(f)}
                            className={`px-6 py-2 rounded-full text-sm font-display font-semibold uppercase tracking-wide transition-all duration-300 ${
                                active === f
                                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div layout className="grid md:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filtered.map(({ id, title, tech, image, link }) => (
                            <motion.div key={id} layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative rounded-xl overflow-hidden">

                                {/* Image */}
                                <img src={image} alt={title} loading="lazy"
                                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" />

                                {/* Hover reveal — dark gradient + tech + link */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

                                {/* Tech pills + external link — slide up on hover */}
                                <div className="absolute inset-x-0 bottom-14 flex flex-wrap justify-center gap-1.5 px-4
                                                translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                                                transition-all duration-350 delay-75">
                                    {tech && tech.split(',').map(t => (
                                        <span key={t}
                                            className="bg-black/60 backdrop-blur-sm border border-white/15
                                                       text-white/80 text-[11px] font-sans px-2.5 py-1 rounded-full">
                                            {t.trim()}
                                        </span>
                                    ))}
                                </div>

                                {/* External link icon — top-right, fades in on hover */}
                                {link && (
                                    <a href={link} target="_blank" rel="noopener noreferrer"
                                        className="absolute top-3 right-3 w-9 h-9 rounded-full
                                                   bg-black/60 backdrop-blur-sm border border-white/20
                                                   flex items-center justify-center text-white
                                                   opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                                                   transition-all duration-300 hover:bg-accent hover:border-accent z-10">
                                        <i className="bi bi-arrow-up-right text-sm" />
                                    </a>
                                )}

                                {/* Always-visible frosted glass name strip */}
                                <div className="absolute inset-x-0 bottom-0
                                                bg-black/50 backdrop-blur-md border-t border-white/[0.08]
                                                px-4 py-3 flex items-center justify-between">
                                    <h4 className="text-white font-semibold font-display text-sm truncate pr-2">
                                        {title}
                                    </h4>
                                    <span className="text-accent text-xs font-sans shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                        View
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
