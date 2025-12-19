import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import { Building2, Sparkles } from "lucide-react";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password }, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      setUser(res.data.user);

      // Dispatch custom event to update Navbar
      window.dispatchEvent(new Event("userLoggedIn"));

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/30 to-purple-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-2xl border border-white/10 bg-gray-800/90 backdrop-blur-xl relative z-10 animate-slide-in-up">

        <CardHeader className="text-center space-y-3 pb-6 border-b border-white/5">
          <div className="flex justify-center mb-2">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg animate-pulse-glow">
              <Building2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-gray-400">Login to your RoomMatz account</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-900/30 text-red-300 text-sm p-3 rounded-lg mb-4 border border-red-500/30 animate-slide-in-down">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 pt-6">
            <div className="space-y-2 animate-slide-in-left">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-2 border-white/10 bg-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="space-y-2 animate-slide-in-right">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-white/10 bg-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                Sign In
              </span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 text-center text-sm">
          <div className="border-t border-white/5 w-full pt-4">
            <div className="flex justify-between w-full px-2">
              <Link
                to="/forgot-password"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline-offset-4 hover:underline"
              >
                Forgot Password?
              </Link>
              <Link
                to="/register"
                className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create account →
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
