const TECHS = [
    { name: 'Laravel',    slug: 'laravel',     color: 'FF2D20' },
    { name: 'PHP',        slug: 'php',         color: 'B0B3E0' },
    { name: 'MySQL',      slug: 'mysql',       color: '71B9E6' },
    { name: 'React',      slug: 'react',       color: '61DAFB' },
    { name: 'Python',     slug: 'python',      color: 'FFD43B' },
    { name: 'JavaScript', slug: 'javascript',  color: 'F7DF1E' },
    { name: 'Flutter',    slug: 'flutter',     color: '54C5F8' },
    { name: 'Git',        slug: 'git',         color: 'F05032' },
    { name: 'Tailwind',   slug: 'tailwindcss', color: '06B6D4' },
    { name: 'Vite',       slug: 'vite',        color: '9197FF' },
    { name: 'HTML5',      slug: 'html5',       color: 'E34F26' },
    { name: 'Bootstrap',  slug: 'bootstrap',   color: '8A63D2' },
];

const doubled = [...TECHS, ...TECHS];

export default function TechTicker() {
    return (
        <div className="py-5 bg-[#060606] border-y border-white/[0.05] overflow-hidden relative">

            {/* Edge fades */}
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #060606, transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #060606, transparent)' }} />

            <div className="flex animate-ticker" style={{ width: 'max-content' }}>
                {doubled.map((tech, i) => (
                    <div key={i} className="flex items-center">
                        {/* Tech chip */}
                        <div className="flex items-center gap-2.5 px-6 py-1 group cursor-default">
                            <img
                                src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                                alt={tech.name}
                                width={20}
                                height={20}
                                loading="lazy"
                                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <span className="text-white/40 text-sm font-display font-medium whitespace-nowrap
                                             group-hover:text-white/80 transition-colors duration-300">
                                {tech.name}
                            </span>
                        </div>

                        {/* Separator dot */}
                        <span className="text-white/10 text-xs select-none">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
