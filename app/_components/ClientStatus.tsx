import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ClientBadge } from "./RecentTransactions";
import { ClientStatusType } from "@/lib/types";

export const ClientStatus: React.FC<{ clients: ClientStatusType[] }> = ({
  clients,
}: {
  clients: ClientStatusType[];
}) => {
  return (
    <Card
      className="h-full flex flex-col flex-grow"
      x-chunk="dashboard-01-chunk-4"
    >
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Client Statuses</CardTitle>
          <CardDescription>ShmooCon Bot Client Statuses</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Accounts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((c) => (
              <TableRow key={c.clientName}>
                <TableCell>
                  <div className="font-medium">{c.clientName}</div>
                  <div className="text-sm text-muted-foreground md:inline">
                    {c.clientID}
                  </div>
                </TableCell>
                <TableCell>
                  <ClientBadge client={c.client} />
                </TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell className="md:table-cell lg: xl:table-column">
                  {c.accounts}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {clients.length === 0 && (
          <h1 className="p-4 text-center w-full">no clients yet :{"("}</h1>
        )}
      </CardContent>
    </Card>
  );
};
