import Clientside from "./Clientside";
import { trpc } from "./trpc";
import { Button } from "@web/components/ui/button";

export default async function Home() {
  const response = await trpc.hello.query({});
  return (
    <div>
      <p>Server side - {response}</p>
      <Clientside />
      <Button variant="outline">Button</Button>
    </div>
  );
}
