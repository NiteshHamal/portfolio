import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

function FloatField({ label, value, onChange, error, type = 'text', autoComplete, required, textarea, rows = 5 }) {
    const [focused, setFocused] = useState(false);
    const floating = focused || value.length > 0;

    const shared = {
        value,
        onChange,
        required,
        autoComplete,
        onFocus: () => setFocused(true),
        onBlur:  () => setFocused(false),
        className: `w-full bg-white/5 text-white text-sm font-sans
                    border rounded-lg px-4 transition-colors duration-200
                    focus:outline-none
                    ${textarea ? 'pt-6 pb-3 resize-none' : 'pt-6 pb-2 h-[54px]'}
                    ${focused ? 'border-accent' : 'border-white/10 hover:border-white/20'}`,
    };

    return (
        <div className="relative">
            {textarea
                ? <textarea {...shared} rows={rows} />
                : <input   {...shared} type={type} />
            }

            <label className={`absolute left-4 pointer-events-none select-none
                               transition-all duration-200 ease-out
                               ${floating
                                   ? `top-[7px] text-[10px] font-semibold tracking-wide uppercase
                                      ${focused ? 'text-accent' : 'text-white/35'}`
                                   : 'top-[17px] text-sm text-white/35'
                               }`}>
                {label}
            </label>

            {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
        </div>
    );
}

export default function Contact({ data = {} }) {
    const { address = '', email = '', phone = '' } = data;

    const info = [
        address && { icon: 'bi-geo-alt',   label: 'Address', value: address },
        email   && { icon: 'bi-envelope',  label: 'Email',   value: email   },
        phone   && { icon: 'bi-telephone', label: 'Phone',   value: phone   },
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
                <SectionHeading tag="Get In Touch" title="Contact Me" />

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h3 className="text-xl font-bold font-display text-white mb-8">Let's talk</h3>
                        <div className="space-y-5">
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
                                <button onClick={() => setSent(false)} className="text-accent text-sm hover:underline mt-2">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FloatField label="Your Name"  value={form.name}    onChange={e => setData('name',    e.target.value)} error={errors.name}    required autoComplete="name" />
                                    <FloatField label="Your Email" value={form.email}   onChange={e => setData('email',   e.target.value)} error={errors.email}   required autoComplete="email" type="email" />
                                </div>
                                <FloatField label="Subject"      value={form.subject} onChange={e => setData('subject', e.target.value)} error={errors.subject} required />
                                <FloatField label="Your Message" value={form.message} onChange={e => setData('message', e.target.value)} error={errors.message} required textarea rows={5} />
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
