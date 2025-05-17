
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Users, List, Upload, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <List className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: "Agent Management",
      icon: <Users className="h-5 w-5" />,
      path: "/agents",
    },
    {
      name: "Upload Lists",
      icon: <Upload className="h-5 w-5" />,
      path: "/upload",
    },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="flex justify-center py-6 border-b border-sidebar-border">
        <h1 className="text-xl font-semibold text-white">Agent Manager</h1>
      </SidebarHeader>
      <SidebarContent className="py-6">
        <div className="px-4">
          <div className="text-sm text-slate-300 py-2">Main Menu</div>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
                  location.pathname === item.path && "bg-sidebar-accent text-sidebar-foreground"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border py-4">
        <div className="flex flex-col px-4 gap-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sidebar-foreground text-sm font-medium">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">{user?.email || "Admin"}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground flex gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
}

export default Sidebar;
