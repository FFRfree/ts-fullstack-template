"use client";
import { useEffect } from "react";
import ErrorComp from "../error";
import { add, getSecret } from "@shared/math";

export default function Page2() {
  return (
    <>
      {add(1, 2)} {getSecret()}
    </>
  );
}
