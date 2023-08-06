import { z } from "zod";

const userSchema = z.object({
  address: z.object({
    city: z.string(),
    geo: z.object({
      lat: z.coerce.number(),
      lng: z.coerce.number(),
    }),
    street: z.string(),
    suite: z.string(),
    zipcode: z.string(),
  }),
  company: z.object({
    bs: z.string(),
    catchPhrase: z.string(),
    name: z.string(),
  }),
  email: z.string().email(),
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  username: z.string(),
  website: z.string(),
});

export type User = z.TypeOf<typeof userSchema>;
export default userSchema;
