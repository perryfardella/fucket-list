import SignupForm from "../components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SignupForm />
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
