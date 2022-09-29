import { z } from "zod";

export const DateObj = z.object({
  day: z.number().int().min(1).max(31),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(1).max(3000),
  timestamp: z.number().int(),
});
export const Item = z.object({
  id: z.number().int(),
  person: z.string().min(1).max(64),
  description: z.string().min(1).max(64).nullable(),
  value: z.string().min(1).max(64),
  currency: z.string().length(3),
  start: z.number().int().nullable(),
  end: z.number().int().nullable(),
});
export const DoneItem = z.object({
  id: z.number().int(),
  person: z.string().min(1).max(64),
  description: z.string().min(1).max(64).nullable(),
  value: z.string().min(1).max(64),
  currency: z.string().length(3),
  type: z.enum(["debt", "due"]),
});

export {};
declare global {
  type ActiveTab = "first" | "second";
  interface iconProps {
    color: string;
    size: string;
  }
  type DateObj = z.infer<typeof DateObj>;
  type Item = z.infer<typeof Item>;
  type ItemType = "debt" | "due";
  type DoneItem = z.infer<typeof DoneItem>;
}
