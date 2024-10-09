'use client'; 

import StatisticCard from "./_components/StatisticCard";
import { Activity, DollarSign, Users } from "lucide-react";
import CountdownCard from "./_components/CountdownCard";
import { RecentTransactions } from "./_components/RecentTransactions";
import { ClientStatus } from "./_components/ClientStatus";
import { appStore } from "@/lib/state";
import { useStore } from "zustand";

export default function Home() {
  const appState = useStore(appStore);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatisticCard
          title="Total Spend"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          text={Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(appState.stats.totalSpent)}
          subtext={`${appState.stats.ticketsPurchased} tickets total`}
        />
        <StatisticCard
          title="Connected Clients"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          text={appState.clients.length.toString()}
          subtext={`Connected via WebSocket`}
        />
        <StatisticCard
          title="Users Running"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          text={appState.stats.users.toString()}
          subtext={`Across all clients`}
        />
        <CountdownCard />
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 flex-grow">
          <RecentTransactions checkouts={appState.checkouts} />
          <ClientStatus clients={appState.clients} />
      </div>
    </div>
  );
}
