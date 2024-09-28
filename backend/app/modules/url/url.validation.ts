import z from "zod";

const create = z.object({
  body: z
    .object({
      url: z.string().url(),
      expiresAt: z.string().optional(),
      password: z.string().optional(),
      custom: z.string().max(10).optional(),
    })
    .strict(),
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
