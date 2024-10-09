import { Badge } from "@/components/ui/badge";
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
import { Checkout } from "@/lib/types";
import React from "react";

export const ClientBadge: React.FC<{ client: "ts" | "go" | "rs" }> = ({
  client,
}) => {
  const colors = {
    ts: "blue",
    go: "cyan",
    rs: "red",
  };

  const color = colors[client] as "blue" | "cyan" | "red";

  return <Badge variant={color}>{client}</Badge>;
};

export const RecentTransactions: React.FC<{ checkouts: Checkout[] }> = ({
  checkouts,
}: {
  checkouts: Checkout[];
}) => {
  return (
    <Card
      className="h-full flex flex-col flex-grow"
      x-chunk="dashboard-01-chunk-4"
    >
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Ticket Checkouts</CardTitle>
          <CardDescription>
            All ShmooCon &apos;25 Ticket Checkouts
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow max-h-[400px] overflow-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkouts.map((t) => (
              <TableRow key={t.email}>
                <TableCell>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground md:inline">
                    {t.email}
                  </div>
                </TableCell>
                <TableCell>
                  <ClientBadge client={t.client} />
                </TableCell>
                <TableCell className="md:table-cell lg: xl:table-column">
                  {t.purchased_at}
                </TableCell>
                <TableCell>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(t.ticket_count * 175)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {checkouts.length === 0 && (
          <h1 className="p-4 text-center w-full">no checkouts yet :{"("}</h1>
        )}
      </CardContent>
    </Card>
  );
};
