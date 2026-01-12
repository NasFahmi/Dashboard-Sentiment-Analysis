import z from "zod";

// Definisikan beberapa skema error yang mungkin
const standardErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string().optional(),
});

const alternativeErrorSchema = z.object({
  message: z.string(),
  error: z.string().optional(),
  statusCode: z.number().optional(),
});

const commonErrorSchema = z.object({
  message: z.string(),
  status: z.number().optional(),
  error: z.string().optional(),
});

const minimalErrorSchema = z.object({
  message: z.string(),
});

// Schema untuk error response yang fleksibel
export const errorResponseSchema = z.union([
  standardErrorSchema,
  alternativeErrorSchema,
  commonErrorSchema,
  minimalErrorSchema
]);

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
