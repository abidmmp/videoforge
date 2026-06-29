import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Subscription — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Subscription"]}
      title="Subscription"
      subtitle="Plan, seats and renewal preferences."
      description="Upgrade or change your VideoForge plan. Available once your workspace is connected to the rendering backend."
      icon={Receipt}
    />
  ),
});
