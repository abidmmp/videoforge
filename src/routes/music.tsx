import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, GhostButton, Pill, Input } from "@/components/app-shell";
import { StudioRedirectBanner } from "@/components/shared";
import { Search, Play, Heart, Upload, Music2 } from "lucide-react";

export const Route = createFileRoute("/music")({
  head: () => ({ meta: [{ title: "Music — VideoForge AI" }] }),
  component: () => (
    <AppShell>
      <PageHeader
        crumb={["Studio", "Music"]}
        title="Background Music"
        subtitle="Royalty-free tracks tuned for short-form and long-form video."
        actions={<><GhostButton><Upload className="w-4 h-4" /> Upload Track</GhostButton></>}
      />
      <StudioRedirectBanner
        title="Pick BGM inside Audio Studio for the live mix"
        description="This page is a track library. Volume, fade, loop, trim and waveform preview live in Audio Studio."
        to="/audio-studio"
        ctaLabel="Open Audio Studio"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Cinematic", "Lo-fi", "Epic", "Calm", "Energetic", "Corporate", "Hip-hop", "Ambient"].map((g, i) => (
          <button key={g} className={`px-3 h-9 rounded-xl text-[12px] font-semibold transition ${i === 0 ? "bg-brand-gradient text-white shadow-brand" : "bg-card border border-border text-muted-foreground hover:bg-secondary"}`}>{g}</button>
        ))}
        <div className="flex-1" />
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Search by mood, BPM, instrument…" className="!h-9 !pl-9 !text-[12px]" />
        </div>
      </div>

      <div className="rounded-3xl bg-card border border-border shadow-card overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
          <div className="col-span-1"></div><div className="col-span-4">Track</div><div className="col-span-2">Mood</div><div className="col-span-1">BPM</div><div className="col-span-2">Waveform</div><div className="col-span-1">Length</div><div className="col-span-1 text-right">Actions</div>
        </div>
        {[
          { n: "Cinematic Ambient — Glow", g: "Cinematic", bpm: 82, len: "2:48", c: "from-emerald-700 to-emerald-900" },
          { n: "Lo-fi Beats — Focus", g: "Lo-fi", bpm: 96, len: "3:12", c: "from-violet-700 to-indigo-900" },
          { n: "Epic Build — Rise", g: "Epic", bpm: 128, len: "2:24", c: "from-orange-600 to-rose-800" },
          { n: "Soft Piano — Dawn", g: "Calm", bpm: 64, len: "4:02", c: "from-cyan-700 to-blue-900" },
          { n: "Energy Pulse", g: "Energetic", bpm: 140, len: "2:18", c: "from-pink-600 to-rose-800" },
          { n: "Corporate Bright", g: "Corporate", bpm: 110, len: "2:52", c: "from-stone-700 to-stone-900" },
          { n: "Trap Beat — Night", g: "Hip-hop", bpm: 88, len: "2:36", c: "from-zinc-700 to-zinc-900" },
        ].map((t, i) => (
          <div key={i} className="grid grid-cols-12 px-5 py-3 items-center border-b border-border/50 hover:bg-secondary/30 transition group">
            <div className="col-span-1"><button className="w-9 h-9 rounded-full bg-brand-gradient text-white grid place-items-center shadow-brand opacity-0 group-hover:opacity-100 transition"><Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" /></button></div>
            <div className="col-span-4 flex items-center gap-3"><div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.c} grid place-items-center`}><Music2 className="w-4 h-4 text-white" /></div><div className="text-[13px] font-semibold truncate">{t.n}</div></div>
            <div className="col-span-2"><Pill tone="default">{t.g}</Pill></div>
            <div className="col-span-1 text-[12px] tabular-nums font-semibold">{t.bpm}</div>
            <div className="col-span-2 flex items-center gap-0.5 h-6">{Array.from({ length: 22 }).map((_, j) => <div key={j} className="flex-1 bg-brand-gradient/40 rounded-full" style={{ height: `${20 + Math.abs(Math.sin(j * 0.8)) * 80}%` }} />)}</div>
            <div className="col-span-1 text-[12px] text-muted-foreground tabular-nums">{t.len}</div>
            <div className="col-span-1 flex justify-end gap-1"><button className="w-7 h-7 rounded-lg hover:bg-secondary grid place-items-center"><Heart className="w-3.5 h-3.5" /></button></div>
          </div>
        ))}
      </div>
    </AppShell>
  ),
});
