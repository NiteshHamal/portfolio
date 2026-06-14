import { useEffect, useRef } from 'react';

export default function Cursor() {
    const dot = useRef(null);
    const ring = useRef(null);

    useEffect(() => {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dot.current) {
                dot.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ring.current) {
                ring.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
            }
            requestAnimationFrame(animate);
        };

        const onOver = (e) => {
            if (e.target.closest('a, button, [data-tilt]')) {
                ring.current?.classList.add('cursor-hover');
            }
        };
        const onOut = (e) => {
            if (e.target.closest('a, button, [data-tilt]')) {
                ring.current?.classList.remove('cursor-hover');
            }
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);
        animate();

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
        };
    }, []);

    return (
        <>
            <div ref={dot} className="cursor-dot" />
            <div ref={ring} className="cursor-ring" />
        </>
    );
}
