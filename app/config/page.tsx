import { SimpleConfigCard } from "./_components/SimpleConfigCard";

export default function Page() {
  return (
    <div className="grid gap-6">
      <SimpleConfigCard
        title="Base URL"
        description="This URL is sent to all clients to be used as the main ticket server URL."
        k="baseURL"
      />
      <SimpleConfigCard
        title="Discord Webhook URL"
        description="All checkouts (and errors) will be sent to this Discord webhook."
        k="webhookURL"
      />
    </div>
  );
}
