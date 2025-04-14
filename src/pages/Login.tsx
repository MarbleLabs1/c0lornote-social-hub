
import { AuthForm } from "@/components/auth/AuthForm";

export default function Login() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
