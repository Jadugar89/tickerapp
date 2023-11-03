import { z } from "zod";

export const TicketSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  priority: z.string({
    required_error: "Priority is required",
  }),
  id: z.string().optional(),
});

export type TicketSchemaValues = z.infer<typeof TicketSchema>;
