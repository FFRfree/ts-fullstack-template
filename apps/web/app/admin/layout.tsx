"use client";
import { SideMenu } from "@web/components/SideMenu";
import { sidebarItems } from "./sidebar-config";
import { TopMenu } from "@web/components/TopMenu";

// export const metadata = {
//   title: "后台管理",
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen p-2">
      <div className=" h-full rounded-lg border-2 border-primary">
        <SideMenu
          defaultLayout={undefined}
          navCollapsedSize={2}
          items={sidebarItems}
        >
          <TopMenu />
          <div className="admin-main-area">{children}</div>
        </SideMenu>
      </div>
    </div>
  );
}
