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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewEditDialogOpen, setIsViewEditDialogOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Examination",
    status: "Active",
    date: new Date().toISOString().split("T")[0],
    attachment: null as File | null
  });
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [editMode, setEditMode] = useState(false);

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
    if (!formData.title || !formData.content || !formData.category || !formData.status || !formData.date) {
      toast.error("Please Fill All Fields");
      return;
    }
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("status", formData.status);
      data.append("date", formData.date);
      if (formData.attachment) data.append("attachment", formData.attachment);
      await noticesAPI.createWithAttachment(data);
      await fetchNotices();
      setIsAddDialogOpen(false);
      setFormData({
        title: "",
        content: "",
        category: "Examination",
        status: "Active",
        date: new Date().toISOString().split("T")[0],
        attachment: null
      });
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
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
                      <select
                        id="category"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1.5 w-full border rounded px-2 py-2"
                      >
                        <option value="Examination">Examination</option>
                        <option value="Event">Event</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Admission">Admission</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-xs font-medium">Status *</Label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1.5 w-full border rounded px-2 py-2"
                      >
                        <option value="Active">Active</option>
                        <option value="Important">Important</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-xs font-medium">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="attachment" className="text-xs font-medium">Attachment (Optional)</Label>
                      <Input
                        id="attachment"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.txt"
                        onChange={e => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
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
              <Button size="sm" variant="outline" className="gap-2" onClick={() => { setSelectedNotice(notice); setEditMode(false); setIsViewEditDialogOpen(true); }}>
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => { setSelectedNotice(notice); setEditMode(true); setIsViewEditDialogOpen(true); }}>
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button size="sm" variant="destructive" className="gap-2" onClick={() => handleDeleteNotice(notice.id)}>
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* View/Edit Modal */}
      <Dialog open={isViewEditDialogOpen && selectedNotice !== null} onOpenChange={(open) => { setIsViewEditDialogOpen(open); if (!open) { setSelectedNotice(null); setEditMode(false); } }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Notice" : "Notice Details"}</DialogTitle>
          </DialogHeader>
          {selectedNotice && !editMode && (
            <div className="space-y-2">
              <div className="font-bold text-lg">{selectedNotice.title}</div>
              <div className="text-sm text-muted-foreground">{new Date(selectedNotice.date).toLocaleDateString()}</div>
              <div className="text-xs font-medium">Category: {selectedNotice.category}</div>
              <div className="text-xs font-medium">Status: {selectedNotice.status}</div>
              <div className="mt-2">{selectedNotice.content}</div>
              {selectedNotice.attachment && (
                <a href={`http://localhost:8000/static/${selectedNotice.attachment}`} target="_blank" rel="noopener noreferrer" className="text-primary underline block mt-2" download>
                  Download Attachment
                </a>
              )}
              <div className="flex justify-end mt-4">
                <Button onClick={() => { setEditMode(true); }}>Edit</Button>
              </div>
            </div>
          )}
          {selectedNotice && editMode && (
            <div className="space-y-3">
              <Input
                value={selectedNotice.title}
                onChange={e => setSelectedNotice({ ...selectedNotice, title: e.target.value })}
                placeholder="Title"
              />
              <Textarea
                value={selectedNotice.content}
                onChange={e => setSelectedNotice({ ...selectedNotice, content: e.target.value })}
                placeholder="Content"
              />
              <select
                value={selectedNotice.category}
                onChange={e => setSelectedNotice({ ...selectedNotice, category: e.target.value })}
                className="w-full border rounded px-2 py-2"
              >
                <option value="Examination">Examination</option>
                <option value="Event">Event</option>
                <option value="Meeting">Meeting</option>
                <option value="Admission">Admission</option>
                <option value="General">General</option>
              </select>
              <select
                value={selectedNotice.status}
                onChange={e => setSelectedNotice({ ...selectedNotice, status: e.target.value })}
                className="w-full border rounded px-2 py-2"
              >
                <option value="Active">Active</option>
                <option value="Important">Important</option>
              </select>
              <Input
                type="date"
                value={selectedNotice.date}
                onChange={e => setSelectedNotice({ ...selectedNotice, date: e.target.value })}
              />
              {/* Attachment Editing Not Supported Here For Simplicity */}
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                <Button onClick={async () => {
                  // Save changes
                  try {
                    if (selectedNotice && selectedNotice.id) {
                      await noticesAPI.update(selectedNotice.id, selectedNotice);
                      await fetchNotices();
                      setIsViewEditDialogOpen(false);
                      setSelectedNotice(null);
                      setEditMode(false);
                      toast.success("Notice Updated Successfully");
                    }
                  } catch (error) {
                    toast.error("Failed To Update Notice");
                  }
                }}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notices;
