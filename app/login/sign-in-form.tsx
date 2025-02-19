"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

import { userSignInSchema } from "@/db/schema";

export function LoginForm() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState("");

    const form = useForm<z.infer<typeof userSignInSchema>>({
        resolver: zodResolver(userSignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof userSignInSchema>) => {
        setSubmitting(true);

        const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        });

        if (result?.error) {
            setServerErrorMessage("Invalid email or password");
        } else {
            router.push("/dashboard");
        }

        console.log(values);

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
          {serverErrorMessage && <p className="text-destructive">{serverErrorMessage}</p>}
          <Button type="submit" variant="outline" disabled={submitting}>Start Studying</Button>
        </form>
      </Form>
    )
}
