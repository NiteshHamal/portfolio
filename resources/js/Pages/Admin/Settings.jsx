import { useState, useEffect } from 'react';
import { router, Head } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';
import ConfirmModal from '../../Components/Admin/ConfirmModal';

const TABS = ['Hero', 'About', 'Skills', 'Stats', 'Resume', 'Services', 'Contact', 'SEO'];

function Field({ label, children }) {
    return (
        <div>
            <label className="block text-white/60 text-sm mb-1">{label}</label>
            {children}
        </div>
    );
}

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-accent';
const btnCls   = 'bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition disabled:opacity-50';
const dangerCls = 'bg-red-500/20 text-red-400 px-3 py-1.5 rounded text-xs hover:bg-red-500/30 transition';
const ghostCls  = 'bg-white/10 text-white/60 px-3 py-1.5 rounded text-xs hover:bg-white/20 transition';
const editCls   = 'bg-white/10 text-white/70 px-3 py-1.5 rounded text-xs hover:bg-accent hover:text-white transition';

function save(key, value, files = {}) {
    const form = new FormData();
    form.append('value', JSON.stringify(value));
    Object.entries(files).forEach(([k, f]) => f && form.append(k, f));
    router.post(`/admin/settings/${key}`, form, { forceFormData: true });
}

// ── Shared: list manager with display + inline edit + drag-to-reorder ─────────
function ListManager({ items, setItems, renderDisplay, renderForm, emptyItem, saveKey, saveItems, noSave, onDirty }) {
    const [editIdx, setEditIdx]       = useState(null);
    const [adding, setAdding]         = useState(false);
    const [draft, setDraft]           = useState(null);
    const [dragIdx, setDragIdx]       = useState(null);
    const [overIdx, setOverIdx]       = useState(null);
    const [confirmIdx, setConfirmIdx] = useState(null);

    function startEdit(i) { setAdding(false); setEditIdx(i); setDraft({ ...items[i] }); }
    function startAdd()   { setEditIdx(null); setAdding(true); setDraft({ ...emptyItem }); }
    function cancel()     { setEditIdx(null); setAdding(false); setDraft(null); }

    function commitEdit() {
        setItems(p => { const n = [...p]; n[editIdx] = draft; return n; });
        setEditIdx(null); setDraft(null);
        onDirty?.();
    }
    function commitAdd() {
        setItems(p => [...p, draft]);
        setAdding(false); setDraft(null);
        onDirty?.();
    }
    function remove(i) {
        setItems(p => p.filter((_, idx) => idx !== i));
        if (editIdx === i) { setEditIdx(null); setDraft(null); }
        onDirty?.();
        setConfirmIdx(null);
    }

    function onDrop(i) {
        if (dragIdx === null || dragIdx === i) { setDragIdx(null); setOverIdx(null); return; }
        setItems(prev => {
            const next = [...prev];
            const [moved] = next.splice(dragIdx, 1);
            next.splice(i, 0, moved);
            return next;
        });
        onDirty?.();
        setDragIdx(null); setOverIdx(null);
    }

    return (
        <div className="space-y-3">
            <ConfirmModal
                open={confirmIdx !== null}
                title="Delete Item"
                message="This item will be permanently removed from the list."
                onConfirm={() => remove(confirmIdx)}
                onCancel={() => setConfirmIdx(null)}
            />
            {items.map((item, i) => (
                <div key={i}
                    className={`transition-all duration-150 rounded-xl
                        ${dragIdx === i ? 'opacity-40 scale-[0.98]' : ''}
                        ${overIdx === i && dragIdx !== i ? 'ring-2 ring-accent/60' : ''}
                    `}>
                    {editIdx === i ? (
                        <div className="bg-white/[0.08] border border-accent/30 rounded-xl p-4 space-y-3">
                            <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">Editing</p>
                            {renderForm(draft, setDraft)}
                            <div className="flex gap-2 pt-1">
                                <button onClick={commitEdit} className={btnCls}>Save</button>
                                <button onClick={cancel} className={ghostCls}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                            draggable
                            onDragStart={() => setDragIdx(i)}
                            onDragOver={e => { e.preventDefault(); setOverIdx(i); }}
                            onDrop={() => onDrop(i)}
                            onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}>
                            <i className="bi bi-grip-vertical text-white/20 text-lg cursor-grab active:cursor-grabbing flex-shrink-0" />
                            <div className="flex-1 min-w-0">{renderDisplay(item)}</div>
                            <button onClick={() => startEdit(i)} className={editCls}>Edit</button>
                            <button onClick={() => setConfirmIdx(i)} className={dangerCls}>Delete</button>
                        </div>
                    )}
                </div>
            ))}

            {adding ? (
                <div className="bg-white/[0.08] border border-accent/30 rounded-xl p-4 space-y-3">
                    <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">New Item</p>
                    {renderForm(draft, setDraft)}
                    <div className="flex gap-2 pt-1">
                        <button onClick={commitAdd} className={btnCls}>Add</button>
                        <button onClick={cancel} className={ghostCls}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button onClick={startAdd} className={ghostCls}>+ Add New</button>
            )}

            {!noSave && (
                <div className="pt-2 border-t border-white/10">
                    <button onClick={() => save(saveKey, saveItems ?? items)} className={btnCls}>
                        Save All
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroTab({ init, onDirty }) {
    const [d, setD] = useState(init ?? {});
    const setF = (k, v) => { setD(p => ({ ...p, [k]: v })); onDirty?.(); };
    const strings = d.typed_strings ?? [];

    return (
        <div className="space-y-5">
            <p className="text-accent text-xs font-semibold uppercase tracking-wide">Editing Hero Section</p>
            <Field label="Name"><input value={d.name ?? ''} onChange={e => setF('name', e.target.value)} className={inputCls} /></Field>
            <Field label="Tagline (top label)"><input value={d.tagline ?? ''} onChange={e => setF('tagline', e.target.value)} className={inputCls} /></Field>
            <Field label="Description"><textarea rows={3} value={d.description ?? ''} onChange={e => setF('description', e.target.value)} className={`${inputCls} resize-none`} /></Field>
            <Field label="Typed Strings (one per line)">
                <textarea rows={4} value={strings.join('\n')} onChange={e => setF('typed_strings', e.target.value.split('\n'))} className={`${inputCls} resize-none`} />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="GitHub URL"><input value={d.github ?? ''} onChange={e => setF('github', e.target.value)} className={inputCls} /></Field>
                <Field label="LinkedIn URL"><input value={d.linkedin ?? ''} onChange={e => setF('linkedin', e.target.value)} className={inputCls} /></Field>
                <Field label="YouTube URL"><input value={d.youtube ?? ''} onChange={e => setF('youtube', e.target.value)} className={inputCls} /></Field>
            </div>
            <button className={btnCls} onClick={() => save('hero', d)}>Save Hero</button>
        </div>
    );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutTab({ init, onDirty }) {
    const [d, setD] = useState(init ?? {});
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [cv, setCv] = useState(null);
    const setF = (k, v) => { setD(p => ({ ...p, [k]: v })); onDirty?.(); };

    useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

    function handlePhoto(file) {
        setPhoto(file);
        if (photoPreview) URL.revokeObjectURL(photoPreview);
        setPhotoPreview(file ? URL.createObjectURL(file) : null);
        onDirty?.();
    }

    return (
        <div className="space-y-5">
            <p className="text-accent text-xs font-semibold uppercase tracking-wide">Editing About Section</p>
            <Field label="Role / Subtitle"><input value={d.subtitle ?? ''} onChange={e => setF('subtitle', e.target.value)} className={inputCls} /></Field>
            <Field label="Bio Paragraph 1"><textarea rows={3} value={d.bio1 ?? ''} onChange={e => setF('bio1', e.target.value)} className={`${inputCls} resize-none`} /></Field>
            <Field label="Bio Paragraph 2"><textarea rows={3} value={d.bio2 ?? ''} onChange={e => setF('bio2', e.target.value)} className={`${inputCls} resize-none`} /></Field>

            <div className="grid grid-cols-2 gap-4">
                {[['Birthday','birthday'],['Age','age'],['Website','website'],['Degree','degree'],['Phone','phone'],['Email','email'],['City','city'],['Freelance','freelance']].map(([lbl, key]) => (
                    <Field key={key} label={lbl}><input value={d[key] ?? ''} onChange={e => setF(key, e.target.value)} className={inputCls} /></Field>
                ))}
            </div>

            <Field label="Profile Photo">
                <div className="flex items-center gap-4 mb-3">
                    {photoPreview
                        ? <div className="relative">
                            <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover ring-2 ring-accent" />
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">New</span>
                          </div>
                        : d.photo && <img src={d.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover ring-2 ring-white/10" />
                    }
                    {(photoPreview || d.photo) && (
                        <p className="text-white/40 text-xs">
                            {photoPreview ? 'Preview — save to apply' : 'Current photo'}
                        </p>
                    )}
                </div>
                <input type="file" accept="image/*" onChange={e => handlePhoto(e.target.files[0])}
                    className={`${inputCls} file:mr-3 file:bg-accent file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:text-xs`} />
            </Field>

            <Field label="CV / Resume (PDF)">
                {d.cv_url && <p className="text-white/40 text-xs mb-1">Current: {d.cv_url}</p>}
                <input type="file" accept=".pdf" onChange={e => { setCv(e.target.files[0]); onDirty?.(); }}
                    className={`${inputCls} file:mr-3 file:bg-accent file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:text-xs`} />
            </Field>

            <button className={btnCls} onClick={() => save('about', d, { photo, cv })}>Save About</button>
        </div>
    );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function SkillsTab({ init, onDirty }) {
    const [items, setItems] = useState(init ?? []);

    return (
        <ListManager
            items={items}
            setItems={setItems}
            saveKey="skills"
            onDirty={onDirty}
            emptyItem={{ name: '', val: 80 }}
            renderDisplay={s => (
                <div className="flex items-center gap-4">
                    <span className="text-white/80 text-sm font-medium">{s.name}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${s.val}%` }} />
                    </div>
                    <span className="text-accent text-xs font-bold w-8 text-right">{s.val}%</span>
                </div>
            )}
            renderForm={(draft, setDraft) => (
                <div className="flex gap-3 items-center">
                    <input value={draft.name ?? ''} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))} placeholder="Skill name" className={`${inputCls} flex-1`} />
                    <input type="number" min={0} max={100} value={draft.val ?? 80} onChange={e => setDraft(p => ({ ...p, val: Number(e.target.value) }))} className={`${inputCls} w-20`} />
                    <span className="text-white/40 text-sm">%</span>
                </div>
            )}
        />
    );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function StatsTab({ init, onDirty }) {
    const [items, setItems] = useState(init ?? []);

    return (
        <ListManager
            items={items}
            setItems={setItems}
            saveKey="stats"
            onDirty={onDirty}
            emptyItem={{ icon: 'bi-star', value: 0, label: '' }}
            renderDisplay={s => (
                <div className="flex items-center gap-4">
                    <i className={`bi ${s.icon} text-accent text-lg w-6`} />
                    <span className="text-white font-bold text-lg w-12">{s.value}+</span>
                    <span className="text-white/60 text-sm">{s.label}</span>
                </div>
            )}
            renderForm={(draft, setDraft) => (
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="text-white/40 text-xs mb-1 block">Bootstrap Icon</label>
                        <input value={draft.icon ?? ''} onChange={e => setDraft(p => ({ ...p, icon: e.target.value }))} placeholder="bi-star" className={inputCls} />
                    </div>
                    <div>
                        <label className="text-white/40 text-xs mb-1 block">Value</label>
                        <input type="number" value={draft.value ?? 0} onChange={e => setDraft(p => ({ ...p, value: Number(e.target.value) }))} className={inputCls} />
                    </div>
                    <div>
                        <label className="text-white/40 text-xs mb-1 block">Label</label>
                        <input value={draft.label ?? ''} onChange={e => setDraft(p => ({ ...p, label: e.target.value }))} placeholder="Projects" className={inputCls} />
                    </div>
                </div>
            )}
        />
    );
}

// ── Resume ────────────────────────────────────────────────────────────────────
function ResumeList({ label, items, setItems, hasPoints, onDirty }) {
    const empty = hasPoints
        ? { title: '', period: '', place: '', points: [] }
        : { title: '', period: '', place: '' };

    function PointsEditor({ draft, setDraft }) {
        const pts = draft.points ?? [];
        const updatePt = (pi, v) => setDraft(p => ({ ...p, points: pts.map((x, i) => i === pi ? v : x) }));
        const addPt    = () => setDraft(p => ({ ...p, points: [...pts, ''] }));
        const removePt = pi => setDraft(p => ({ ...p, points: pts.filter((_, i) => i !== pi) }));
        return (
            <div className="space-y-2">
                <label className="text-white/40 text-xs">Bullet Points</label>
                {pts.map((pt, pi) => (
                    <div key={pi} className="flex gap-2">
                        <input value={pt} onChange={e => updatePt(pi, e.target.value)} className={`${inputCls} flex-1`} />
                        <button type="button" onClick={() => removePt(pi)} className={dangerCls}>✕</button>
                    </div>
                ))}
                <button type="button" onClick={addPt} className={ghostCls}>+ Add Point</button>
            </div>
        );
    }

    return (
        <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <i className={`bi ${hasPoints ? 'bi-briefcase' : 'bi-mortarboard'} text-accent`} />
                {label}
            </h4>
            <ListManager
                items={items}
                setItems={setItems}
                saveKey={null}
                noSave
                onDirty={onDirty}
                emptyItem={empty}
                renderDisplay={item => (
                    <div>
                        <p className="text-white/80 text-sm font-semibold">{item.title}</p>
                        <p className="text-white/40 text-xs">{item.period} · {item.place}</p>
                    </div>
                )}
                renderForm={(draft, setDraft) => (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input value={draft.title ?? ''} onChange={e => setDraft(p => ({ ...p, title: e.target.value }))} placeholder="Title" className={inputCls} />
                            <input value={draft.period ?? ''} onChange={e => setDraft(p => ({ ...p, period: e.target.value }))} placeholder="2021–Present" className={inputCls} />
                        </div>
                        <input value={draft.place ?? ''} onChange={e => setDraft(p => ({ ...p, place: e.target.value }))} placeholder="Institution / Company" className={`${inputCls} w-full`} />
                        {hasPoints && <PointsEditor draft={draft} setDraft={setDraft} />}
                    </div>
                )}
            />
        </div>
    );
}

function ResumeTab({ init, onDirty }) {
    const [education,  setEducation]  = useState(init?.education  ?? []);
    const [experience, setExperience] = useState(init?.experience ?? []);

    return (
        <div className="space-y-10">
            <ResumeList label="Education"  items={education}  setItems={setEducation}  hasPoints={false} onDirty={onDirty} />
            <ResumeList label="Experience" items={experience} setItems={setExperience} hasPoints={true}  onDirty={onDirty} />
            <div className="pt-2 border-t border-white/10">
                <button onClick={() => save('resume', { education, experience })} className={btnCls}>Save Resume</button>
            </div>
        </div>
    );
}

// ── Services ──────────────────────────────────────────────────────────────────
function ServicesTab({ init, onDirty }) {
    const [items, setItems] = useState(init ?? []);

    return (
        <ListManager
            items={items}
            setItems={setItems}
            saveKey="services"
            onDirty={onDirty}
            emptyItem={{ icon: 'bi-star', title: '', desc: '' }}
            renderDisplay={s => (
                <div className="flex items-center gap-4">
                    <i className={`bi ${s.icon} text-accent text-xl w-6`} />
                    <div>
                        <p className="text-white/80 text-sm font-semibold">{s.title}</p>
                        <p className="text-white/40 text-xs line-clamp-1">{s.desc}</p>
                    </div>
                </div>
            )}
            renderForm={(draft, setDraft) => (
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-white/40 text-xs mb-1 block">Bootstrap Icon (e.g. bi-server)</label>
                            <input value={draft.icon ?? ''} onChange={e => setDraft(p => ({ ...p, icon: e.target.value }))} className={inputCls} />
                        </div>
                        <div>
                            <label className="text-white/40 text-xs mb-1 block">Title</label>
                            <input value={draft.title ?? ''} onChange={e => setDraft(p => ({ ...p, title: e.target.value }))} className={inputCls} />
                        </div>
                    </div>
                    <div>
                        <label className="text-white/40 text-xs mb-1 block">Description</label>
                        <textarea rows={2} value={draft.desc ?? ''} onChange={e => setDraft(p => ({ ...p, desc: e.target.value }))} className={`${inputCls} resize-none w-full`} />
                    </div>
                </div>
            )}
        />
    );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactTab({ init, onDirty }) {
    const [d, setD] = useState(init ?? {});
    const setF = (k, v) => { setD(p => ({ ...p, [k]: v })); onDirty?.(); };

    return (
        <div className="space-y-5">
            <p className="text-accent text-xs font-semibold uppercase tracking-wide">Editing Contact Section</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Address"><input value={d.address ?? ''} onChange={e => setF('address', e.target.value)} className={inputCls} /></Field>
                <Field label="Email"><input value={d.email ?? ''} onChange={e => setF('email', e.target.value)} className={inputCls} /></Field>
                <Field label="Phone"><input value={d.phone ?? ''} onChange={e => setF('phone', e.target.value)} className={inputCls} /></Field>
            </div>
            <p className="text-white/40 text-sm">Social Links</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[['GitHub','github'],['LinkedIn','linkedin'],['Facebook','facebook'],['Instagram','instagram'],['YouTube','youtube']].map(([lbl, key]) => (
                    <Field key={key} label={lbl}><input value={d[key] ?? ''} onChange={e => setF(key, e.target.value)} className={inputCls} /></Field>
                ))}
            </div>
            <button onClick={() => save('contact', d)} className={btnCls}>Save Contact</button>
        </div>
    );
}

// ── SEO ───────────────────────────────────────────────────────────────────────
function SeoTab({ init, onDirty }) {
    const [d, setD] = useState(init ?? {});
    const [ogImage, setOgImage] = useState(null);
    const [ogPreview, setOgPreview] = useState(null);
    const setF = (k, v) => { setD(p => ({ ...p, [k]: v })); onDirty?.(); };

    useEffect(() => () => { if (ogPreview) URL.revokeObjectURL(ogPreview); }, [ogPreview]);

    function handleOgImage(file) {
        setOgImage(file);
        if (ogPreview) URL.revokeObjectURL(ogPreview);
        setOgPreview(file ? URL.createObjectURL(file) : null);
        onDirty?.();
    }

    const displayOg = ogPreview ?? d.og_image ?? null;
    const descLen   = d.description?.length ?? 0;

    return (
        <div className="space-y-5">
            <p className="text-accent text-xs font-semibold uppercase tracking-wide">Editing SEO / Meta</p>

            <Field label="Page Title">
                <input value={d.title ?? ''} onChange={e => setF('title', e.target.value)}
                    className={inputCls} placeholder="Nitesh Hamal — Backend Developer from Nepal" />
                <p className="text-white/30 text-xs mt-1">Appears in browser tab and Google search results</p>
            </Field>

            <Field label="Meta Description">
                <textarea rows={3} value={d.description ?? ''} onChange={e => setF('description', e.target.value)}
                    className={`${inputCls} resize-none`} placeholder="~160 characters describing your portfolio" />
                <p className={`text-xs mt-1 ${descLen > 160 ? 'text-red-400' : 'text-white/30'}`}>
                    {descLen}/160 characters
                </p>
            </Field>

            <Field label="OG Image — Social Share Preview">
                {displayOg && (
                    <div className="relative mb-2">
                        <img src={displayOg} alt="OG preview" className="w-full h-40 object-cover rounded-lg" />
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white/60 text-xs px-2 py-1 rounded">
                            1200 × 630 px recommended
                        </span>
                        {ogPreview && (
                            <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-semibold">New</span>
                        )}
                    </div>
                )}
                <input type="file" accept="image/*" onChange={e => handleOgImage(e.target.files[0])}
                    className={`${inputCls} file:mr-3 file:bg-accent file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:text-xs`} />
                <p className="text-white/30 text-xs mt-1">Shown when your portfolio link is shared on social media</p>
            </Field>

            <button className={btnCls} onClick={() => save('seo', d, { og_image: ogImage })}>Save SEO</button>
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminSettings({ settings = {} }) {
    const [tab, setTab]                     = useState('Hero');
    const [isDirty, setIsDirty]             = useState(false);
    const [resetKeys, setResetKeys]         = useState({});
    const [pendingTab, setPendingTab]       = useState(null);
    const [confirmReset, setConfirmReset]   = useState(false);
    const markDirty = () => setIsDirty(true);

    useEffect(() => {
        const handler = (e) => { if (isDirty) { e.preventDefault(); e.returnValue = ''; } };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [isDirty]);

    useEffect(() => {
        return router.on('success', () => setIsDirty(false));
    }, []);

    useEffect(() => {
        return router.on('before', (e) => {
            const visit = e.detail.visit;
            if (visit.method !== 'get') return;
            const path = typeof visit.url === 'string' ? visit.url : visit.url?.pathname ?? '';
            if (path.includes('/admin/settings')) return;
            if (isDirty && !window.confirm('You have unsaved changes. Leave anyway?')) {
                e.preventDefault();
                return false;
            }
            setIsDirty(false);
        });
    }, [isDirty]);

    function handleTabChange(newTab) {
        if (newTab === tab) return;
        if (isDirty) { setPendingTab(newTab); return; }
        setTab(newTab);
    }

    function doTabSwitch() {
        setIsDirty(false);
        setTab(pendingTab);
        setPendingTab(null);
    }

    function handleReset() {
        setResetKeys(prev => ({ ...prev, [tab]: (prev[tab] ?? 0) + 1 }));
        setIsDirty(false);
        setConfirmReset(false);
    }

    const rk = (t) => `${t}-${resetKeys[t] ?? 0}`;

    const tabContent = {
        Hero:     <HeroTab     key={rk('Hero')}     init={settings.hero}     onDirty={markDirty} />,
        About:    <AboutTab    key={rk('About')}    init={settings.about}    onDirty={markDirty} />,
        Skills:   <SkillsTab   key={rk('Skills')}   init={settings.skills}   onDirty={markDirty} />,
        Stats:    <StatsTab    key={rk('Stats')}    init={settings.stats}    onDirty={markDirty} />,
        Resume:   <ResumeTab   key={rk('Resume')}   init={settings.resume}   onDirty={markDirty} />,
        Services: <ServicesTab key={rk('Services')} init={settings.services} onDirty={markDirty} />,
        Contact:  <ContactTab  key={rk('Contact')}  init={settings.contact}  onDirty={markDirty} />,
        SEO:      <SeoTab      key={rk('SEO')}      init={settings.seo}      onDirty={markDirty} />,
    };

    return (
        <>
            <Head title="Settings" />
            <Toast />
            <ConfirmModal
                open={pendingTab !== null}
                title="Unsaved Changes"
                message={`You have unsaved changes on the ${tab} tab. Leave without saving?`}
                confirmLabel="Leave"
                confirmCls="bg-white/20 text-white hover:bg-white/30 transition"
                onConfirm={doTabSwitch}
                onCancel={() => setPendingTab(null)}
            />
            <ConfirmModal
                open={confirmReset}
                title="Reset Changes"
                message={`Discard all unsaved edits on the ${tab} tab and restore the last saved state?`}
                confirmLabel="Reset"
                confirmCls="bg-yellow-500 text-[#080808] hover:bg-yellow-400 transition font-semibold"
                onConfirm={handleReset}
                onCancel={() => setConfirmReset(false)}
            />
            <div className="min-h-screen bg-[#080808] text-white px-6 py-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-display">Site Settings</h1>
                            <p className="text-white/40 text-sm mt-1">
                                Manage all portfolio content
                                {isDirty && <span className="ml-3 text-yellow-400 text-xs font-semibold">● Unsaved changes</span>}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a href="/admin" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Dashboard</a>
                            <a href="/admin/projects" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Projects</a>
                            <a href="/" target="_blank" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">View Site</a>
                            <button onClick={() => router.post('/admin/logout')} className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Logout</button>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center mb-8">
                        {TABS.map(t => (
                            <button key={t} onClick={() => handleTabChange(t)}
                                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                                    tab === t ? 'bg-accent text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                                }`}>
                                {t}
                                {isDirty && tab === t && (
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-[#080808]" />
                                )}
                            </button>
                        ))}
                        {isDirty && (
                            <button onClick={() => setConfirmReset(true)}
                                className="ml-auto flex items-center gap-1.5 text-yellow-400/60 hover:text-yellow-400 text-xs transition">
                                <i className="bi bi-arrow-counterclockwise" /> Reset changes
                            </button>
                        )}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        {tabContent[tab]}
                    </div>
                </div>
            </div>
        </>
    );
}
