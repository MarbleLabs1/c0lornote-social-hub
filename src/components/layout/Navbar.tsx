
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePostForm } from "@/components/posts/CreatePostForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center justify-between w-full gap-4 md:gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">c0lornote</span>
          </Link>
          
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-4">
            <div className="relative w-full max-w-sm">
              {isSearchOpen ? (
                <div className="absolute inset-0 flex items-center">
                  <Input 
                    className="h-9 w-full rounded-md pr-12" 
                    placeholder="Search posts, users, tags..." 
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-0 top-0 h-9 w-9"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-9 px-0 md:w-auto md:px-4"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline-flex">Search</span>
                </Button>
              )}
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gradient-bg text-white hover:opacity-90">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Post
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

            <ThemeToggle />
          </div>
          
          <div className="flex md:hidden gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="gradient-bg text-white hover:opacity-90">
                  <PlusCircle className="h-4 w-4" />
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

            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-2">
          <Input 
            className="h-9 w-full rounded-md" 
            placeholder="Search posts, users, tags..." 
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
