import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 gradient-text">c0lornote</h1>
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
