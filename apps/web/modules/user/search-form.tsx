import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchUserDto, searchUserSchema } from "@shared/dtos";
import { z, ZodObject } from "@shared/zod";
import { FormEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const SearchForm = <Schema extends ZodObject<any>>({
  schema,
  onSubmit = () => null,
  loading,
  onReset,
}: {
  schema: Schema;
  onSubmit?: SubmitHandler<z.infer<Schema>>;
  onReset?: () => void;
  loading?: boolean;
}) => {
  const { register, handleSubmit, reset } = useForm<Schema>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-start items-center gap-4"
    >
      {Object.entries(schema.shape).map(([key, value]) => {
        return (
          <div className="w-80 flex justify-start items-center">
            <label>{key}</label>
            <Input {...register(key as any)}></Input>
          </div>
        );
      })}
      <Button loading={loading} type="submit">
        search
      </Button>
      <Button
        type="button"
        onClick={() => {
          reset();
          onReset?.();
        }}
      >
        reset
      </Button>
    </form>
  );
};
