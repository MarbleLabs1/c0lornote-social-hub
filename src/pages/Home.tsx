
import { PostCard, Post } from "@/components/posts/PostCard";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data
const posts: Post[] = [
  {
    id: "1",
    user: {
      id: "user1",
      username: "sarah_designs",
      avatar: "https://source.unsplash.com/random/100x100?face=1",
    },
    image: "https://source.unsplash.com/random/600x600?colorful=1",
    caption: "Colors inspire creativity! What's your favorite color? 🎨 #colors #design #creativity",
    likes: 342,
    comments: 23,
    createdAt: new Date("2023-07-15T10:30:00"),
    bookmarked: false,
    liked: true,
  },
  {
    id: "2",
    user: {
      id: "user2",
      username: "travel_mike",
      avatar: "https://source.unsplash.com/random/100x100?face=2",
    },
    image: "https://source.unsplash.com/random/600x600?colorful=2",
    caption: "Found this amazing spot during my hike today! The colors were just incredible in person.",
    likes: 189,
    comments: 14,
    createdAt: new Date("2023-07-14T14:45:00"),
    bookmarked: true,
    liked: false,
  },
  {
    id: "3",
    user: {
      id: "user3",
      username: "color_explorer",
      avatar: "https://source.unsplash.com/random/100x100?face=3",
    },
    image: "https://source.unsplash.com/random/600x600?colorful=3",
    caption: "New palette inspiration from today's sunset. Nature is the best designer.",
    likes: 567,
    comments: 42,
    createdAt: new Date("2023-07-13T19:20:00"),
    bookmarked: false,
    liked: false,
  },
];

export default function Home() {
  return (
    <div className="container max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="pb-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
