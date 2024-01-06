"use client";

import * as React from "react";
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";

import { Nav, NavProps } from "@web/components/Nav";
import { cn } from "@web/lib/utils";
import { Separator } from "@web/components/ui/separator";
import { TooltipProvider } from "@web/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@web/components/ui/resizable";

interface SideMenuProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  items: NavProps["links"];
  children?: React.ReactNode;
  topSlot?: React.ReactNode;
}

export function SideMenu({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  items,
  children,
  topSlot,
}: SideMenuProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {}}
        className=" h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={10}
          maxSize={20}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center overflow-hidden",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {topSlot}
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} links={items} />
          <Separator />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
