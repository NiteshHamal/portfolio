import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filters = ['all', 'website', 'webapp', 'backend', 'app'];

function Lightbox({ project, onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4
                       bg-black/85 backdrop-blur-md">

            <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1,    opacity: 1 }}
                exit={{    scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                className="relative max-w-4xl w-full rounded-2xl overflow-hidden
                           border border-white/10 shadow-2xl shadow-black/80">

                <img src={project.image} alt={project.title}
                    className="w-full object-cover block" />

                {/* Title bar */}
                <div className="absolute inset-x-0 bottom-0
                                bg-gradient-to-t from-black/80 to-transparent
                                px-5 py-4">
                    <p className="text-white font-semibold font-display text-base">{project.title}</p>
                    {project.tech && (
                        <p className="text-white/50 text-xs mt-1">{project.tech}</p>
                    )}
                </div>

                {/* Close */}
                <button onClick={onClose}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full
                               bg-black/60 backdrop-blur-sm border border-white/15
                               flex items-center justify-center text-white/80
                               hover:bg-white/20 transition-colors duration-200">
                    <i className="bi bi-x text-lg" />
                </button>
            </motion.div>
        </motion.div>
    );
}

export default function PortfolioSection({ projects = [] }) {
    const [active,   setActive]   = useState('all');
    const [lightbox, setLightbox] = useState(null);

    const filtered = active === 'all' ? projects : projects.filter(p => p.tag === active);

    return (
        <section id="portfolio" className="py-24 bg-[#080808] section-noise">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16 heading-glow">
                    <span className="text-accent text-sm font-display tracking-[4px] uppercase">My Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display heading-gradient mt-3">Portfolio</h2>
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
                        {filtered.map((project) => {
                            const { id, title, tech, image, slug, demo_url, github_url, featured } = project;
                            const Tag = slug ? motion.a : motion.div;
                            const tagProps = slug
                                ? { href: `/projects/${slug}` }
                                : { onClick: () => setLightbox(project), role: 'button', tabIndex: 0 };

                            return (
                                <Tag key={id} layout
                                    {...tagProps}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="group relative rounded-xl overflow-hidden block cursor-pointer">

                                    {/* Image */}
                                    <img src={image} alt={title} loading="lazy"
                                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" />

                                    {/* Featured badge */}
                                    {featured && (
                                        <span className="absolute top-3 left-3 z-10 bg-accent text-white
                                                         text-[10px] font-bold uppercase tracking-widest
                                                         px-2.5 py-1 rounded-full shadow-lg shadow-accent/30">
                                            Featured
                                        </span>
                                    )}

                                    {/* Hover gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80
                                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* GitHub + Demo quick links on hover */}
                                    <div className="absolute top-3 right-3 flex gap-2 z-10
                                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {github_url && (
                                            <a href={github_url} target="_blank" rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20
                                                           flex items-center justify-center text-white text-xs
                                                           hover:bg-white hover:text-black hover:border-white transition-all duration-200">
                                                <i className="bi bi-github" />
                                            </a>
                                        )}
                                        {demo_url && (
                                            <a href={demo_url} target="_blank" rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20
                                                           flex items-center justify-center text-white text-xs
                                                           hover:bg-accent hover:border-accent transition-all duration-200">
                                                <i className="bi bi-box-arrow-up-right" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Tech pills */}
                                    <div className="absolute inset-x-0 bottom-14 flex flex-wrap justify-center gap-1.5 px-4
                                                    translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                                                    transition-all duration-300 delay-75">
                                        {tech && tech.split(',').map(t => (
                                            <span key={t}
                                                className="bg-black/60 backdrop-blur-sm border border-white/15
                                                           text-white/80 text-[11px] font-sans px-2.5 py-1 rounded-full">
                                                {t.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Frosted name strip */}
                                    <div className="absolute inset-x-0 bottom-0
                                                    bg-black/50 backdrop-blur-md border-t border-white/[0.08]
                                                    px-4 py-3 flex items-center justify-between">
                                        <h4 className="text-white font-semibold font-display text-sm truncate pr-2">
                                            {title}
                                        </h4>
                                        <span className="flex items-center gap-1 text-accent text-xs font-display font-semibold
                                                         shrink-0 opacity-70 group-hover:opacity-100
                                                         group-hover:gap-1.5 transition-all duration-300">
                                            {slug ? 'Details' : 'View'}
                                            <i className={`bi ${slug ? 'bi-arrow-right' : 'bi-arrows-fullscreen'} text-[11px]`} />
                                        </span>
                                    </div>
                                </Tag>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}
            </AnimatePresence>
        </section>
    );
}
