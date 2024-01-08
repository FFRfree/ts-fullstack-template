"use server";

import Clientside from "./Clientside";
import { trpc } from "../lib/trpc";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const response = await trpc.hello.query({});
  return (
    <div>
      <p>Server side - {response}</p>
      <Clientside />
      <Button variant="destructive">Button</Button>
    </div>
  );
}
