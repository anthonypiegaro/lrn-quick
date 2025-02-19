import Link from "next/link";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./sign-in-form";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Welcome back, just gonna need some credentials before we open Lrn Quick.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <p>Don't have an account?</p>
            <Button asChild variant="link">
              <Link href="/register">
                Sign Up
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="mt-10 text-white">
        © {new Date().getFullYear()} Lrn Quick. All rights reserved.
      </footer>
    </div>
  );
}
