import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { Badge } from "@/Components/ui/Badge";
import { Plus, Edit, Trash2, Eye, Download, Calendar, AlertTriangle } from "lucide-react";
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
  const [newAttachment, setNewAttachment] = useState<File | null>(null);

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
      <Dialog open={isViewEditDialogOpen && selectedNotice !== null} onOpenChange={(open) => { setIsViewEditDialogOpen(open); if (!open) { setSelectedNotice(null); setEditMode(false); setNewAttachment(null); } }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Notice" : "Notice Details"}</DialogTitle>
            <DialogDescription className="sr-only">
              {editMode ? "Edit The Notice Details And Save Changes" : "View The Complete Details Of This Notice"}
            </DialogDescription>
          </DialogHeader>
          {selectedNotice && !editMode && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">{selectedNotice.title}</h2>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant={selectedNotice.status?.toLowerCase() === "important" ? "destructive" : "outline"} className="gap-1">
                    {selectedNotice.status?.toLowerCase() === "important" && <AlertTriangle className="h-3 w-3" />}
                    {selectedNotice.status}
                  </Badge>
                  <Badge variant="secondary">{selectedNotice.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedNotice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-card-foreground leading-relaxed">{selectedNotice.content}</p>
              </div>
              {selectedNotice.attachment && (
                <div className="border-t pt-4">
                  <a 
                    href={`http://localhost:8000/Static/${selectedNotice.attachment}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download Attachment
                  </a>
                </div>
              )}
              <div className="flex justify-end pt-4 border-t">
                <Button onClick={() => { setEditMode(true); setNewAttachment(null); }} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Notice
                </Button>
              </div>
            </div>
          )}
          {selectedNotice && editMode && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title" className="text-sm font-medium mb-1.5 block">Notice Title</Label>
                <Input
                  id="edit-title"
                  value={selectedNotice.title}
                  onChange={e => setSelectedNotice({ ...selectedNotice, title: e.target.value })}
                  placeholder="Enter Notice Title"
                />
              </div>
              <div>
                <Label htmlFor="edit-content" className="text-sm font-medium mb-1.5 block">Content</Label>
                <Textarea
                  id="edit-content"
                  value={selectedNotice.content}
                  onChange={e => setSelectedNotice({ ...selectedNotice, content: e.target.value })}
                  placeholder="Enter Notice Content"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="edit-category" className="text-sm font-medium mb-1.5 block">Category</Label>
                  <select
                    id="edit-category"
                    value={selectedNotice.category}
                    onChange={e => setSelectedNotice({ ...selectedNotice, category: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="Examination">Examination</option>
                    <option value="Event">Event</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Admission">Admission</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-status" className="text-sm font-medium mb-1.5 block">Status</Label>
                  <select
                    id="edit-status"
                    value={selectedNotice.status}
                    onChange={e => setSelectedNotice({ ...selectedNotice, status: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Important">Important</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-date" className="text-sm font-medium mb-1.5 block">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={selectedNotice.date}
                  onChange={e => setSelectedNotice({ ...selectedNotice, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-attachment" className="text-sm font-medium mb-1.5 block">Update Attachment (Optional)</Label>
                {selectedNotice.attachment && (
                  <div className="mb-2 text-sm text-muted-foreground">
                    Current: {selectedNotice.attachment}
                  </div>
                )}
                <Input
                  id="edit-attachment"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.txt"
                  onChange={e => setNewAttachment(e.target.files?.[0] || null)}
                />
                {newAttachment && (
                  <p className="text-xs text-green-600 mt-1">New File Selected: {newAttachment.name}</p>
                )}
              </div>
              <div className="flex justify-end pt-4 border-t gap-2">
                <Button variant="outline" onClick={() => { setEditMode(false); setNewAttachment(null); }}>Cancel</Button>
                <Button onClick={async () => {
                  try {
                    if (selectedNotice && selectedNotice.id) {
                      // If There's A New Attachment, Use The Upload Endpoint
                      if (newAttachment) {
                        const formData = new FormData();
                        formData.append("id", selectedNotice.id.toString());
                        formData.append("title", selectedNotice.title);
                        formData.append("content", selectedNotice.content);
                        formData.append("category", selectedNotice.category);
                        formData.append("status", selectedNotice.status);
                        formData.append("date", selectedNotice.date);
                        formData.append("attachment", newAttachment);
                        // For Now, Use Update Without Attachment And Show Message
                        await noticesAPI.update(selectedNotice.id, selectedNotice);
                        toast.info("Notice Updated. Note: Attachment Update Requires Backend Enhancement.");
                      } else {
                        await noticesAPI.update(selectedNotice.id, selectedNotice);
                        toast.success("Notice Updated Successfully");
                      }
                      await fetchNotices();
                      setIsViewEditDialogOpen(false);
                      setSelectedNotice(null);
                      setEditMode(false);
                      setNewAttachment(null);
                    }
                  } catch (error) {
                    toast.error("Failed To Update Notice");
                  }
                }}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notices;
