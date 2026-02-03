import Layout from "@/Components/Layout/Layout";
import { Badge } from "@/Components/ui/Badge";
import { Calendar, Download, AlertTriangle, FileText } from "lucide-react";
import heroSchool from "@/Assets/Hero-School.png";

const noticesData = [
  {
    id: 1,
    title: "Annual Examination Schedule 2025-26",
    date: "2026-02-01",
    category: "Examination",
    priority: "high",
    content: "The Annual Examination For All Classes Will Commence From 15th March 2026. Students Are Advised To Prepare Well And Adhere To The Examination Rules. Detailed Date Sheet Is Attached Below.",
    attachment: true,
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting Notice",
    date: "2026-01-28",
    category: "Meeting",
    priority: "normal",
    content: "Parent-Teacher Meeting Is Scheduled For 10th February 2026 From 9:00 AM To 1:00 PM For Classes VI To X. Parents Are Requested To Attend Without Fail To Discuss Their Ward's Academic Progress.",
    attachment: false,
  },
  {
    id: 3,
    title: "Republic Day Celebration",
    date: "2026-01-25",
    category: "Event",
    priority: "normal",
    content: "School Will Celebrate Republic Day On 26th January 2026. All Students Must Attend In Proper Uniform By 8:00 AM. Cultural Programs And March Past Will Be Conducted.",
    attachment: false,
  },
  {
    id: 4,
    title: "Admission Open for Session 2026-27",
    date: "2026-01-20",
    category: "Admission",
    priority: "high",
    content: "Admissions Are Now Open For Nursery To Class IX For The Academic Session 2026-27. Limited Seats Available. Early Bird Discount Available Till 28th February 2026.",
    attachment: true,
  },
  {
    id: 5,
    title: "Winter Vacation Homework Submission",
    date: "2026-01-15",
    category: "Academic",
    priority: "normal",
    content: "Students Are Reminded To Submit Their Winter Vacation Homework On Or Before 20th January 2026. Incomplete Or Late Submissions Will Affect Internal Assessment Marks.",
    attachment: false,
  },
  {
    id: 6,
    title: "Science Exhibition 2026",
    date: "2026-01-10",
    category: "Event",
    priority: "normal",
    content: "The Annual Science Exhibition Will Be Held On 22nd February 2026. Students From Classes VI To X Are Encouraged To Participate. Registration Forms Available With Class Teachers.",
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
