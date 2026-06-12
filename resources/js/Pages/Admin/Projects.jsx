import { useState, useEffect } from 'react';
import { useForm, router, Head } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';
import ConfirmModal from '../../Components/Admin/ConfirmModal';

const TAGS = ['website', 'webapp', 'backend', 'app'];

function ProjectForm({ project, onCancel }) {
    const isEdit = !!project;
    const { data, setData, processing, errors, reset } = useForm({
        title: project?.title ?? '',
        tech:  project?.tech  ?? '',
        tag:   project?.tag   ?? 'webapp',
        image: null,
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
        form.append('title', data.title);
        form.append('tech',  data.tech);
        form.append('tag',   data.tag);
        if (data.image) form.append('image', data.image);

        const url = isEdit ? `/admin/projects/${project.id}` : '/admin/projects';
        router.post(url, form, {
            forceFormData: true,
            onSuccess: () => { reset(); onCancel(); },
        });
    }

    const displayImage = preview ?? (isEdit ? project.image : null);

    return (
        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-white font-semibold text-lg">{isEdit ? 'Edit Project' : 'Add New Project'}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-white/60 text-sm block mb-1">Title</label>
                    <input value={data.title} onChange={e => setData('title', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent" />
                    {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label className="text-white/60 text-sm block mb-1">Tech</label>
                    <input value={data.tech} onChange={e => setData('tech', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent" />
                    {errors.tech && <p className="text-red-400 text-xs mt-1">{errors.tech}</p>}
                </div>
                <div>
                    <label className="text-white/60 text-sm block mb-1">Tag</label>
                    <select value={data.tag} onChange={e => setData('tag', e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent">
                        {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="text-white/60 text-sm block mb-1">
                        Image {isEdit && <span className="text-white/30">(leave empty to keep current)</span>}
                    </label>
                    {displayImage && (
                        <div className="relative mb-2">
                            <img src={displayImage} alt="Preview" className="w-full h-44 object-cover rounded-lg" />
                            {preview && (
                                <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-semibold">New</span>
                            )}
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={e => handleImage(e.target.files[0])}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 text-sm file:mr-3 file:bg-accent file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:text-xs" />
                    {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                </div>
            </div>

            <div className="flex gap-3 pt-2">
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
    const [list, setList]              = useState(projects);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId]    = useState(null);
    const [dragIdx, setDragIdx]        = useState(null);
    const [overIdx, setOverIdx]        = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null); // project id

    // Sync list when Inertia reloads props (add / delete)
    useEffect(() => { setList(projects); }, [projects]);

    function deleteProject(id) { setConfirmDelete(id); }

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
        router.post('/admin/projects/reorder', { ids: next.map(p => p.id) }, {
            preserveScroll: true,
            preserveState: true,
        });
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

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-display">Manage Projects</h1>
                            <p className="text-white/40 text-sm mt-1">{list.length} project{list.length !== 1 ? 's' : ''} · drag to reorder</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => { setShowAddForm(v => !v); setEditingId(null); }}
                                className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                                + Add Project
                            </button>
                            <a href="/admin" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Dashboard</a>
                            <a href="/admin/settings" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Settings</a>
                            <a href="/" target="_blank" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">View Site</a>
                            <form method="POST" action="/admin/logout" onSubmit={e => { e.preventDefault(); router.post('/admin/logout'); }}>
                                <button type="submit" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Logout</button>
                            </form>
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
                                    ${overIdx === i && dragIdx !== i ? 'ring-2 ring-accent/60' : ''}
                                `}>
                                {editingId === project.id ? (
                                    <ProjectForm project={project} onCancel={() => setEditingId(null)} />
                                ) : (
                                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                                        <i className="bi bi-grip-vertical text-white/20 text-lg cursor-grab active:cursor-grabbing flex-shrink-0" />
                                        <img src={project.image} alt={project.title}
                                            className="w-24 h-14 object-cover rounded-lg flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-semibold truncate">{project.title}</p>
                                            <p className="text-white/40 text-sm">{project.tech}</p>
                                        </div>
                                        <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full uppercase font-semibold flex-shrink-0">
                                            {project.tag}
                                        </span>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button onClick={() => { setEditingId(project.id); setShowAddForm(false); }}
                                                className="bg-white/10 text-white/70 px-4 py-1.5 rounded-lg text-xs hover:bg-white/20 transition">
                                                Edit
                                            </button>
                                            <button onClick={() => deleteProject(project.id)}
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
