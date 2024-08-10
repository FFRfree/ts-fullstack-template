"use server";

import React from "react";
import { UserTable as UserTableCS } from "./user-table";
import { api } from "@/lib/api/api";

export const UserTable = async () => {
  const data = await api.resources.user.findAll.query();
  // const data = [];
  return <UserTableCS initialData={data} />;
};
