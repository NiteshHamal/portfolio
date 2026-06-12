import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filters = ['all', 'website', 'webapp', 'backend', 'app'];

export default function PortfolioSection({ projects = [] }) {
    const [active, setActive] = useState('all');
    const filtered = active === 'all' ? projects : projects.filter(p => p.tag === active);

    return (
        <section id="portfolio" className="py-24 bg-[#080808]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
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
                        {filtered.map(({ id, title, tech, image }) => (
                            <motion.div key={id} layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative rounded-xl overflow-hidden cursor-pointer">
                                <img src={image} alt={title} loading="lazy"
                                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                                    <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-white transition-all duration-300 group-hover:top-3 group-hover:left-3" />
                                    <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-white transition-all duration-300 group-hover:bottom-3 group-hover:right-3" />
                                    <h4 className="text-white font-bold font-display text-lg">{title}</h4>
                                    <span className="text-accent text-sm uppercase tracking-wide">{tech}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
