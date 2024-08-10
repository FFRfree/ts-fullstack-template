import { NavProps } from "@/components/nav";
import {
  Users2,
  AlertCircle,
  MessagesSquare,
  ShoppingCart,
  Archive,
} from "lucide-react";

export const sidebarItems: NavProps["links"] = [
  {
    key: "Main page",
    title: "Main page",
    icon: Users2,
    href: "/admin",
  },
  {
    key: "Page1",
    title: "Page1",
    icon: AlertCircle,
    href: "/admin/page1",
  },
  {
    key: "Page4",
    title: "Page4",
    icon: MessagesSquare,
    href: "/admin/page4",
  },
  {
    key: "Page2",
    title: "Page2",
    icon: MessagesSquare,
    href: "/admin/page2",
  },
  {
    key: "Page3",
    title: "antd",
    icon: MessagesSquare,
    href: "/admin/page3",
  },
];
