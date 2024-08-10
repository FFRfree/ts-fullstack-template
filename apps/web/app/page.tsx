"use server";

import { api } from "@/lib/api/api";
import Clientside from "./client-side";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const response = await api.hello.query({});
  return (
    <div>
      <p>Server side - {response}</p>
      <Clientside />
      <Button variant="destructive">Button</Button>
    </div>
  );
}
