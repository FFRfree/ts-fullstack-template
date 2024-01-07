"use client";

import { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";

export default function Clientside() {
  const [greeting, setGreeting] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    trpc.hello.query({}).then((response) => {
      setGreeting(response);
    });
    trpc.math.add.query([1, 2, 3, 4]).then((result) => {
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
