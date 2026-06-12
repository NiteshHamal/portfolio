import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Cursor from './Components/Cursor';

createInertiaApp({
    title: (title) => `${title} — Nitesh Hamal`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <Cursor />
                <App {...props} />
            </>
        );
    },
    progress: { color: '#18d26e' },
});
