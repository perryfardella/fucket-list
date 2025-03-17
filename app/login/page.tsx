import LoginForm from "../components/LoginForm";
import { Link } from "@/components/ui/link";
import { Mountain } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-6 mx-auto max-w-7xl">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl"
            variant="nav"
          >
            <Mountain className="h-6 w-6 text-primary" />
            <span>The Fucket List</span>
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-full sm:mx-auto sm:max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
