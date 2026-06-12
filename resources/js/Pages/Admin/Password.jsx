import { useForm, router, Head } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-accent transition-colors';

export default function AdminPassword() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        current_password:      '',
        password:              '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/admin/change-password', { onSuccess: () => reset() });
    }

    return (
        <>
            <Head title="Change Password" />
            <Toast />
            <div className="min-h-screen bg-[#080808] text-white px-6 py-10">
                <div className="max-w-lg mx-auto">

                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="text-3xl font-bold font-display">Change Password</h1>
                            <p className="text-white/40 text-sm mt-1">Update your admin login password</p>
                        </div>
                        <div className="flex gap-3">
                            <a href="/admin" className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Dashboard</a>
                            <button onClick={() => router.post('/admin/logout')} className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">Logout</button>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-white/60 text-sm mb-1.5">Current Password</label>
                                <input type="password" value={data.current_password}
                                    onChange={e => setData('current_password', e.target.value)}
                                    autoComplete="current-password" className={inputCls} />
                                {errors.current_password && (
                                    <p className="text-red-400 text-xs mt-1.5">{errors.current_password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/60 text-sm mb-1.5">New Password</label>
                                <input type="password" value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="new-password" className={inputCls} />
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/60 text-sm mb-1.5">Confirm New Password</label>
                                <input type="password" value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password" className={inputCls} />
                            </div>

                            <button type="submit" disabled={processing}
                                className="w-full bg-accent text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition disabled:opacity-50">
                                {processing ? 'Updating…' : 'Update Password'}
                            </button>
                        </form>

                        <p className="text-white/20 text-xs text-center pt-2">
                            Minimum 8 characters. You'll stay logged in after changing.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
