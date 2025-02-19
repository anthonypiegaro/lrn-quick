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
import { RegisterForm } from "./sign-up-form";

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Just an email and password away from starting your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter>
            <p>Already have an account?</p>
            <Button asChild variant="link">
              <Link href="/login">
                Sign In
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
