import * as React from "react";
import { Separator } from "./ui/separator";

export interface ITopMenuProps {}

export function TopMenu(props: ITopMenuProps) {
  return (
    <>
      <div className=" h-[52px] flex-row "></div>
      <Separator />
    </>
  );
}
