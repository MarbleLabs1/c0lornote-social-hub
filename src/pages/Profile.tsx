
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid3X3, Bookmark, Heart } from "lucide-react";

// Mock user data
const user = {
  id: "user1",
  username: "sarah_designs",
  avatar: "https://source.unsplash.com/random/200x200?face=1",
  fullName: "Sarah Johnson",
  bio: "Digital artist • Color enthusiast • Creating vibrant worlds 🎨",
  website: "sarahdesigns.com",
  postsCount: 42,
  followers: 1248,
  following: 305,
  isFollowing: false,
};

// Mock posts data
const posts = Array(9).fill(null).map((_, i) => ({
  id: `post-${i+1}`,
  image: `https://source.unsplash.com/random/300x300?colorful=${i+1}`,
}));

export default function Profile() {
  return (
    <div className="container max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <Avatar className="w-20 h-20 md:w-32 md:h-32">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="flex gap-2">
              <Button className="gradient-bg text-white hover:opacity-90">
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
          
          <div className="flex gap-6 mb-4">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-bold">{user.postsCount}</span>
              <span className="text-sm text-muted-foreground">Posts</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-bold">{user.followers}</span>
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-bold">{user.following}</span>
              <span className="text-sm text-muted-foreground">Following</span>
            </div>
          </div>
          
          <div>
            {user.fullName && <p className="font-medium">{user.fullName}</p>}
            {user.bio && <p className="whitespace-pre-wrap">{user.bio}</p>}
            {user.website && (
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-c0lor-blue hover:underline"
              >
                {user.website}
              </a>
            )}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Saved</span>
          </TabsTrigger>
          <TabsTrigger value="liked" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Liked</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1 mt-6">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square bg-muted relative">
                <img 
                  src={post.image}
                  alt="Post thumbnail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="py-8 text-center">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved posts yet</h3>
            <p className="text-muted-foreground">
              Save posts to view them later
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="liked">
          <div className="py-8 text-center">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No liked posts yet</h3>
            <p className="text-muted-foreground">
              Posts you like will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
