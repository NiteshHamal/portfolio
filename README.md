# Nitesh Hamal — Personal Portfolio

A full-stack personal portfolio website built with Laravel 13, Inertia.js, React 19, and Tailwind CSS. Everything — hero copy, skills, projects, services, resume, contact details, and SEO meta — is manageable from a password-protected admin panel with no code changes required.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 |
| Frontend | React 19 + Inertia.js v3 |
| Styling | Tailwind CSS v3 |
| Build | Vite 8 |
| Database | SQLite |
| Animations | Framer Motion, Vanta.js, Typed.js |

## Features

**Public site**
- Hero split layout with profile photo, corner brackets, and "Available for Work" badge
- Animated stat counters (scroll-triggered count-up)
- Skill badge tag cloud with proficiency tiers
- Portfolio grid with filter tabs, tech pill overlay, lightbox for image preview, and external link support
- Resume timeline with graduation cap / briefcase icons per entry
- Contact form (messages stored in the database)
- Smooth-scroll navbar with animated hamburger, mobile slide-down drawer + backdrop, and "Hire Me" CTA
- Back-to-top button
- Gradient section headings, noise texture on section backgrounds, radial glow behind headings
- Full multi-column footer with quick links and contact info
- Custom cursor

**Admin panel** (`/admin`)
- Dashboard with stats (projects, messages, unread count)
- Settings tabs: Hero, About, Skills, Stats, Resume, Services, Contact, SEO
- Drag-to-reorder for projects, skills, and services
- Image preview before upload (projects + about photo + OG image)
- Per-tab "Reset to defaults" with confirmation modal
- Unsaved-changes warning on tab switch and page navigation
- Contact inbox with read/unread state, reply via email, delete
- Change password page
- SEO tab: page title, meta description (character counter), OG image upload

## Local Setup

**Requirements:** PHP 8.2+, Composer, Node 20+

```bash
git clone https://github.com/NiteshHamal/portfolio.git
cd portfolio

composer install
npm install

cp .env.example .env
php artisan key:generate

# SQLite — create the database file
touch database/database.sqlite

php artisan migrate
php artisan db:seed

# Start both servers
php artisan serve
npm run dev
```

Visit `http://localhost:8000`. Admin panel is at `/admin` — default credentials are set in the seeder.

## Environment

Key `.env` values:

```env
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
```

## Deployment

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Point your web server document root to the `public/` directory.

## License

MIT
