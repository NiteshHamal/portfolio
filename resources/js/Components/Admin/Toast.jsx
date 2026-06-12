import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Toast() {
    const { flash } = usePage().props;
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (flash?.success) push('success', flash.success);
        if (flash?.error)   push('error',   flash.error);
    }, [flash?.success, flash?.error]);

    function push(type, message) {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => dismiss(id), 4000);
    }

    function dismiss(id) {
        setToasts(prev => prev.filter(t => t.id !== id));
    }

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            {toasts.map(({ id, type, message }) => (
                <div key={id}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium pointer-events-auto
                        animate-[slideUp_0.25s_ease-out]
                        ${type === 'success'
                            ? 'bg-[#111] border border-accent/40 text-white'
                            : 'bg-[#111] border border-red-500/40 text-white'
                        }`}>
                    <i className={`bi text-base ${type === 'success' ? 'bi-check-circle-fill text-accent' : 'bi-exclamation-circle-fill text-red-400'}`} />
                    <span>{message}</span>
                    <button onClick={() => dismiss(id)} className="ml-2 text-white/30 hover:text-white/70 transition text-xs">✕</button>
                </div>
            ))}
        </div>
    );
}
