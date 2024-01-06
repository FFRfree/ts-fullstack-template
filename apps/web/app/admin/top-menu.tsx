import * as React from "react";
import { Separator } from "../../components/ui/separator";
import { ThemeSwitcher } from "./theme-switcher";

export interface ITopMenuProps {}

export function TopMenu(props: ITopMenuProps) {
  return (
    <>
      <div className=" h-[52px] flex justify-between items-center px-2">
        <div></div>
        <div>
          <Separator orientation="vertical" />
          <ThemeSwitcher />
        </div>
      </div>
      <Separator />
    </>
  );
}
