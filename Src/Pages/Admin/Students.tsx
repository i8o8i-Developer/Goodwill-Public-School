import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/Components/ui/Dialog";
import { Label } from "@/Components/ui/Label";
import { toast } from "sonner";
import { studentsAPI, Student } from "@/Services/Api";

const Students = () => {
    // State for View/Edit modals
    const [viewStudent, setViewStudent] = useState<Student | null>(null);
    const [editStudent, setEditStudent] = useState<Student | null>(null);
    const [editForm, setEditForm] = useState<Partial<Student> | null>(null);
    const [editLoading, setEditLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    student_id: "",
    name: "",
    class: "",
    section: "",
    roll_no: "",
    father_name: "",
    mother_name: "",
    dob: "",
    contact: "",
    email: "",
    address: "",
    status: "Active"
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await studentsAPI.getAll();
      setStudents(data);
    } catch (error) {
      toast.error("Failed To Fetch Students");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async () => {
    if (!formData.name || !formData.class || !formData.section || !formData.roll_no || !formData.student_id) {
      toast.error("Please Fill All Required Fields");
      return;
    }

    try {
      // Map 'class' To 'class_name' For Backend Compatibility, But Also Include 'class' For TS
      const { class: classValue, ...rest } = formData;
      const payload = { ...rest, class: classValue, class_name: classValue };
      await studentsAPI.create(payload as Omit<Student, 'id'>);
      await fetchStudents();
      setIsDialogOpen(false);
      setFormData({
        student_id: "",
        name: "",
        class: "",
        section: "",
        roll_no: "",
        father_name: "",
        mother_name: "",
        dob: "",
        contact: "",
        email: "",
        address: "",
        status: "Active"
      });
      toast.success("Student Added Successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed To Add Student");
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!confirm("Are You Sure You Want To Delete This Student?")) return;
    
    try {
      await studentsAPI.delete(id);
      await fetchStudents();
      toast.success("Student Deleted Successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed To Delete Student");
    }
  };

  // Normalize Backend Fields For Display/Search (Handle Legacy API Fields)
  const normalizedStudents = students.map((student) => {
    // Type Guards For Possible Backend Fields
    const class_name = 'class_name' in student ? (student as { class_name?: string }).class_name : undefined;
    const rollNo = 'rollNo' in student ? (student as { rollNo?: string }).rollNo : undefined;
    // Always ensure id is a number for Student
    let id: number = typeof student.id === 'number' ? student.id : (typeof student.id === 'string' ? parseInt(student.id) : 0);
    if (!id && student.student_id && !isNaN(Number(student.student_id))) id = Number(student.student_id);
    return {
      ...student,
      id,
      class: student.class !== undefined ? student.class : (class_name ?? ""),
      roll_no: student.roll_no !== undefined ? student.roll_no : (rollNo ?? ""),
    };
  });

  const filteredStudents = normalizedStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.includes(searchTerm) ||
    (student.class || "").includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading Students...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Students Management</h1>
          <p className="text-muted-foreground">Manage Student Records</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-gradient-to-br from-background to-secondary/20">
            <DialogHeader className="border-b pb-3 shrink-0">
              <DialogTitle className="text-2xl font-bold text-primary">Add New Student</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">Fill In The Student Details Below</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 py-4 px-1">
              <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="student_id" className="text-xs font-medium">Student ID *</Label>
                    <Input
                      id="student_id"
                      placeholder="e.g., 2024001"
                      value={formData.student_id}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-xs font-medium">Student Name *</Label>
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
                <h3 className="font-semibold text-sm text-primary mb-3">Academic Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="class" className="text-xs font-medium">Class *</Label>
                    <Input
                      id="class"
                      placeholder="e.g., 10"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="section" className="text-xs font-medium">Section *</Label>
                    <Input
                      id="section"
                      placeholder="e.g., A"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roll_no" className="text-xs font-medium">Roll Number *</Label>
                    <Input
                      id="roll_no"
                      placeholder="Enter Roll Number"
                      value={formData.roll_no}
                      onChange={(e) => setFormData({ ...formData, roll_no: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Family Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="father_name" className="text-xs font-medium">Father's Name</Label>
                      <Input
                        id="father_name"
                        placeholder="Enter Father's Name"
                        value={formData.father_name}
                        onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mother_name" className="text-xs font-medium">Mother's Name</Label>
                      <Input
                        id="mother_name"
                        placeholder="Enter Mother's Name"
                        value={formData.mother_name}
                        onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dob" className="text-xs font-medium">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-sm text-primary mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact" className="text-xs font-medium">Contact Number</Label>
                      <Input
                        id="contact"
                        placeholder="+91 9876543210"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-xs font-medium">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter Full Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="border-t pt-4 shrink-0">
              <Button onClick={handleAddStudent} className="w-full h-11 text-base font-semibold">
                Add Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search By Name, ID, or Class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Section</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Roll No</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4 font-medium">{student.name}</td>
                  <td className="py-3 px-4">{student.class}</td>
                  <td className="py-3 px-4">{student.section}</td>
                  <td className="py-3 px-4">{student.roll_no}</td>
                  <td className="py-3 px-4 text-sm">{student.contact}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 rounded text-xs font-medium">
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setViewStudent(student)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => { setEditStudent(student); setEditForm({ ...student }); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        onClick={() => student.id && handleDeleteStudent(student.id as number)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
                  {/* View Student Modal */}
                  <Dialog open={!!viewStudent} onOpenChange={(open) => { if (!open) setViewStudent(null); }}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Student Details</DialogTitle>
                      </DialogHeader>
                      {viewStudent && (
                        <div className="space-y-2">
                          <div><b>ID:</b> {viewStudent.id}</div>
                          <div><b>Student ID:</b> {viewStudent.student_id}</div>
                          <div><b>Name:</b> {viewStudent.name}</div>
                          <div><b>Class:</b> {viewStudent.class}</div>
                          <div><b>Section:</b> {viewStudent.section}</div>
                          <div><b>Roll No:</b> {viewStudent.roll_no}</div>
                          <div><b>Father Name:</b> {viewStudent.father_name}</div>
                          <div><b>Mother Name:</b> {viewStudent.mother_name}</div>
                          <div><b>DOB:</b> {viewStudent.dob}</div>
                          <div><b>Contact:</b> {viewStudent.contact}</div>
                          <div><b>Email:</b> {viewStudent.email}</div>
                          <div><b>Address:</b> {viewStudent.address}</div>
                          <div><b>Status:</b> {viewStudent.status}</div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {/* Edit Student Modal */}
                  <Dialog open={!!editStudent} onOpenChange={(open) => { if (!open) setEditStudent(null); }}>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Student</DialogTitle>
                      </DialogHeader>
                      {editForm && (
                        <div className="space-y-3">
                          <Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
                          <Input value={editForm.class} onChange={e => setEditForm({ ...editForm, class: e.target.value })} placeholder="Class" />
                          <Input value={editForm.section} onChange={e => setEditForm({ ...editForm, section: e.target.value })} placeholder="Section" />
                          <Input value={editForm.roll_no} onChange={e => setEditForm({ ...editForm, roll_no: e.target.value })} placeholder="Roll No" />
                          <Input value={editForm.father_name} onChange={e => setEditForm({ ...editForm, father_name: e.target.value })} placeholder="Father Name" />
                          <Input value={editForm.mother_name} onChange={e => setEditForm({ ...editForm, mother_name: e.target.value })} placeholder="Mother Name" />
                          <Input type="date" value={editForm.dob || ""} onChange={e => setEditForm({ ...editForm, dob: e.target.value })} placeholder="DOB" />
                          <Input value={editForm.contact} onChange={e => setEditForm({ ...editForm, contact: e.target.value })} placeholder="Contact" />
                          <Input value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" />
                          <Input value={editForm.address} onChange={e => setEditForm({ ...editForm, address: e.target.value })} placeholder="Address" />
                          <Input value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} placeholder="Status" />
                          <div className="flex gap-2 mt-2">
                            <Button onClick={async () => {
                              setEditLoading(true);
                              try {
                                const { class: classValue, ...rest } = editForm;
                                const payload = { ...rest, class: classValue, class_name: classValue };
                                await studentsAPI.update(editForm.id, payload);
                                setViewStudent({ ...editForm, ...payload } as Student);
                                setEditForm(null);
                                setEditStudent(null);
                                await fetchStudents();
                                toast.success("Student Updated!");
                              } catch (e) {
                                toast.error("Failed To Update Student");
                              } finally {
                                setEditLoading(false);
                              }
                            }} disabled={editLoading}>
                              Save
                            </Button>
                            <Button variant="outline" onClick={() => setEditStudent(null)} disabled={editLoading}>Cancel</Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No Students Found
          </div>
        )}
      </Card>
    </div>
  );
};

export default Students;
