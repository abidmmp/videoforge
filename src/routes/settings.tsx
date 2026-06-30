import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, Field, Input, Select, Toggle, Slider, GhostButton, PrimaryButton, Pill } from "@/components/app-shell";
import { Settings as SettingsIcon, Cpu, HardDrive, Zap, Code2, RefreshCw, Save, Bell } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — VideoForge AI" }] }),
  component: SettingsPage,
});

// General application preferences only — API configuration lives in /basic-settings,
// key management in /api-manager, and render defaults in /render-settings. Video/voice/
// subtitle preferences live in their respective studios.
const tabs = [
  { k: "general",       l: "General",       icon: SettingsIcon },
  { k: "performance",   l: "Performance",   icon: Zap },
  { k: "gpu",           l: "GPU",           icon: Cpu },
  { k: "storage",       l: "Storage",       icon: HardDrive },
  { k: "notifications", l: "Notifications", icon: Bell },
  { k: "updates",       l: "Updates",       icon: RefreshCw },
  { k: "developer",     l: "Developer",     icon: Code2 },
];

function SettingsPage() {
  const [tab, setTab] = useState("general");
  return (
    <AppShell>
      <PageHeader
        crumb={["General", "Settings"]}
        title="Settings"
        subtitle="Tune every aspect of how VideoForge generates and renders your videos."
        actions={<><GhostButton>Discard</GhostButton><PrimaryButton><Save className="w-4 h-4" /> Save Settings</PrimaryButton></>}
      />

      <div className="flex gap-5">
        <aside className="w-60 shrink-0">
          <div className="rounded-2xl bg-card border border-border p-2 sticky top-[88px] shadow-card">
            {tabs.map(t => (
              <button key={t.k} onClick={() => setTab(t.k)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition ${tab === t.k ? "bg-accent text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
                <t.icon className="w-4 h-4" />
                <span>{t.l}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0 space-y-5">
          {tab === "general" && <Group title="General" sub="Workspace name, defaults and behavior">
            <Field label="Workspace name"><Input defaultValue="Abid's Studio" /></Field>
            <Field label="Default project location"><Input defaultValue="C:\\VideoForge\\Projects" /></Field>
            <Field label="Theme"><Select><option>System</option><option>Light</option><option>Dark</option></Select></Field>
            <Row label="Start with last project"><Toggle checked /></Row>
            <Row label="Send anonymous usage analytics"><Toggle /></Row>
            <Row label="Show keyboard shortcuts on hover"><Toggle checked /></Row>
          </Group>}

          {tab === "video" && <Group title="Video Defaults" sub="Defaults applied to every new project">
            <Field label="Default aspect ratio"><Select><option>9:16 Vertical</option><option>16:9 Horizontal</option><option>1:1 Square</option></Select></Field>
            <Field label="Default resolution"><Select><option>1080p</option><option>1440p</option><option>2160p (4K)</option></Select></Field>
            <Field label="Default frame rate"><Select><option>30 fps</option><option>60 fps</option><option>24 fps</option></Select></Field>
            <Field label="Default clip length / scene"><Input type="number" defaultValue={5} /></Field>
          </Group>}

          {tab === "voice" && <Group title="Voice Defaults">
            <Field label="Default provider"><Select><option>ElevenLabs</option><option>Azure</option><option>OpenAI</option><option>Edge TTS</option></Select></Field>
            <Field label="Default voice"><Select><option>Adam — Narrator</option><option>Sarah — Conversational</option></Select></Field>
            <Field label="Default speed"><Slider value={50} /></Field>
            <Row label="Cache generated voices locally"><Toggle checked /></Row>
          </Group>}

          {tab === "subtitle" && <Group title="Subtitle Defaults">
            <Field label="Default style preset"><Select><option>Bold Center</option><option>TikTok Pop</option><option>Cinematic</option></Select></Field>
            <Field label="Speech-to-text model"><Select><option>Whisper Large v3</option><option>Whisper Medium</option><option>Deepgram</option></Select></Field>
            <Row label="Auto-burn subtitles into video"><Toggle checked /></Row>
            <Row label="Export .srt sidecar file"><Toggle checked /></Row>
          </Group>}

          {tab === "performance" && <Group title="Performance">
            <Field label="Worker threads"><Slider value={70} /></Field>
            <Field label="Memory cap (GB)"><Input type="number" defaultValue={16} /></Field>
            <Field label="Concurrent renders"><Select><option>1</option><option>2</option><option>3</option></Select></Field>
            <Row label="Background rendering"><Toggle checked /></Row>
            <Row label="Low-power mode when on battery"><Toggle /></Row>
          </Group>}

          {tab === "storage" && <Group title="Storage" sub="Project, cache and asset folders">
            <Field label="Projects folder"><Input defaultValue="C:\\VideoForge\\Projects" /></Field>
            <Field label="Outputs folder"><Input defaultValue="C:\\VideoForge\\Outputs" /></Field>
            <Field label="Cache folder"><Input defaultValue="C:\\VideoForge\\Cache" /></Field>
            <Field label="Cache size limit (GB)"><Slider value={30} /></Field>
            <div className="flex gap-2 pt-2"><GhostButton className="!h-9 !text-[12px]">Clear cache (12.4 GB)</GhostButton></div>
          </Group>}

          {tab === "gpu" && <Group title="GPU" sub="Hardware acceleration & device selection">
            <Field label="GPU device"><Select><option>NVIDIA RTX 4090 (24 GB)</option><option>NVIDIA RTX 4080</option><option>CPU only</option></Select></Field>
            <Field label="CUDA version"><Input defaultValue="12.4" disabled /></Field>
            <Field label="Driver"><Input defaultValue="555.42.06" disabled /></Field>
            <Row label="Allow GPU during preview"><Toggle checked /></Row>
            <div className="rounded-xl bg-success/10 border border-success/20 p-3 text-[12px] font-medium text-success flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> GPU acceleration is active.</div>
          </Group>}

          {tab === "updates" && <Group title="Updates">
            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-primary/15">
              <div>
                <div className="font-display font-bold text-[14px]">VideoForge v1.0.0</div>
                <div className="text-[11.5px] text-muted-foreground mt-0.5">You're on the latest version.</div>
              </div>
              <Pill tone="success">Up to date</Pill>
            </div>
            <Row label="Auto-install updates"><Toggle checked /></Row>
            <Row label="Beta channel"><Toggle /></Row>
            <Field label="Check frequency"><Select><option>Daily</option><option>Weekly</option><option>Manual</option></Select></Field>
          </Group>}

          {tab === "advanced" && <Group title="Advanced" sub="Power user options">
            <Field label="FFmpeg path"><Input defaultValue="/usr/local/bin/ffmpeg" /></Field>
            <Field label="Python interpreter"><Input defaultValue="C:\\Python311\\python.exe" /></Field>
            <Row label="Verbose pipeline logs"><Toggle /></Row>
            <Row label="Use experimental features"><Toggle /></Row>
            <Row label="Allow custom plugins"><Toggle checked /></Row>
          </Group>}

          {tab === "developer" && <Group title="Developer">
            <Row label="Show developer tools in app"><Toggle /></Row>
            <Row label="Enable raw API response inspector"><Toggle /></Row>
            <Field label="Backend URL"><Input defaultValue="http://127.0.0.1:8501" /></Field>
            <Field label="Webhook URL"><Input placeholder="https://…" /></Field>
          </Group>}
        </div>
      </div>
    </AppShell>
  );
}

function Group({ title, sub, children }: any) {
  return (
    <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
      <div className="mb-5">
        <h3 className="font-display font-bold text-[18px]">{title}</h3>
        {sub && <p className="text-[12.5px] text-muted-foreground mt-1">{sub}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ label, children }: any) {
  return <div className="flex items-center justify-between py-1.5 border-t border-border/50 first:border-t-0 pt-3 first:pt-0"><span className="text-[13px] font-medium">{label}</span>{children}</div>;
}
