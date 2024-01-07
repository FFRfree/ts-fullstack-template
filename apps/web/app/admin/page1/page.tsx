"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "../theme-switcher";
import { trpc } from "@web/lib/trpc";
import { api } from "@web/lib/api";

export default function Page1() {
  const { toast, toasts } = useToast();
  const { setTheme } = useTheme();

  return (
    <div className=" h-full flex  flex-col justify-center items-center">
      <h1>Page1</h1>
      {JSON.stringify(toasts)}
      <p className="mb-4">
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
      </p>
      <p className="mb-4">
        <Button variant={"outline"} onClick={() => setTheme("dark")}>
          toast
        </Button>
        <Button onClick={() => trpc.resources.user.create.mutate({})}>
          create user mutation
        </Button>
      </p>
      <p className="mb-4">
        <DatabaseTable />
      </p>
    </div>
  );
}

const DatabaseTable = () => {
  // trpc.resources.user.findAll
  const { data, isLoading } = api.resources.user.findAll.useQuery();
  return <div>{isLoading ? "loading" : JSON.stringify(data)}</div>;
};
