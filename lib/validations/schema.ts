import * as z from "zod"

export const treeInputSchema = z.object({
  source: z.string(),
})
