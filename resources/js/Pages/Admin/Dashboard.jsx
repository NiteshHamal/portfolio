import { Head, router } from '@inertiajs/react';
import Toast from '../../Components/Admin/Toast';

const SECTION_META = {
    hero:     { label: 'Hero',     icon: 'bi-house',           desc: 'Name, tagline, typed roles, social links' },
    about:    { label: 'About',    icon: 'bi-person',          desc: 'Bio, personal details, photo, CV' },
    skills:   { label: 'Skills',   icon: 'bi-bar-chart',       desc: 'Skill bars with percentages' },
    stats:    { label: 'Stats',    icon: 'bi-graph-up',        desc: 'Project count, clients, experience' },
    resume:   { label: 'Resume',   icon: 'bi-file-earmark-text', desc: 'Education & experience timeline' },
    services: { label: 'Services', icon: 'bi-grid',            desc: 'Service cards with icons' },
    contact:  { label: 'Contact',  icon: 'bi-envelope',        desc: 'Address, phone, social links' },
};

function StatCard({ icon, value, label, sub }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <i className={`bi ${icon} text-accent text-2xl`} />
            </div>
            <div>
                <p className="text-3xl font-bold font-display text-white">{value}</p>
                <p className="text-white/60 text-sm">{label}</p>
                {sub && <p className="text-white/30 text-xs mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

function SectionCard({ sectionKey, meta, updatedAt }) {
    return (
        <a href={`/admin/settings#${sectionKey}`}
            onClick={e => { e.preventDefault(); router.visit('/admin/settings'); }}
            className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer">
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <i className={`bi ${meta.icon} text-accent`} />
                </div>
                <span className="text-white/20 text-xs group-hover:text-accent/60 transition-colors">
                    Edit →
                </span>
            </div>
            <p className="text-white font-semibold text-sm mb-1">{meta.label}</p>
            <p className="text-white/40 text-xs leading-relaxed mb-3">{meta.desc}</p>
            {updatedAt && (
                <p className="text-white/20 text-xs">Updated {updatedAt}</p>
            )}
        </a>
    );
}

export default function Dashboard({ stats = {}, sections = {} }) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <Toast />
            <div className="min-h-screen bg-[#080808] text-white px-6 py-10">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <p className="text-accent text-xs font-semibold uppercase tracking-[3px] mb-1">Admin Panel</p>
                            <h1 className="text-3xl font-bold font-display">Dashboard</h1>
                        </div>
                        <div className="flex gap-3">
                            <a href="/" target="_blank"
                                className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition flex items-center gap-2">
                                <i className="bi bi-box-arrow-up-right text-xs" /> View Site
                            </a>
                            <button onClick={() => router.post('/admin/logout')}
                                className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        <StatCard icon="bi-folder2"      value={stats.project_count ?? 0}   label="Projects"         sub={stats.last_project ? `Last edited ${stats.last_project}` : null} />
                        <StatCard icon="bi-sliders"      value={stats.settings_count ?? 0}  label="Content Sections" sub={stats.last_setting  ? `Last saved ${stats.last_setting}`  : null} />
                        <a href="/admin/messages" className="block">
                            <StatCard icon="bi-envelope" value={stats.unread_messages ?? 0} label="Unread Messages"  sub={stats.unread_messages > 0 ? 'Click to view' : 'All caught up'} />
                        </a>
                        <StatCard icon="bi-shield-check" value="Secure"                     label="Admin Access"     sub="Password protected" />
                    </div>

                    {/* Quick actions */}
                    <div className="flex gap-3 flex-wrap mb-10">
                        <a href="/admin/projects"
                            className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition flex items-center gap-2">
                            <i className="bi bi-folder2-open" /> Manage Projects
                        </a>
                        <a href="/admin/settings"
                            className="bg-white/10 text-white/70 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 transition flex items-center gap-2">
                            <i className="bi bi-sliders" /> Edit Content
                        </a>
                        <a href="/admin/messages"
                            className="bg-white/10 text-white/70 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 transition flex items-center gap-2">
                            <i className="bi bi-envelope" /> Inbox
                            {(stats.unread_messages ?? 0) > 0 && (
                                <span className="bg-accent text-white text-xs px-1.5 py-0.5 rounded-full">{stats.unread_messages}</span>
                            )}
                        </a>
                        <a href="/admin/change-password"
                            className="bg-white/10 text-white/70 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 transition flex items-center gap-2">
                            <i className="bi bi-key" /> Change Password
                        </a>
                    </div>

                    {/* Section grid */}
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-white/60 text-sm font-semibold uppercase tracking-widest">Content Sections</h2>
                        <a href="/admin/settings" className="text-accent text-xs hover:underline">Edit all →</a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(SECTION_META).map(([key, meta]) => (
                            <SectionCard
                                key={key}
                                sectionKey={key}
                                meta={meta}
                                updatedAt={sections[key]?.updated_at}
                            />
                        ))}
                        {/* Projects card */}
                        <a href="/admin/projects"
                            className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <i className="bi bi-images text-accent" />
                                </div>
                                <span className="text-white/20 text-xs group-hover:text-accent/60 transition-colors">Manage →</span>
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">Projects</p>
                            <p className="text-white/40 text-xs leading-relaxed mb-3">Portfolio project cards with images and tags</p>
                            <p className="text-white/20 text-xs">{stats.project_count ?? 0} project{stats.project_count !== 1 ? 's' : ''}</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
