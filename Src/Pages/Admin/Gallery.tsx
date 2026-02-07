import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { Trash2, Upload, Image as ImageIcon, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/Components/ui/Dialog";
import { Label } from "@/Components/ui/Label";
import { Input } from "@/Components/ui/Input";
import { toast } from "sonner";
import { galleryAPI, GalleryImage } from "@/Services/Api";
import { useCloudinary } from "@/Hooks/Use-Cloudinary";

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { uploadImage, uploadVideo, isCloudinaryLoaded } = useCloudinary();
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    date: new Date().toISOString().split('T')[0],
    category: ""
  });

  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await galleryAPI.getAll();
      setImages(data);
    } catch (error) {
      toast.error("Failed To Fetch Images");
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async () => {
    console.log('handleAddImage called with formData:', formData);
    
    if (!formData.title || !formData.image_url || !formData.category) {
      toast.error("Please Fill All Required Fields And Upload An Image");
      console.error('Validation Failed:', { 
        title: formData.title, 
        image_url: formData.image_url, 
        category: formData.category 
      });
      return;
    }

    try {
      console.log('Sending to API:', formData);
      await galleryAPI.create(formData);
      await fetchImages();
      setIsDialogOpen(false);
      setFormData({
        title: "",
        image_url: "",
        date: new Date().toISOString().split('T')[0],
        category: ""
      });
      toast.success("Image Added Successfully");
    } catch (error) {
      console.error('Failed To Add Image:', error);
      toast.error("Failed To Add Image");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are You Sure You Want To Delete This Image?")) return;
    try {
      await galleryAPI.delete(id);
      await fetchImages();
      toast.success("Image Deleted Successfully");
    } catch (error) {
      toast.error("Failed To Delete Image");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gallery Management</h1>
          <p className="text-muted-foreground">Manage School Photos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col bg-gradient-to-br from-background to-secondary/20">
            <DialogHeader className="border-b pb-3 shrink-0">
              <DialogTitle className="text-2xl font-bold text-primary">Upload Media</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">Upload Images Or Videos To The Gallery</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 py-4 px-1">
              <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Media Details</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title" className="text-xs font-medium">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Annual Sports Day"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-xs font-medium">Category *</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Events, Campus, Academics"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-xs font-medium">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Upload Media</h3>
                <div className="space-y-3">
                  {formData.image_url && (
                    <div className="flex items-center justify-center p-4 bg-secondary/50 rounded-lg">
                      {formData.image_url.includes('.mp4') || formData.image_url.includes('.webm') ? (
                        <video src={formData.image_url} controls className="max-h-64 rounded-lg" />
                      ) : (
                        <img src={formData.image_url} alt="Preview" className="max-h-64 rounded-lg" />
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-24 border-dashed border-2 hover:border-primary hover:bg-primary/5 flex flex-col gap-2"
                      onClick={() => uploadImage((url) => {
                        console.log('Image Uploaded:', url);
                        setFormData(prev => ({ ...prev, image_url: url }));
                        toast.success('Image Uploaded Successfully');
                      })}
                      disabled={!isCloudinaryLoaded}
                    >
                      <ImageIcon className="h-8 w-8" />
                      <span className="text-xs">{isCloudinaryLoaded ? 'Upload Image' : 'Loading...'}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-24 border-dashed border-2 hover:border-primary hover:bg-primary/5 flex flex-col gap-2"
                      onClick={() => uploadVideo((url) => {
                        console.log('Video Uploaded:', url);
                        setFormData(prev => ({ ...prev, image_url: url }));
                        toast.success('Video Uploaded Successfully');
                      })}
                      disabled={!isCloudinaryLoaded}
                    >
                      <Video className="h-8 w-8" />
                      <span className="text-xs">{isCloudinaryLoaded ? 'Upload Video' : 'Loading...'}</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Click To Upload From Cloudinary</p>
                </div>
              </div>
              </div>
            </div>
            <div className="border-t pt-4 shrink-0">
              <Button onClick={handleAddImage} className="w-full h-11 text-base font-semibold">
                Add To Gallery
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading images...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img src={image.image_url} alt={image.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{image.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{new Date(image.date).toLocaleDateString()}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2 text-red-600 hover:text-red-700"
                  onClick={() => image.id && handleDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
