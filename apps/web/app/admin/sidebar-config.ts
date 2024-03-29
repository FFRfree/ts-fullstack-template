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
    key: "Admin main page",
    title: "Admin main page",
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
    key: "Page2",
    title: "Page2",
    icon: MessagesSquare,
    href: "/admin/page2",
  },
];
