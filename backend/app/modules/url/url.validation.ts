import z from "zod";

const create = z.object({
  body: z
    .object({
      url: z.string().url(),
    })
    .strict(),
  query: z
    .object({
      expiresAt: z.string().optional(),
      password: z.string().optional(),
    })
    .optional(),
});

const list = z.object({
  query: z.object({
    limit: z.string().optional(),
  }),
});

export const urlValidation = {
  create,
  list,
};
