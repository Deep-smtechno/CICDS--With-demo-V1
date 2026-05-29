import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Activity } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "technical@smtechno.com" && password === "$m@123#") {
      onLogin();
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FB] p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="mx-auto bg-blue-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
            <Activity className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Gujarat Police Cyber Crime</CardTitle>
          <CardDescription className="text-slate-500 text-sm">Sign in to access the investigation and monitoring dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email / Investigator ID</Label>
              <Input
                id="email"
                type="text"
                placeholder="investigator@gujaratpolice.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-slate-300"
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-slate-300"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-6">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
