import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/usage")({
  head: () => ({ meta: [{ title: "Usage — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Usage"]}
      title="Usage & Quota"
      subtitle="Track render minutes, API calls and storage."
      description="Realtime usage dashboards arrive in a future release once metering is wired to the rendering backend."
      icon={Gauge}
    />
  ),
});
