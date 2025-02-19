"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "@/db";
import { users } from "@/db/schema";
import { userInsertSchema } from "@/db/schema";

export const registerUser = async (formData: z.infer<typeof userInsertSchema>) => {
    if (!formData.email || !formData.password) {
        return { error: "Email or password are required" };
    }

    try {
        const hashedPassword = await bcrypt.hash(formData.password, 10);

        await db.insert(users).values({
            email: formData.email,
            password: hashedPassword
        });

        return { success: true };
    } catch (error: any) {
        if (error.code == "23505") {
            return { error: `${formData.email} already in use` };
        }

        console.log("Unexpected error in action registerUser:", error);
        return { error: "Server error. Please try again later" };
    }
}
