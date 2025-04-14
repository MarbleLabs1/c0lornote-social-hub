
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Bookmark, MoreHorizontal, Send } from "lucide-react";
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
import { Input } from "@/components/ui/input";

export interface Post {
  id: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  image: string;
  caption?: string;
  likes: number;
  comments: number;
  createdAt: Date;
  bookmarked: boolean;
  liked: boolean;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comment, setComment] = useState("");

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
      // Here you would normally send the comment to the API
      setComment("");
    }
  };

  return (
    <Card className="max-w-xl w-full mx-auto border rounded-lg overflow-hidden mb-6">
      <CardHeader className="p-4 flex flex-row items-center space-x-4 space-y-0">
        <Link to={`/profile/${post.user.id}`} className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.user.avatar} alt={post.user.username} />
            <AvatarFallback>{post.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{post.user.username}</div>
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
      
      <Link to={`/post/${post.id}`}>
        <div className="relative aspect-square bg-muted">
          <img 
            src={post.image} 
            alt="Post" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>
      
      <CardContent className="p-4 pt-3">
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
            <Link to={`/post/${post.id}`}>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>
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
        
        {post.caption && (
          <p className="mt-1">
            <Link to={`/profile/${post.user.id}`} className="font-medium hover:underline mr-2">
              {post.user.username}
            </Link>
            {post.caption}
          </p>
        )}
        
        <Link to={`/post/${post.id}`} className="block text-sm text-muted-foreground mt-2">
          View all {post.comments} comments
        </Link>
        
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(post.createdAt, { addSuffix: true })}
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
    </Card>
  );
}
