"use server";

import { trpc } from "@/lib/trpc";

export default async function Home() {
  // useState();
  const hell = await trpc.hello.query({});
  return <div>admin333: {hell}</div>;
}
