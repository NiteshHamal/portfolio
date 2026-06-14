import './bootstrap';
import '../css/app.css';
import { Component, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MotionConfig } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Cursor from './Components/Cursor';
import { LenisContext } from './hooks/useLenis';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <div className="min-h-screen bg-[#040404] flex flex-col items-center justify-center px-6 text-center gap-6">
                    <div className="text-6xl font-bold font-display text-accent">!</div>
                    <h1 className="text-white text-2xl font-bold font-display">Something went wrong</h1>
                    <p className="text-white/40 text-sm max-w-sm">
                        An unexpected error occurred. Try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 rounded-full border border-accent text-accent text-sm font-semibold
                                   hover:bg-accent hover:text-white transition-colors duration-200">
                        Refresh
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
            smoothTouch: false,
        });

        lenisRef.current = lenis;

        let rafId;
        function tick(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}

createInertiaApp({
    title: (title) => `${title} — Nitesh Hamal`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <ErrorBoundary>
                <SmoothScroll>
                    <MotionConfig reducedMotion="user">
                        <Cursor />
                        <App {...props} />
                    </MotionConfig>
                </SmoothScroll>
            </ErrorBoundary>
        );
    },
    progress: { color: '#18d26e' },
});
