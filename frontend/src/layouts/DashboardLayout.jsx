import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../../components/Navbar';

const DashboardLayout = ({ children, activeTab, setActiveTab, onLogout, adminName, isPublic = false }) => {
    if (isPublic) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black font-sans antialiased text-foreground">
                <Navbar />
                <main>{children}</main>
                {/* Footer could go here */}
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black font-sans antialiased text-foreground">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={onLogout}
                adminName={adminName}
            />
            <div className="flex-1 flex flex-col">
                {/* Mobile sidebar toggle could go here in a top bar if needed */}
                <main className="flex-1 p-6 md:p-8 pt-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
