import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, GhostButton, Pill, Input } from "@/components/app-shell";
import { StudioRedirectBanner } from "@/components/shared";
import { Search, Play, Heart, Sparkles, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/voices")({
  head: () => ({ meta: [{ title: "Voices — VideoForge AI" }] }),
  component: VoicesPage,
});

const filters = ["All", "Recommended", "Favorites", "English", "Spanish", "French", "Arabic", "Premium", "Free"];

const voices = [
  { name: "Adam", desc: "Deep narrator · documentary", lang: "English (US)", gender: "M", quality: "Ultra HD", fav: true, rec: true, color: "from-emerald-700 to-emerald-900" },
  { name: "Sarah", desc: "Warm conversational", lang: "English (US)", gender: "F", quality: "HD", rec: true, color: "from-rose-700 to-pink-900" },
  { name: "David", desc: "British documentary", lang: "English (UK)", gender: "M", quality: "Ultra HD", color: "from-indigo-700 to-purple-900" },
  { name: "Sofia", desc: "Madrid · expressive", lang: "Spanish (ES)", gender: "F", quality: "HD", color: "from-amber-700 to-orange-900" },
  { name: "Hiroshi", desc: "Tokyo · calm tone", lang: "Japanese", gender: "M", quality: "Ultra HD", color: "from-violet-700 to-fuchsia-900" },
  { name: "Amira", desc: "Cairo · news anchor", lang: "Arabic", gender: "F", quality: "HD", rec: true, color: "from-cyan-700 to-teal-900" },
  { name: "Luca", desc: "Italian · cinematic", lang: "Italian", gender: "M", quality: "Ultra HD", color: "from-red-700 to-orange-900" },
  { name: "Mei", desc: "Mandarin · friendly", lang: "Chinese", gender: "F", quality: "HD", color: "from-pink-600 to-rose-800" },
  { name: "Nora", desc: "Storyteller · soft", lang: "English (US)", gender: "F", quality: "HD", fav: true, color: "from-stone-700 to-stone-900" },
  { name: "Marcus", desc: "Authoritative · trailer", lang: "English (US)", gender: "M", quality: "Ultra HD", color: "from-zinc-700 to-zinc-900" },
];

function VoicesPage() {
  const [f, setF] = useState("All");
  return (
    <AppShell>
      <PageHeader
        crumb={["Studio", "Voices"]}
        title="Voice Browser"
        subtitle="120+ AI voices across 30 languages. Preview any voice before you commit."
        actions={<><GhostButton><Sparkles className="w-4 h-4" /> Clone My Voice</GhostButton></>}
      />
      <StudioRedirectBanner
        title="Looking for the full voice workflow?"
        description="Audio Studio is the source of truth for TTS, voice picking, controls, preview and BGM. This page is a quick library browser."
        to="/audio-studio"
        ctaLabel="Open Audio Studio"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map(x => (
          <button key={x} onClick={() => setF(x)} className={`px-3 h-9 rounded-xl text-[12px] font-semibold transition ${f === x ? "bg-brand-gradient text-white shadow-brand" : "bg-card border border-border text-muted-foreground hover:bg-secondary"}`}>{x}</button>
        ))}
        <div className="flex-1" />
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Search voices, accents, styles…" className="!h-9 !pl-9 !text-[12px]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {voices.map(v => (
          <div key={v.name} className="group rounded-3xl bg-card border border-border p-4 shadow-card hover:shadow-card-lg transition">
            <div className="flex items-start gap-3">
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} grid place-items-center text-white font-display font-extrabold text-[20px] shrink-0`}>
                {v.name[0]}
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-card grid place-items-center shadow"><Play className="w-3 h-3 text-primary ml-0.5" fill="currentColor" /></button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-display font-bold text-[15px] truncate">{v.name}</div>
                  {v.rec && <Pill tone="primary"><Star className="w-3 h-3" /> Recommended</Pill>}
                </div>
                <div className="text-[11.5px] text-muted-foreground truncate mt-0.5">{v.desc}</div>
                <div className="flex items-center gap-2 mt-2 text-[10.5px] text-muted-foreground">
                  <Pill tone="default">{v.lang}</Pill>
                  <Pill tone="default">{v.gender}</Pill>
                  <Pill tone={v.quality === "Ultra HD" ? "primary" : "default"}>{v.quality}</Pill>
                </div>
              </div>
              <button className={`w-8 h-8 rounded-lg grid place-items-center ${v.fav ? "text-rose-500 bg-rose-50" : "text-muted-foreground hover:bg-secondary"}`}><Heart className="w-3.5 h-3.5" fill={v.fav ? "currentColor" : "none"} /></button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-0.5 h-8">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className="flex-1 bg-brand-gradient rounded-full opacity-30" style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 70}%` }} />
                ))}
              </div>
              <button className="px-3 h-8 rounded-lg bg-brand-gradient text-white text-[11px] font-bold shadow-brand">Use</button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
