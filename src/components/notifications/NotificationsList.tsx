
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Bell, Heart, MessageCircle, User, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type NotificationType = "like" | "comment" | "follow" | "mention";

interface Notification {
  id: string;
  type: NotificationType;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  post?: {
    id: string;
    image: string;
  };
  createdAt: Date;
  read: boolean;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      id: "user1",
      username: "artlover22",
      avatar: "https://source.unsplash.com/random/100x100?face=5"
    },
    post: {
      id: "post1",
      image: "https://source.unsplash.com/random/100x100?colorful=1"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false
  },
  {
    id: "2",
    type: "comment",
    user: {
      id: "user2",
      username: "design_guru",
      avatar: "https://source.unsplash.com/random/100x100?face=2"
    },
    post: {
      id: "post2",
      image: "https://source.unsplash.com/random/100x100?colorful=2"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false
  },
  {
    id: "3",
    type: "follow",
    user: {
      id: "user3",
      username: "color_explorer",
      avatar: "https://source.unsplash.com/random/100x100?face=3"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true
  },
  {
    id: "4",
    type: "mention",
    user: {
      id: "user4",
      username: "palettes365",
      avatar: "https://source.unsplash.com/random/100x100?face=4"
    },
    post: {
      id: "post3",
      image: "https://source.unsplash.com/random/100x100?colorful=3"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true
  }
];

export function NotificationsList() {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };
  
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-c0lor-purple" />;
      case "mention":
        return <User className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-foreground" />;
    }
  };
  
  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "like":
        return "liked your post";
      case "comment":
        return "commented on your post";
      case "follow":
        return "started following you";
      case "mention":
        return "mentioned you in a comment";
      default:
        return "interacted with your content";
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-2 px-4">
        <h3 className="font-semibold text-lg">Notifications</h3>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead} 
            className="text-sm text-c0lor-purple hover:text-c0lor-purple/80"
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-1 p-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-4 p-3 rounded-lg ${
                  notification.read ? "bg-background" : "bg-accent"
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.username} />
                  <AvatarFallback>{notification.user.username[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{notification.user.username}</span>
                    {getNotificationIcon(notification.type)}
                    <span className="text-muted-foreground text-sm">
                      {getNotificationText(notification)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                  </p>
                </div>
                
                {notification.post && (
                  <div className="flex-shrink-0">
                    <img 
                      src={notification.post.image} 
                      alt="Post" 
                      className="h-12 w-12 rounded-md object-cover" 
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              <Bell className="mx-auto h-10 w-10 opacity-50 mb-2" />
              <p>No notifications yet</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
