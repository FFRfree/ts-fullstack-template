"use client";
import { SideMenu } from "@/components/side-menu";
import { sidebarItems } from "./sidebar-config";
import { TopMenu } from "@/app/admin/top-menu";
import { Gauge } from "lucide-react";
import {
  useSelectedLayoutSegments,
  useSelectedLayoutSegment,
} from "next/navigation";

// export const metadata = {
//   title: "后台管理",
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" h-screen p-2 min-h-[500px]">
        <div className=" h-full rounded-lg border-2 border-primary">
          <SideMenu
            defaultLayout={[10, 90]}
            navCollapsedSize={2}
            items={sidebarItems}
            topSlot={<Gauge />}
          >
            <TopMenu />
            <div className="admin-main-area h-full overflow-auto">
              {children}
            </div>
          </SideMenu>
        </div>
      </div>
    </>
  );
}
