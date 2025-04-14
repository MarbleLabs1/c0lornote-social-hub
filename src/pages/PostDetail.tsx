
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Bookmark, Send, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Post } from "@/components/posts/PostCard";
import { Separator } from "@/components/ui/separator";

// Mock post data
const mockPost: Post = {
  id: "post123",
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
};

// Mock comments
const mockComments = [
  {
    id: "comment1",
    user: {
      id: "user2",
      username: "design_lover",
      avatar: "https://source.unsplash.com/random/100x100?face=2",
    },
    content: "I'm a big fan of teal and purple combinations! Your work always inspires me!",
    createdAt: new Date("2023-07-15T11:05:00"),
    likes: 12,
  },
  {
    id: "comment2",
    user: {
      id: "user3",
      username: "color_theory",
      avatar: "https://source.unsplash.com/random/100x100?face=3",
    },
    content: "Great composition! The complementary colors really make this pop.",
    createdAt: new Date("2023-07-15T11:30:00"),
    likes: 8,
  },
  {
    id: "comment3",
    user: {
      id: "user4",
      username: "artsy_mind",
      avatar: "https://source.unsplash.com/random/100x100?face=4",
    },
    content: "I'm drawn to earth tones, but this vibrant palette is making me rethink my preferences! 😍",
    createdAt: new Date("2023-07-15T12:15:00"),
    likes: 5,
  },
];

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(mockPost.liked);
  const [isBookmarked, setIsBookmarked] = useState(mockPost.bookmarked);
  const [likesCount, setLikesCount] = useState(mockPost.likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: `comment-${Date.now()}`,
        user: {
          id: "currentUser",
          username: "current_user",
          avatar: "https://source.unsplash.com/random/100x100?face=10",
        },
        content: comment,
        createdAt: new Date(),
        likes: 0,
      };
      
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <div className="container max-w-4xl">
      <Card className="md:grid md:grid-cols-5 border rounded-lg overflow-hidden">
        <div className="bg-black md:col-span-3">
          <div className="relative aspect-square md:h-full">
            <img 
              src={mockPost.image} 
              alt="Post" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="md:col-span-2 flex flex-col">
          <CardHeader className="p-4 flex flex-row items-center space-x-4 space-y-0 border-b">
            <Link to={`/profile/${mockPost.user.id}`} className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockPost.user.avatar} alt={mockPost.user.username} />
                <AvatarFallback>{mockPost.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="font-medium">{mockPost.user.username}</div>
            </Link>
            
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                  <DropdownMenuItem>Follow</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <div className="p-4 flex-1 overflow-auto">
            {mockPost.caption && (
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockPost.user.avatar} alt={mockPost.user.username} />
                  <AvatarFallback>{mockPost.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-baseline gap-2">
                    <Link to={`/profile/${mockPost.user.id}`} className="font-medium hover:underline">
                      {mockPost.user.username}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(mockPost.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-1">{mockPost.caption}</p>
                </div>
              </div>
            )}
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.username} />
                    <AvatarFallback>{comment.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <Link to={`/profile/${comment.user.id}`} className="font-medium hover:underline">
                        {comment.user.username}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="mt-1">{comment.content}</p>
                    <div className="mt-1 flex items-center gap-4">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Like
                      </Button>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={isLiked ? "text-c0lor-pink" : "text-foreground"}
                    onClick={handleLike}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={isBookmarked ? "text-c0lor-purple" : "text-foreground"}
                  onClick={handleBookmark}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
              
              <div className="font-medium">{likesCount} likes</div>
              
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(mockPost.createdAt, { addSuffix: true })}
              </p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <form onSubmit={handleSubmitComment} className="flex w-full gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  variant="ghost"
                  disabled={!comment.trim()}
                >
                  Post
                </Button>
              </form>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
