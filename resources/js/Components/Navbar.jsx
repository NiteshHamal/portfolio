import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const links = ['Home','About','Resume','Services','Portfolio','Contact'];

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

    // Lock body scroll while menu is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const isHome = typeof window !== 'undefined' && window.location.pathname === '/';

    const scrollTo = (id) => {
        setOpen(false);
        if (isHome) {
            document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
            setActive(id);
        } else {
            window.location.href = `/#${id.toLowerCase()}`;
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
            }`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a onClick={() => scrollTo('home')} className="text-2xl font-bold font-display text-white cursor-pointer">
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

                    {/* Mobile toggle — animates between hamburger and X */}
                    <button
                        onClick={() => setOpen(v => !v)}
                        className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] group"
                        aria-label="Toggle menu">
                        <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center
                            ${open ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
                        <span className={`block h-0.5 bg-white rounded-full transition-all duration-300
                            ${open ? 'w-0 opacity-0' : 'w-4 group-hover:w-5'}`} />
                        <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center
                            ${open ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
                    </button>
                </div>
            </nav>

            {/* ── Mobile menu — rendered outside nav so backdrop can cover full screen ── */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" />

                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-[64px] left-3 right-3 z-50 md:hidden
                                       bg-[#0e0e0e]/95 backdrop-blur-xl
                                       border border-white/[0.08] rounded-2xl
                                       shadow-2xl shadow-black/60 overflow-hidden">

                            {/* Nav links with stagger */}
                            <motion.ul
                                variants={{ show: { transition: { staggerChildren: 0.055 } } }}
                                initial="hidden"
                                animate="show"
                                className="px-3 pt-3 pb-2">
                                {links.map((link, i) => (
                                    <motion.li key={link}
                                        variants={{
                                            hidden: { opacity: 0, x: -12 },
                                            show:   { opacity: 1, x: 0   },
                                        }}
                                        transition={{ duration: 0.25 }}>
                                        <button
                                            onClick={() => scrollTo(link)}
                                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl
                                                        text-sm font-display font-medium tracking-wide
                                                        transition-all duration-200
                                                        ${active === link
                                                            ? 'bg-accent/10 text-accent'
                                                            : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                                                        }`}>
                                            <span>{link}</span>
                                            {active === link && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            )}
                                        </button>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* Divider */}
                            <div className="mx-4 h-px bg-white/[0.06]" />

                            {/* Hire Me */}
                            <div className="p-4">
                                <motion.button
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35, duration: 0.25 }}
                                    onClick={() => scrollTo('contact')}
                                    className="w-full py-3 rounded-xl border border-accent text-accent
                                               text-sm font-semibold font-display
                                               hover:bg-accent hover:text-white
                                               transition-all duration-300">
                                    Hire Me
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
