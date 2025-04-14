
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast.error("Please select an image to upload");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Post created successfully!");
      setIsLoading(false);
      setCaption("");
      setSelectedImage(null);
      setPreviewUrl(null);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="image">Image</Label>
        <div className="flex flex-col gap-4">
          {previewUrl ? (
            <div className="relative rounded-md overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-auto max-h-[300px] object-cover"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2"
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewUrl(null);
                }}
              >
                Change Image
              </Button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50"
              onClick={() => document.getElementById('image')?.click()}
            >
              <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload an image</p>
            </div>
          )}
          <Input
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
      
      <div className="grid w-full gap-1.5">
        <Label htmlFor="caption">Caption (optional)</Label>
        <Textarea
          id="caption"
          placeholder="Write a caption..."
          className="resize-none"
          maxLength={280}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div className="text-xs text-muted-foreground text-right">
          {caption.length}/280
        </div>
      </div>
      
      <Button type="submit" className="w-full gradient-bg text-white hover:opacity-90" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Creating Post...
          </>
        ) : (
          "Create Post"
        )}
      </Button>
    </form>
  );
}
