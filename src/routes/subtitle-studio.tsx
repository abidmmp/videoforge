import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, SectionCard, Field, Input, Select, Slider, Toggle, GhostButton, PrimaryButton, Pill } from "@/components/app-shell";
import { Type, Sparkles, Save, Download, Palette } from "lucide-react";

export const Route = createFileRoute("/subtitle-studio")({
  head: () => ({ meta: [{ title: "Subtitle Studio — VideoForge AI" }] }),
  component: () => (
    <AppShell>
      <PageHeader
        crumb={["Studio", "Subtitle Studio"]}
        title="Subtitle Studio"
        subtitle="Design captions that pop. Every property is live-previewed."
        actions={<><GhostButton><Save className="w-4 h-4" /> Save Preset</GhostButton><PrimaryButton><Download className="w-4 h-4" /> Apply</PrimaryButton></>}
      />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7 space-y-5">
          <SectionCard title="Templates" subtitle="Pre-designed subtitle styles" right={<Pill tone="primary">12 templates</Pill>}>
            <div className="grid grid-cols-4 gap-3 pt-4">
              {[
                { n: "Bold Center", bg: "from-emerald-700 to-emerald-900" },
                { n: "TikTok Pop", bg: "from-pink-600 to-rose-800" },
                { n: "Cinematic", bg: "from-stone-700 to-stone-900" },
                { n: "Karaoke", bg: "from-violet-700 to-indigo-900" },
                { n: "Glass", bg: "from-slate-600 to-slate-800" },
                { n: "Neon", bg: "from-fuchsia-600 to-purple-800" },
                { n: "Minimal", bg: "from-zinc-700 to-zinc-900" },
                { n: "Comic", bg: "from-yellow-500 to-orange-700" },
              ].map((t, i) => (
                <button key={t.n} className={`relative rounded-xl aspect-[4/3] bg-gradient-to-br ${t.bg} border ${i === 0 ? "border-primary ring-2 ring-primary/30" : "border-transparent"} grid place-items-end p-2.5 group`}>
                  <span className="block w-full text-center text-white text-[11px] font-extrabold bg-black/30 backdrop-blur py-1 rounded">{t.n.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Fonts">
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Field label="Font family"><Select><option>Plus Jakarta Sans</option><option>Inter</option><option>Bebas Neue</option><option>Montserrat</option><option>Oswald</option><option>Roboto</option></Select></Field>
              <Field label="Weight"><Select><option>Extra Bold (800)</option><option>Bold (700)</option><option>Semi Bold (600)</option></Select></Field>
              <Field label="Size"><Slider value={60} /></Field>
              <Field label="Letter spacing"><Slider value={45} /></Field>
              <Field label="Line height"><Slider value={55} /></Field>
              <Field label="Text case"><Select><option>Sentence case</option><option>UPPERCASE</option><option>lowercase</option></Select></Field>
            </div>
          </SectionCard>

          <div className="grid grid-cols-2 gap-5">
            <SectionCard title="Stroke">
              <div className="pt-4 space-y-3">
                <Field label="Stroke color"><Input type="color" defaultValue="#000000" className="!p-1 !h-10" /></Field>
                <Field label="Width"><Slider value={40} /></Field>
              </div>
            </SectionCard>
            <SectionCard title="Shadow">
              <div className="pt-4 space-y-3">
                <Field label="Shadow color"><Input type="color" defaultValue="#000000" className="!p-1 !h-10" /></Field>
                <Field label="Blur"><Slider value={30} /></Field>
                <Field label="Offset"><Slider value={20} /></Field>
              </div>
            </SectionCard>
            <SectionCard title="Glow">
              <div className="pt-4 space-y-3">
                <Field label="Glow color"><Input type="color" defaultValue="#227850" className="!p-1 !h-10" /></Field>
                <Field label="Intensity"><Slider value={50} /></Field>
                <div className="flex items-center justify-between py-1"><span className="text-[12.5px] font-medium">Enable glow</span><Toggle /></div>
              </div>
            </SectionCard>
            <SectionCard title="Background">
              <div className="pt-4 space-y-3">
                <Field label="Style"><Select><option>None</option><option>Solid</option><option>Glass</option><option>Gradient</option></Select></Field>
                <Field label="Color"><Input type="color" defaultValue="#000000" className="!p-1 !h-10" /></Field>
                <Field label="Opacity"><Slider value={40} /></Field>
              </div>
            </SectionCard>
            <SectionCard title="Padding">
              <div className="pt-4 space-y-3">
                <Field label="Horizontal"><Slider value={35} /></Field>
                <Field label="Vertical"><Slider value={25} /></Field>
              </div>
            </SectionCard>
            <SectionCard title="Spacing & Corners">
              <div className="pt-4 space-y-3">
                <Field label="Word spacing"><Slider value={30} /></Field>
                <Field label="Corner radius"><Slider value={50} /></Field>
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Animations">
            <div className="grid grid-cols-4 gap-3 pt-4">
              {["None", "Pop", "Karaoke", "Bounce", "Slide Up", "Typewriter", "Word-by-word", "Wave"].map((a, i) => (
                <button key={a} className={`p-3 rounded-xl border ${i === 1 ? "border-primary bg-accent/40" : "border-border hover:border-primary/30"} text-[12.5px] font-semibold transition`}>{a}</button>
              ))}
            </div>
          </SectionCard>

          <div className="grid grid-cols-3 gap-5">
            <SectionCard title="Color Presets" right={<Palette className="w-4 h-4 text-muted-foreground" />}>
              <div className="grid grid-cols-4 gap-2 pt-4">
                {["#ffffff", "#fbbf24", "#22d3ee", "#f43f5e", "#a3e635", "#227850", "#1e293b", "#f97316"].map(c => (
                  <button key={c} className="aspect-square rounded-lg border border-border hover:scale-110 transition" style={{ background: c }} />
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Text Presets">
              <div className="pt-4 space-y-2">
                {["Hook Style", "Caption Style", "Quote Style"].map(t => (
                  <button key={t} className="w-full text-left px-3 py-2 rounded-lg text-[12.5px] font-medium border border-border hover:border-primary/30">{t}</button>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Opacity">
              <div className="pt-4 space-y-3">
                <Field label="Text"><Slider value={100} /></Field>
                <Field label="Background"><Slider value={70} /></Field>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="col-span-5">
          <div className="sticky top-[88px]">
            <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-[15px]">Live Subtitle Preview</h3>
                <Pill tone="primary"><Type className="w-3 h-3" /> Live</Pill>
              </div>
              <div className="relative aspect-[9/16] rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.2),transparent_60%)]" />
                <div className="absolute inset-0 grid place-items-center px-4">
                  <div className="text-center">
                    <div className="inline-block px-5 py-3 rounded-xl bg-black/45 backdrop-blur text-white font-display font-extrabold text-[28px] leading-tight tracking-tight" style={{ textShadow: "0 0 30px rgba(34,120,80,0.6)" }}>
                      Most CEOs don't owe<br />success to <span className="text-emerald-300">luck</span>.
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["Hook", "Body", "CTA"].map((t, i) => (
                  <button key={t} className={`py-2 rounded-lg text-[11.5px] font-bold ${i === 0 ? "bg-brand-gradient text-white" : "bg-secondary text-muted-foreground"}`}>{t}</button>
                ))}
              </div>
              <button className="mt-3 w-full h-10 rounded-xl border border-dashed border-border text-[12px] font-semibold text-muted-foreground hover:border-primary/30 hover:text-primary flex items-center justify-center gap-2"><Sparkles className="w-3.5 h-3.5" /> Apply AI Auto-Style</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  ),
});
