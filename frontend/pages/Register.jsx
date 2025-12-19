import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import { UserPlus, Sparkles } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, { name, email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
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

      {/* Register Card */}
      <Card className="w-full max-w-md shadow-2xl border border-white/10 bg-gray-800/90 backdrop-blur-xl relative z-10 animate-slide-in-up">

        <CardHeader className="text-center space-y-3 pb-6 border-b border-white/5">
          <div className="flex justify-center mb-2">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg animate-pulse-glow">
              <UserPlus className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Join RoomMatz
          </CardTitle>
          <CardDescription className="text-base text-gray-400">Create your account to get started</CardDescription>
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2 animate-slide-in-left">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-300">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 border-2 border-white/10 bg-gray-700/50 text-white focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="space-y-2 animate-slide-in-right">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-2 border-white/10 bg-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="space-y-2 animate-slide-in-left">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-2 border-white/10 bg-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="space-y-2 animate-slide-in-right">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 border-2 border-white/10 bg-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                Create Account
              </span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2 text-center text-sm">
          <div className="border-t border-white/5 w-full pt-4">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign In →
              </Link>
            </p>
            <p
              className="text-muted-foreground mt-3 cursor-pointer hover:text-[#667eea] transition-colors"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
