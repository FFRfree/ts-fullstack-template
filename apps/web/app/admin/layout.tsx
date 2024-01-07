"use client";
import { SideMenu } from "@web/components/SideMenu";
import { sidebarItems } from "./sidebar-config";
import { TopMenu } from "@web/app/admin/top-menu";
import { ThemeSwitcher } from "./theme-switcher";
import { Separator } from "@web/components/ui/separator";
import { ClickToComponent } from "click-to-react-component";

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
      <ClickToComponent />
      <div className=" h-screen p-2">
        <div className=" h-full rounded-lg border-2 border-primary">
          <SideMenu
            defaultLayout={undefined}
            navCollapsedSize={2}
            items={sidebarItems}
          >
            <TopMenu />
            <div className="admin-main-area h-full">{children}</div>
          </SideMenu>
          ClickToComponent
        </div>
      </div>
    </>
  );
}
