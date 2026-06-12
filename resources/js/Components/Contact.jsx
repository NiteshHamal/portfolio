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

    return (
        <section id="contact" className="py-24 bg-dark">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
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
                        <form action={`https://formsubmit.co/${email}`} method="POST" className="space-y-5">
                            <input type="hidden" name="_subject" value="New Portfolio Contact" />
                            <input type="hidden" name="_captcha" value="false" />
                            <div className="grid grid-cols-2 gap-5">
                                <input name="name" type="text" placeholder="Your Name" required autoComplete="name" className="form-input" />
                                <input name="email" type="email" placeholder="Your Email" required autoComplete="email" className="form-input" />
                            </div>
                            <input name="subject" type="text" placeholder="Subject" required className="form-input w-full" />
                            <textarea name="message" rows={5} placeholder="Your Message" required className="form-input w-full resize-none" />
                            <button type="submit" className="btn-primary w-full">
                                Send Message <i className="bi bi-send ml-2" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
