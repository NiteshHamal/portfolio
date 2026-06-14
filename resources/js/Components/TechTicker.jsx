import {
    siLaravel, siPhp, siMysql, siReact, siPython,
    siJavascript, siFlutter, siGit, siTailwindcss,
    siVite, siHtml5, siBootstrap,
} from 'simple-icons';

const TECHS = [
    { name: 'Laravel',    icon: siLaravel     },
    { name: 'PHP',        icon: siPhp         },
    { name: 'MySQL',      icon: siMysql       },
    { name: 'React',      icon: siReact       },
    { name: 'Python',     icon: siPython      },
    { name: 'JavaScript', icon: siJavascript  },
    { name: 'Flutter',    icon: siFlutter     },
    { name: 'Git',        icon: siGit         },
    { name: 'Tailwind',   icon: siTailwindcss },
    { name: 'Vite',       icon: siVite        },
    { name: 'HTML5',      icon: siHtml5       },
    { name: 'Bootstrap',  icon: siBootstrap   },
];

const doubled = [...TECHS, ...TECHS];

function TechIcon({ icon }) {
    return (
        <svg
            width="20" height="20" viewBox="0 0 24 24"
            fill={`#${icon.hex}`}
            aria-hidden="true">
            <path d={icon.path} />
        </svg>
    );
}

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
                        <div className="flex items-center gap-2.5 px-6 py-1 group cursor-default">
                            <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                <TechIcon icon={tech.icon} />
                            </span>
                            <span className="text-white/40 text-sm font-display font-medium whitespace-nowrap
                                             group-hover:text-white/80 transition-colors duration-300">
                                {tech.name}
                            </span>
                        </div>
                        <span className="text-white/10 text-xs select-none">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
