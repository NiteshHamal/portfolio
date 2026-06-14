const NAV_LINKS = ['Home', 'About', 'Resume', 'Services', 'Portfolio', 'Contact'];

export default function Footer({ hero = {}, contact = {} }) {
    const name  = hero.name  || 'Nitesh Hamal';
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ');

    const {
        email     = '',
        phone     = '',
        address   = '',
        github    = '',
        linkedin  = '',
        facebook  = '',
        instagram = '',
        youtube   = '',
    } = contact;

    const socials = [
        github    && { href: github,    icon: 'bi-github',    label: 'GitHub' },
        linkedin  && { href: linkedin,  icon: 'bi-linkedin',  label: 'LinkedIn' },
        facebook  && { href: facebook,  icon: 'bi-facebook',  label: 'Facebook' },
        instagram && { href: instagram, icon: 'bi-instagram', label: 'Instagram' },
        youtube   && { href: youtube,   icon: 'bi-youtube',   label: 'YouTube' },
    ].filter(Boolean);

    const scrollTo = (id) =>
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="bg-[#020202] relative">

            {/* ── Top gradient divider ─────────────────────── */}
            <div className="h-px w-full"
                style={{ background: 'linear-gradient(to right, transparent, #18d26e55, #18d26e, #18d26e55, transparent)' }} />

            {/* ── Main columns ─────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-6 pt-16 pb-10
                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">

                {/* Col 1 — Brand */}
                <div>
                    <button onClick={() => scrollTo('home')}
                        className="text-2xl font-bold font-display text-white mb-4 block hover:text-accent transition-colors duration-200">
                        {firstName}<span className="text-accent">.</span>
                        {lastName && <span className="text-white"> {lastName}</span>}
                    </button>
                    <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                        Backend developer from Nepal, crafting efficient and scalable web applications
                        with clean code and modern technologies.
                    </p>
                    {/* Accent accent decoration */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-accent" />
                        <div className="w-2 h-0.5 bg-accent/50" />
                        <div className="w-1 h-0.5 bg-accent/25" />
                    </div>
                </div>

                {/* Col 2 — Quick links */}
                <div>
                    <h4 className="text-white text-sm font-display font-semibold uppercase tracking-[3px] mb-6">
                        Quick Links
                    </h4>
                    <ul className="space-y-3">
                        {NAV_LINKS.map(link => (
                            <li key={link}>
                                <button onClick={() => scrollTo(link)}
                                    className="group flex items-center gap-2 text-white/40 hover:text-accent
                                               text-sm transition-colors duration-200">
                                    <i className="bi bi-chevron-right text-accent text-xs
                                                  transition-transform duration-200 group-hover:translate-x-1" />
                                    {link}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3 — Get in touch */}
                <div>
                    <h4 className="text-white text-sm font-display font-semibold uppercase tracking-[3px] mb-6">
                        Get In Touch
                    </h4>
                    <ul className="space-y-3 mb-8">
                        {email && (
                            <li>
                                <a href={`mailto:${email}`}
                                    className="flex items-start gap-3 text-white/40 hover:text-accent
                                               text-sm transition-colors duration-200 group">
                                    <i className="bi bi-envelope text-accent mt-0.5 shrink-0" />
                                    <span className="break-all">{email}</span>
                                </a>
                            </li>
                        )}
                        {phone && (
                            <li>
                                <a href={`tel:${phone}`}
                                    className="flex items-center gap-3 text-white/40 hover:text-accent
                                               text-sm transition-colors duration-200">
                                    <i className="bi bi-telephone text-accent shrink-0" />
                                    {phone}
                                </a>
                            </li>
                        )}
                        {address && (
                            <li className="flex items-start gap-3 text-white/40 text-sm">
                                <i className="bi bi-geo-alt text-accent mt-0.5 shrink-0" />
                                {address}
                            </li>
                        )}
                    </ul>

                    {/* Socials */}
                    {socials.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {socials.map(({ href, icon, label }) => (
                                <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                                    title={label}
                                    className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08]
                                               hover:bg-accent hover:border-accent
                                               flex items-center justify-center text-white/40 hover:text-white
                                               transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20">
                                    <i className={`bi ${icon} text-sm`} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Bottom bar ───────────────────────────────── */}
            <div className="border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto px-6 py-5
                                flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white/25 text-xs font-sans">
                        &copy; {new Date().getFullYear()}{' '}
                        <span className="text-accent/70 font-semibold">{name}</span>.
                        {' '}All Rights Reserved.
                    </p>
                    <p className="text-white/20 text-xs font-sans flex items-center gap-1.5">
                        Built with
                        <span className="text-accent/60">Laravel</span>
                        <span className="text-white/15">&</span>
                        <span className="text-accent/60">React</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
