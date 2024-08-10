"use client";

import { api, trpc } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Clientside() {
  const [greeting, setGreeting] = useState("");
  const [result, setResult] = useState(0);
  const {} = trpc.hello.useQuery({});
  console.log("hehe");

  useEffect(() => {
    api.hello.query({}).then((response) => {
      setGreeting(response);
    });
    api.math.add.query([1, 2, 3, 4]).then((result) => {
      setResult(result);
    });
  });
  return (
    <div>
      I am client side - {greeting}
      <div>result: {result}</div>
    </div>
  );
}
