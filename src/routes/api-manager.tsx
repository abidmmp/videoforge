import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, GhostButton, PrimaryButton } from "@/components/app-shell";
import { RefreshCw, Plus } from "lucide-react";
import {
  ApiSummaryCards,
  ApiGroupSection,
  TTS_APIS,
  FUTURE_APIS,
  type Api,
} from "@/components/api-manager-shared";

export const Route = createFileRoute("/api-manager")({
  head: () => ({ meta: [{ title: "API Manager — VideoForge AI" }] }),
  component: APIPage,
});

const LLM_APIS: Api[] = [
  { name: "OpenAI", cat: "LLM", status: "connected", quota: "10M tokens / mo", remaining: "7.2M", rt: "182ms", key: "sk-•••aHb2k" },
  { name: "Anthropic Claude", cat: "LLM", status: "connected", quota: "5M tokens / mo", remaining: "3.4M", rt: "210ms", key: "sk-ant-•••a8f" },
  { name: "Google Gemini", cat: "LLM", status: "disconnected", quota: "—", remaining: "—", rt: "—" },
  { name: "Local Ollama", cat: "LLM", status: "connected", quota: "Unlimited", remaining: "—", rt: "44ms" },
];

const STOCK_APIS: Api[] = [
  { name: "Pexels", cat: "Stock", status: "connected", quota: "200 req / hr", remaining: "184", rt: "92ms", key: "•••2k4p" },
  { name: "Pixabay", cat: "Stock", status: "connected", quota: "5k req / day", remaining: "4.6k", rt: "108ms", key: "•••f8q" },
  { name: "Coverr", cat: "Stock", status: "disconnected", quota: "—", remaining: "—", rt: "—" },
];

const groups = [
  { title: "LLM APIs", sub: "Script generation engines", items: LLM_APIS },
  { title: "Stock Video APIs", sub: "B-roll providers", items: STOCK_APIS },
  { title: "TTS APIs", sub: "Voice synthesis", items: TTS_APIS },
  { title: "Future APIs", sub: "Planned integrations — not yet enabled", items: FUTURE_APIS },
];

function APIPage() {
  return (
    <AppShell>
      <PageHeader
        crumb={["General", "API Manager"]}
        title="API Manager"
        subtitle="Connect, monitor and rotate the keys that power your video pipeline."
        actions={
          <>
            <GhostButton>
              <RefreshCw className="w-4 h-4" /> Test All
            </GhostButton>
            <PrimaryButton>
              <Plus className="w-4 h-4" /> Add Custom API
            </PrimaryButton>
          </>
        }
      />

      <ApiSummaryCards />

      <div className="space-y-5">
        {groups.map((g) => (
          <ApiGroupSection key={g.title} title={g.title} sub={g.sub} items={g.items} />
        ))}
      </div>
    </AppShell>
  );
}
