"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "../../../components/next/theme-switcher";
import { trpc } from "@/lib/trpc";
import { api } from "@/lib/api";

export default function Page1() {
  const { toast, toasts } = useToast();
  const { setTheme } = useTheme();
  const utils = api.useUtils();

  return (
    <div className=" h-full flex  flex-col justify-center items-center space-y-1">
      <h1>Page1</h1>
      {JSON.stringify(toasts)}

      <Button
        variant={"outline"}
        onClick={() => {
          const { id, update } = toast({
            variant: "destructive",
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
          setTimeout(() => {
            update({
              title: "ddd",
              variant: "default",
              description: "heihie",
              id: id,
            });
          }, 1000);
        }}
      >
        toast
      </Button>

      <Button variant={"outline"} onClick={() => setTheme("dark")}>
        toast
      </Button>
      <Button
        onClick={() =>
          trpc.resources.user.create
            .mutate({})
            .then(() => utils.resources.user.findAll.invalidate())
        }
      >
        create user mutation
      </Button>

      <DatabaseTable />
      <Button
        onClick={() => {
          throw new Error("manually triggered error");
        }}
      >
        throw error
      </Button>
    </div>
  );
}

const DatabaseTable = () => {
  // trpc.resources.user.findAll
  const { data, isLoading } = api.resources.user.findAll.useQuery();
  return <div>{isLoading ? "loading" : JSON.stringify(data)}</div>;
};
