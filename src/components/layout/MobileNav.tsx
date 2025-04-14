
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Heart, User, Bell, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePostForm } from "@/components/posts/CreatePostForm";

// Mock authentication state
const isAuthenticated = true;

export function MobileNav() {
  const location = useLocation();
  
  const navItems = [
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
      title: "Create",
      href: "#create",
      icon: PlusCircle,
      isSpecial: true
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
      requiresAuth: true,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
      requiresAuth: true,
    },
  ];

  const filteredNavItems = navItems.filter(
    item => !item.requiresAuth || isAuthenticated
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        {filteredNavItems.map((item) => {
          if (item.isSpecial) {
            return (
              <Dialog key={item.href}>
                <DialogTrigger asChild>
                  <Button 
                    key={item.href} 
                    variant="ghost" 
                    className="h-full w-full rounded-none flex flex-col items-center justify-center space-y-1"
                  >
                    <item.icon className="h-5 w-5 text-c0lor-purple" />
                    <span className="text-xs">{item.title}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create a new post</DialogTitle>
                    <DialogDescription>
                      Share your moment with the world. Upload an image and add a caption.
                    </DialogDescription>
                  </DialogHeader>
                  <CreatePostForm />
                </DialogContent>
              </Dialog>
            );
          }
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "h-full w-full flex flex-col items-center justify-center space-y-1",
                location.pathname === item.href ? "text-c0lor-purple" : "text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
