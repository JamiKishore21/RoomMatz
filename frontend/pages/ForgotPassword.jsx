import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import { Lock, Mail, Sparkles, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/forgot-password`, { email });
      setMessage(response.data.message);
      localStorage.setItem("resetEmail", email);
      setTimeout(() => navigate("/verify-code"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 font-sans text-foreground">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border border-white/10 bg-gray-800/90 backdrop-blur-xl relative z-10 animate-slide-in-up">
        <CardHeader className="text-center space-y-3 pb-6 border-b border-white/5">
          <div className="flex justify-center mb-2">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg animate-pulse-glow">
              <Lock className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-base text-gray-400">
            No worries! We'll help you recover it
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          {error && (
            <div className="bg-red-900/30 text-red-300 text-sm p-3 rounded-lg mb-4 border border-red-500/30 animate-slide-in-down flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="bg-green-900/30 text-green-300 text-sm p-3 rounded-lg mb-4 border border-green-500/30 animate-slide-in-down flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-2 border-white/10 bg-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition-all duration-300"
            >
              Send Verification Code
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pt-2">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;