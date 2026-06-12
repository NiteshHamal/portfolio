import { useState, useEffect } from 'react';

const links = ['Home','About','Resume','Services','Portfolio','Contact'];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('Home');
    const [open, setOpen] = useState(false);

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

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        setActive(id);
        setOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}>
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
                                }`}
                            >
                                {link}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                                    active === link ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
                    {open ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-black/95 px-6 pb-6">
                    {links.map(link => (
                        <button
                            key={link}
                            onClick={() => scrollTo(link)}
                            className="block w-full text-left py-3 text-white/80 hover:text-accent font-display text-sm tracking-wide border-b border-white/10"
                        >
                            {link}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}
