"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Icon from "./ui/Icon";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex items-center justify-between space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="flex items-center text-sm font-medium transition-colors hover:text-primary p-2"
      >
        <Icon name="home"></Icon>
        Home
      </Link>

      {pathname != "/TicketPage/new" && (
        <Link
          href="/TicketPage/new"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary p-2"
        >
          <Icon name="tag"></Icon>
          Add Ticket
        </Link>
      )}
    </nav>
  );
}
