"use server";

import { trpc } from "@/lib/trpc";

export default async function Home() {
  // useState();
  const resp = await trpc.hello.query({ name: "ffr" });
  return <div>admin333: {resp}</div>;
}
