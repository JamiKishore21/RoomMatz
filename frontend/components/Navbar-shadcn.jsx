import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../src/components/ui/button";
import NotificationBell from "./NotificationBell";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("adminUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    } else {
      setAdminUser(null);
    }
  }, []);

  const handleLogout = () => {
    const adminToken = localStorage.getItem("adminToken");
    const adminUserData = localStorage.getItem("adminUser");
    
    if (adminToken || adminUserData) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      navigate("/admin-login");
    } else {
      localStorage.removeItem("user");
      navigate("/login");
    }
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-gradient-to-r from-primary to-secondary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-accent transition-colors duration-300"
          >
            🏠 RoomMatz
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!user && !adminUser ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-primary/80">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-accent text-primary hover:bg-accent/90">
                    Register
                  </Button>
                </Link>
                <Link to="/admin-login">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                    Admin
                  </Button>
                </Link>
              </>
            ) : user ? (
              <>
                <Link to="/vacancy">
                  <Button variant="ghost" className="text-white hover:bg-primary/80">
                    Rooms
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className="text-white hover:bg-primary/80">
                    👤 {user.name?.split(' ')[0]}
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Logout
                </Button>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            {!user && !adminUser ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block"
                >
                  <Button className="w-full">Login</Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-accent text-primary hover:bg-accent/90">
                    Register
                  </Button>
                </Link>
                <Link
                  to="/admin-login"
                  onClick={() => setMobileOpen(false)}
                  className="block"
                >
                  <Button className="w-full" variant="outline">
                    Admin
                  </Button>
                </Link>
              </>
            ) : user ? (
              <>
                <Link
                  to="/vacancy"
                  onClick={() => setMobileOpen(false)}
                  className="block"
                >
                  <Button className="w-full">Rooms</Button>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block"
                >
                  <Button className="w-full">👤 {user.name}</Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Logout
                </Button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
