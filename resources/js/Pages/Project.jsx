import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import BackToTop from '../Components/BackToTop';
import ScrollProgress from '../Components/ScrollProgress';

export default function ProjectDetail({ project, settings = {} }) {
    const tech = project.tech ? project.tech.split(',').map(t => t.trim()) : [];

    return (
        <>
            <Head>
                <title>{project.title} — {settings.hero?.name ?? 'Portfolio'}</title>
                <meta name="description" content={project.description?.replace(/<[^>]+>/g, '').slice(0, 160)} />
            </Head>

            <ScrollProgress />
            <Navbar />

            {/* Hero image */}
            <div className="relative h-[55vh] min-h-[340px] overflow-hidden">
                <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-black/40 to-transparent" />

                {project.featured && (
                    <span className="absolute top-6 right-6 bg-accent text-white text-xs font-display font-bold
                                     px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-accent/30">
                        Featured
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="bg-[#040404] pb-24">
                <div className="max-w-3xl mx-auto px-6">

                    {/* Back link */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }} className="pt-10 pb-6">
                        <button onClick={() => router.visit('/#portfolio')}
                            className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm
                                       transition-colors duration-200 font-display">
                            <i className="bi bi-arrow-left text-xs" />
                            Back to Portfolio
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>

                        {/* Tag */}
                        <span className="inline-block bg-accent/10 text-accent text-xs font-display font-semibold
                                         uppercase tracking-widest px-3 py-1 rounded-full mb-5 border border-accent/20">
                            {project.tag}
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold font-display heading-gradient mb-6 leading-tight">
                            {project.title}
                        </h1>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-10">
                            {tech.map(t => (
                                <span key={t}
                                    className="bg-white/[0.05] border border-white/10 text-white/65
                                               text-xs font-sans px-3 py-1.5 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center gap-2">
                                    <i className="bi bi-box-arrow-up-right" />
                                    Live Demo
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                    className="btn-outline inline-flex items-center gap-2">
                                    <i className="bi bi-github" />
                                    View Source
                                </a>
                            )}
                        </div>

                        {/* Description */}
                        {project.description ? (
                            <>
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
                                <div className="prose-bio text-white/65 text-base leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: project.description }} />
                            </>
                        ) : (
                            <p className="text-white/30 italic text-sm">No description added yet.</p>
                        )}
                    </motion.div>
                </div>
            </div>

            <BackToTop />
        </>
    );
}
