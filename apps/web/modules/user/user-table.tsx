"use client";

import { createUserSchema } from "@shared/validation";
import { LoadingSpinner } from "@/components/loading-spinner";
import { trpc } from "@/lib/api";
import { api } from "@/lib/api/api";
import { MutateDialog } from "./mutate-dialog";
import { Button } from "@/components/ui/button";

export const UserTable = ({ initialData }: { initialData?: any }) => {
  const { data, refetch, isFetching } = trpc.resources.user.findAll.useQuery(
    undefined,
    {
      staleTime: 1000 * 60 * 5,
      initialData: initialData,
    }
  );

  console.log("data:", data);
  // const keys = Object.keys(data?[0].)
  // const [num, { inc }] = useCounter();

  return (
    <div>
      {/* {isFetching && <LoadingSpinner />} */}
      <DataSource data={data} rowKey="id" />
      <Button onClick={() => refetch()}>refresh</Button>
      <MutateDialog
        schema={createUserSchema}
        onSubmit={(data) =>
          api.resources.user.create
            .mutate(data)
            .then(() => {
              refetch();
              return true;
            })
            .catch((reason) => false)
        }
      />
    </div>
  );
};

export const DataSource = ({
  data,
  rowKey,
}: {
  data?: any[];
  rowKey?: string;
}) => {
  if (!data?.length) return;
  const keys = Object.keys(data?.[0]);

  return (
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <td>{key}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((user) => (
          <tr key={rowKey ? user[rowKey] : undefined}>
            {Object.keys(user).map((k) => (
              <td>{user[k]}</td>
            ))}
            <td>{user.id}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
