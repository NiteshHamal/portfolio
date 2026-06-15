import { useEffect, useRef } from 'react';

const R = 24, G = 210, B = 110; // accent #18d26e

export default function Cursor() {
    const dot    = useRef(null);
    const ring   = useRef(null);
    const canvas = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) return;

        const cvs = canvas.current;
        const ctx = cvs?.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            cvs.width  = window.innerWidth;
            cvs.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let mouseX = 0, mouseY = 0;
        let ringX  = 0, ringY  = 0;
        let rafId;
        const particles = [];
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const spawn = () => {
            if (reduced) return;
            // cap pool to avoid unbounded growth
            if (particles.length > 140) particles.splice(0, 6);
            for (let i = 0; i < 2; i++) {
                particles.push({
                    x:     mouseX,
                    y:     mouseY,
                    vx:    (Math.random() - 0.5) * 3.2,
                    vy:    -(Math.random() * 2.8 + 0.5),
                    size:  Math.random() * 2.2 + 0.8,
                    alpha: Math.random() * 0.45 + 0.55,
                    decay: Math.random() * 0.018 + 0.013,
                });
            }
        };

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.current && (dot.current.style.transform = `translate(${mouseX}px,${mouseY}px)`);
            spawn();
        };

        const onOver = (e) => {
            if (e.target.closest('a, button, [data-tilt]'))
                ring.current?.classList.add('cursor-hover');
        };
        const onOut = (e) => {
            if (e.target.closest('a, button, [data-tilt]'))
                ring.current?.classList.remove('cursor-hover');
        };

        const animate = () => {
            // ── ring lerp ──
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.current && (ring.current.style.transform = `translate(${ringX}px,${ringY}px)`);

            // ── particle canvas ──
            ctx.clearRect(0, 0, cvs.width, cvs.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.vy    += 0.075;        // gravity
                p.x     += p.vx;
                p.y     += p.vy;
                p.alpha -= p.decay;

                if (p.alpha <= 0) { particles.splice(i, 1); continue; }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                // soft glow
                ctx.shadowColor = `rgba(${R},${G},${B},${p.alpha * 0.6})`;
                ctx.shadowBlur  = 6;
                ctx.fillStyle   = `rgba(${R},${G},${B},${p.alpha})`;
                ctx.fill();
            }

            // reset shadow so it doesn't bleed into other draws
            ctx.shadowBlur = 0;

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout',  onOut);
        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('resize',    resize);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout',  onOut);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvas}
                style={{
                    position: 'fixed', inset: 0,
                    width: '100vw', height: '100vh',
                    pointerEvents: 'none', zIndex: 9997,
                }}
            />
            <div ref={dot}  className="cursor-dot" />
            <div ref={ring} className="cursor-ring" />
        </>
    );
}
