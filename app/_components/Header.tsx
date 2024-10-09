"use client";

import { cn } from "@/lib/utils";
import { Tickets } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const headerNav = [
  { href: "/", label: "Home" },
  { href: "/riddlemode", label: "Riddle Mode" },
  { href: "/config", label: "Config" },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Tickets className="h-6 w-6" />
        <span className="sr-only">TixBoard</span>
      </Link>
      <nav className="flex gap-6 text-medium font-medium md:flex-row md:items-center md:gap-5 lg:gap-6 absolute left-1/2 transform -translate-x-1/2">
        {headerNav.map((navItem) => (
          <Link
            key={navItem.label}
            href={navItem.href}
            className={cn(
              `text-gray-300 hover:text-white transition-colors duration-200`,
              ((pathname === navItem.href) || (navItem.href === "/config" && pathname.startsWith("/config"))) && "font-semibold text-primary text-indigo-500 hover:text-indigo-700"
            )}
          >
            {navItem.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
