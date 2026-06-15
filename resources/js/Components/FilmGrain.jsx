import { useEffect, useRef } from 'react';

export default function FilmGrain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const SIZE = 256;
        canvas.width  = SIZE;
        canvas.height = SIZE;

        const ctx = canvas.getContext('2d');
        const img = ctx.createImageData(SIZE, SIZE);
        const buf = img.data;

        // Pre-fill alpha channel — we only mutate RGB each frame
        for (let i = 3; i < buf.length; i += 4) buf[i] = 255;

        const INTERVAL = 1000 / 8; // 8 fps
        let lastTime = 0;
        let rafId;

        const tick = (now) => {
            rafId = requestAnimationFrame(tick);
            if (now - lastTime < INTERVAL) return;
            lastTime = now;

            for (let i = 0; i < buf.length; i += 4) {
                const v = (Math.random() * 255) | 0;
                buf[i] = buf[i + 1] = buf[i + 2] = v;
            }
            ctx.putImageData(img, 0, 0);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position:      'fixed',
                inset:         0,
                width:         '100vw',
                height:        '100vh',
                opacity:       0.055,
                pointerEvents: 'none',
                zIndex:        9996,
                mixBlendMode:  'overlay',
            }}
        />
    );
}
