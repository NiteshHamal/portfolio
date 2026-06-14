import './bootstrap';
import '../css/app.css';
import { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MotionConfig } from 'framer-motion';
import Cursor from './Components/Cursor';

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

createInertiaApp({
    title: (title) => `${title} — Nitesh Hamal`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <ErrorBoundary>
                <MotionConfig reducedMotion="user">
                    <Cursor />
                    <App {...props} />
                </MotionConfig>
            </ErrorBoundary>
        );
    },
    progress: { color: '#18d26e' },
});
