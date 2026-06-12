import { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';
import ConfirmModal from '../../Components/Admin/ConfirmModal';

function MessageRow({ msg, onDelete }) {
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(v => !v);
        if (!msg.read_at) {
            router.post(`/admin/messages/${msg.id}/read`, {}, { preserveScroll: true, preserveState: true });
        }
    }

    return (
        <div className={`rounded-xl overflow-hidden border transition-colors
            ${msg.read_at ? 'border-white/10 bg-white/5' : 'border-accent/30 bg-accent/[0.04]'}`}>
            <button onClick={toggle} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${msg.read_at ? 'bg-white/10' : 'bg-accent'}`} />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <p className={`font-semibold text-sm truncate ${msg.read_at ? 'text-white/70' : 'text-white'}`}>
                            {msg.name}
                        </p>
                        <span className="text-white/30 text-xs truncate">{msg.email}</span>
                    </div>
                    <p className="text-white/50 text-sm truncate">{msg.subject}</p>
                </div>
                <span className="text-white/30 text-xs flex-shrink-0">{msg.created_at}</span>
                <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'} text-white/30 text-sm flex-shrink-0`} />
            </button>

            {open && (
                <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-4">
                    <p className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                    <div className="flex gap-3">
                        <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                            className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition">
                            <i className="bi bi-reply" /> Reply via Email
                        </a>
                        <button onClick={() => onDelete(msg.id)}
                            className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-xs hover:bg-red-500/30 transition">
                            <i className="bi bi-trash" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AdminMessages({ messages = [], unread = 0 }) {
    const [filter, setFilter]         = useState('all');
    const [confirmDelete, setConfirmDelete] = useState(null);

    const shown = filter === 'unread' ? messages.filter(m => !m.read_at) : messages;

    function deleteMsg(id) { setConfirmDelete(id); }

    return (
        <>
            <Head title="Inbox" />
            <Toast />
            <ConfirmModal
                open={confirmDelete !== null}
                title="Delete Message"
                message="This message will be permanently deleted."
                onConfirm={() => { router.delete(`/admin/messages/${confirmDelete}`, { preserveScroll: true }); setConfirmDelete(null); }}
                onCancel={() => setConfirmDelete(null)}
            />
            <div className="min-h-screen bg-[#080808] text-white px-6 py-10">
                <div className="max-w-4xl mx-auto">

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                                Inbox
                                {unread > 0 && (
                                    <span className="bg-accent text-white text-sm px-2.5 py-0.5 rounded-full font-semibold">
                                        {unread}
                                    </span>
                                )}
                            </h1>
                            <p className="text-white/40 text-sm mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="flex gap-3">
                            <a href="/admin" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Dashboard</a>
                            <a href="/admin/settings" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Settings</a>
                            <a href="/" target="_blank" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">View Site</a>
                            <button onClick={() => router.post('/admin/logout')} className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Logout</button>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-6">
                        {['all', 'unread'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all capitalize ${
                                    filter === f ? 'bg-accent text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                                }`}>
                                {f} {f === 'unread' && unread > 0 && `(${unread})`}
                            </button>
                        ))}
                    </div>

                    {shown.length === 0 ? (
                        <div className="text-center py-20">
                            <i className="bi bi-inbox text-white/20 text-5xl block mb-4" />
                            <p className="text-white/40">{filter === 'unread' ? 'No unread messages.' : 'No messages yet.'}</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {shown.map(msg => (
                                <MessageRow key={msg.id} msg={msg} onDelete={deleteMsg} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
