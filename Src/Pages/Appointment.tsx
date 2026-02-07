import Layout from "@/Components/Layout/Layout";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Textarea } from "@/Components/ui/Textarea";
import { Label } from "@/Components/ui/Label";
import { Calendar, Clock, MapPin, Phone, Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react";
import heroSchool from "@/Assets/Hero-School.png";
import { useState } from "react";
import { appointmentsAPI } from "@/Services/Api";
import { toast } from "sonner";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    purpose: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentsAPI.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        purpose: formData.purpose,
        status: "Pending"
      });
      toast.success("Appointment Request Submitted! We Will Contact You Soon To Confirm.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        purpose: "",
      });
    } catch (error) {
      toast.error("Failed To Submit Appointment. Please Try Again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroSchool} alt="Schedule Appointment" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Schedule An Appointment</h1>
            <p className="text-lg opacity-90">We're Here To Answer Your Questions</p>
          </div>
        </div>
      </section>

      {/* Appointment Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Appointment Info */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Book A Visit
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Appointment Information
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Schedule A Meeting With Our Administration Team To Discuss Admissions, Academics, 
                Campus Facilities, Or Any Other Queries You May Have. We're Happy To Help!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Available Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 3:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Visit Us At</h3>
                    <p className="text-muted-foreground">
                      Goodwill Public School<br />
                      Patti, Pratapgarh<br />
                      Uttar Pradesh - 230141
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      +91 9876543210<br />
                      +91 9876543211
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@goodwillschool.edu.in<br />
                      admissions@goodwillschool.edu.in
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Appointment Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Please Arrive 10 Minutes Before Your Scheduled Time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Bring Any Relevant Documents For Discussion</span>
                  </li> 
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>We'll Confirm Your Appointment Within 24 Hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>For Urgent Matters, Please Call Us Directly</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Appointment Form */}
            <div className="bg-card border border-border p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Book Your Appointment</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Name"
                    />
                  </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time *</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="purpose">Purpose Of Visit *</Label>
                  <Textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    placeholder="Please Describe The Reason For Your Appointment..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Appointment Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book Appointment Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Benefits
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Book An Appointment?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Personalized Attention And Dedicated Time To Address All Your Concerns
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Personalized Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Get One-On-One Attention From Our Experienced Staff
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Save Time</h3>
              <p className="text-sm text-muted-foreground">
                Pre-Scheduled Meetings Mean No Waiting In Queues
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Detailed Discussion</h3>
              <p className="text-sm text-muted-foreground">
                Ample Time To Discuss All Your Questions And Concerns
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Proper Planning</h3>
              <p className="text-sm text-muted-foreground">
                We Prepare In Advance To Best Address Your Needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Process
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What To Expect
              </h2>
              <p className="text-muted-foreground">
                Here's How Our Appointment Process Works
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Submit Your Request</h3>
                  <p className="text-muted-foreground">
                    Fill Out The Appointment Form Above With Your Details And Preferred Date/Time
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Confirmation Call</h3>
                  <p className="text-muted-foreground">
                    Our Team Will Contact You Within 24 Hours To Confirm Your Appointment
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Visit Our School</h3>
                  <p className="text-muted-foreground">
                    Arrive 10 Minutes Early And Meet With Our Administration Team
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Get Your Answers</h3>
                  <p className="text-muted-foreground">
                    Discuss Your Queries, Get A Campus Tour, And Receive Guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Appointment Types */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common Appointment Types
            </h2>
            <p className="text-muted-foreground">
              Schedule A Meeting For Any Of These Purposes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Admission Inquiry</h3>
              <p className="text-sm text-muted-foreground">
                Learn About Admission Process, Requirements, And Available Seats
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <User className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Parent-Teacher Meeting</h3>
              <p className="text-sm text-muted-foreground">
                Discuss Your Child's Academic Progress And Development
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <MapPin className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Campus Tour</h3>
              <p className="text-sm text-muted-foreground">
                Explore Our Facilities, Classrooms, And Infrastructure
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <MessageSquare className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Counseling Session</h3>
              <p className="text-sm text-muted-foreground">
                Academic Or Career Guidance For Students And Parents
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <Phone className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">Fee Discussion</h3>
              <p className="text-sm text-muted-foreground">
                Clarify Fee Structure, Payment Plans, And Scholarships
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <CheckCircle className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">General Inquiry</h3>
              <p className="text-sm text-muted-foreground">
                Any Other Questions Or Concerns About Our School
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Find Us Here</h2>
            <p className="text-muted-foreground mt-2">Visit Us At Our Campus Location</p>
          </div>
          <div className="rounded-lg overflow-hidden border border-border shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6196.883393334773!2d82.194586109215!3d25.924155227192273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a9fefe2dcf495%3A0x644eff8ad7383445!2sGoodwill%20public%20school!5e0!3m2!1sen!2sin!4v1770139998534!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Appointment;
