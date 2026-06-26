import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, SectionCard, Field, Input, Textarea, Select, Toggle, PrimaryButton, GhostButton, Pill, Slider } from "@/components/app-shell";
import { Wand2, Sparkles, Play, Download, Eye, RefreshCw, Save, Music2, Mic2, Subtitles, Film, Layers, Cpu, Gauge } from "lucide-react";

export const Route = createFileRoute("/create")({
  head: () => ({ meta: [{ title: "Create Video — VideoForge AI" }, { name: "description", content: "Generate an AI video end-to-end." }] }),
  component: CreatePage,
});

function CreatePage() {
  return (
    <AppShell>
      <PageHeader
        crumb={["Studio", "Create Video"]}
        title="Create New Video"
        subtitle="From a single idea to a finished, voiced, captioned video — all in one pipeline."
        actions={<>
          <GhostButton><Save className="w-4 h-4" /> Save Draft</GhostButton>
          <PrimaryButton><Wand2 className="w-4 h-4" /> Generate Video</PrimaryButton>
        </>}
      />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8 space-y-5">
          <SectionCard title="Video Subject" subtitle="What is your video about?" right={<Pill tone="primary">Step 1</Pill>}>
            <div className="space-y-4 pt-4">
              <Field label="Topic / Subject" hint="A clear sentence works best. The AI uses this to draft the script.">
                <Input placeholder="e.g. Morning habits of highly successful CEOs" defaultValue="Morning habits of highly successful CEOs" />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Tone"><Select defaultValue="inspiring"><option>Inspiring</option><option>Educational</option><option>Funny</option><option>Dramatic</option></Select></Field>
                <Field label="Audience"><Select><option>General</option><option>Entrepreneurs</option><option>Students</option><option>Developers</option></Select></Field>
                <Field label="Platform"><Select><option>YouTube Shorts</option><option>TikTok</option><option>Instagram Reels</option><option>Long-form YouTube</option></Select></Field>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Script Generation" subtitle="Generate or paste your script" right={<Pill tone="primary">AI</Pill>}>
            <div className="pt-4 grid grid-cols-3 gap-3">
              <Field label="LLM Provider"><Select><option>OpenAI GPT-4o</option><option>Claude 3.5 Sonnet</option><option>Gemini 1.5 Pro</option><option>Local Ollama</option></Select></Field>
              <Field label="Language"><Select><option>English (US)</option><option>Spanish</option><option>French</option><option>Arabic</option></Select></Field>
              <Field label="Words"><Select><option>60 (Short)</option><option>120 (Medium)</option><option>240 (Long)</option></Select></Field>
            </div>
            <div className="flex gap-2 mt-4">
              <PrimaryButton><Sparkles className="w-4 h-4" /> Generate Script</PrimaryButton>
              <GhostButton><RefreshCw className="w-4 h-4" /> Regenerate</GhostButton>
            </div>
          </SectionCard>

          <SectionCard title="Advanced Script Settings" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Field label="Temperature" hint="Higher = more creative"><Slider value={70} /></Field>
              <Field label="Max Tokens"><Input type="number" defaultValue={400} /></Field>
              <Field label="System Prompt"><Textarea rows={3} placeholder="You are a viral YouTube scriptwriter…" /></Field>
              <div className="space-y-3">
                <Row label="Hook in first 3 seconds"><Toggle checked /></Row>
                <Row label="Add CTA at end"><Toggle checked /></Row>
                <Row label="SEO-optimized phrasing"><Toggle /></Row>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Generated Script" subtitle="Editable — your changes are saved automatically">
            <Textarea
              rows={8}
              className="mt-4 font-mono text-[12.5px] leading-relaxed"
              defaultValue={`Most CEOs don't owe their success to luck — they owe it to the first 90 minutes of their day.\n\nTim Cook is up at 4am. Jeff Bezos protects his mornings for "high-IQ" decisions. And Sara Blakely journals before she speaks to anyone.\n\nHere's the truth no one tells you…`}
            />
            <div className="flex items-center justify-between mt-3 text-[11.5px] text-muted-foreground">
              <span>248 words · ~ 1m 32s narration</span>
              <span className="flex gap-2"><GhostButton className="!h-8 !px-3 !text-[11.5px]"><RefreshCw className="w-3.5 h-3.5" /> Regenerate</GhostButton></span>
            </div>
          </SectionCard>

          <SectionCard title="Keyword Generation" subtitle="Keywords drive your visual b-roll search">
            <div className="grid grid-cols-3 gap-3 pt-4">
              <Field label="Keywords per scene"><Input type="number" defaultValue={3} /></Field>
              <Field label="Style"><Select><option>Cinematic</option><option>Documentary</option><option>Vlog</option><option>Abstract</option></Select></Field>
              <Field label="Diversity" hint="Variation between scenes"><Slider value={60} /></Field>
            </div>
            <PrimaryButton className="mt-4"><Sparkles className="w-4 h-4" /> Generate Keywords</PrimaryButton>
          </SectionCard>

          <SectionCard title="Generated Keywords" subtitle="Click to remove · Drag to reorder">
            <div className="flex flex-wrap gap-2 pt-4">
              {["sunrise office", "executive desk", "luxury watch", "morning coffee", "ceo meeting", "city skyline dawn", "running shoes", "journal writing", "tim cook", "private gym", "smartphone alarm", "boardroom"].map(k => (
                <span key={k} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/50 border border-primary/15 text-[12px] font-medium text-primary hover:bg-accent transition cursor-pointer">
                  {k} <span className="text-primary/50">×</span>
                </span>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Video Source" subtitle="Where should the b-roll come from?">
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[
                { name: "Pexels", status: "connected", count: "Unlimited" },
                { name: "Pixabay", status: "connected", count: "Unlimited" },
                { name: "Coverr", status: "disconnected", count: "—" },
                { name: "Local folder", status: "connected", count: "284 clips" },
              ].map(s => (
                <label key={s.name} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 cursor-pointer transition">
                  <input type="checkbox" defaultChecked={s.status === "connected"} className="accent-[#227850] w-4 h-4" />
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.count}</div>
                  </div>
                  <Pill tone={s.status === "connected" ? "success" : "default"}>{s.status}</Pill>
                </label>
              ))}
            </div>
          </SectionCard>

          <div className="grid grid-cols-2 gap-5">
            <SectionCard title="Aspect Ratio">
              <div className="grid grid-cols-3 gap-2 pt-4">
                {[{ l: "9:16", w: 32, h: 56 }, { l: "1:1", w: 48, h: 48 }, { l: "16:9", w: 64, h: 36 }].map((a, i) => (
                  <button key={a.l} className={`p-3 rounded-xl border ${i === 0 ? "border-primary bg-accent/40" : "border-border hover:border-primary/30"} transition flex flex-col items-center gap-2`}>
                    <div className="bg-brand-gradient rounded-md" style={{ width: a.w, height: a.h }} />
                    <span className="text-[11px] font-bold">{a.l}</span>
                  </button>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Transitions">
              <Field label="Transition style"><Select><option>Smart cuts</option><option>Crossfade</option><option>Slide</option><option>Zoom</option><option>None</option></Select></Field>
              <Field label="Duration (sec)"><Slider value={40} /></Field>
            </SectionCard>
          </div>

          <SectionCard title="Video Length & Encoder">
            <div className="grid grid-cols-3 gap-3 pt-4">
              <Field label="Clip length / scene"><Select><option>3 sec</option><option>5 sec</option><option>7 sec</option></Select></Field>
              <Field label="Max video length"><Select><option>60 sec</option><option>90 sec</option><option>3 min</option><option>10 min</option></Select></Field>
              <Field label="Encoder"><Select><option>H.264 (CPU)</option><option>H.264 NVENC (GPU)</option><option>H.265 / HEVC</option><option>AV1</option></Select></Field>
              <Field label="Resolution"><Select><option>1080p</option><option>1440p</option><option>2160p (4K)</option></Select></Field>
              <Field label="Frame rate"><Select><option>30 fps</option><option>60 fps</option></Select></Field>
              <Field label="Bitrate (Mbps)"><Input type="number" defaultValue={12} /></Field>
            </div>
          </SectionCard>

          <SectionCard title="Voice" right={<Pill tone="primary"><Mic2 className="w-3 h-3" /> 120+ voices</Pill>}>
            <div className="grid grid-cols-3 gap-3 pt-4">
              <Field label="Provider"><Select><option>ElevenLabs</option><option>Azure TTS</option><option>OpenAI TTS</option><option>Edge TTS</option></Select></Field>
              <Field label="Voice"><Select><option>Adam — Narrator (M)</option><option>Sarah — Conversational (F)</option><option>David — Documentary (M)</option></Select></Field>
              <Field label="Language"><Select><option>English (US)</option><option>English (UK)</option><option>Spanish</option></Select></Field>
              <Field label="Speed"><Slider value={50} /></Field>
              <Field label="Pitch"><Slider value={50} /></Field>
              <Field label="Volume"><Slider value={80} /></Field>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-primary"><Play className="w-3.5 h-3.5" fill="currentColor" /> Preview voice</button>
          </SectionCard>

          <SectionCard title="Background Music" right={<Music2 className="w-4 h-4 text-muted-foreground" />}>
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Field label="Track"><Select><option>Cinematic Ambient — Glow</option><option>Lo-fi Beats — Focus</option><option>Epic Build — Rise</option><option>None</option></Select></Field>
              <Field label="Mood"><Select><option>Inspirational</option><option>Calm</option><option>Energetic</option></Select></Field>
              <Field label="Music volume"><Slider value={25} /></Field>
              <Field label="Fade in / out (sec)"><Input type="number" defaultValue={2} /></Field>
            </div>
            <Row label="Duck under voice" className="mt-4"><Toggle checked /></Row>
          </SectionCard>

          <SectionCard title="Subtitle Settings" defaultOpen={false} right={<Subtitles className="w-4 h-4 text-muted-foreground" />}>
            <div className="grid grid-cols-3 gap-3 pt-4">
              <Field label="Font"><Select><option>Inter Bold</option><option>Plus Jakarta Sans</option><option>Bebas Neue</option></Select></Field>
              <Field label="Font size"><Input type="number" defaultValue={56} /></Field>
              <Field label="Position"><Select><option>Bottom Center</option><option>Top Center</option><option>Middle</option></Select></Field>
              <Field label="Color"><Input type="color" defaultValue="#ffffff" className="!p-1 !h-10" /></Field>
              <Field label="Stroke width"><Slider value={30} /></Field>
              <Field label="Highlight color"><Input type="color" defaultValue="#227850" className="!p-1 !h-10" /></Field>
            </div>
            <a href="/subtitle-studio" className="mt-3 inline-block text-[12px] font-semibold text-primary hover:underline">Open Subtitle Studio →</a>
          </SectionCard>

          <SectionCard title="Overlay Effects" defaultOpen={false} right={<Layers className="w-4 h-4 text-muted-foreground" />}>
            <div className="grid grid-cols-4 gap-2 pt-4">
              {["Film Grain", "Light Leak", "Particles", "Glitch", "Lens Flare", "Vignette", "Bokeh", "Dust"].map(e => (
                <label key={e} className="flex items-center gap-2 p-2.5 rounded-lg border border-border cursor-pointer hover:border-primary/30">
                  <input type="checkbox" className="accent-[#227850]" />
                  <span className="text-[12px] font-medium">{e}</span>
                </label>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Advanced Rendering" defaultOpen={false} right={<Cpu className="w-4 h-4 text-muted-foreground" />}>
            <div className="grid grid-cols-3 gap-3 pt-4">
              <Field label="Threads"><Input type="number" defaultValue={16} /></Field>
              <Field label="GPU device"><Select><option>RTX 4090</option><option>RTX 4080</option><option>CPU only</option></Select></Field>
              <Field label="Preset"><Select><option>Balanced</option><option>Quality</option><option>Fast</option></Select></Field>
              <Row label="Hardware acceleration" className="col-span-3"><Toggle checked /></Row>
              <Row label="Two-pass encoding" className="col-span-3"><Toggle /></Row>
              <Row label="Delete temp files on success" className="col-span-3"><Toggle checked /></Row>
            </div>
          </SectionCard>

          <div className="flex justify-end gap-2 pt-2">
            <GhostButton><Eye className="w-4 h-4" /> Dry Run</GhostButton>
            <PrimaryButton className="!h-12 !px-7 !text-[14px]"><Wand2 className="w-4 h-4" /> Generate Video</PrimaryButton>
          </div>
        </div>

        {/* Live Preview */}
        <div className="col-span-4 space-y-5">
          <div className="sticky top-[88px] space-y-5">
            <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-[15px]">Live Preview</h3>
                <Pill tone="primary"><Play className="w-3 h-3" /> 9:16</Pill>
              </div>
              <div className="relative aspect-[9/16] rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-950 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.2),transparent_60%)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 grid place-items-center shadow-lg cursor-pointer">
                    <Play className="w-5 h-5 text-primary ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur text-white text-[13px] font-bold">Most CEOs don't owe success to luck.</div>
                </div>
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-semibold">
                  <span className="bg-black/30 backdrop-blur px-2 py-0.5 rounded-md">Scene 4 / 9</span>
                  <span className="bg-black/30 backdrop-blur px-2 py-0.5 rounded-md">00:24 / 01:32</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <GhostButton className="!h-9 !text-[12px]"><Eye className="w-3.5 h-3.5" /> Preview</GhostButton>
                <GhostButton className="!h-9 !text-[12px]"><Download className="w-3.5 h-3.5" /> Export</GhostButton>
              </div>
            </div>

            <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-[15px]">Estimated Cost</h3>
                <Gauge className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2 text-[12.5px]">
                {[["Script (GPT-4o)", "$0.012"], ["Voice (ElevenLabs)", "$0.184"], ["B-roll (Pexels)", "Free"], ["Render (GPU local)", "—"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 font-display font-bold text-[16px]">
                  <span>Total</span><span className="text-primary">$0.196</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
              <h3 className="font-display font-bold text-[15px] mb-3">Render Queue</h3>
              <div className="space-y-2.5">
                {[
                  { t: "Top 10 AI Tools 2026", s: "Queued" },
                  { t: "Tokyo at Midnight", s: "Rendering" },
                ].map(q => (
                  <div key={q.t} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40">
                    <Film className="w-4 h-4 text-primary" />
                    <span className="flex-1 text-[12px] font-medium truncate">{q.t}</span>
                    <Pill tone={q.s === "Rendering" ? "primary" : "default"}>{q.s}</Pill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, children, className = "" }: any) {
  return (
    <div className={`flex items-center justify-between gap-3 py-2 ${className}`}>
      <span className="text-[12.5px] font-medium">{label}</span>
      {children}
    </div>
  );
}
