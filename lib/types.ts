export const baseURL = "http://api";

export type Statistics = {
  ticketsPurchased: number;
  totalSpent: number;
  users: number;
};

export type Configuration = {
  baseURL: string;
  webhookURL: string;
}

export type User = {
  id: number;
  email: string;
  created_at: string;
};

export type Ticket = {
  id: number;
  client: string;
  confirmation_id: string;
  email: string;
  ticket_count: 1 | 2;
  purchased_at: string;
};

export type Checkout = {
  id: number;
  client: "ts" | "go" | "rs";
  confirmation_id: string;
  name: string;
  email: string;
  ticket_count: number;
  purchased_at: string;
};

export type ClientStatusType = {
  clientName: string;
  clientID: string;
  client: "ts" | "go" | "rs";
  accounts: number;
  status: string;
}

export type Riddle = {
  question: string;
  imageURL?: string; // on client, if it starts with /, it will change it to baseURL, also consider restrictions on the security / headers to limit
  backupHTML: null;
} | {
  question: null;
  imageURL: null;
  backupHTML: string;
}

export type UserState = {
  id: number;
  name: string;
  email: string;
  proxy: string;
  client: "ts" | "go" | "rs";
  status: string;
  created_at: string;
}