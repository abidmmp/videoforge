import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["General", "Notifications"]}
      title="Notification Center"
      subtitle="All system, render and API notifications in one place."
      description="A dedicated notification history with filtering and replay. Use the bell icon in the top bar for live alerts."
      icon={Bell}
    />
  ),
});
