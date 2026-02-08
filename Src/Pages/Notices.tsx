import Layout from "@/Components/Layout/Layout";
import { Badge } from "@/Components/ui/Badge";
import { Calendar, Download, AlertTriangle, FileText } from "lucide-react";
import heroSchool from "@/Assets/Hero-School.png";
import { useState, useEffect } from "react";
import { noticesAPI, Notice } from "@/Services/Api";

const Notices = () => {
  const [noticesData, setNoticesData] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const data = await noticesAPI.getAllPublic();
        setNoticesData(data);
      } catch (error) {
        console.error("Failed To Fetch Notices", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    if (!category) return "secondary";
    const lower = category.toLowerCase();
    if (lower === "examination" || lower === "exam") return "destructive";
    if (lower === "event") return "default";
    if (lower === "meeting") return "secondary";
    if (lower === "admission") return "outline";
    return "secondary";
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
            <p className="text-lg opacity-90">Stay Updated With School Announcements</p>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {loading ? (
              <div className="text-center text-muted-foreground py-12">Loading Notices...</div>
            ) : noticesData.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">No Notices Available Yet.</div>
            ) : (
              noticesData.map((notice) => (
                <div
                  key={notice.id}
                  className={`bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all ${
                    notice.status?.toLowerCase() === "important" 
                      ? "border-2 border-red-500 dark:border-red-600" 
                      : "border border-border"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {/* Status Badge */}
                      {notice.status && (
                        <Badge 
                          variant={notice.status.toLowerCase() === "important" ? "destructive" : "outline"} 
                          className="gap-1 font-medium"
                        >
                          {notice.status.toLowerCase() === "important" && <AlertTriangle className="h-3 w-3" />}
                          {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                        </Badge>
                      )}
                      {/* Category Badge */}
                      {notice.category && (
                        <Badge variant={getCategoryColor(notice.category) as "default" | "secondary" | "destructive" | "outline"}>
                          {notice.category}
                        </Badge>
                      )}
                      {/* Date */}
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(notice.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-3">{notice.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{notice.content}</p>
                    {/* Attachment Download Button */}
                    {notice.attachment && (
                      <a
                        href={`http://localhost:8000/Static/${notice.attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Download Attachment
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Notices;
