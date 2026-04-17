"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, BarChart3, Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Generate Campaign",
    icon: Sparkles,
    href: "/generate-campaign",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white dark:bg-[#090e1a] border-r border-border text-card-foreground">
      <div className="px-3 py-6 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-10 gap-2 group">
          <div className="relative w-8 h-8 mr-2 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-primary/10 dark:shadow-primary/20">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground dark:text-white">
            BizWingman
          </h1>
        </Link>
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-md transition-all duration-200 relative",
                pathname === route.href 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-[#bfffe6]/5 hover:text-foreground"
              )}
            >
              {pathname === route.href && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full" />
              )}
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3 transition-colors", pathname === route.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {route.label}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
