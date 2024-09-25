import z from "zod";

const create = z.object({
  body: z
    .object({
      url: z.string().url(),
    })
    .strict(),
  params: z
    .object({
      expiresAt: z.string().optional(),
      password: z.string().optional(),
    })
    .optional(),
});

export const urlValidation = {
  create,
};
