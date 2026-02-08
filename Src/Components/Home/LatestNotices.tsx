import { useState, useEffect } from "react";
import { Bell, Calendar, ArrowRight, AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/Badge";

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  status: string;
  category: string;
  attachment?: string;
}

const LatestNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/public/notices');
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      }
    } catch (error) {
      console.error('Failed To Fetch Notices:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">Loading Latest Notices...</div>
        </div>
      </section>
    );
  }

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
          {notices.map((notice) => {
            const isHighPriority = notice.status === 'Important';
            return (
              <div
                key={notice.id}
                className={`bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow ${
                  isHighPriority ? 'border-l-4 border-l-destructive' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    isHighPriority ? 'bg-destructive/10' : 'bg-primary/10'
                  }`}>
                    {isHighPriority ? (
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    ) : (
                      <FileText className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant={isHighPriority ? 'destructive' : 'secondary'}>
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
                      {notice.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestNotices;
