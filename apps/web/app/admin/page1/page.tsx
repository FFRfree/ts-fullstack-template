"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUserDto, createUserSchema } from "@shared/validation";
import { LoadingSpinner } from "@/components/loading-spinner";
import { api } from "@/lib/api/api";
import { toast } from "@/components/ui/use-toast";
import { useCounter } from "react-use";

export default function InputForm() {
  const [num, { inc }] = useCounter();
  const { mutateAsync, isLoading } = api.resources.user.create.useMutation();

  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {},
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: CreateUserDto) {
    try {
      const resp = await mutateAsync(data);

      toast({
        title: "create user success",
      });

      form.reset();
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {Object.keys(createUserSchema.shape).map((key) => {
          return (
            <FormField
              control={form.control}
              name={key as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{key}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`enter your ${key}`}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button disabled={isSubmitting} type="submit">
          create
        </Button>
        {isSubmitting && <LoadingSpinner />}
      </form>
      <Button onClick={() => inc()}>inc({num})</Button>
    </Form>
  );
}
