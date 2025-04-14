
import { useState, useEffect } from "react";
import { PostCard, Post } from "@/components/posts/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for trending posts
const trendingPosts: Post[] = [
  {
    id: "trending1",
    user: {
      id: "user4",
      username: "digital_artist",
      avatar: "https://source.unsplash.com/random/100x100?face=4",
    },
    image: "https://source.unsplash.com/random/600x600?trending=1",
    caption: "My latest digital artwork exploration. #digitalart #vibrant",
    likes: 1243,
    comments: 87,
    createdAt: new Date("2023-07-15T09:15:00"),
    bookmarked: false,
    liked: true,
  },
  {
    id: "trending2",
    user: {
      id: "user5",
      username: "color_theory",
      avatar: "https://source.unsplash.com/random/100x100?face=5",
    },
    image: "https://source.unsplash.com/random/600x600?trending=2",
    caption: "Complementary colors create visual tension and excitement in designs. What's your favorite color combination?",
    likes: 952,
    comments: 56,
    createdAt: new Date("2023-07-14T16:30:00"),
    bookmarked: true,
    liked: false,
  },
  {
    id: "trending3",
    user: {
      id: "user6",
      username: "gradient_master",
      avatar: "https://source.unsplash.com/random/100x100?face=6",
    },
    image: "https://source.unsplash.com/random/600x600?trending=3",
    caption: "Experimenting with new gradient techniques. The transition between these colors was challenging but worth it!",
    likes: 745,
    comments: 43,
    createdAt: new Date("2023-07-13T11:20:00"),
    bookmarked: false,
    liked: false,
  },
];

// Mock data for random posts
const randomPosts: Post[] = [
  {
    id: "random1",
    user: {
      id: "user7",
      username: "hue_hunter",
      avatar: "https://source.unsplash.com/random/100x100?face=7",
    },
    image: "https://source.unsplash.com/random/600x600?random=1",
    caption: "Found this incredible color palette in the wild today!",
    likes: 432,
    comments: 21,
    createdAt: new Date("2023-07-15T08:45:00"),
    bookmarked: false,
    liked: false,
  },
  {
    id: "random2",
    user: {
      id: "user8",
      username: "palette_creator",
      avatar: "https://source.unsplash.com/random/100x100?face=8",
    },
    image: "https://source.unsplash.com/random/600x600?random=2",
    caption: "Just finished this new color palette generator tool. What do you think of these combinations?",
    likes: 285,
    comments: 34,
    createdAt: new Date("2023-07-14T13:15:00"),
    bookmarked: false,
    liked: true,
  },
  {
    id: "random3",
    user: {
      id: "user9",
      username: "visual_storyteller",
      avatar: "https://source.unsplash.com/random/100x100?face=9",
    },
    image: "https://source.unsplash.com/random/600x600?random=3",
    caption: "Colors tell stories. What story does this one tell you?",
    likes: 523,
    comments: 47,
    createdAt: new Date("2023-07-13T15:50:00"),
    bookmarked: true,
    liked: false,
  },
];

export default function Explore() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>

      <Tabs defaultValue="trending">
        <TabsList className="mb-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="random">Discover</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="pb-4">
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="max-w-xl w-full mx-auto border rounded-lg overflow-hidden mb-6">
                      <div className="p-4 flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="h-5 w-32 bg-muted animate-pulse" />
                      </div>
                      <div className="aspect-square bg-muted animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-5 w-full bg-muted animate-pulse" />
                        <div className="h-5 w-2/3 bg-muted animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {trendingPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="random">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="pb-4">
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="max-w-xl w-full mx-auto border rounded-lg overflow-hidden mb-6">
                      <div className="p-4 flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="h-5 w-32 bg-muted animate-pulse" />
                      </div>
                      <div className="aspect-square bg-muted animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-5 w-full bg-muted animate-pulse" />
                        <div className="h-5 w-2/3 bg-muted animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {randomPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
