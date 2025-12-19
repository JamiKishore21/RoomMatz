import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import { Button } from "../src/components/ui/button";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for custom login event
    const handleUserLogin = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("userLoggedIn", handleUserLogin);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("userLoggedIn", handleUserLogin);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 backdrop-blur-xl shadow-lg transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo with Animation */}
        <Link
          to="/"
          className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 flex items-center gap-2 group"
        >
          <span className="transform group-hover:scale-110 transition-transform duration-300">🏨</span>
          RoomMatz
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-6">
          {!user && (
            <div className="flex items-center gap-3 animate-slide-in-left">
              <Button
                variant="ghost"
                asChild
                className="hover:text-primary transition-all duration-300"
              >
                <Link to="/login" className="text-white">Login</Link>
              </Button>
              <Button
                variant="default"
                asChild
                className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-accent to-accent/80"
              >
                <Link to="/register">Register</Link>
              </Button>
              <Button
                variant="neutral"
                asChild
                className="hover:bg-white/10 text-white border-white/20 transition-all duration-300"
              >
                <Link to="/admin-login">Admin</Link>
              </Button>
            </div>
          )}

          {/* Only show user nav if admin is NOT logged in */}
          {user && (
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300 relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-transparent group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
                <Link
                  to="/information"
                  className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300 relative group"
                >
                  Information
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-transparent group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
                <Link
                  to="/vacancy"
                  className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300 relative group"
                >
                  Find Rooms
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-transparent group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </nav>

              <div className="flex items-center gap-4 border-l border-border/30 pl-6">
                <NotificationBell userType="user" />
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 hover:bg-accent/20 transition-all duration-300 cursor-pointer group"
                  title="Go to Profile"
                >
                  <User className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-white hidden lg:inline-block">
                    {user.name}
                  </span>
                </button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-gradient-to-b from-background/80 to-background/95 backdrop-blur-xl animate-slide-in-down">
          <div className="px-4 py-4 space-y-3">
            {!user && (
              <>
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link to="/login" className="text-white">🔑 Login</Link>
                </Button>
                <Button variant="default" asChild className="w-full justify-start bg-gradient-to-r from-accent to-accent/80">
                  <Link to="/register" className="text-white">📝 Register</Link>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link to="/admin-login" className="text-white">🛡️ Admin</Link>
                </Button>
              </>
            )}

            {user && (
              <>
                <Link to="/" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-white rounded-lg transition-colors duration-300">
                  🏠 Home
                </Link>
                <Link to="/information" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-white rounded-lg transition-colors duration-300">
                  ℹ️ Information
                </Link>
                <Link to="/vacancy" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-white rounded-lg transition-colors duration-300">
                  🔍 Find Rooms
                </Link>
                <div className="border-t border-border/30 pt-3 mt-3">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-white rounded-lg transition-colors duration-300 flex items-center gap-2 mb-2"
                  >
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-gray-300">Logged in: {user.name}</span>
                  </button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
