import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Shield, Lock, User, ArrowRight } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Simulate slight network delay for premium feel
    setTimeout(() => {
      // Note: Keep credentials as requested
      if (email === "technical@smtechno.com" && password === "$m@123#") {
        onLogin();
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex text-slate-900 bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Visual Left Section - Hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0a192f] items-center justify-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-60" />

        <div className="relative z-10 p-16 flex flex-col items-start justify-center h-full max-w-2xl text-left">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 mb-8 shadow-2xl">
            <Shield className="w-16 h-16 text-blue-400 drop-shadow-lg" />
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Gujarat Police <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-12 max-w-lg border-l-4 border-blue-500 pl-4">
            Advanced analytics, real-time tracking, and strategic monitoring for unified crime intelligence. Secure access restricted to authorized personnel only.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" /> Secure Access
            </span>
          </div>
        </div>
      </div>

      {/* Form Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative shadow-[0_0_50px_rgba(0,0,0,0.05)] z-10">
        {/* Subtle background pattern for form side */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="bg-[#0a192f] p-4 rounded-2xl shadow-xl">
              <Shield className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Welcome Back</h2>
            <p className="text-slate-500">Sign in to access the SM Techno dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50/50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-in slide-in-from-top-2 fade-in duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#1D4ED8] transition-colors" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-6 bg-slate-50 border-slate-200 hover:border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-all rounded-xl text-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</Label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#1D4ED8] transition-colors" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-6 bg-slate-50 border-slate-200 hover:border-slate-300 focus:bg-white focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-all rounded-xl text-md tracking-[0.2em]"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#1D4ED8]/25 flex items-center justify-center gap-2 group relative overflow-hidden mt-8"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Secure Login</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            
            <p className="text-center text-xs text-slate-500 font-medium pt-8">
              Protected by SM Techno Systems <br/>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
