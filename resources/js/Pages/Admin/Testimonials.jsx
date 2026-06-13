import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';

const EMPTY = { name: '', role: '', content: '', rating: 5, sort_order: 0, active: true };

function StarPicker({ value, onChange }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onChange(n)}
                    className={`text-xl transition-colors ${n <= value ? 'text-yellow-400' : 'text-white/20 hover:text-yellow-400/50'}`}>
                    ★
                </button>
            ))}
        </div>
    );
}

function TestimonialForm({ initial = EMPTY, onSave, onCancel, avatarPreview }) {
    const [form, setForm]         = useState(initial);
    const [avatarFile, setAvatarFile] = useState(null);
    const [preview, setPreview]   = useState(avatarPreview ?? null);
    const [saving, setSaving]     = useState(false);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (avatarFile) fd.append('avatar', avatarFile);
        onSave(fd, () => setSaving(false));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Role */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-white/50 text-xs mb-1 uppercase tracking-wider">Name *</label>
                    <input
                        className="form-input w-full"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        required
                        placeholder="Client name"
                    />
                </div>
                <div>
                    <label className="block text-white/50 text-xs mb-1 uppercase tracking-wider">Role / Company</label>
                    <input
                        className="form-input w-full"
                        value={form.role}
                        onChange={e => set('role', e.target.value)}
                        placeholder="e.g. CEO, EventSathi"
                    />
                </div>
            </div>

            {/* Quote */}
            <div>
                <label className="block text-white/50 text-xs mb-1 uppercase tracking-wider">Quote *</label>
                <textarea
                    className="form-input w-full"
                    rows={4}
                    value={form.content}
                    onChange={e => set('content', e.target.value)}
                    required
                    placeholder="What the client said…"
                />
            </div>

            {/* Rating + Sort */}
            <div className="flex flex-wrap gap-6 items-end">
                <div>
                    <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Rating</label>
                    <StarPicker value={form.rating} onChange={v => set('rating', v)} />
                </div>
                <div>
                    <label className="block text-white/50 text-xs mb-1 uppercase tracking-wider">Sort order</label>
                    <input
                        type="number"
                        className="form-input w-24"
                        value={form.sort_order}
                        onChange={e => set('sort_order', e.target.value)}
                    />
                </div>
                <label className="flex items-center gap-2 cursor-pointer mb-1">
                    <input
                        type="checkbox"
                        checked={form.active}
                        onChange={e => set('active', e.target.checked)}
                        className="accent-accent w-4 h-4"
                    />
                    <span className="text-white/60 text-sm">Visible on site</span>
                </label>
            </div>

            {/* Avatar */}
            <div>
                <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Avatar photo (optional)</label>
                <div className="flex items-center gap-4">
                    {preview ? (
                        <img src={preview} alt="avatar" className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/30" />
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white/30">
                            <i className="bi bi-person text-2xl" />
                        </div>
                    )}
                    <label className="cursor-pointer px-4 py-2 rounded-lg border border-white/15 text-white/60 text-sm hover:border-accent hover:text-accent transition-colors">
                        Choose photo
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                    </label>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                    className="btn-primary py-2.5 px-6 disabled:opacity-50">
                    {saving ? 'Saving…' : 'Save'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel}
                        className="btn-outline py-2.5 px-6">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

function TestimonialRow({ t, onEdit, onDelete }) {
    const initials = t.name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    const [confirming, setConfirming] = useState(false);

    return (
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 flex gap-4 items-start">
            {/* Avatar */}
            {t.avatar ? (
                <img src={`/storage/${t.avatar}`} alt={t.name}
                     className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-accent/20" />
            ) : (
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent font-bold">
                    {initials}
                </div>
            )}

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{t.name}</span>
                    {t.role && <span className="text-accent text-xs">{t.role}</span>}
                    {!t.active && <span className="text-xs text-white/30 border border-white/15 rounded-full px-2 py-0.5">Hidden</span>}
                </div>
                <div className="flex gap-0.5 mt-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-sm ${i < t.rating ? 'text-yellow-400' : 'text-white/15'}`}>★</span>
                    ))}
                </div>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2">"{t.content}"</p>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => onEdit(t)}
                    className="text-white/40 hover:text-accent transition-colors text-sm">
                    <i className="bi bi-pencil" />
                </button>
                {confirming ? (
                    <div className="flex gap-1">
                        <button onClick={() => onDelete(t.id)}
                            className="text-red-400 hover:text-red-300 text-xs">Yes</button>
                        <button onClick={() => setConfirming(false)}
                            className="text-white/30 hover:text-white/60 text-xs">No</button>
                    </div>
                ) : (
                    <button onClick={() => setConfirming(true)}
                        className="text-white/40 hover:text-red-400 transition-colors text-sm">
                        <i className="bi bi-trash" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default function AdminTestimonials({ testimonials = [], flash = {} }) {
    const [editing, setEditing] = useState(null); // null = closed, 'new' = add form, testimonial object = edit

    const handleAdd = (fd, done) => {
        router.post('/admin/testimonials', fd, {
            forceFormData: true,
            onSuccess: () => { setEditing(null); done(); },
            onError:   () => done(),
        });
    };

    const handleUpdate = (t, fd, done) => {
        router.post(`/admin/testimonials/${t.id}`, fd, {
            forceFormData: true,
            onSuccess: () => { setEditing(null); done(); },
            onError:   () => done(),
        });
    };

    const handleDelete = (id) => {
        router.delete(`/admin/testimonials/${id}`);
    };

    return (
        <>
            <Head title="Testimonials — Admin" />
            <Toast message={flash.success} />

            <div className="min-h-screen bg-[#040404] text-white p-6 md:p-10">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold font-display">Testimonials</h1>
                            <p className="text-white/40 text-sm mt-1">{testimonials.length} total</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => router.visit('/admin')}
                                className="btn-outline py-2 px-4 text-sm">
                                ← Dashboard
                            </button>
                            <button
                                onClick={() => setEditing('new')}
                                className="btn-primary py-2 px-4 text-sm">
                                + Add
                            </button>
                        </div>
                    </div>

                    {/* Add form */}
                    {editing === 'new' && (
                        <div className="bg-white/[0.04] border border-accent/20 rounded-2xl p-6 mb-6">
                            <h2 className="text-white font-semibold mb-5">New Testimonial</h2>
                            <TestimonialForm
                                onSave={(fd, done) => handleAdd(fd, done)}
                                onCancel={() => setEditing(null)}
                            />
                        </div>
                    )}

                    {/* Edit form */}
                    {editing && editing !== 'new' && (
                        <div className="bg-white/[0.04] border border-accent/20 rounded-2xl p-6 mb-6">
                            <h2 className="text-white font-semibold mb-5">Edit Testimonial</h2>
                            <TestimonialForm
                                initial={{
                                    name: editing.name,
                                    role: editing.role ?? '',
                                    content: editing.content,
                                    rating: editing.rating,
                                    sort_order: editing.sort_order,
                                    active: editing.active,
                                }}
                                avatarPreview={editing.avatar ? `/storage/${editing.avatar}` : null}
                                onSave={(fd, done) => handleUpdate(editing, fd, done)}
                                onCancel={() => setEditing(null)}
                            />
                        </div>
                    )}

                    {/* List */}
                    <div className="space-y-4">
                        {testimonials.length === 0 && (
                            <div className="text-center py-20 text-white/30">
                                <i className="bi bi-chat-quote text-4xl block mb-3" />
                                No testimonials yet. Add your first one.
                            </div>
                        )}
                        {testimonials.map(t => (
                            <TestimonialRow
                                key={t.id}
                                t={t}
                                onEdit={t => { setEditing(t); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
