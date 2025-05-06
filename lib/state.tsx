"use client";

import { create } from "zustand";
import { baseURL, Checkout, ClientStatusType, Configuration, Riddle, Statistics, UserState } from "./types";
import { toast } from "@/hooks/use-toast";
import { cn } from "./utils";

type AppState = {
  stats: Statistics;
  checkouts: Checkout[];
  clients: ClientStatusType[];
  riddle: Riddle;
  config: Configuration;
  users: UserState[];
};

export const appStore = create<AppState>(() => ({
  stats: {
    ticketsPurchased: 0,
    totalSpent: 0,
    users: 0,
    connectedClients: 0,
  },
  checkouts: [],
  clients: [],
  riddle: {
    imageURL: undefined,
    question: "",
    backupHTML: null,
  },
  config: {
    baseURL: "",
    webhookURL: "",
    landingURL: "",
  },
  users: [],
}));

export const ws = new WebSocket(`${baseURL.replace(/^http/, "ws")}/events/`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cmprfn = (a: any, b: any) => a.id === b.id;

ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);

  if (msg.type === "stateChanged" && msg.data.checkouts !== appStore.getState().checkouts) {
    const checkouts: Checkout[] = msg.data.checkouts.filter(
      (checkout: Checkout) => !appStore.getState().checkouts.some((c) => cmprfn(checkout, c))
    );

    for (const checkout of checkouts) {
      const t = toast({
        title: 'Successful Checkout! 🎉',
        description: (
          <div>
            <strong>Client:</strong> <span className={cn(
              checkout.client === "ts" && "text-blue-500",
              checkout.client === "go" && "text-cyan-400",
              checkout.client === "rs" && "text-red-500",
            )}>{checkout.client}</span> <br />
            <strong>User:</strong> {checkout.name} <br />
            <strong>Email:</strong> {checkout.email} <br />
            <strong>Cost:</strong> {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(checkout.ticket_count * 175)} <br />
            <strong>Reservation ID:</strong> {checkout.confirmation_id} <br />
          </div>
        ),
      })
    
      setTimeout(() => {
        t.dismiss();
      }, 10000)
    }
  }

  appStore.setState(msg.data);
};