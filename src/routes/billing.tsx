import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Billing"]}
      title="Billing"
      subtitle="Invoices, payment methods and renewals."
      description="Manage your subscription, view past invoices and update your payment method. This area unlocks once your workspace is connected to the rendering backend."
      icon={CreditCard}
    />
  ),
});
