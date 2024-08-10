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
import { useForm } from "react-hook-form";
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

export const MutateDialog = <Schema extends ZodObject<any>>({
  schema,
  onSubmit,
  trigger = <Button variant="outline">create a record</Button>,
}: {
  schema: Schema;
  onSubmit?: (data: z.infer<Schema>) => Promise<boolean>;
  trigger?: ReactElement;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<Schema>>({
    resolver: zodResolver(schema),
    defaultValues: {} as any,
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
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-2/3 space-y-6"
          >
            {Object.entries(schema.shape).map(([key, value]) => {
              return (
                <FormField
                  control={form.control}
                  name={key as any}
                  render={getFieldEntryRender(key, value as any)}
                />
              );
            })}
            <DialogFooter className="sm:justify-start">
              <Button disabled={isSubmitting} type="submit">
                create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                close 2
              </Button>
            </DialogFooter>

            {isSubmitting && <LoadingSpinner />}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
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
