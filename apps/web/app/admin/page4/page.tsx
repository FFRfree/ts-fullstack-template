"use server";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/api";
import { UserTable } from "@/modules/user";
import { useState } from "react";

export default async function Page() {
  // const data = await trpc.resources.user.findAll.query();
  return (
    <div>
      {/* <UserTable /> */}
      <Button></Button>
    </div>
  );
}
