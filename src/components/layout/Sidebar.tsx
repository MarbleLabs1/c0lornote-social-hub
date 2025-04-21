
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Compass,
  Heart,
  User,
  LogOut,
  LogIn,
  Settings,
  Bell,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  requiresAuth?: boolean;
}

export function Sidebar() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Explore",
      href: "/explore",
      icon: Compass,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
      requiresAuth: true,
    },
    {
      title: "Saved",
      href: "/saved",
      icon: Bookmark,
      requiresAuth: true,
    },
    {
      title: "Liked",
      href: "/liked",
      icon: Heart,
      requiresAuth: true,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
      requiresAuth: true,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      requiresAuth: true,
    }
  ];

  const filteredNavItems = navItems.filter(
    item => !item.requiresAuth || isAuthenticated
  );
  
  const handleLogout = () => {
    logout();
    toast.success("You have been logged out successfully.");
  };

  return (
    <div className="hidden md:flex min-h-screen w-[220px] flex-col border-r bg-background">
      <ScrollArea className="flex-1 py-6">
        <nav className="grid gap-2 px-2">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                location.pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
        {isAuthenticated ? (
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        ) : (
          <Button 
            className="w-full gradient-bg text-white hover:opacity-90"
            onClick={() => location.pathname !== "/login" && (window.location.href = "/login")}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Log in
          </Button>
        )}
      </div>
    </div>
  );
}
