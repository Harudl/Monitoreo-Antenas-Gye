import { z } from "zod";

export const AntenaPowerKw = z.enum([
    "maintenance",
    "out_of_service",
    "active"
]);

export const AntenaSchema = z.object(  {
  id: z.string(),
  name: z.string().min(2,"Customer name must have at least 2 characters"),
  code:z.string(),
  operator: z.string(),
  type:z.string(),
  status: AntenaPowerKw,
  powerKw: z.number(),
  heightMts: z.number(),
  neighborhood: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  installedAt: z.string()
});

export type Antena = z.infer<typeof AntenaSchema>;