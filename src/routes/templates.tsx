import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, GhostButton, Pill, Input } from "@/components/app-shell";
import { StudioRedirectBanner } from "@/components/shared";
import { Search, Heart, Plus, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [{ title: "Templates — VideoForge AI" }] }),
  component: TemplatesPage,
});

const tabs = ["Subtitle", "Video", "Project", "Recently Used", "Favorites", "Community"];

const templates = [
  { name: "TikTok Hook", uses: "2.4k", cat: "Subtitle", hue: "from-pink-600 to-rose-800", pro: false },
  { name: "Cinematic Story", uses: "1.8k", cat: "Video", hue: "from-stone-700 to-stone-900", pro: true },
  { name: "Quick Tutorial", uses: "984", cat: "Project", hue: "from-emerald-700 to-emerald-900" },
  { name: "Podcast Snippet", uses: "612", cat: "Video", hue: "from-violet-700 to-indigo-900" },
  { name: "Karaoke Pop", uses: "1.2k", cat: "Subtitle", hue: "from-fuchsia-600 to-purple-800" },
  { name: "Top 10 Countdown", uses: "888", cat: "Project", hue: "from-amber-600 to-orange-800", pro: true },
  { name: "Documentary Long", uses: "342", cat: "Video", hue: "from-cyan-700 to-blue-900" },
  { name: "Minimal Caption", uses: "1.5k", cat: "Subtitle", hue: "from-zinc-700 to-zinc-900" },
];

function TemplatesPage() {
  const [tab, setTab] = useState(tabs[0]);
  return (
    <AppShell>
      <PageHeader
        crumb={["Studio", "Templates"]}
        title="Template Gallery"
        subtitle="Production-grade starting points. Tap one to begin a project in seconds."
        actions={<><GhostButton><Plus className="w-4 h-4" /> Save as Template</GhostButton></>}
      />
      <StudioRedirectBanner
        title="Subtitle templates with full styling live in Subtitle Studio"
        description="100+ caption templates, animations, karaoke, themes and brand kits — all editable in Subtitle Studio."
        to="/subtitle-studio"
        ctaLabel="Open Subtitle Studio"
      />

      <div className="rounded-2xl bg-card border border-border p-2 flex items-center gap-1 mb-5 shadow-card">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 h-9 rounded-xl text-[12.5px] font-semibold transition ${tab === t ? "bg-brand-gradient text-white shadow-brand" : "text-muted-foreground hover:bg-secondary"}`}>{t}</button>
        ))}
        <div className="flex-1" />
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Search templates" className="!h-9 !pl-9 !text-[12px]" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {templates.map(t => (
          <div key={t.name} className="group rounded-3xl bg-card border border-border p-3 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition cursor-pointer">
            <div className={`relative aspect-[4/5] rounded-2xl bg-gradient-to-br ${t.hue} overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.2),transparent_60%)]" />
              <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                <Pill tone="default">{t.cat}</Pill>
                {t.pro && <Pill tone="primary">PRO</Pill>}
              </div>
              <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-md bg-black/30 backdrop-blur grid place-items-center text-white opacity-0 group-hover:opacity-100 transition"><Heart className="w-3.5 h-3.5" /></button>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/40 backdrop-blur text-white font-display font-extrabold text-[18px] leading-tight tracking-tight px-3 py-2 rounded-lg text-center">{t.name}</div>
              </div>
            </div>
            <div className="px-1 pt-3 pb-1 flex items-center justify-between">
              <div className="text-[12.5px] font-bold truncate">{t.name}</div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Users className="w-3 h-3" /> {t.uses}</div>
            </div>
            <button className="mt-2 w-full h-9 rounded-xl bg-brand-gradient text-white text-[12px] font-bold shadow-brand">Use Template</button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
