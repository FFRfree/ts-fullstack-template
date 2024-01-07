import * as z from "zod";

export const createUserDto = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof createUserDto>;
