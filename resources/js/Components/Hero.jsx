import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import * as THREE from 'three';

export default function Hero({ data = {}, photo = null }) {
    const {
        name           = 'Nitesh Hamal',
        tagline        = 'Welcome to my portfolio',
        description    = 'Crafting efficient, scalable web applications with clean code and modern technologies from Kathmandu, Nepal.',
        typed_strings  = ['Backend Developer', 'Laravel Developer', 'Full Stack Developer', 'Freelancer'],
        github         = '',
        linkedin       = '',
        youtube        = '',
    } = data;

    const typedEl     = useRef(null);
    const vantaRef    = useRef(null);
    const vantaEffect = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
            strings: typed_strings,
            typeSpeed: 75,
            backSpeed: 45,
            loop: true,
        });
        return () => typed.destroy();
    }, [typed_strings]);

    useEffect(() => {
        let mounted = true;
        import('vanta/dist/vanta.net.min').then((mod) => {
            if (!mounted || vantaEffect.current) return;
            const VANTA = mod.default || mod;
            vantaEffect.current = VANTA({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                color: 0x18d26e,
                backgroundColor: 0x040404,
                points: 9,
                maxDistance: 23,
                spacing: 18,
            });
        });
        return () => {
            mounted = false;
            if (vantaEffect.current) { vantaEffect.current.destroy(); vantaEffect.current = null; }
        };
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const socials = [
        github   && { href: github,   icon: 'bi-github',   label: 'GitHub' },
        linkedin && { href: linkedin, icon: 'bi-linkedin', label: 'LinkedIn' },
        youtube  && { href: youtube,  icon: 'bi-youtube',  label: 'YouTube' },
    ].filter(Boolean);

    const nameParts  = name.trim().split(' ');
    const firstName  = nameParts[0] ?? '';
    const lastName   = nameParts.slice(1).join(' ');

    return (
        <section id="home" ref={vantaRef}
            className="relative min-h-screen flex items-center overflow-hidden">

            {/* ── Content grid ─────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28
                            grid lg:grid-cols-2 gap-14 items-center">

                {/* ── LEFT: text ───────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="order-2 lg:order-1 text-center lg:text-left">

                    {/* Availability pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/25
                                   rounded-full px-4 py-1.5 mb-8 lg:mb-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                        </span>
                        <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                            {tagline}
                        </span>
                    </motion.div>

                    {/* Name */}
                    <h1 className="font-bold font-display leading-[1.05] mb-6">
                        <span className="block text-white/40 text-lg md:text-xl font-medium font-sans mb-1">
                            Hello, I'm
                        </span>
                        <span className="block text-5xl md:text-6xl xl:text-7xl text-white">
                            {firstName}
                        </span>
                        {lastName && (
                            <span className="block text-5xl md:text-6xl xl:text-7xl text-accent">
                                {lastName}
                            </span>
                        )}
                    </h1>

                    {/* Typed */}
                    <div className="text-lg md:text-xl text-white/60 font-sans mb-6
                                    flex items-center gap-2 justify-center lg:justify-start">
                        <span>I'm a passionate</span>
                        <span ref={typedEl} className="text-accent font-semibold" />
                    </div>

                    {/* Description */}
                    <p className="text-white/45 text-base leading-relaxed mb-10 max-w-md
                                  mx-auto lg:mx-0">
                        {description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                        <button onClick={() => scrollTo('contact')} className="btn-primary group">
                            Hire Me
                            <i className="bi bi-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                        <button onClick={() => scrollTo('portfolio')} className="btn-outline">
                            View Work
                        </button>
                    </div>

                    {/* Socials */}
                    {socials.length > 0 && (
                        <div className="flex items-center gap-4 justify-center lg:justify-start">
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

                {/* ── RIGHT: photo ─────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                    className="order-1 lg:order-2 flex items-center justify-center lg:justify-end">

                    {/* Wrapper — all decorative elements are children so they overflow naturally */}
                    <div className="relative mt-6">

                        {/* Ambient glow behind photo */}
                        <div className="absolute -inset-10 bg-accent/[0.07] rounded-full blur-3xl pointer-events-none" />

                        {/* Decorative rotated cards */}
                        <div className="absolute inset-0 rounded-2xl border border-accent/20 bg-accent/[0.04]"
                             style={{ transform: 'rotate(-5deg) scale(1.06)' }} />
                        <div className="absolute inset-0 rounded-2xl border border-white/[0.06] bg-transparent"
                             style={{ transform: 'rotate(2.5deg) scale(1.03)' }} />

                        {/* Photo */}
                        <div className="relative w-64 md:w-72 lg:w-80 rounded-2xl overflow-hidden
                                        border border-white/10 shadow-2xl shadow-black/60 z-10">
                            {photo ? (
                                <img src={photo} alt={name}
                                    className="w-full aspect-[3/4] object-cover object-top" />
                            ) : (
                                <div className="w-full aspect-[3/4] bg-white/5 flex items-center justify-center">
                                    <i className="bi bi-person text-white/10 text-8xl" />
                                </div>
                            )}
                            {/* Bottom fade */}
                            <div className="absolute inset-x-0 bottom-0 h-20
                                            bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        </div>

                        {/* Corner bracket accents */}
                        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-accent rounded-tl z-20" />
                        <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-accent rounded-tr z-20" />
                        <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-accent rounded-bl z-20" />
                        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-accent rounded-br z-20" />

                        {/* Available for Work badge */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30
                                        bg-[#0c0c0c] border border-accent/30 rounded-full
                                        px-5 py-2.5 flex items-center gap-2.5
                                        shadow-xl shadow-black/60 whitespace-nowrap
                                        backdrop-blur-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                            </span>
                            <span className="text-white/80 text-xs font-semibold tracking-wide">
                                Available for Work
                            </span>
                        </div>

                        {/* Experience chip — top-right */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                            className="absolute -top-5 -right-7 z-30 bg-[#0c0c0c] border border-white/10
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
