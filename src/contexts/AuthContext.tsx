
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved auth state on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("c0lornote_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data", err);
        localStorage.removeItem("c0lornote_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        const mockUser: User = {
          id: "user-1",
          username: "c0lornote_user",
          email,
          avatar: "https://source.unsplash.com/random/400x400?portrait"
        };
        
        setUser(mockUser);
        localStorage.setItem("c0lornote_user", JSON.stringify(mockUser));
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful registration
        const mockUser: User = {
          id: "user-" + Date.now(),
          username,
          email,
          avatar: "https://source.unsplash.com/random/400x400?portrait"
        };
        
        setUser(mockUser);
        localStorage.setItem("c0lornote_user", JSON.stringify(mockUser));
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("c0lornote_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
