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

const INFO_ICONS = {
    'Address': { icon: 'bi-geo-alt-fill', gradient: 'from-violet-500/20 to-violet-500/5' },
    'Email':   { icon: 'bi-envelope-fill',  gradient: 'from-accent/20 to-accent/5' },
    'Phone':   { icon: 'bi-telephone-fill', gradient: 'from-sky-500/20 to-sky-500/5' },
};

export default function Contact({ data = {} }) {
    const { address = '', email = '', phone = '' } = data;

    const info = [
        address && { icon: 'bi-geo-alt-fill',   label: 'Address', value: address },
        email   && { icon: 'bi-envelope-fill',  label: 'Email',   value: email   },
        phone   && { icon: 'bi-telephone-fill', label: 'Phone',   value: phone   },
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

                <div className="grid md:grid-cols-2 gap-10 md:gap-12">

                    {/* ── Contact info ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}>

                        <h3 className="text-xl font-bold font-display text-white mb-6 md:mb-8">
                            Let's talk
                        </h3>

                        <div className="space-y-4">
                            {info.map(({ icon, label, value }, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="card-glass flex items-center gap-4 p-4 md:p-5 group
                                               hover:border-accent/30 transition-all duration-300">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                                                    bg-gradient-to-br ${INFO_ICONS[label]?.gradient ?? 'from-accent/20 to-accent/5'}
                                                    border border-white/[0.08] group-hover:scale-110 transition-transform duration-300`}>
                                        <i className={`bi ${icon} text-accent text-base`} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-white/35 text-[10px] uppercase tracking-[2px] font-semibold mb-0.5">
                                            {label}
                                        </div>
                                        <div className="text-white/85 text-sm font-medium truncate">{value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative quote */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8 p-5 rounded-2xl border border-accent/15 bg-accent/[0.04] hidden md:block">
                            <p className="text-white/40 text-sm italic leading-relaxed">
                                "Every great project starts with a conversation. I'm excited to hear about yours."
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                                <div className="w-6 h-0.5 bg-accent/50" />
                                <span className="text-accent/60 text-xs font-semibold font-display">Nitesh Hamal</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Contact form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}>
                        {sent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30
                                               flex items-center justify-center">
                                    <i className="bi bi-check-lg text-accent text-4xl" />
                                </motion.div>
                                <h4 className="text-white font-bold font-display text-xl">Message Sent!</h4>
                                <p className="text-white/50 text-sm">I'll get back to you as soon as possible.</p>
                                <button onClick={() => setSent(false)}
                                    className="text-accent text-sm hover:underline mt-2 flex items-center gap-1">
                                    <i className="bi bi-arrow-left text-xs" />
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-4">
                                {/* Name + Email stacked on mobile, side-by-side on sm+ */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FloatField
                                        label="Your Name"
                                        value={form.name}
                                        onChange={e => setData('name', e.target.value)}
                                        error={errors.name}
                                        required
                                        autoComplete="name" />
                                    <FloatField
                                        label="Your Email"
                                        value={form.email}
                                        onChange={e => setData('email', e.target.value)}
                                        error={errors.email}
                                        required
                                        autoComplete="email"
                                        type="email" />
                                </div>
                                <FloatField
                                    label="Subject"
                                    value={form.subject}
                                    onChange={e => setData('subject', e.target.value)}
                                    error={errors.subject}
                                    required />
                                <FloatField
                                    label="Your Message"
                                    value={form.message}
                                    onChange={e => setData('message', e.target.value)}
                                    error={errors.message}
                                    required
                                    textarea
                                    rows={5} />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-primary w-full disabled:opacity-60 group">
                                    {processing
                                        ? <><i className="bi bi-hourglass-split animate-spin mr-2" />Sending…</>
                                        : <><span>Send Message</span><i className="bi bi-send ml-2 group-hover:translate-x-0.5 transition-transform duration-200" /></>
                                    }
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
