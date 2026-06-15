import './bootstrap';
import '../css/app.css';
import { Component, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MotionConfig } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from './Components/Cursor';
import FilmGrain from './Components/FilmGrain';
import { LenisContext } from './hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

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

function PageTransitionOverlay() {
    const ref = useRef(null);

    useEffect(() => {
        // grab lenis from context via the SmoothScroll parent — we just call
        // window.scrollTo which Lenis intercepts via its own RAF
        const show = () => {
            if (!ref.current) return;
            ref.current.style.opacity = '1';
            ref.current.style.pointerEvents = 'all';
        };

        const hide = () => {
            // tiny delay so new page DOM is ready before revealing
            setTimeout(() => {
                if (!ref.current) return;
                ref.current.style.opacity = '0';
                ref.current.style.pointerEvents = 'none';
                // Refresh ScrollTrigger positions for the new page
                ScrollTrigger.refresh();
            }, 40);
        };

        const offBefore   = router.on('before',   show);
        const offNavigate = router.on('navigate',  () => { window.scrollTo(0, 0); hide(); });
        const offError    = router.on('error',     hide);

        return () => { offBefore(); offNavigate(); offError(); };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            style={{
                position:       'fixed',
                inset:          0,
                background:     '#040404',
                opacity:        0,
                pointerEvents:  'none',
                zIndex:         9990,
                transition:     'opacity 0.35s ease',
            }}
        />
    );
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

        // Use GSAP ticker so ScrollTrigger and Lenis share the same frame
        lenis.on('scroll', ScrollTrigger.update);
        const lenisRaf = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisRaf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenisRaf);
            lenis.off('scroll', ScrollTrigger.update);
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
                        <FilmGrain />
                        <PageTransitionOverlay />
                        <App {...props} />
                    </MotionConfig>
                </SmoothScroll>
            </ErrorBoundary>
        );
    },
    progress: { color: '#18d26e' },
});
