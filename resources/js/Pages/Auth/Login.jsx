import { useForm, Head } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/admin/login');
    }

    return (
        <>
            <Head title="Admin Login" />
            <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
                <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h1 className="text-2xl font-bold text-white font-display mb-1">Admin Login</h1>
                    <p className="text-white/40 text-sm mb-8">Portfolio management</p>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-white/60 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-accent"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm mb-1">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-accent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-accent text-white py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
                        >
                            {processing ? 'Logging in…' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
