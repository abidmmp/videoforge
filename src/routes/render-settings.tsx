import { createFileRoute } from "@tanstack/react-router";
import {
  AppShell,
  PageHeader,
  Field,
  Select,
  Toggle,
  Slider,
  GhostButton,
  PrimaryButton,
} from "@/components/app-shell";
import { Save } from "lucide-react";
import { Group, Row } from "@/routes/settings";

export const Route = createFileRoute("/render-settings")({
  head: () => ({ meta: [{ title: "Render Settings — VideoForge AI" }] }),
  component: RenderSettingsPage,
});

function RenderSettingsPage() {
  return (
    <AppShell>
      <PageHeader
        crumb={["General", "Render Settings"]}
        title="Render Settings"
        subtitle="Default render preset applied to every new video."
        actions={
          <>
            <GhostButton>Discard</GhostButton>
            <PrimaryButton>
              <Save className="w-4 h-4" /> Save Settings
            </PrimaryButton>
          </>
        }
      />

      <div className="max-w-3xl">
        <Group title="Rendering" sub="Default render preset">
          <Field label="Encoder">
            <Select>
              <option>H.264 NVENC (GPU)</option>
              <option>H.264 CPU</option>
              <option>HEVC</option>
              <option>AV1</option>
            </Select>
          </Field>
          <Field label="Quality preset">
            <Select>
              <option>Balanced</option>
              <option>Maximum quality</option>
              <option>Fast preview</option>
            </Select>
          </Field>
          <Field label="Bitrate target (Mbps)">
            <Slider value={60} />
          </Field>
          <Row label="Two-pass encoding">
            <Toggle />
          </Row>
          <Row label="Hardware acceleration">
            <Toggle checked />
          </Row>
          <Row label="Delete temp files after success">
            <Toggle checked />
          </Row>
        </Group>
      </div>
    </AppShell>
  );
}

// keep icon import referenced for parity with sidebar entry
void Sparkles;
