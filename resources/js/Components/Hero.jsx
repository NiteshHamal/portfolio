import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import MagneticButton from './MagneticButton';
import HeroScene from './HeroScene';

/* ── Syntax-highlighted code lines ── */
const CODE_LINES = [
    [{ t: '// developer.php',                    c: 'text-white/30' }],
    [
        { t: 'Route',    c: 'text-violet-400' },
        { t: '::',       c: 'text-white/40'  },
        { t: 'get',      c: 'text-blue-400'  },
        { t: "('/api/me', ", c: 'text-white/50' },
        { t: 'function', c: 'text-violet-400' },
        { t: ' () {',    c: 'text-white/60'  },
    ],
    [
        { t: '  return ', c: 'text-violet-400' },
        { t: 'response',  c: 'text-blue-400'  },
        { t: '()->',      c: 'text-white/40'  },
        { t: 'json',      c: 'text-blue-400'  },
        { t: '([',        c: 'text-white/60'  },
    ],
    [
        { t: "    'name'",  c: 'text-sky-300'  },
        { t: '     => ',    c: 'text-white/35' },
        { t: "'Nitesh Hamal'", c: 'text-accent' },
        { t: ',',           c: 'text-white/35' },
    ],
    [
        { t: "    'role'",  c: 'text-sky-300'  },
        { t: '     => ',    c: 'text-white/35' },
        { t: "'Backend Developer'", c: 'text-accent' },
        { t: ',',           c: 'text-white/35' },
    ],
    [
        { t: "    'stack'", c: 'text-sky-300'  },
        { t: '    => [',    c: 'text-white/35' },
        { t: "'Laravel'",   c: 'text-amber-300' },
        { t: ', ',          c: 'text-white/35' },
        { t: "'MySQL'",     c: 'text-amber-300' },
        { t: ', ',          c: 'text-white/35' },
        { t: "'REST API'",  c: 'text-amber-300' },
        { t: '],',          c: 'text-white/35' },
    ],
    [
        { t: "    'location'", c: 'text-sky-300'  },
        { t: ' => ',           c: 'text-white/35' },
        { t: "'Kathmandu, NP'", c: 'text-accent'  },
        { t: ',',              c: 'text-white/35' },
    ],
    [
        { t: "    'available'", c: 'text-sky-300'   },
        { t: ' => ',            c: 'text-white/35'  },
        { t: 'true',            c: 'text-orange-300' },
        { t: ',',               c: 'text-white/35'  },
    ],
    [
        { t: "    'projects'",  c: 'text-sky-300'   },
        { t: '  => ',           c: 'text-white/35'  },
        { t: '10',              c: 'text-orange-300' },
        { t: ',',               c: 'text-white/35'  },
    ],
    [{ t: '  ]);',  c: 'text-white/60' }],
    [{ t: '});',    c: 'text-white/60' }],
    [],
    [
        { t: '// ✓ ', c: 'text-white/30' },
        { t: '200 OK', c: 'text-accent'  },
        { t: '  ·  8ms', c: 'text-white/30' },
    ],
];

function CodeWindow() {
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        const timers = CODE_LINES.map((_, i) =>
            setTimeout(() => setVisible(i + 1), 400 + i * 130)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="relative w-full max-w-[min(420px,100%)] rounded-xl overflow-hidden
                        border border-white/10 shadow-2xl shadow-black/70
                        bg-[#0d0d0d]">

            {/* Title bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border-b border-white/[0.06]">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-white/25 text-xs font-mono">developer.php</span>
                <span className="ml-auto flex items-center gap-1.5 text-white/20 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    PHP
                </span>
            </div>

            {/* Code body */}
            <div className="px-3 sm:px-4 py-3 sm:py-4 font-mono text-[11px] sm:text-[13px] leading-[1.75] min-h-[280px]">
                {CODE_LINES.map((parts, lineIdx) => (
                    <div key={lineIdx}
                        className={`flex transition-all duration-300 ${
                            lineIdx < visible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-1'
                        }`}>

                        {/* Line number */}
                        <span className="select-none text-white/15 text-[11px] w-6 shrink-0 pt-px">
                            {lineIdx + 1}
                        </span>

                        {/* Code */}
                        <span>
                            {parts.map((part, pi) => (
                                <span key={pi} className={part.c}>{part.t}</span>
                            ))}
                            {/* Blinking cursor on current line */}
                            {lineIdx === visible - 1 && visible < CODE_LINES.length && (
                                <span className="inline-block w-[2px] h-[14px] bg-accent ml-0.5
                                                 align-middle animate-pulse" />
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Hero({ data = {} }) {
    const {
        name          = 'Nitesh Hamal',
        tagline       = 'Welcome to my portfolio',
        description   = 'Crafting efficient, scalable web applications with clean code and modern technologies from Kathmandu, Nepal.',
        typed_strings = ['Backend Developer', 'Laravel Developer', 'Full Stack Developer', 'Freelancer'],
        github        = '',
        linkedin      = '',
        youtube       = '',
    } = data;

    const typedEl = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
            strings: typed_strings,
            typeSpeed: 75,
            backSpeed: 45,
            loop: true,
        });
        return () => typed.destroy();
    }, [typed_strings]);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const socials = [
        github   && { href: github,   icon: 'bi-github',   label: 'GitHub'   },
        linkedin && { href: linkedin, icon: 'bi-linkedin', label: 'LinkedIn' },
        youtube  && { href: youtube,  icon: 'bi-youtube',  label: 'YouTube'  },
    ].filter(Boolean);

    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ');

    return (
        <section id="home"
            className="relative min-h-screen flex items-center overflow-hidden">

            <HeroScene />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-28
                            grid md:grid-cols-2 gap-10 md:gap-14 items-center">

                {/* ── LEFT: text ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="order-2 md:order-1 text-center md:text-left">

                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/25
                                   rounded-full px-4 py-1.5 mb-8 md:mb-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                        </span>
                        <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                            {tagline}
                        </span>
                    </motion.div>

                    <h1 className="font-bold font-display leading-[1.05] mb-4 md:mb-6">
                        <span className="block text-white/40 text-base md:text-xl font-medium font-sans mb-1">
                            Hello, I'm
                        </span>
                        <span className="block text-4xl sm:text-5xl md:text-6xl xl:text-7xl name-gradient">
                            {firstName}
                        </span>
                        {lastName && (
                            <span className="block text-4xl sm:text-5xl md:text-6xl xl:text-7xl name-gradient">
                                {lastName}
                            </span>
                        )}
                    </h1>

                    <div className="text-base md:text-xl text-white/60 font-sans mb-4 md:mb-6
                                    flex items-center gap-2 justify-center md:justify-start">
                        <span>I'm a passionate</span>
                        <span ref={typedEl} className="text-accent font-semibold" />
                    </div>

                    <p className="text-white/45 text-sm md:text-base leading-relaxed mb-6 md:mb-10 max-w-md mx-auto md:mx-0">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6 md:mb-10">
                        <MagneticButton strength={0.3}>
                            <button onClick={() => scrollTo('contact')} className="btn-primary group">
                                Hire Me
                                <i className="bi bi-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </MagneticButton>
                        <MagneticButton strength={0.3}>
                            <button onClick={() => scrollTo('portfolio')} className="btn-outline">
                                View Work
                            </button>
                        </MagneticButton>
                    </div>

                    {socials.length > 0 && (
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <span className="text-white/20 text-[10px] uppercase tracking-[3px]">Follow</span>
                            <div className="w-6 h-px bg-white/15" />
                            <div className="flex gap-3">
                                {socials.map(({ href, icon, label }) => (
                                    <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                                        title={label}
                                        className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/10
                                                   hover:bg-accent hover:border-accent
                                                   flex items-center justify-center text-white/50 hover:text-white
                                                   transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/25">
                                        <i className={`bi ${icon} text-sm`} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* ── RIGHT: code window ── */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                    className="order-1 md:order-2 hidden md:flex items-center justify-center md:justify-end">

                    <div className="relative mt-6 w-full max-w-[420px]">

                        {/* Ambient glow */}
                        <div className="absolute -inset-6 bg-accent/[0.06] rounded-3xl blur-3xl pointer-events-none" />

                        {/* Corner brackets */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl z-20 pointer-events-none" />
                        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-accent rounded-tr z-20 pointer-events-none" />
                        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-accent rounded-bl z-20 pointer-events-none" />
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br z-20 pointer-events-none" />

                        <CodeWindow />

                        {/* Available badge — bottom center */}
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30
                                        bg-[#0c0c0c] border border-accent/30 rounded-full
                                        px-5 py-2.5 flex items-center gap-2.5
                                        shadow-xl shadow-black/60 whitespace-nowrap backdrop-blur-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                            </span>
                            <span className="text-white/80 text-xs font-semibold tracking-wide">
                                Available for Work
                            </span>
                        </div>

                        {/* Experience chip — top right */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                            className="absolute -top-5 -right-5 z-30 bg-[#0c0c0c] border border-white/10
                                       rounded-2xl px-4 py-3 shadow-xl shadow-black/60 text-center">
                            <div className="text-accent font-bold text-xl font-display leading-none">3+</div>
                            <div className="text-white/35 text-[10px] uppercase tracking-wider mt-1">Years Exp.</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-scroll-dot" />
                </div>
            </div>
        </section>
    );
}
