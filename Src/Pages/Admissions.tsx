import Layout from "@/Components/Layout/Layout";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Textarea } from "@/Components/ui/Textarea";
import { Label } from "@/Components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/Select";
import { CalendarDays, FileText, CheckCircle, Clock, GraduationCap } from "lucide-react";
import heroSchool from "@/Assets/Hero-School.png";
import { useState } from "react";
import { toast } from "sonner";
import { admissionsAPI } from "@/Services/Api";

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    classApplying: "",
    parentName: "",
    relation: "",
    phone: "",
    email: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Map Frontend Fields To Backend Expected Fields
      const payload = {
        student_name: formData.studentName,
        dob: formData.dob,
        class_name: formData.classApplying,
        father_name: formData.relation === "father" ? formData.parentName : "",
        mother_name: formData.relation === "mother" ? formData.parentName : "",
        contact: formData.phone,
        email: formData.email,
        address: formData.address,
      };
      await fetch("http://localhost:8000/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Application Submitted Successfully! We Will Contact You Soon.");
      setFormData({
        studentName: "",
        dob: "",
        classApplying: "",
        parentName: "",
        relation: "",
        phone: "",
        email: "",
        address: "",
      });
    } catch (error) {
      toast.error("Failed To Submit Application. Please Try Again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroSchool} alt="Admissions" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
            <p className="text-lg opacity-90">Join The Goodwill Family</p>
          </div>
        </div>
      </section>

      {/* Admission Info */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Session 2026-27
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Admissions Now Open
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We Invite Applications For Admission To Nursery Through Class IX For The 
              Academic Session 2026-27. Limited Seats Available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: CalendarDays, title: "Application Start", value: "January 15, 2026" },
              { icon: Clock, title: "Last Date", value: "March 31, 2026" },
              { icon: GraduationCap, title: "Classes Available", value: "Nursery to IX" },
              { icon: FileText, title: "Age Criteria", value: "As per CBSE norms" },
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-lg text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-card-foreground mb-1">{item.title}</h3>
                <p className="text-primary font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Admission Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Admission Process</h3>
              <div className="space-y-4">
                {[
                  "Fill And Submit The Online Admission Form",
                  "Submit Required Documents At The School Office",
                  "Student Interaction / Assessment (For Applicable Classes)",
                  "Parent Interview With The Principal",
                  "Admission Confirmation And Fee Payment",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Required Documents</h3>
              <ul className="space-y-3">
                {[
                  "Birth Certificate (Original & Photocopy)",
                  "Aadhar Card Of Student And Parents",
                  "Transfer Certificate (For Class II Onwards)",
                  "Report Card Of Previous Class",
                  "4 Passport Size Photographs",
                  "Address Proof",
                ].map((doc, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Admission Form */}
            <div className="bg-card border border-border p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Online Admission Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="studentName">Student's Full Name *</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    placeholder="Enter Student's Name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">Date Of Birth *</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="classApplying">Class Applying For *</Label>
                    <Select 
                      value={formData.classApplying} 
                      onValueChange={(value) => setFormData({...formData, classApplying: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nursery">Nursery</SelectItem>
                        <SelectItem value="lkg">LKG</SelectItem>
                        <SelectItem value="ukg">UKG</SelectItem>
                        <SelectItem value="1">Class I</SelectItem>
                        <SelectItem value="2">Class II</SelectItem>
                        <SelectItem value="3">Class III</SelectItem>
                        <SelectItem value="4">Class IV</SelectItem>
                        <SelectItem value="5">Class V</SelectItem>
                        <SelectItem value="6">Class VI</SelectItem>
                        <SelectItem value="7">Class VII</SelectItem>
                        <SelectItem value="8">Class VIII</SelectItem>
                        <SelectItem value="9">Class IX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      placeholder="Enter Parent's Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relation">Relation *</Label>
                    <Select 
                      value={formData.relation} 
                      onValueChange={(value) => setFormData({...formData, relation: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Relation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter Complete Address"
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
