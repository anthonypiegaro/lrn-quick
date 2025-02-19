import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <main className="p-12 rounded-lg max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">Lrn Quick</h1>
        <p className="text-lg font-medium text-foreground mb-8">
          The modern AI flashcard app. Built with the best algorithms to 
          make sure your learn optimally.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link href="/login">
                Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">
                Sign Up
            </Link>
          </Button>
        </div>
      </main>
      <footer className="mt-10 text-white">
        © {new Date().getFullYear()} Lrn Quick. All rights reserved.
      </footer>
    </div>
  );
}
