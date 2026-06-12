import { useState, useEffect } from 'react';
import { useForm, router, Head } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';
import ConfirmModal from '../../Components/Admin/ConfirmModal';
import RichEditor from '../../Components/Admin/RichEditor';

const TAGS = ['website', 'webapp', 'backend', 'app'];

const cls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent';

function ProjectForm({ project, onCancel }) {
    const isEdit = !!project;
    const { data, setData, processing, errors, reset } = useForm({
        title:       project?.title       ?? '',
        tech:        project?.tech        ?? '',
        tag:         project?.tag         ?? 'webapp',
        image:       null,
        description: project?.description ?? '',
        github_url:  project?.github_url  ?? '',
        demo_url:    project?.demo_url    ?? '',
        featured:    project?.featured    ?? false,
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

    function handleImage(file) {
        setData('image', file);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(file ? URL.createObjectURL(file) : null);
    }

    function submit(e) {
        e.preventDefault();
        const form = new FormData();
        form.append('title',       data.title);
        form.append('tech',        data.tech);
        form.append('tag',         data.tag);
        form.append('description', data.description ?? '');
        form.append('github_url',  data.github_url  ?? '');
        form.append('demo_url',    data.demo_url    ?? '');
        form.append('featured',    data.featured ? '1' : '0');
        if (data.image) form.append('image', data.image);

        const url = isEdit ? `/admin/projects/${project.id}` : '/admin/projects';
        router.post(url, form, {
            forceFormData: true,
            onSuccess: () => { reset(); onCancel(); },
        });
    }

    const displayImage = preview ?? (isEdit ? project.image : null);

    return (
        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">
            <h3 className="text-white font-semibold text-lg">{isEdit ? 'Edit Project' : 'Add New Project'}</h3>

            {/* Row 1 — Title + Tech */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-white/50 text-xs mb-1 block">Title *</label>
                    <input value={data.title} onChange={e => setData('title', e.target.value)} className={cls} />
                    {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label className="text-white/50 text-xs mb-1 block">Tech Stack * <span className="text-white/25">(comma separated)</span></label>
                    <input value={data.tech} onChange={e => setData('tech', e.target.value)} className={cls} placeholder="Laravel, React, MySQL" />
                    {errors.tech && <p className="text-red-400 text-xs mt-1">{errors.tech}</p>}
                </div>
            </div>

            {/* Row 2 — Tag + Featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                    <label className="text-white/50 text-xs mb-1 block">Category *</label>
                    <select value={data.tag} onChange={e => setData('tag', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent">
                        {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className="relative">
                            <input type="checkbox" checked={data.featured} onChange={e => setData('featured', e.target.checked)}
                                className="sr-only peer" />
                            <div className="w-10 h-5 rounded-full bg-white/10 peer-checked:bg-accent transition-colors duration-200" />
                            <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white
                                            transition-transform duration-200 peer-checked:translate-x-5 shadow" />
                        </div>
                        <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">Featured project</span>
                    </label>
                </div>
            </div>

            {/* Row 3 — URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-white/50 text-xs mb-1 block">GitHub URL</label>
                    <input value={data.github_url} onChange={e => setData('github_url', e.target.value)}
                        className={cls} placeholder="https://github.com/…" />
                    {errors.github_url && <p className="text-red-400 text-xs mt-1">{errors.github_url}</p>}
                </div>
                <div>
                    <label className="text-white/50 text-xs mb-1 block">Demo / Live URL</label>
                    <input value={data.demo_url} onChange={e => setData('demo_url', e.target.value)}
                        className={cls} placeholder="https://…" />
                    {errors.demo_url && <p className="text-red-400 text-xs mt-1">{errors.demo_url}</p>}
                </div>
            </div>

            {/* Row 4 — Image */}
            <div>
                <label className="text-white/50 text-xs mb-1 block">
                    Image {isEdit && <span className="text-white/25">(leave empty to keep current)</span>} *
                </label>
                {displayImage && (
                    <div className="relative mb-2">
                        <img src={displayImage} alt="Preview" className="w-full h-44 object-cover rounded-lg" />
                        {preview && <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-semibold">New</span>}
                    </div>
                )}
                <input type="file" accept="image/*" onChange={e => handleImage(e.target.files[0])}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 text-sm
                               file:mr-3 file:bg-accent file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:text-xs" />
                {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
            </div>

            {/* Row 5 — Description */}
            <div>
                <label className="text-white/50 text-xs mb-1 block">Description</label>
                <RichEditor value={data.description} onChange={v => setData('description', v)}
                    placeholder="Describe the project — problem, solution, your role…" minRows={4} />
            </div>

            <div className="flex gap-3 pt-1">
                <button type="submit" disabled={processing}
                    className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition disabled:opacity-50">
                    {processing ? 'Saving…' : isEdit ? 'Update' : 'Add Project'}
                </button>
                <button type="button" onClick={onCancel}
                    className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default function AdminProjects({ projects = [] }) {
    const [list, setList]               = useState(projects);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId]     = useState(null);
    const [dragIdx, setDragIdx]         = useState(null);
    const [overIdx, setOverIdx]         = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => { setList(projects); }, [projects]);

    function onDragStart(i) { setDragIdx(i); }
    function onDragOver(e, i) { e.preventDefault(); setOverIdx(i); }
    function onDragEnd() { setDragIdx(null); setOverIdx(null); }
    function onDrop(i) {
        if (dragIdx === null || dragIdx === i) { setDragIdx(null); setOverIdx(null); return; }
        const next = [...list];
        const [moved] = next.splice(dragIdx, 1);
        next.splice(i, 0, moved);
        setList(next);
        setDragIdx(null); setOverIdx(null);
        router.post('/admin/projects/reorder', { ids: next.map(p => p.id) }, { preserveScroll: true, preserveState: true });
    }

    return (
        <>
            <Head title="Manage Projects" />
            <Toast />
            <ConfirmModal
                open={confirmDelete !== null}
                title="Delete Project"
                message="This project will be permanently removed from your portfolio."
                onConfirm={() => { router.delete(`/admin/projects/${confirmDelete}`); setConfirmDelete(null); }}
                onCancel={() => setConfirmDelete(null)}
            />
            <div className="min-h-screen bg-[#080808] text-white px-6 py-10">
                <div className="max-w-5xl mx-auto">

                    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-display">Manage Projects</h1>
                            <p className="text-white/40 text-sm mt-1">{list.length} project{list.length !== 1 ? 's' : ''} · drag to reorder</p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <button onClick={() => { setShowAddForm(v => !v); setEditingId(null); }}
                                className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                                + Add Project
                            </button>
                            <a href="/admin" className="bg-white/10 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">Dashboard</a>
                            <a href="/admin/settings" className="bg-white/10 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">Settings</a>
                            <a href="/" target="_blank" className="bg-white/10 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">View Site</a>
                            <button onClick={() => router.post('/admin/logout')} className="bg-white/10 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">Logout</button>
                        </div>
                    </div>

                    {showAddForm && (
                        <div className="mb-8">
                            <ProjectForm onCancel={() => setShowAddForm(false)} />
                        </div>
                    )}

                    <div className="space-y-3">
                        {list.map((project, i) => (
                            <div key={project.id}
                                draggable={editingId !== project.id}
                                onDragStart={() => onDragStart(i)}
                                onDragOver={e => onDragOver(e, i)}
                                onDrop={() => onDrop(i)}
                                onDragEnd={onDragEnd}
                                className={`transition-all duration-150 rounded-xl
                                    ${dragIdx === i ? 'opacity-40 scale-[0.98]' : ''}
                                    ${overIdx === i && dragIdx !== i ? 'ring-2 ring-accent/60' : ''}`}>
                                {editingId === project.id ? (
                                    <ProjectForm project={project} onCancel={() => setEditingId(null)} />
                                ) : (
                                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                                        <i className="bi bi-grip-vertical text-white/20 text-lg cursor-grab active:cursor-grabbing shrink-0" />
                                        <img src={project.image} alt={project.title} className="w-24 h-14 object-cover rounded-lg shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className="text-white font-semibold truncate">{project.title}</p>
                                                {project.featured && (
                                                    <span className="bg-accent/20 text-accent text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0">Featured</span>
                                                )}
                                            </div>
                                            <p className="text-white/40 text-xs truncate">{project.tech}</p>
                                            <div className="flex gap-3 mt-1">
                                                {project.github_url && <span className="text-white/25 text-xs flex items-center gap-1"><i className="bi bi-github" /> GitHub</span>}
                                                {project.demo_url   && <span className="text-white/25 text-xs flex items-center gap-1"><i className="bi bi-box-arrow-up-right" /> Demo</span>}
                                                {project.slug       && <a href={`/projects/${project.slug}`} target="_blank" className="text-accent/50 text-xs hover:text-accent flex items-center gap-1 transition-colors"><i className="bi bi-eye" /> View page</a>}
                                            </div>
                                        </div>
                                        <span className="bg-accent/10 text-accent/70 text-xs px-2.5 py-1 rounded-full uppercase font-semibold shrink-0">
                                            {project.tag}
                                        </span>
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => { setEditingId(project.id); setShowAddForm(false); }}
                                                className="bg-white/10 text-white/70 px-4 py-1.5 rounded-lg text-xs hover:bg-white/20 transition">
                                                Edit
                                            </button>
                                            <button onClick={() => setConfirmDelete(project.id)}
                                                className="bg-red-500/20 text-red-400 px-4 py-1.5 rounded-lg text-xs hover:bg-red-500/30 transition">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
