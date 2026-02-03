import { Bell, Calendar, ArrowRight, AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/Badge";

const notices = [
  {
    id: 1,
    title: "Annual Examination Schedule 2025-26",
    date: "2026-02-01",
    category: "Examination",
    priority: "high",
    excerpt: "The Annual Examination For All Classes Will Commence From 15th March 2026. Detailed Schedule Attached.",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting Notice",
    date: "2026-01-28",
    category: "Meeting",
    priority: "normal",
    excerpt: "PTM Scheduled For 10th February 2026 For Classes VI To X. Parents Are Requested To Attend.",
  },
  {
    id: 3,
    title: "Republic Day Celebration",
    date: "2026-01-25",
    category: "Event",
    priority: "normal",
    excerpt: "School Will Celebrate Republic Day On 26th January. All Students Must Attend In Proper Uniform.",
  },
  {
    id: 4,
    title: "Admission Open For Session 2026-27",
    date: "2026-01-20",
    category: "Admission",
    priority: "high",
    excerpt: "Admissions Are Now Open For Nursery To Class IX. Limited Seats Available. Apply Now!",
  },
];

const LatestNotices = () => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Stay Updated
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Latest Notices & Announcements
            </h2>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/notices" className="flex items-center gap-2">
              View All Notices <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow ${
                notice.priority === 'high' ? 'border-l-4 border-l-destructive' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg flex-shrink-0 ${
                  notice.priority === 'high' ? 'bg-destructive/10' : 'bg-primary/10'
                }`}>
                  {notice.priority === 'high' ? (
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  ) : (
                    <FileText className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={notice.priority === 'high' ? 'destructive' : 'secondary'}>
                      {notice.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(notice.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-1">
                    {notice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {notice.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNotices;
