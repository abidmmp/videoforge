import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Profile"]}
      title="Profile"
      subtitle="Public profile, avatar and bio."
      description="Personal profile management arrives in a later phase. Use Account for current workspace settings."
      icon={User}
    />
  ),
});
