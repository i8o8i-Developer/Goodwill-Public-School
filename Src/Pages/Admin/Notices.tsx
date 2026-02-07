import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/Components/ui/Dialog";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";
import { toast } from "sonner";
import { noticesAPI, Notice } from "@/Services/Api";

const Notices = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", content: "", category: "General" });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await noticesAPI.getAll();
      setNotices(data);
    } catch (error) {
      toast.error("Failed To Fetch Notices");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNotice = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Please Fill All Fields");
      return;
    }

    try {
      await noticesAPI.create({
        ...formData,
        date: new Date().toISOString().split("T")[0],
        status: "Active",
      });
      await fetchNotices();
      setIsDialogOpen(false);
      setFormData({ title: "", content: "", category: "General" });
      toast.success("Notice Added Successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed To Add Notice");
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm("Are You Sure You Want To Delete This Notice?")) return;
    
    try {
      await noticesAPI.delete(id);
      await fetchNotices();
      toast.success("Notice Deleted Successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed To Delete Notice");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading Notices...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notices Management</h1>
          <p className="text-muted-foreground">Manage School Notices</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col bg-gradient-to-br from-background to-secondary/20">
            <DialogHeader className="border-b pb-3 shrink-0">
              <DialogTitle className="text-2xl font-bold text-primary">Add New Notice</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">Create And Publish A New School Notice</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 py-4 px-1">
              <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Notice Details</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title" className="text-xs font-medium">Notice Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter Notice Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-xs font-medium">Category *</Label>
                    <Input
                      id="category"
                      placeholder="e.g., General, Examination, Event"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content" className="text-xs font-medium">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Enter Notice Content"
                      rows={6}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="border-t pt-4 shrink-0">
              <Button onClick={handleAddNotice} className="w-full h-11 text-base font-semibold">
                Publish Notice
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notices.map((notice) => (
          <Card key={notice.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">{notice.title}</h3>
                <p className="text-sm text-muted-foreground">{new Date(notice.date).toLocaleDateString()}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 rounded text-xs font-medium">
                {notice.status}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{notice.content}</p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                View
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2 text-red-600 hover:text-red-700"
                onClick={() => handleDeleteNotice(notice.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notices;
