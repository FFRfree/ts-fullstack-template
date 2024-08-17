"use client";

import {
  createUserSchema,
  SearchUserDto,
  searchUserSchema,
} from "@shared/dtos";
import { LoadingSpinner } from "@/components/loading-spinner";
import { trpc } from "@/lib/api";
import { api } from "@/lib/api/api";
import { MutateDialog } from "./mutate-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { catchApiError } from "@/lib/api/catch-error";
import { ReactNode, useState } from "react";
import { z } from "@shared/zod";
import { Field } from "./const";
import { omit } from "lodash";
import { SearchForm } from "./search-form";

export const UserTable = ({ initialData }: { initialData?: any }) => {
  const [input, setInput] = useState<SearchUserDto>({});

  const { data, refetch, isFetching } = trpc.resources.user.findAll.useQuery(
    input,
    {
      refetchOnMount: false,
      // queryKey: [input]
      // staleTime: 1,
      initialData: initialData,
    }
  );

  return (
    <div>
      <SearchForm
        schema={searchUserSchema}
        onSubmit={(data) => {
          console.log({ data });
          setInput(data);
          // refetch();
        }}
        onReset={() => setInput({})}
      />
      <div className="py-2"></div>
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
                      catchApiError(async () => {
                        await api.resources.user.update.mutate({
                          id: data.id,
                          data: omit(data, "id"),
                        });
                        refetch();
                      })
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
          <td>Index</td>
          {keys.map((key) => (
            <td>{key}</td>
          ))}
          {operations?.map((col) => (
            <td>{col.title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((record, index) => (
          <tr key={rowKey ? record[rowKey] : undefined}>
            <td>{index}</td>
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
