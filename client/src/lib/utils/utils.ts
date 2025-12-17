import { z } from "zod";

export const requiredString = (fieldName: string) => z
    .string({ error: (issue) => issue.code === 'invalid_type' ? `${fieldName} is required` : "Invalid input" })
    .min(1, { message: `${fieldName} is required` });