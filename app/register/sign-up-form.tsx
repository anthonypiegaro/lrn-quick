"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { registerUser } from "./actions";

import { userInsertSchema } from "@/db/schema";

export function RegisterForm() {
    const [submitting, setSubmitting] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState("");

    const form = useForm<z.infer<typeof userInsertSchema>>({
        resolver: zodResolver(userInsertSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof userInsertSchema>) => {
        setSubmitting(true);

        const response = await registerUser(values);

        console.log(response);

        setServerErrorMessage(response?.error ?? "");

        setSubmitting(false);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField 
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@provider.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="pass****" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
          />
          {serverErrorMessage.length > 0 && <p className="text-destructive">{serverErrorMessage}</p>}
          <Button type="submit" variant="outline" disabled={submitting}>Create Account</Button>
        </form>
      </Form>
    )
}
