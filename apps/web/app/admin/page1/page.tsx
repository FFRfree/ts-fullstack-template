"use client";

import { Button } from "@web/components/ui/button";
import { useToast } from "@web/components/ui/use-toast";

export default function Page1() {
  const { toast, toasts } = useToast();
  console.log(toasts);

  return (
    <>
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
        <Button variant={"outline"}>toast</Button>
      </p>
    </>
  );
}
