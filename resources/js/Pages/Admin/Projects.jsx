import { useState } from 'react';
import { useForm, router, Head } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';

const TAGS = ['website', 'webapp', 'backend', 'app'];

function ProjectForm({ project, onCancel }) {
    const isEdit = !!project;
    const { data, setData, processing, errors, reset } = useForm({
        title: project?.title ?? '',
        tech: project?.tech ?? '',
        tag: project?.tag ?? 'webapp',
        sort_order: project?.sort_order ?? '',
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        const form = new FormData();
        form.append('title', data.title);
        form.append('tech', data.tech);
        form.append('tag', data.tag);
        form.append('sort_order', data.sort_order);
        if (data.image) form.append('image', data.image);

        const url = isEdit ? `/admin/projects/${project.id}` : '/admin/projects';
        router.post(url, form, {
            forceFormData: true,
            onSuccess: () => { reset(); onCancel(); },
        });
    }

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
                <div>
                    <label className="text-white/60 text-sm block mb-1">Sort Order (higher = shown first)</label>
                    <input type="number" value={data.sort_order} onChange={e => setData('sort_order', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent" />
                </div>
                <div className="md:col-span-2">
                    <label className="text-white/60 text-sm block mb-1">
                        Image {isEdit && <span className="text-white/30">(leave empty to keep current)</span>}
                    </label>
                    <input type="file" accept="image/*" onChange={e => setData('image', e.target.files[0])}
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
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    function deleteProject(id) {
        if (!confirm('Delete this project?')) return;
        router.delete(`/admin/projects/${id}`);
    }

    return (
        <>
            <Head title="Manage Projects" />
            <Toast />
            <div className="min-h-screen bg-[#080808] text-white px-6 py-10">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-display">Manage Projects</h1>
                            <p className="text-white/40 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => { setShowAddForm(v => !v); setEditingId(null); }}
                                className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                                + Add Project
                            </button>
                            <a href="/admin" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                                Dashboard
                            </a>
                            <a href="/admin/settings" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                                Settings
                            </a>
                            <a href="/" target="_blank" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                                View Site
                            </a>
                            <form method="POST" action="/admin/logout" onSubmit={e => { e.preventDefault(); router.post('/admin/logout'); }}>
                                <button type="submit" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Add form */}
                    {showAddForm && (
                        <div className="mb-8">
                            <ProjectForm onCancel={() => setShowAddForm(false)} />
                        </div>
                    )}

                    {/* Project list */}
                    <div className="space-y-4">
                        {projects.map(project => (
                            <div key={project.id}>
                                {editingId === project.id ? (
                                    <ProjectForm project={project} onCancel={() => setEditingId(null)} />
                                ) : (
                                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                                        <img src={project.image} alt={project.title}
                                            className="w-24 h-14 object-cover rounded-lg flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-semibold truncate">{project.title}</p>
                                            <p className="text-white/40 text-sm">{project.tech}</p>
                                        </div>
                                        <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full uppercase font-semibold flex-shrink-0">
                                            {project.tag}
                                        </span>
                                        <span className="text-white/30 text-xs w-10 text-center flex-shrink-0">
                                            #{project.sort_order}
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
