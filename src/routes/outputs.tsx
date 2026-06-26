import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, PrimaryButton, GhostButton, Pill, Input } from "@/components/app-shell";
import { Search, Play, Heart, Share2, Copy, Trash2, FolderOpen, Filter, Plus } from "lucide-react";

export const Route = createFileRoute("/outputs")({
  head: () => ({ meta: [{ title: "Outputs — VideoForge AI" }] }),
  component: OutputsPage,
});

const outputs = Array.from({ length: 12 }).map((_, i) => ({
  title: ["Morning Habits of CEOs", "Top 10 AI Tools 2026", "Tokyo at Midnight", "Productivity Hacks", "Crypto Explained", "Sleep Science", "Why People Quit", "Stoicism in 60s"][i % 8],
  duration: ["8:24", "12:08", "5:42", "4:18"][i % 4],
  res: ["4K", "1080p", "1080p", "720p"][i % 4],
  size: ["248 MB", "412 MB", "184 MB", "102 MB"][i % 4],
  date: ["2h ago", "Yesterday", "2 days", "5 days"][i % 4],
  hue: ["from-emerald-700 to-emerald-950", "from-orange-600 to-rose-800", "from-violet-700 to-indigo-900", "from-amber-600 to-orange-800", "from-cyan-700 to-blue-900"][i % 5],
  fav: i % 3 === 0,
}));

function OutputsPage() {
  return (
    <AppShell>
      <PageHeader
        crumb={["Studio", "Outputs"]}
        title="Outputs"
        subtitle="Your rendered videos, ready to publish anywhere."
        actions={<><GhostButton><FolderOpen className="w-4 h-4" /> Open Folder</GhostButton><PrimaryButton><Plus className="w-4 h-4" /> New Video</PrimaryButton></>}
      />

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search outputs…" className="!pl-10" />
        </div>
        <GhostButton><Filter className="w-4 h-4" /> Resolution</GhostButton>
        <select className="h-10 px-3 rounded-xl bg-card border border-border text-[13px]"><option>Sort: Newest</option><option>Largest first</option><option>By project</option></select>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {outputs.map((o, i) => (
          <div key={i} className="group rounded-3xl bg-card border border-border p-3 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition">
            <div className={`relative aspect-video rounded-2xl bg-gradient-to-br ${o.hue} overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.25),transparent_60%)]" />
              <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                <Pill tone="primary">{o.res}</Pill>
              </div>
              <button className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-md backdrop-blur grid place-items-center ${o.fav ? "bg-rose-500 text-white" : "bg-black/30 text-white"}`}><Heart className="w-3.5 h-3.5" fill={o.fav ? "currentColor" : "none"} /></button>
              <div className="absolute bottom-2.5 right-2.5 text-[10px] font-semibold text-white bg-black/40 backdrop-blur px-1.5 py-0.5 rounded">{o.duration}</div>
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                <div className="w-12 h-12 rounded-full bg-white/95 grid place-items-center shadow-lg cursor-pointer"><Play className="w-4 h-4 text-primary ml-0.5" fill="currentColor" /></div>
              </div>
            </div>
            <div className="px-1 pt-3 pb-1">
              <div className="text-[13px] font-bold truncate">{o.title}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{o.size} · {o.date}</div>
              <div className="mt-3 flex items-center gap-1">
                <ActionBtn icon={FolderOpen} label="Open" />
                <ActionBtn icon={Share2} label="Share" />
                <ActionBtn icon={Copy} label="Duplicate" />
                <ActionBtn icon={Trash2} label="Delete" danger />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function ActionBtn({ icon: Icon, label, danger }: any) {
  return (
    <button title={label} className={`flex-1 h-8 rounded-lg grid place-items-center text-muted-foreground hover:bg-secondary ${danger ? "hover:text-destructive" : "hover:text-primary"} transition`}>
      <Icon className="w-3.5 h-3.5" />
    </button>
  );
}
