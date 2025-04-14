
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API login
    setTimeout(() => {
      toast.success("Successfully logged in!");
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API registration
    setTimeout(() => {
      toast.success("Account created successfully! Please log in.");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="mx-auto max-w-md w-full">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold gradient-text">c0lornote</CardTitle>
        <CardDescription>
          Enter your email below to login to your account or create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="name@example.com" required type="email" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" size="sm" className="text-sm font-medium h-auto p-0">
                    Forgot password?
                  </Button>
                </div>
                <Input id="password" required type="password" />
              </div>
              <Button 
                type="submit" 
                className="w-full gradient-bg text-white hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="cooluser123" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" placeholder="name@example.com" required type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" required type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" required type="password" />
              </div>
              <Button 
                type="submit" 
                className="w-full gradient-bg text-white hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By clicking "Create account", you agree to our{" "}
                <a href="#" className="underline">Terms of Service</a> and{" "}
                <a href="#" className="underline">Privacy Policy</a>.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" disabled={isLoading}>
            Google
          </Button>
          <Button variant="outline" disabled={isLoading}>
            GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
