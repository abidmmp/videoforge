import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["General", "Help"]}
      title="Help & Documentation"
      subtitle="Guides, tutorials and shortcuts."
      description="A searchable knowledge base, video walkthroughs and a keyboard-shortcut cheatsheet — arriving in a future release."
      icon={LifeBuoy}
    />
  ),
});
