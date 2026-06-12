import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Contact({ data = {} }) {
    const {
        address   = '',
        email     = '',
        phone     = '',
        github    = '',
        facebook  = '',
        instagram = '',
        youtube   = '',
        linkedin  = '',
    } = data;

    const info = [
        address && { icon: 'bi-geo-alt',   label: 'Address', value: address },
        email   && { icon: 'bi-envelope',  label: 'Email',   value: email },
        phone   && { icon: 'bi-telephone', label: 'Phone',   value: phone },
    ].filter(Boolean);

    const socials = [
        github    && { href: github,    icon: 'bi-github' },
        facebook  && { href: facebook,  icon: 'bi-facebook' },
        instagram && { href: instagram, icon: 'bi-instagram' },
        youtube   && { href: youtube,   icon: 'bi-youtube' },
        linkedin  && { href: linkedin,  icon: 'bi-linkedin' },
    ].filter(Boolean);

    const [sent, setSent] = useState(false);
    const { data: form, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', subject: '', message: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => { reset(); setSent(true); },
        });
    }

    return (
        <section id="contact" className="py-24 bg-dark section-noise">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16 heading-glow">
                    <span className="text-accent text-sm font-display tracking-[4px] uppercase">Get In Touch</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mt-3">Contact Me</h2>
                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h3 className="text-xl font-bold font-display text-white mb-8">Let's talk</h3>
                        <div className="space-y-5 mb-10">
                            {info.map(({ icon, label, value }) => (
                                <div key={label} className="card-glass flex items-center gap-5 p-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                        <i className={`bi ${icon} text-accent text-lg`} />
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{label}</div>
                                        <div className="text-white/90 text-sm">{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {socials.length > 0 && (
                            <div className="flex gap-4">
                                {socials.map(({ href, icon }) => (
                                    <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-white transition-all duration-300 hover:scale-110">
                                        <i className={`bi ${icon} text-sm`} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        {sent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                    <i className="bi bi-check-lg text-accent text-3xl" />
                                </div>
                                <h4 className="text-white font-bold font-display text-xl">Message Sent!</h4>
                                <p className="text-white/50 text-sm">I'll get back to you as soon as possible.</p>
                                <button onClick={() => setSent(false)}
                                    className="text-accent text-sm hover:underline mt-2">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <input value={form.name} onChange={e => setData('name', e.target.value)}
                                            type="text" placeholder="Your Name" required autoComplete="name" className="form-input w-full" />
                                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input value={form.email} onChange={e => setData('email', e.target.value)}
                                            type="email" placeholder="Your Email" required autoComplete="email" className="form-input w-full" />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <input value={form.subject} onChange={e => setData('subject', e.target.value)}
                                        type="text" placeholder="Subject" required className="form-input w-full" />
                                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                                </div>
                                <div>
                                    <textarea value={form.message} onChange={e => setData('message', e.target.value)}
                                        rows={5} placeholder="Your Message" required className="form-input w-full resize-none" />
                                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <button type="submit" disabled={processing} className="btn-primary w-full disabled:opacity-60">
                                    {processing ? 'Sending…' : <>Send Message <i className="bi bi-send ml-2" /></>}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
