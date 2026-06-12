import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import * as THREE from 'three';

export default function Hero({ data = {} }) {
    const {
        name = 'Nitesh Hamal',
        tagline = 'Welcome to my portfolio',
        description = 'Crafting efficient, scalable web applications with clean code and modern technologies from Kathmandu, Nepal.',
        typed_strings = ['Backend Developer', 'Laravel Developer', 'Full Stack Developer', 'Freelancer'],
        github = '',
        linkedin = '',
        youtube = '',
    } = data;

    const typedEl = useRef(null);
    const vantaRef = useRef(null);
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
        github   && { href: github,   icon: 'bi-github' },
        linkedin && { href: linkedin, icon: 'bi-linkedin' },
        youtube  && { href: youtube,  icon: 'bi-youtube' },
    ].filter(Boolean);

    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.join(' ');

    return (
        <section id="home" ref={vantaRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <div className="mb-4 inline-block">
                    <span className="text-accent font-display text-sm tracking-[4px] uppercase">{tagline}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">
                    {firstName} <span className="text-accent">{lastName}</span>
                </h1>

                <div className="text-xl md:text-2xl text-white/80 font-sans mb-10 h-9">
                    I'm a passionate{' '}
                    <span ref={typedEl} className="text-accent font-semibold" />
                </div>

                <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <button onClick={() => scrollTo('contact')} className="btn-primary">Hire Me</button>
                    <button onClick={() => scrollTo('portfolio')} className="btn-outline">View Portfolio</button>
                </div>

                {socials.length > 0 && (
                    <div className="flex justify-center gap-5 mt-12">
                        {socials.map(({ href, icon }) => (
                            <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-white transition-all duration-300 hover:scale-110">
                                <i className={`bi ${icon}`} />
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-scroll-dot" />
                </div>
            </div>
        </section>
    );
}
