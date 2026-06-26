import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, Video, FolderKanban, Subtitles, Sparkles, Library,
  LayoutTemplate, Mic2, Music2, FileVideo, KeyRound, Languages, ScrollText,
  Settings, Code2, Info, Search, Bell, ChevronDown, Plus, Play, Pause,
  Square, FolderOpen, MoreHorizontal, ArrowUpRight, Cpu, HardDrive, Activity,
  Zap, Clock, CheckCircle2, Loader2, Circle, Command, Sun, Moon, Wand2,
  TrendingUp, Film, Mic, FileText, Image as ImageIcon
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Abid VideoForge AI" },
      { name: "description", content: "Your AI video generation command center." },
    ],
  }),
  component: Dashboard,
});

const navMain = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Video, label: "Create Video", badge: "AI" },
  { icon: FolderKanban, label: "Projects", badge: "24" },
  { icon: Subtitles, label: "Subtitle Studio" },
  { icon: Sparkles, label: "Video Effects" },
  { icon: Library, label: "Assets Library" },
  { icon: LayoutTemplate, label: "Templates" },
  { icon: Mic2, label: "Voices" },
  { icon: Music2, label: "Music" },
  { icon: FileVideo, label: "Outputs" },
];

const navGeneral = [
  { icon: KeyRound, label: "API Manager" },
  { icon: Languages, label: "Languages" },
  { icon: ScrollText, label: "Logs" },
  { icon: Settings, label: "Settings" },
  { icon: Code2, label: "Developer Mode" },
  { icon: Info, label: "About" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <TopBar />
          <div className="px-8 pb-10 pt-2 max-w-[1600px] mx-auto">
            <Header />
            <StatsRow />
            <div className="grid grid-cols-12 gap-5 mt-5">
              <div className="col-span-8 space-y-5">
                <RenderPipeline />
                <div className="grid grid-cols-2 gap-5">
                  <SystemHealth />
                  <RecentActivity />
                </div>
                <RecentOutputs />
              </div>
              <div className="col-span-4 space-y-5">
                <TimerCard />
                <QuickActions />
                <RecentProjects />
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============ SIDEBAR ============ */
function Sidebar() {
  return (
    <aside className="w-[260px] shrink-0 h-screen sticky top-0 bg-sidebar border-r border-border flex flex-col">
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center shadow-brand">
            <Wand2 className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-extrabold text-[15px] leading-none tracking-tight">VideoForge</div>
            <div className="text-[10px] text-sidebar-muted font-medium mt-1 tracking-wider uppercase">by Abid Ali</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin">
        <div className="px-3 pt-2 pb-2 text-[10px] font-semibold tracking-[0.14em] text-sidebar-muted">MENU</div>
        <nav className="space-y-0.5">
          {navMain.map((item) => <NavItem key={item.label} {...item} />)}
        </nav>
        <div className="px-3 pt-6 pb-2 text-[10px] font-semibold tracking-[0.14em] text-sidebar-muted">GENERAL</div>
        <nav className="space-y-0.5">
          {navGeneral.map((item) => <NavItem key={item.label} {...item} />)}
        </nav>
      </div>

      <div className="p-3">
        <div className="relative rounded-2xl bg-brand-gradient-radial p-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,.6), transparent 40%)"}} />
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur grid place-items-center mb-3">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-white font-display font-bold text-[15px] leading-tight">Upgrade to <br/>VideoForge Pro</div>
            <div className="text-white/70 text-[11px] mt-1.5 leading-snug">4K rendering, unlimited voices & priority GPU.</div>
            <button className="mt-3 w-full bg-white text-[#164E32] text-[12px] font-semibold py-2 rounded-lg hover:bg-white/95 transition">Upgrade</button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, active, badge }: any) {
  return (
    <a className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition cursor-pointer
      ${active ? "text-primary bg-accent" : "text-sidebar-foreground/70 hover:bg-secondary hover:text-sidebar-foreground"}`}>
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-brand-gradient" />}
      <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.4 : 2} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
          badge === "AI" ? "bg-brand-gradient text-white" : "bg-secondary text-muted-foreground"
        }`}>{badge}</span>
      )}
    </a>
  );
}

/* ============ TOPBAR ============ */
function TopBar() {
  return (
    <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="px-8 h-[68px] flex items-center gap-4 max-w-[1600px] mx-auto">
        <div className="flex-1 max-w-xl relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search projects, voices, templates…"
            className="w-full h-11 pl-11 pr-20 rounded-xl bg-card border border-border text-[13.5px] placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2 py-1 rounded-md font-medium">
            <Command className="w-3 h-3" /> F
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-card border border-border">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-success" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-success animate-ping opacity-60" />
          </div>
          <span className="text-[12px] font-medium text-foreground">All Systems Online</span>
        </div>

        <button className="w-10 h-10 rounded-xl bg-card border border-border grid place-items-center text-muted-foreground hover:text-foreground transition">
          <Sun className="w-4 h-4" />
        </button>
        <button className="relative w-10 h-10 rounded-xl bg-card border border-border grid place-items-center text-muted-foreground hover:text-foreground transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-gradient" />
        </button>

        <div className="flex items-center gap-3 pl-3 pr-1.5 py-1.5 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/20 transition">
          <div className="text-right leading-tight">
            <div className="text-[12.5px] font-semibold">Abid Ali</div>
            <div className="text-[10.5px] text-muted-foreground">Creator · Pro</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-brand-gradient grid place-items-center text-white font-semibold text-[12px]">AA</div>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

/* ============ HEADER ============ */
function Header() {
  return (
    <div className="flex items-end justify-between pt-7 pb-6">
      <div>
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground mb-2">
          <span>Studio</span>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">Dashboard</span>
        </div>
        <h1 className="font-display font-extrabold text-[40px] leading-none tracking-tight">
          Good evening, Abid <span className="inline-block">👋</span>
        </h1>
        <p className="text-[14px] text-muted-foreground mt-2.5">Your creative engine is warm. 3 renders queued · GPU idle at 12%.</p>
      </div>
      <div className="flex items-center gap-2.5">
        <button className="h-11 px-5 rounded-xl bg-card border border-border text-[13px] font-semibold hover:bg-secondary transition flex items-center gap-2">
          <FolderOpen className="w-4 h-4" /> Import Media
        </button>
        <button className="h-11 px-5 rounded-xl bg-brand-gradient text-white text-[13px] font-semibold shadow-brand hover:opacity-95 transition flex items-center gap-2">
          <Plus className="w-4 h-4" strokeWidth={3} /> Create New Video
        </button>
      </div>
    </div>
  );
}

/* ============ STATS ============ */
function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <StatCardHero />
      <StatCard label="Videos Rendering" value="3" delta="2 in queue" icon={Loader2} spin />
      <StatCard label="Today's Usage" value="6h 24m" delta="+1.2h vs avg" icon={Clock} />
      <StatCard label="Storage" value="184 GB" delta="of 500 GB · 36%" icon={HardDrive} progress={36} />
    </div>
  );
}

function StatCardHero() {
  return (
    <div className="relative rounded-3xl bg-brand-gradient-radial p-6 overflow-hidden shadow-brand">
      <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-4 -bottom-12 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
      <div className="relative">
        <div className="flex items-start justify-between mb-7">
          <div className="text-white/80 text-[13px] font-medium">Videos Generated</div>
          <button className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur grid place-items-center transition">
            <ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </button>
        </div>
        <div className="text-white font-display font-extrabold text-[56px] leading-none tracking-tight">147</div>
        <div className="flex items-center gap-1.5 mt-4 text-white/85 text-[12px] font-medium">
          <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur px-1.5 py-0.5 rounded-md">
            <TrendingUp className="w-3 h-3" /> +28
          </span>
          Increased this month
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, icon: Icon, spin, progress }: any) {
  return (
    <div className="group rounded-3xl bg-card border border-border p-6 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition-all">
      <div className="flex items-start justify-between mb-7">
        <div className="text-muted-foreground text-[13px] font-medium">{label}</div>
        <button className="w-8 h-8 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-primary hover:border-primary/30 transition">
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
      <div className="flex items-end justify-between">
        <div className="font-display font-extrabold text-[48px] leading-none tracking-tight text-foreground">{value}</div>
        {Icon && <Icon className={`w-5 h-5 text-primary/60 ${spin ? "animate-spin" : ""}`} />}
      </div>
      {progress != null ? (
        <div className="mt-4">
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-brand-gradient rounded-full" style={{width: `${progress}%`}} />
          </div>
          <div className="text-[11.5px] text-muted-foreground mt-2 font-medium">{delta}</div>
        </div>
      ) : (
        <div className="text-[12px] text-muted-foreground mt-4 font-medium flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-success bg-success/10 px-1.5 py-0.5 rounded-md text-[11px] font-semibold">
            <TrendingUp className="w-3 h-3" /> live
          </span>
          {delta}
        </div>
      )}
    </div>
  );
}

/* ============ RENDER PIPELINE ============ */
const pipeline = [
  { label: "Script Generated", status: "done", time: "0:42" },
  { label: "Keywords Generated", status: "done", time: "0:18" },
  { label: "Voice Generated", status: "done", time: "1:24" },
  { label: "Subtitle Generation", status: "active", time: "0:36", progress: 64 },
  { label: "Downloading Clips", status: "waiting", time: null, sub: "12 clips · 480 MB" },
  { label: "Rendering", status: "waiting", time: null, sub: "1080p · H.264" },
  { label: "Exporting", status: "waiting", time: null },
];

function RenderPipeline() {
  return (
    <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-display font-bold text-[18px]">Live Render Pipeline</h3>
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold px-2 py-1 rounded-md bg-brand-gradient text-white tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              RENDERING
            </span>
          </div>
          <p className="text-[12.5px] text-muted-foreground mt-1.5">
            <span className="text-foreground font-medium">"Morning Habits of CEOs"</span> · Scene 4 of 9 · Clip 11/24
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="px-3 h-9 rounded-lg text-[12px] font-semibold border border-border hover:bg-secondary transition">View Logs</button>
          <button className="px-3 h-9 rounded-lg text-[12px] font-semibold border border-border hover:bg-secondary transition">Settings</button>
        </div>
      </div>

      {/* Overall progress */}
      <div className="rounded-2xl bg-secondary/50 border border-border/60 p-4 mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-[12.5px] font-medium text-muted-foreground">Overall progress</div>
          <div className="font-display font-bold text-[14px]">42%</div>
        </div>
        <div className="h-2 bg-card rounded-full overflow-hidden">
          <div className="h-full bg-brand-gradient rounded-full relative" style={{width: "42%"}}>
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-[11.5px] text-muted-foreground">
          <span>Elapsed <span className="text-foreground font-semibold">02:47</span></span>
          <span>ETA <span className="text-foreground font-semibold">03:51</span></span>
        </div>
      </div>

      <div className="space-y-2">
        {pipeline.map((step, i) => <PipelineStep key={step.label} {...step} index={i} />)}
      </div>
    </div>
  );
}

function PipelineStep({ label, status, time, progress, sub, index }: any) {
  const isDone = status === "done";
  const isActive = status === "active";
  return (
    <div className={`flex items-center gap-4 p-3.5 rounded-xl border transition ${
      isActive ? "bg-accent/40 border-primary/20" : "border-transparent hover:bg-secondary/50"
    }`}>
      <div className="shrink-0">
        {isDone ? (
          <div className="w-8 h-8 rounded-full bg-brand-gradient grid place-items-center">
            <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        ) : isActive ? (
          <div className="w-8 h-8 rounded-full bg-brand-gradient grid place-items-center">
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-border grid place-items-center text-muted-foreground text-[11px] font-bold">
            {index + 1}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className={`text-[13.5px] font-semibold ${isActive || isDone ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
          <div className="text-[11.5px] font-medium text-muted-foreground">
            {time ? <span><Clock className="w-3 h-3 inline -mt-0.5 mr-1" />{time}</span> : status === "waiting" ? "Waiting" : ""}
          </div>
        </div>
        {isActive && (
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-1 bg-card rounded-full overflow-hidden">
              <div className="h-full bg-brand-gradient rounded-full" style={{width: `${progress}%`}} />
            </div>
            <span className="text-[11px] font-bold text-primary">{progress}%</span>
          </div>
        )}
        {sub && <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

/* ============ SYSTEM HEALTH ============ */
function SystemHealth() {
  const items = [
    { label: "GPU", value: "RTX 4090", load: 78, icon: Zap, hot: true },
    { label: "CPU", value: "Ryzen 9", load: 34, icon: Cpu },
    { label: "API Status", value: "Operational", load: 100, icon: Activity, ok: true },
  ];
  return (
    <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-[16px]">System Health</h3>
        <span className="text-[10.5px] font-semibold text-success bg-success/10 px-2 py-1 rounded-md">HEALTHY</span>
      </div>
      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.label}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-secondary grid place-items-center">
                <it.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-[12.5px] font-semibold">{it.label}</div>
                <div className="text-[11px] text-muted-foreground">{it.value}</div>
              </div>
              <div className="font-display font-bold text-[14px] tabular-nums">{it.load}%</div>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${it.hot ? "bg-brand-gradient" : "bg-brand-gradient"}`} style={{width: `${it.load}%`}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ RECENT ACTIVITY ============ */
function RecentActivity() {
  const activities = [
    { icon: CheckCircle2, label: "Render finished", sub: "Morning Routines · 4K", time: "2m", color: "success" },
    { icon: Mic, label: "Voice cloned", sub: "Narrator — David v2", time: "14m" },
    { icon: Sparkles, label: "Effect applied", sub: "Cyberpunk LUT · Project #18", time: "1h" },
    { icon: FileText, label: "Script drafted", sub: "Top 10 SaaS Tools", time: "3h" },
    { icon: ImageIcon, label: "12 assets imported", sub: "From Pexels", time: "5h" },
  ];
  return (
    <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-[16px]">Recent Activity</h3>
        <button className="text-[11.5px] font-semibold text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-3.5">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${a.color === "success" ? "bg-success/10 text-success" : "bg-secondary text-primary"}`}>
              <a.icon className="w-3.5 h-3.5" strokeWidth={2.4} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold leading-tight">{a.label}</div>
              <div className="text-[11.5px] text-muted-foreground mt-0.5 truncate">{a.sub}</div>
            </div>
            <div className="text-[11px] text-muted-foreground font-medium shrink-0">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ RECENT OUTPUTS ============ */
const outputs = [
  { title: "Morning Habits of CEOs", duration: "8:24", size: "248 MB", res: "4K", hue: "from-emerald-700 to-emerald-900" },
  { title: "Top 10 AI Tools 2026", duration: "12:08", size: "412 MB", res: "1080p", hue: "from-orange-600 to-rose-800" },
  { title: "Tokyo at Midnight", duration: "5:42", size: "184 MB", res: "1080p", hue: "from-violet-700 to-indigo-900" },
  { title: "Productivity Hacks", duration: "4:18", size: "152 MB", res: "1080p", hue: "from-amber-600 to-orange-800" },
];

function RecentOutputs() {
  return (
    <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-bold text-[16px]">Recent Outputs</h3>
          <p className="text-[11.5px] text-muted-foreground mt-0.5">Your latest exports, ready to share.</p>
        </div>
        <button className="text-[11.5px] font-semibold text-primary hover:underline">Open gallery →</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {outputs.map((o) => (
          <div key={o.title} className="group cursor-pointer">
            <div className={`relative aspect-video rounded-2xl bg-gradient-to-br ${o.hue} overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.25),transparent_60%)]" />
              <div className="absolute top-2.5 left-2.5 text-[10px] font-bold text-white bg-black/30 backdrop-blur px-1.5 py-0.5 rounded-md">{o.res}</div>
              <div className="absolute top-2.5 right-2.5 text-[10px] font-semibold text-white bg-black/30 backdrop-blur px-1.5 py-0.5 rounded-md">{o.duration}</div>
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                <div className="w-11 h-11 rounded-full bg-white/95 grid place-items-center shadow-lg">
                  <Play className="w-4 h-4 text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold truncate">{o.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{o.size} · 2h ago</div>
              </div>
              <button className="w-7 h-7 rounded-lg hover:bg-secondary grid place-items-center text-muted-foreground shrink-0">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ TIMER CARD ============ */
function TimerCard() {
  return (
    <div className="relative rounded-3xl bg-brand-gradient-radial p-6 overflow-hidden shadow-brand">
      <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-white/5 blur-3xl" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative">
        <div className="flex items-center justify-between mb-1">
          <div className="text-white/85 text-[13px] font-semibold">Render Timer</div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-white/15 backdrop-blur px-2 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
          </span>
        </div>
        <div className="text-white/60 text-[11px] mb-5">Current stage · Subtitle Generation</div>

        <div className="font-display font-extrabold text-white text-[56px] leading-none tracking-tight tabular-nums">
          02:47<span className="text-white/40 text-[36px]">:18</span>
        </div>

        <div className="mt-1 text-white/70 text-[12px] font-medium">
          Elapsed time · <span className="text-white">ETA 03:51</span> remaining
        </div>

        <div className="mt-5 h-1.5 bg-white/15 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{width: "42%"}}/>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5">
          <button className="h-11 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition">
            <Pause className="w-3.5 h-3.5" fill="currentColor" /> Pause
          </button>
          <button className="h-11 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition">
            <Square className="w-3.5 h-3.5" fill="currentColor" /> Stop
          </button>
          <button className="h-11 rounded-xl bg-white text-[#164E32] text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-white/90 transition">
            <FolderOpen className="w-3.5 h-3.5" /> Folder
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ QUICK ACTIONS ============ */
const quick = [
  { icon: Wand2, label: "AI Script", sub: "Generate from idea" },
  { icon: Subtitles, label: "Subtitles", sub: "Style editor" },
  { icon: Mic2, label: "Voices", sub: "120+ AI voices" },
  { icon: LayoutTemplate, label: "Templates", sub: "Browse 80+" },
];

function QuickActions() {
  return (
    <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-[16px]">Quick Actions</h3>
        <button className="text-[11.5px] font-semibold text-primary hover:underline">Customize</button>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {quick.map((q) => (
          <button key={q.label} className="group text-left p-3.5 rounded-2xl border border-border hover:border-primary/30 hover:bg-accent/30 transition">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center mb-3 shadow-brand group-hover:scale-105 transition">
              <q.icon className="w-4 h-4 text-white" strokeWidth={2.4} />
            </div>
            <div className="text-[12.5px] font-bold">{q.label}</div>
            <div className="text-[10.5px] text-muted-foreground mt-0.5">{q.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ RECENT PROJECTS ============ */
const projects = [
  { name: "Morning Habits of CEOs", status: "Rendering", progress: 42, color: "primary" },
  { name: "Top 10 AI Tools 2026", status: "Draft", progress: 18 },
  { name: "Tokyo at Midnight", status: "Completed", progress: 100, color: "success" },
  { name: "Productivity Hacks", status: "Queued", progress: 0 },
  { name: "Crypto Explained", status: "Completed", progress: 100, color: "success" },
];

function RecentProjects() {
  return (
    <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-[16px]">Recent Projects</h3>
        <button className="text-[11px] font-bold px-2.5 py-1 rounded-md border border-border text-muted-foreground hover:text-foreground transition flex items-center gap-1">
          <Plus className="w-3 h-3" strokeWidth={3}/> New
        </button>
      </div>
      <div className="space-y-3.5">
        {projects.map((p) => (
          <div key={p.name} className="group">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 ${
                p.color === "success" ? "bg-success/10 text-success" :
                p.color === "primary" ? "bg-brand-gradient text-white" :
                "bg-secondary text-muted-foreground"
              }`}>
                <Film className="w-4 h-4" strokeWidth={2.2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[12.5px] font-semibold truncate">{p.name}</div>
                  <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                    p.color === "success" ? "bg-success/10 text-success" :
                    p.color === "primary" ? "bg-accent text-primary" :
                    "bg-secondary text-muted-foreground"
                  }`}>{p.status}</div>
                </div>
                <div className="mt-1.5 h-1 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color === "success" ? "bg-success" : "bg-brand-gradient"}`} style={{width: `${p.progress}%`}} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <div className="mt-10 pt-6 border-t border-border flex items-center justify-between text-[11.5px] text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-brand-gradient grid place-items-center">
          <Wand2 className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-medium">Abid VideoForge AI</span>
        <span>· v1.0.0</span>
      </div>
      <div className="flex items-center gap-5">
        <a href="https://abidalidev.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition">abidalidev.com</a>
        <a href="https://github.com/abidmmp" target="_blank" rel="noreferrer" className="hover:text-foreground transition">GitHub</a>
        <a href="https://linkedin.com/in/abidalidev" target="_blank" rel="noreferrer" className="hover:text-foreground transition">LinkedIn</a>
        <span>© 2026 Abid Ali</span>
      </div>
    </div>
  );
}
