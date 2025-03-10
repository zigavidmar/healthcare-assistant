import { Button } from "@/components/ui/button";
import { login } from "./actions";
import { Input } from "@/components/ui/input";

export default function Login() {
  const email = "xiwota2193@framitag.com";
  const password = "test1234";

  return (
    <div className="h-full w-full flex items-center justify-center max-w-[400px] mx-auto">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-left">Login</h1>
        <p className="text-paragraph text-left text-xs pt-2">
          Welcome back! Please login to your account.
        </p>
        <form className="flex flex-col gap-5 pt-5">
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            readOnly
          />
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            readOnly
          />
          <Button formAction={login}>Log in</Button>
        </form>
      </div>
    </div>
  );
}
