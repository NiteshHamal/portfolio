import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from '../hooks/useLenis';

const links = ['Home','About','Resume','Services','Portfolio','Testimonials','Contact'];

const NAV_ICONS = {
    'Home':         'bi-house',
    'About':        'bi-person',
    'Resume':       'bi-file-earmark-text',
    'Services':     'bi-grid-1x2',
    'Portfolio':    'bi-layers',
    'Testimonials': 'bi-chat-quote',
    'Contact':      'bi-envelope',
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active,   setActive]   = useState('Home');
    const [open,     setOpen]     = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = links.map(l => document.getElementById(l.toLowerCase()));
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i] && window.scrollY >= sections[i].offsetTop - 120) {
                    setActive(links[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const lenis = useLenis();
    const isHome = typeof window !== 'undefined' && window.location.pathname === '/';

    const scrollTo = (id) => {
        setOpen(false);
        if (isHome) {
            const el = document.getElementById(id.toLowerCase());
            if (el) {
                lenis.current
                    ? lenis.current.scrollTo(el, { offset: -80 })
                    : el.scrollIntoView({ behavior: 'smooth' });
            }
            setActive(id);
        } else {
            window.location.href = `/#${id.toLowerCase()}`;
        }
    };

    return (
        <>
            {/* ── Nav bar ─────────────────────────────────── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
                    scrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
                }`}
                style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a onClick={() => scrollTo('home')}
                        className="text-2xl font-bold font-display text-white cursor-pointer z-[70] relative">
                        Nitesh<span className="text-accent">.</span>
                    </a>

                    {/* Desktop links */}
                    <ul className="hidden md:flex items-center gap-8">
                        {links.map(link => (
                            <li key={link}>
                                <button
                                    onClick={() => scrollTo(link)}
                                    className={`text-sm font-display font-medium tracking-wide transition-colors duration-200 relative group ${
                                        active === link ? 'text-accent' : 'text-white/70 hover:text-white'
                                    }`}>
                                    {link}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                                        active === link ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Hire Me CTA — desktop */}
                    <button
                        onClick={() => scrollTo('contact')}
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full
                                   border border-accent text-accent text-sm font-semibold font-display
                                   hover:bg-accent hover:text-white transition-all duration-300
                                   hover:shadow-lg hover:shadow-accent/30">
                        Hire Me
                        <i className="bi bi-arrow-right text-xs" />
                    </button>

                    {/* Mobile hamburger — always on top */}
                    <button
                        onClick={() => setOpen(v => !v)}
                        className="md:hidden relative z-[70] w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
                        aria-label="Toggle menu">
                        <span className={`block h-[2px] bg-white rounded-full transition-all duration-350 origin-center ${
                            open ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'
                        }`} />
                        <span className={`block h-[2px] bg-white rounded-full transition-all duration-350 ${
                            open ? 'w-0 opacity-0' : 'w-4'
                        }`} />
                        <span className={`block h-[2px] bg-white rounded-full transition-all duration-350 origin-center ${
                            open ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'
                        }`} />
                    </button>
                </div>
            </nav>

            {/* ── Full-screen mobile menu ─────────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ clipPath: 'circle(0% at 93% 5%)' }}
                        animate={{ clipPath: 'circle(250% at 93% 5%)' }}
                        exit={{ clipPath: 'circle(0% at 93% 5%)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[55] md:hidden flex flex-col"
                        style={{ background: '#040404' }}>

                        {/* Ambient glows */}
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(24,210,110,0.07) 0%, transparent 70%)' }} />
                        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(24,210,110,0.04) 0%, transparent 70%)' }} />

                        {/* Top gradient line */}
                        <div className="absolute top-0 inset-x-0 h-px"
                            style={{ background: 'linear-gradient(to right, transparent, rgba(24,210,110,0.4), transparent)' }} />

                        {/* Navigation links */}
                        <div className="flex-1 flex flex-col justify-center px-8 pt-24 pb-6">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="text-white/20 text-[10px] font-mono uppercase tracking-[4px] mb-8">
                                Navigation
                            </motion.p>

                            <nav className="space-y-1">
                                {links.map((link, i) => (
                                    <motion.button
                                        key={link}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -24 }}
                                        transition={{
                                            delay: 0.12 + i * 0.055,
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        onClick={() => scrollTo(link)}
                                        className={`w-full flex items-center gap-5 py-4
                                                   border-b text-left group relative
                                                   transition-colors duration-200
                                                   ${active === link
                                                       ? 'border-accent/20 text-accent'
                                                       : 'border-white/[0.06] text-white/50 hover:text-white'
                                                   }`}>

                                        {/* Number */}
                                        <span className={`text-[10px] font-mono tabular-nums w-5 shrink-0 transition-colors duration-200 ${
                                            active === link ? 'text-accent/60' : 'text-white/15'
                                        }`}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>

                                        {/* Label */}
                                        <span className="text-[1.6rem] font-bold font-display leading-none flex-1">
                                            {link}
                                        </span>

                                        {/* Icon */}
                                        <i className={`bi ${NAV_ICONS[link]} text-base shrink-0 transition-colors duration-200 ${
                                            active === link ? 'text-accent' : 'text-white/15 group-hover:text-white/40'
                                        }`} />

                                        {/* Active dot */}
                                        {active === link && (
                                            <motion.span
                                                layoutId="mobile-active-dot"
                                                className="absolute right-0 top-1/2 -translate-y-1/2
                                                           w-1.5 h-1.5 rounded-full bg-accent"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </nav>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="px-8 pb-12"
                            style={{ paddingBottom: 'max(3rem, env(safe-area-inset-bottom))' }}>

                            {/* Status badge */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                                </span>
                                <span className="text-white/35 text-xs font-sans tracking-wide">
                                    Available for new projects
                                </span>
                            </div>

                            <button
                                onClick={() => scrollTo('contact')}
                                className="w-full py-4 rounded-2xl font-display font-bold text-base
                                           text-white tracking-wide relative overflow-hidden group"
                                style={{
                                    background: 'linear-gradient(135deg, #18d26e, #0fa855)',
                                    boxShadow: '0 8px 32px rgba(24,210,110,0.25)',
                                }}>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Let's Work Together
                                    <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
