"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm, UseFormReturn } from "react-hook-form";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ReactElement, useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerProps } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api/api";
import {
  z,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
  ZodType,
} from "@shared/zod";
import { Field } from "./const";

export const MutateDialog = <Schema extends ZodObject<any>>({
  schema,
  defaultValues,
  onSubmit,
  trigger = <Button variant="default">create a record</Button>,
}: {
  schema: Schema;
  defaultValues?: DefaultValues<z.infer<Schema>>;
  onSubmit?: (data: z.infer<Schema>) => Promise<boolean>;
  trigger?: ReactElement;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<Schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { isSubmitting } = form.formState;

  async function handleSubmit(data: z.infer<Schema>) {
    try {
      const done = await onSubmit?.(data);
      if (done) {
        setOpen(false);
        form.reset();
      }
    } catch (error) {}
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mutation Dialog</DialogTitle>
          <DialogDescription>
            Fields are generate base on zod schema
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-2/3 space-y-6"
          >
            {renderFormSchema(schema, form)}
            <DialogFooter className="sm:justify-start">
              <Button
                disabled={isSubmitting}
                type="submit"
                loading={isSubmitting}
              >
                create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const renderFormSchema = <Schema extends ZodObject<any, any, any>>(
  schema: Schema,
  form: UseFormReturn<z.TypeOf<Schema>, any, undefined>
) => {
  return Object.entries(schema.shape).map(([key, value]) => {
    return (
      <FormField
        control={form.control}
        name={key as any}
        render={getFieldEntryRender(key, value as any)}
      />
    );
  });
};

// render field basedon zod type
type RenderFn = ControllerProps<any, any>["render"];
const getFieldEntryRender = (
  fieldKey: string,
  fieldType: ZodType
): RenderFn => {
  if (fieldType instanceof ZodOptional || fieldType instanceof ZodNullable) {
    return getFieldEntryRender(fieldKey, fieldType.unwrap());
  }

  if (fieldType instanceof ZodString || fieldType instanceof ZodNumber) {
    return ({ field }) => (
      <FormItem>
        <FormLabel>{fieldKey}</FormLabel>
        <FormControl>
          <Input
            placeholder={`enter your ${fieldKey}`}
            type={fieldType instanceof ZodNumber ? "number" : undefined}
            {...field}
            value={field.value || ""}
            disabled={fieldType.description === Field.id}
          />
        </FormControl>
        {/* <FormDescription>
  This is your public display name.
</FormDescription> */}
        <FormMessage />
      </FormItem>
    );
  }

  // default
  return getFieldEntryRender(fieldKey, z.string());
};
