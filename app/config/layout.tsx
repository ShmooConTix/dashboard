'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const configLinks = [
    {
        name: "General",
        href: "/config"
    },
    {
        name: "Users",
        href: "/config/users"
    }
];

export default function ConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

return (
  <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <div className="hidden md:flex md:flex-col md:col-start-1 md:row-start-1">
        <h1 className="text-3xl font-semibold max-w-[100px]">Config</h1>
        <nav className="mt-4 flex flex-col gap-4 text-sm text-muted-foreground pt-4">
          {
            configLinks.map((c) => (
              <Link href={c.href} key={c.name} className={cn(pathname === c.href && "font-semibold text-primary")}>
                {c.name}
              </Link>
            ))
          }
        </nav>
      </div>
      <div className="md:col-start-2 md:row-start-1">
        {children}
      </div>
    </div>
  </main>
);
}
