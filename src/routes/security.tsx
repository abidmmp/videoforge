import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/security")({
  head: () => ({ meta: [{ title: "Security — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Security"]}
      title="Security"
      subtitle="Two-factor, sessions and audit log."
      description="Account protection controls — MFA, recovery codes and active session management — arrive once auth is enabled."
      icon={Shield}
    />
  ),
});
