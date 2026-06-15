import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../Components/PageTransition';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BackToTop from '../Components/BackToTop';
import ScrollProgress from '../Components/ScrollProgress';

function ShotLightbox({ shots, startIdx, onClose }) {
    const [idx, setIdx] = useState(startIdx);
    const prev = () => setIdx(i => (i - 1 + shots.length) % shots.length);
    const next = () => setIdx(i => (i + 1) % shots.length);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22 }}
                onClick={e => e.stopPropagation()}
                className="relative max-w-5xl w-full">
                <img src={shots[idx]} alt="" className="w-full rounded-xl shadow-2xl object-contain max-h-[80vh]" />
                <span className="absolute top-3 left-3 bg-black/60 text-white/70 text-xs px-2.5 py-1 rounded-full">
                    {idx + 1} / {shots.length}
                </span>
                <button onClick={onClose}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/15
                               flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                    <i className="bi bi-x text-lg" />
                </button>
            </motion.div>
            {shots.length > 1 && (
                <>
                    <button onClick={e => { e.stopPropagation(); prev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                                   bg-black/60 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                        <i className="bi bi-chevron-left" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); next(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                                   bg-black/60 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                        <i className="bi bi-chevron-right" />
                    </button>
                </>
            )}
        </motion.div>
    );
}

export default function ProjectDetail({ project, prev, next, settings = {} }) {
    const tech  = project.tech ? project.tech.split(',').map(t => t.trim()) : [];
    const shots = project.screenshots ?? [];
    const [lightbox, setLightbox] = useState(null);

    return (
        <PageTransition key={project.slug}>
            <Head title={project.title} />
            <ScrollProgress />
            <Navbar />

            {/* HERO */}
            <section className="relative bg-[#040404] pt-28 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 50% at 65% 45%, rgba(24,210,110,0.07) 0%, transparent 70%)' }} />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left */}
                        <div>
                            <button onClick={() => router.visit('/#portfolio')}
                                className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm transition-colors mb-8 font-display">
                                <i className="bi bi-arrow-left text-xs" />
                                Back to Portfolio
                            </button>

                            <div className="flex items-center gap-3 mb-5">
                                <span className="bg-accent/10 text-accent text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-accent/20">
                                    {project.tag}
                                </span>
                                {project.featured && (
                                    <span className="bg-accent text-white text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight heading-gradient mb-6">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {tech.map(t => (
                                    <span key={t} className="bg-white/[0.06] border border-white/10 text-white/65 text-xs px-3 py-1.5 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {project.demo_url && (
                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center gap-2">
                                        <i className="bi bi-box-arrow-up-right" /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                        className="btn-outline inline-flex items-center gap-2">
                                        <i className="bi bi-github" /> View Source
                                    </a>
                                )}
                                {shots.length > 0 && (
                                    <button onClick={() => setLightbox(0)}
                                        className="btn-outline inline-flex items-center gap-2">
                                        <i className="bi bi-images" /> Gallery ({shots.length})
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right — image */}
                        <div className="relative p-3">
                            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent" />
                            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent" />
                            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent" />
                            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent" />
                            <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/60">
                                <img src={project.image} alt={project.title} className="w-full aspect-video object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BODY */}
            <div className="bg-[#040404]">

                <div className="max-w-7xl mx-auto px-6">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Two-column */}
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-3 gap-16 items-start">

                        {/* Description */}
                        <div className="lg:col-span-2">
                            {project.description ? (
                                <>
                                    <h2 className="text-2xl font-bold font-display heading-gradient mb-8">About the Project</h2>
                                    <div className="prose-bio text-white/65 text-base leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: project.description }} />
                                </>
                            ) : (
                                <p className="text-white/25 italic text-sm">No description added yet.</p>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 lg:sticky lg:top-28">
                            <h4 className="text-white/50 text-[10px] font-display font-bold uppercase tracking-widest mb-4">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {tech.map(t => (
                                    <span key={t} className="bg-accent/10 border border-accent/20 text-accent text-xs px-2.5 py-1 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between py-3 border-t border-white/[0.06]">
                                <span className="text-white/40 text-xs">Category</span>
                                <span className="text-white/70 text-xs font-semibold capitalize">{project.tag}</span>
                            </div>

                            {(project.github_url || project.demo_url) && (
                                <div className="space-y-2 pt-4 border-t border-white/[0.06] mt-2">
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2.5 w-full bg-white/[0.04] hover:bg-white/[0.08]
                                                       border border-white/[0.08] rounded-lg px-4 py-2.5 text-white/65 hover:text-white text-sm transition-all group">
                                            <i className="bi bi-github text-base" />
                                            <span className="flex-1">View Source</span>
                                            <i className="bi bi-arrow-up-right text-xs text-white/25 group-hover:text-accent transition-colors" />
                                        </a>
                                    )}
                                    {project.demo_url && (
                                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2.5 w-full bg-accent/10 hover:bg-accent/20
                                                       border border-accent/20 rounded-lg px-4 py-2.5 text-accent text-sm transition-all group">
                                            <i className="bi bi-box-arrow-up-right text-base" />
                                            <span className="flex-1">Live Demo</span>
                                            <i className="bi bi-arrow-up-right text-xs opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Screenshots */}
                {shots.length > 0 && (
                    <div className="bg-[#080808] py-20">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="mb-12">
                                <span className="text-accent text-sm font-display tracking-[4px] uppercase">Visuals</span>
                                <h2 className="text-3xl font-bold font-display heading-gradient mt-2">Screenshots</h2>
                                <div className="w-12 h-1 bg-accent mt-3 rounded-full" />
                            </div>
                            <div className={`grid gap-4 ${
                                shots.length === 1 ? 'grid-cols-1 max-w-3xl' :
                                shots.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            }`}>
                                {shots.map((url, i) => (
                                    <button key={url} onClick={() => setLightbox(i)}
                                        className="group relative rounded-xl overflow-hidden border border-white/[0.06]
                                                   hover:border-accent/30 transition-colors duration-300 cursor-zoom-in block">
                                        <img src={url} alt={`Screenshot ${i + 1}`}
                                            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                                            <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white
                                                            opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                                                <i className="bi bi-zoom-in" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Prev / Next */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

                    {(prev || next) && (
                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            {prev ? (
                                <a href={`/projects/${prev.slug}`}
                                    className="group relative rounded-xl overflow-hidden border border-white/[0.06]
                                               hover:border-accent/30 transition-all duration-300 block min-h-[160px]">
                                    {prev.image && (
                                        <img src={prev.image} alt={prev.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 scale-105 group-hover:scale-100 transition-all duration-500" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end p-5">
                                        <p className="text-accent text-xs font-display tracking-widest uppercase mb-1 flex items-center gap-2">
                                            <i className="bi bi-arrow-left" /> Previous
                                        </p>
                                        <h4 className="text-white font-bold font-display text-lg group-hover:text-accent transition-colors">
                                            {prev.title}
                                        </h4>
                                    </div>
                                </a>
                            ) : <div />}

                            {next ? (
                                <a href={`/projects/${next.slug}`}
                                    className="group relative rounded-xl overflow-hidden border border-white/[0.06]
                                               hover:border-accent/30 transition-all duration-300 block min-h-[160px]">
                                    {next.image && (
                                        <img src={next.image} alt={next.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 scale-105 group-hover:scale-100 transition-all duration-500" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent flex flex-col justify-end items-end p-5">
                                        <p className="text-accent text-xs font-display tracking-widest uppercase mb-1 flex items-center gap-2">
                                            Next <i className="bi bi-arrow-right" />
                                        </p>
                                        <h4 className="text-white font-bold font-display text-lg text-right group-hover:text-accent transition-colors">
                                            {next.title}
                                        </h4>
                                    </div>
                                </a>
                            ) : <div />}
                        </div>
                    )}

                    <div className="text-center">
                        <button onClick={() => router.visit('/#portfolio')}
                            className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm transition-colors font-display">
                            <i className="bi bi-grid text-xs" /> All Projects
                        </button>
                    </div>
                </div>
            </div>

            <Footer hero={settings.hero} contact={settings.contact} />
            <BackToTop />

            <AnimatePresence>
                {lightbox !== null && (
                    <ShotLightbox shots={shots} startIdx={lightbox} onClose={() => setLightbox(null)} />
                )}
            </AnimatePresence>
        </PageTransition>
    );
}
