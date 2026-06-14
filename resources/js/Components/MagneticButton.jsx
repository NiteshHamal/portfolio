import { useRef, useEffect } from 'react';

export default function MagneticButton({ children, strength = 0.3, className = '' }) {
    const wrapRef = useRef(null);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        if (window.matchMedia('(hover: none)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width  / 2)) * strength;
            const dy = (e.clientY - (rect.top  + rect.height / 2)) * strength;
            el.style.transition = '';
            el.style.transform  = `translate(${dx}px, ${dy}px)`;
        };

        const onLeave = () => {
            el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.transform  = '';
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, [strength]);

    return (
        <div ref={wrapRef} className={`inline-block ${className}`}>
            {children}
        </div>
    );
}
