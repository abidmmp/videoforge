import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, GhostButton, Pill, Input } from "@/components/app-shell";
import { StudioRedirectBanner } from "@/components/shared";
import { Search, Star, Download, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/effects")({
  head: () => ({ meta: [{ title: "Video Effects — VideoForge AI" }] }),
  component: EffectsPage,
});

const categories = ["All", "Transitions", "Filters", "Color LUTs", "Overlays", "Light Leaks", "Particles", "Glitch", "Film Grain", "Motion Blur", "Lens Effects"] as const;

const effects = [
  { name: "Cinematic Teal", cat: "Color LUTs", hue: "from-cyan-700 to-teal-900", pro: true },
  { name: "Vintage Film", cat: "Filters", hue: "from-amber-700 to-orange-900" },
  { name: "Bokeh Drift", cat: "Particles", hue: "from-violet-700 to-fuchsia-900" },
  { name: "Sunset Leak", cat: "Light Leaks", hue: "from-orange-500 to-rose-700" },
  { name: "VHS Glitch", cat: "Glitch", hue: "from-fuchsia-600 to-purple-900" },
  { name: "35mm Grain", cat: "Film Grain", hue: "from-stone-700 to-stone-900" },
  { name: "Anamorphic Flare", cat: "Lens Effects", hue: "from-blue-600 to-indigo-900" },
  { name: "Smooth Glide", cat: "Transitions", hue: "from-emerald-700 to-emerald-900" },
  { name: "Speed Blur", cat: "Motion Blur", hue: "from-sky-700 to-blue-900", pro: true },
  { name: "Dust Particles", cat: "Overlays", hue: "from-zinc-600 to-zinc-800" },
  { name: "Color Pop", cat: "Filters", hue: "from-pink-600 to-rose-800" },
  { name: "Whip Pan", cat: "Transitions", hue: "from-amber-600 to-red-800" },
  { name: "Moody Greens", cat: "Color LUTs", hue: "from-emerald-800 to-teal-950" },
  { name: "Snow Drift", cat: "Particles", hue: "from-sky-300 to-blue-700" },
  { name: "RGB Split", cat: "Glitch", hue: "from-red-600 to-blue-800" },
  { name: "Lens Flare 70s", cat: "Lens Effects", hue: "from-yellow-500 to-orange-700" },
];

function EffectsPage() {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? effects : effects.filter(e => e.cat === cat);
  return (
    <AppShell>
      <PageHeader
        crumb={["Studio", "Video Effects"]}
        title="Video Effects Library"
        subtitle="A growing collection of cinematic LUTs, overlays and motion effects."
        actions={<><GhostButton><Download className="w-4 h-4" /> Import .cube</GhostButton></>}
      />

      <div className="flex gap-5">
        <aside className="w-56 shrink-0">
          <div className="rounded-2xl bg-card border border-border p-2 sticky top-[88px] shadow-card">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`w-full text-left px-3 py-2 rounded-xl text-[12.5px] font-semibold flex items-center justify-between transition ${cat === c ? "bg-accent text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
                {c}
                <span className="text-[10px]">{c === "All" ? effects.length : effects.filter(e => e.cat === c).length}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search effects, LUTs, overlays…" className="!pl-10" />
            </div>
            <GhostButton><Sparkles className="w-4 h-4" /> AI Suggest</GhostButton>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {list.map(e => (
              <div key={e.name} className="group rounded-2xl bg-card border border-border p-2.5 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition cursor-pointer">
                <div className={`relative aspect-video rounded-xl bg-gradient-to-br ${e.hue} overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.2),transparent_60%)]" />
                  <div className="absolute top-2 left-2 flex gap-1">{e.pro && <Pill tone="primary">PRO</Pill>}</div>
                  <button className="absolute top-2 right-2 w-7 h-7 rounded-md bg-black/30 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition"><Star className="w-3.5 h-3.5 text-white" /></button>
                </div>
                <div className="px-1 pt-3 pb-1 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold truncate">{e.name}</div>
                    <div className="text-[10.5px] text-muted-foreground">{e.cat}</div>
                  </div>
                  <button className="px-2.5 h-7 rounded-md bg-brand-gradient text-white text-[11px] font-bold shadow-brand">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
