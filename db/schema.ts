import { z } from "zod";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull()
});

export const baseUserInsertSchema = createInsertSchema(users);
export const userInsertSchema = baseUserInsertSchema.extend({
    email: z.string()
        .email("Invalid email format"),

    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %...)")
});

export const baseUserSelectSchema = createSelectSchema(users);
export const userSelectSchema = baseUserSelectSchema.extend({
    email: z.string()
        .email("Invalid email format"),

    password: z.string()
        .min(1, "Password required") 
});
export const userSignInSchema = z.object({
    email: z.string()
        .email("Invalid email format"),

    password: z.string()
        .min(1, "Password required") 
});
