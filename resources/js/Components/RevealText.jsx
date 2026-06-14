import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function RevealText({ children, as: Tag = 'div', className = '', delay = 0 }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const words = el.querySelectorAll('.gsap-word');
        if (!words.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Set hidden start state immediately
        gsap.set(words, { y: '115%' });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                gsap.to(words, {
                    y: '0%',
                    duration: 0.75,
                    stagger: 0.07,
                    delay,
                    ease: 'power3.out',
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            gsap.set(words, { clearProps: 'y' });
        };
    }, [delay]);

    const words = (typeof children === 'string' ? children : '').split(' ').filter(Boolean);

    return (
        <Tag ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i}
                    style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 1.2 }}>
                    <span className="gsap-word" style={{ display: 'inline-block' }}>
                        {word}
                    </span>
                    {i < words.length - 1 && ' '}
                </span>
            ))}
        </Tag>
    );
}
