import { z } from "zod";

const userSchema = z.object({});

type User = z.TypeOf<typeof userSchema>;

export default User;
