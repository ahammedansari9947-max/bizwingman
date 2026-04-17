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
    <div className="flex h-full flex-col overflow-y-auto bg-card border-r border-border text-card-foreground">
      <div className="px-3 py-6 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-10 gap-2 group">
          <div className="relative w-8 h-8 mr-2 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            BizWingman
          </h1>
        </Link>
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-md transition-colors",
                pathname === route.href 
                  ? "bg-secondary text-primary" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
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
