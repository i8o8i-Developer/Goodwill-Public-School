import Layout from "@/Components/Layout/Layout";
import { Badge } from "@/Components/ui/Badge";
import { Calendar, Download, AlertTriangle, FileText } from "lucide-react";
import heroSchool from "@/assets/hero-school.jpg";

const noticesData = [
  {
    id: 1,
    title: "Annual Examination Schedule 2025-26",
    date: "2026-02-01",
    category: "Examination",
    priority: "high",
    content: "The annual examination for all classes will commence from 15th March 2026. Students are advised to prepare well and adhere to the examination rules. Detailed date sheet is attached below.",
    attachment: true,
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting Notice",
    date: "2026-01-28",
    category: "Meeting",
    priority: "normal",
    content: "Parent-Teacher Meeting is scheduled for 10th February 2026 from 9:00 AM to 1:00 PM for classes VI to X. Parents are requested to attend without fail to discuss their ward's academic progress.",
    attachment: false,
  },
  {
    id: 3,
    title: "Republic Day Celebration",
    date: "2026-01-25",
    category: "Event",
    priority: "normal",
    content: "School will celebrate Republic Day on 26th January 2026. All students must attend in proper uniform by 8:00 AM. Cultural programs and march past will be conducted.",
    attachment: false,
  },
  {
    id: 4,
    title: "Admission Open for Session 2026-27",
    date: "2026-01-20",
    category: "Admission",
    priority: "high",
    content: "Admissions are now open for Nursery to Class IX for the academic session 2026-27. Limited seats available. Early bird discount available till 28th February 2026.",
    attachment: true,
  },
  {
    id: 5,
    title: "Winter Vacation Homework Submission",
    date: "2026-01-15",
    category: "Academic",
    priority: "normal",
    content: "Students are reminded to submit their winter vacation homework on or before 20th January 2026. Incomplete or late submissions will affect internal assessment marks.",
    attachment: false,
  },
  {
    id: 6,
    title: "Science Exhibition 2026",
    date: "2026-01-10",
    category: "Event",
    priority: "normal",
    content: "The annual Science Exhibition will be held on 22nd February 2026. Students from classes VI to X are encouraged to participate. Registration forms available with class teachers.",
    attachment: true,
  },
];

const Notices = () => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroSchool} alt="Notices" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notices</h1>
            <p className="text-lg opacity-90">Stay Updated with School Announcements</p>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {noticesData.map((notice) => (
              <div
                key={notice.id}
                className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                  notice.priority === "high" ? "border-l-4 border-l-destructive" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {notice.priority === "high" && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Important
                      </Badge>
                    )}
                    <Badge variant="secondary">{notice.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(notice.date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{notice.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{notice.content}</p>
                  {notice.attachment && (
                    <button className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                      <Download className="h-4 w-4" />
                      Download Attachment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Notices;
