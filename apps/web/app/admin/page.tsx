"use client";

import { trpc } from "@/lib/trpc";
import { Button } from "antd";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

export default async function Home() {
  const segments = useSelectedLayoutSegments();
  const segment = useSelectedLayoutSegment();

  console.log({ segment, segments });

  return (
    <>
      <ul>
        {segments.map((segment, index) => (
          <li key={index}>{segment}</li>
        ))}
      </ul>
      <div>
        <Button
          onClick={async () => {
            const res = await trpc.math.test.query();
            console.log({ res });
          }}
        >
          test
        </Button>
      </div>
    </>
  );
}
