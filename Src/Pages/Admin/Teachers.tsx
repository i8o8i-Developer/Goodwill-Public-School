import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Search, Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/Components/ui/Dialog";
import { Label } from "@/Components/ui/Label";
import { toast } from "sonner";
import { teachersAPI, Teacher } from "@/Services/Api";
import { useCloudinary } from "@/Hooks/Use-Cloudinary";

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const { uploadImage, isCloudinaryLoaded } = useCloudinary();
  const [formData, setFormData] = useState({
    teacher_id: "",
    name: "",
    subject: "",
    qualification: "",
    experience: "",
    contact: "",
    email: "",
    photo: ""
  });

  useEffect(() => {
    console.log('Teacher Form Data Updated:', formData);
  }, [formData]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await teachersAPI.getAll();
      setTeachers(data);
    } catch (error) {
      toast.error("Failed To Fetch Teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeacher = async () => {
    console.log('handleAddTeacher called with formData:', formData);
    
    if (!formData.name || !formData.subject || !formData.qualification || !formData.experience) {
      toast.error("Please Fill All Required Fields");
      console.error('Validation Failed:', formData);
      return;
    }

    try {
      if (isEditMode && editingTeacherId) {
        // Don't Send teacher_id In Update - It's In The URL Path
        const { teacher_id, ...updateData } = formData;
        await teachersAPI.update(editingTeacherId, updateData);
        toast.success("Teacher Updated Successfully!");
      } else {
        // Don't Send teacher_id For New Teachers - Let Backend Generate It
        const { teacher_id, ...submitData } = formData;
        console.log('Sending Teacher Data To API:', submitData);
        await teachersAPI.create(submitData);
        toast.success("Teacher Added Successfully");
      }
      
      setIsDialogOpen(false);
      setIsEditMode(false);
      setEditingTeacherId(null);
      setFormData({
        teacher_id: "",
        name: "",
        subject: "",
        qualification: "",
        experience: "",
        contact: "",
        email: "",
        photo: ""
      });
      await fetchTeachers();
    } catch (error) {
      console.error('Failed To Add/Update Teacher:', error);
      toast.error("Failed To Add/Update Teacher");
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setIsEditMode(true);
    setEditingTeacherId(teacher.teacher_id);
    setFormData({
      teacher_id: teacher.teacher_id,
      name: teacher.name,
      subject: teacher.subject,
      qualification: teacher.qualification,
      experience: teacher.experience,
      contact: teacher.contact || "",
      email: teacher.email || "",
      photo: teacher.photo || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are You Sure You Want To Delete This Teacher?")) return;
    try {
      await teachersAPI.delete(id);
      await fetchTeachers();
      toast.success("Teacher Deleted Successfully");
    } catch (error) {
      toast.error("Failed To Delete Teacher");
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Teachers Management</h1>
          <p className="text-muted-foreground">Manage Teacher Records</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setIsEditMode(false);
            setEditingTeacherId(null);
            setFormData({
              teacher_id: "",
              name: "",
              subject: "",
              qualification: "",
              experience: "",
              contact: "",
              email: "",
              photo: ""
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-gradient-to-br from-background to-secondary/20">
            <DialogHeader className="border-b pb-3 shrink-0">
              <DialogTitle className="text-2xl font-bold text-primary">{isEditMode ? "Edit Teacher" : "Add New Teacher"}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">Fill In The Teacher Details Below</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 py-4 px-1">
              <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Basic Information</h3>
                <div className="space-y-3">
                  {isEditMode && (
                    <div>
                      <Label htmlFor="teacher_id" className="text-xs font-medium">Teacher ID</Label>
                      <Input
                        id="teacher_id"
                        value={formData.teacher_id}
                        disabled
                        className="mt-1.5 bg-muted"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="name" className="text-xs font-medium">Teacher Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Professional Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject" className="text-xs font-medium">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="e.g., Mathematics"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="qualification" className="text-xs font-medium">Qualification *</Label>
                      <Input
                        id="qualification"
                        placeholder="e.g., M.Sc., B.Ed."
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience" className="text-xs font-medium">Experience *</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 5 Years"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    {/* Joining Date Removed For Model Alignment */}
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="teacher@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact" className="text-xs font-medium">Contact</Label>
                      <Input
                        id="contact"
                        placeholder="+91 9876543210"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Profile Photo</h3>
                <div className="space-y-3">
                  {formData.photo && (
                    <div className="flex items-center justify-center p-4 bg-secondary/50 rounded-lg">
                      <img src={formData.photo} alt="Preview" className="h-32 w-32 object-cover rounded-full border-4 border-primary" />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 border-dashed border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => uploadImage((url) => {
                      console.log('Teacher Photo Uploaded:', url);
                      setFormData(prev => ({ ...prev, photo: url }));
                      toast.success('Photo Uploaded Successfully!');
                    })}
                    disabled={!isCloudinaryLoaded}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {!isCloudinaryLoaded ? 'Loading Cloudinary...' : (formData.photo ? 'Change Photo' : 'Upload Photo From Cloudinary')}
                  </Button>
                </div>
              </div>
              </div>
            </div>
            <div className="border-t pt-4 shrink-0">
              <Button onClick={handleAddTeacher} className="w-full h-11 text-base font-semibold">
                {isEditMode ? "Update Teacher" : "Add Teacher"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search By Name Or Subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading Teachers...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  {teacher.photo ? (
                    <img src={teacher.photo} alt={teacher.name} className="w-16 h-16 object-cover rounded-full border-2 border-primary" />
                  ) : (
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {teacher.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEdit(teacher)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600" onClick={() => teacher.teacher_id && handleDelete(teacher.teacher_id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{teacher.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{teacher.subject}</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Qualification:</strong> {teacher.qualification}</p>
                  <p><strong>Experience:</strong> {teacher.experience}</p>
                  <p><strong>Contact:</strong> {teacher.contact}</p>
                  <p><strong>Email:</strong> {teacher.email}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Teachers;
