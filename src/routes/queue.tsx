import { createFileRoute } from "@tanstack/react-router";
import { ListVideo } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/queue")({
  head: () => ({ meta: [{ title: "Render Queue — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Studio", "Render Queue"]}
      title="Render Queue"
      subtitle="Pause, cancel, reorder and inspect every render task."
      description="Wired to the MoneyPrinterTurbo render pipeline in Phase 7. For now, see live status on the Dashboard."
      icon={ListVideo}
    />
  ),
});
