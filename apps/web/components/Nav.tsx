"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@web/lib/utils";
import { buttonVariants } from "@web/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@web/components/ui/tooltip";
import { usePathname, useRouter } from "next/navigation";

export interface NavProps {
  isCollapsed: boolean;
  links: {
    key: string;
    title: string;
    label?: string;
    icon: LucideIcon;
    href?: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link) => {
          const selected = pathname === link.href;

          return isCollapsed ? (
            <Tooltip key={link.key} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href ?? ""}
                  className={cn(
                    buttonVariants({
                      variant: selected ? "default" : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    selected ||
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={link.key}
              href={link.href ?? ""}
              className={cn(
                buttonVariants({
                  variant: selected ? "default" : "ghost",
                  size: "sm",
                }),
                selected &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    selected && "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
