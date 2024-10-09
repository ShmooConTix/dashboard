'use client';

import { ClientBadge } from "@/app/_components/RecentTransactions";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { appStore } from "@/lib/state";
import { useStore } from "zustand";

export function UserTable() {
    const store = useStore(appStore);

    return (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Proxy</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.users.map((s) => (
            <TableRow key={s.email}>
              <TableCell>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-muted-foreground md:inline">
                  {s.email}
                </div>
              </TableCell>
              <TableCell>
                <ClientBadge client={s.client as "ts" | "go" | "rs"} />
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    s.status === "Tickets Purchased!" ? "green" : "outline"
                  }
                >
                  {s.status}
                </Badge>
              </TableCell>
              <TableCell>{s.proxy ?? "No Proxy"}</TableCell>
              <TableCell>{s.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}