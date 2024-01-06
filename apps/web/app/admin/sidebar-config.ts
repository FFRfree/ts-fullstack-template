import { NavProps } from "@web/components/Nav";
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
    label: "972",
    icon: Users2,
    href: "/admin",
  },
  {
    key: "Updates",
    title: "Updates",
    label: "342",
    icon: AlertCircle,
    href: "/admin/page1",
  },
  {
    key: "Forums",
    title: "Forums",
    label: "128",
    icon: MessagesSquare,
  },
];
