import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Users, UserCircle, Bell, Image, Trophy, FileText, Calendar, UserCheck, DollarSign, Mail } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { toast } from "sonner";
import schoolLogo from "@/Assets/School-Logo.png";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check If User Is Authenticated
    const isAuth = sessionStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    toast.success("Logged Out Successfully");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", path: "/admin/students", icon: Users },
    { name: "Teachers", path: "/admin/teachers", icon: UserCircle },
    { name: "Notices", path: "/admin/notices", icon: Bell },
    { name: "Gallery", path: "/admin/gallery", icon: Image },
    { name: "Exam Results", path: "/admin/results", icon: Trophy },
    { name: "TC Requests", path: "/admin/tc-requests", icon: FileText },
    { name: "Appointments", path: "/admin/appointments", icon: Calendar },
    { name: "Admissions", path: "/admin/admissions", icon: UserCheck },
    { name: "Calendar Events", path: "/admin/calendar-events", icon: Calendar },
    { name: "Fee Management", path: "/admin/fee-rules", icon: DollarSign },
    { name: "Contact Messages", path: "/admin/contact-messages", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <img src={schoolLogo} alt="Logo" className="h-10 w-10" />
            <div>
              <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Goodwill Public School</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-64 bg-card border-r border-border transition-transform duration-300 z-30 overflow-y-auto ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay For Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
