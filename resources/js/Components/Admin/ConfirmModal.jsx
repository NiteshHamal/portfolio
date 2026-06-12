export default function ConfirmModal({
    open,
    title,
    message,
    confirmLabel = 'Delete',
    confirmCls   = 'bg-red-500 text-white hover:bg-red-600 transition',
    onConfirm,
    onCancel,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-[#111] border border-white/15 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="text-white font-bold font-display text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{message}</p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onCancel}
                        className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                        Cancel
                    </button>
                    <button onClick={onConfirm}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold ${confirmCls}`}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
