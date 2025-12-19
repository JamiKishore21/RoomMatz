import React from 'react';
import { LayoutDashboard, Users, Home, ClipboardList, LogOut } from 'lucide-react';
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

const Sidebar = ({ activeTab, setActiveTab, onLogout, adminName }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'rooms', label: 'Rooms', icon: Home },
        { id: 'bookings', label: 'Bookings', icon: ClipboardList },
    ];

    return (
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-gray-800/90 shadow-lg lg:flex h-screen sticky top-0">
            <div className="flex h-16 items-center border-b border-white/10 px-6">
                <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <Button
                                key={item.id}
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/10",
                                    isActive && "bg-white/20 text-white hover:bg-white/30 hover:text-white"
                                )}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Button>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-white/10 p-4">
                <div className="mb-4 px-2">
                    <p className="text-xs font-medium text-gray-400 uppercase">Logged in as</p>
                    <p className="truncate text-sm font-semibold text-white">{adminName || 'Admin'}</p>
                </div>
                <Button variant="destructive" className="w-full justify-start gap-3" onClick={onLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
