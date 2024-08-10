"use client";

import { createUserSchema } from "@shared/validation";
import { LoadingSpinner } from "@/components/loading-spinner";
import { trpc } from "@/lib/api";
import { api } from "@/lib/api/api";
import { MutateDialog } from "./mutate-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { catchApiError } from "@/lib/api/catch-error";
import { ReactNode } from "react";
import { z } from "@shared/zod";
import { Field } from "./const";
import { omit } from "lodash";

export const UserTable = ({ initialData }: { initialData?: any }) => {
  const { data, refetch, isFetching } = trpc.resources.user.findAll.useQuery(
    undefined,
    {
      staleTime: 1000 * 60 * 5,
      initialData: initialData,
    }
  );

  return (
    <div>
      <DataSource
        data={data}
        rowKey="id"
        operations={[
          {
            title: "operations",
            render(record) {
              return (
                <>
                  <Button
                    onClick={() => {
                      catchApiError(async () => {
                        await api.resources.user.deleteOne.mutate(record.id);
                        refetch();
                      });
                    }}
                    variant="destructive"
                  >
                    delete
                  </Button>
                  <MutateDialog
                    schema={z
                      .object({ id: z.string().describe(Field.id) })
                      .merge(createUserSchema)}
                    defaultValues={record as any}
                    onSubmit={(data) =>
                      catchApiError(
                        () =>
                          api.resources.user.update.mutate({
                            id: data.id,
                            data: omit(data, "id"),
                          }),
                        {
                          onSuccess: () => refetch(),
                        }
                      )
                    }
                    trigger={<Button>edit</Button>}
                  />
                </>
              );
            },
          },
        ]}
      />
      <Button
        variant="secondary"
        onClick={() => refetch()}
        loading={isFetching}
      >
        refresh
      </Button>
      <MutateDialog
        schema={createUserSchema}
        onSubmit={(data) =>
          catchApiError(() => api.resources.user.create.mutate(data))
        }
      />
    </div>
  );
};

type OperationColumn<T> = {
  title: ReactNode;
  render: (record: T) => ReactNode;
};

export const DataSource = <Data extends Record<string, any>>({
  data,
  rowKey,
  operations,
}: {
  data?: Data[];
  rowKey?: keyof Data;
  operations?: Array<OperationColumn<Data>>;
}) => {
  if (!data?.length) return;
  const keys = Object.keys(data?.[0]);

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {keys.map((key) => (
            <td>{key}</td>
          ))}
          {operations?.map((col) => (
            <td>{col.title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((record) => (
          <tr key={rowKey ? record[rowKey] : undefined}>
            {Object.keys(record).map((k) => (
              <td>{record[k]}</td>
            ))}
            {operations?.map((col) => (
              <td>{col.render(record)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
