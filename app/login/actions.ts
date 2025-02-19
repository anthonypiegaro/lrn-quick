"use server";

import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { userSelectSchema } from "@/db/schema";

export const signIn = async (formData: z.infer<typeof userSelectSchema>) => {
    // get username
}