import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/Button";

interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  event_type: string;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/public/calendar-events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed To Fetch Events:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString('en-IN', { day: '2-digit' }),
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      year: date.toLocaleDateString('en-IN', { year: 'numeric' }),
    };
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">Loading Events...</div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Mark Your Calendar
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Upcoming Events
            </h2>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/academic-calendar" className="flex items-center gap-2">
              View Calendar <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => {
            const dateInfo = formatDate(event.event_date);
            return (
              <div
                key={event.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex">
                  <div className="bg-primary text-primary-foreground p-4 flex flex-col items-center justify-center min-w-[80px]">
                    <span className="text-3xl font-bold">{dateInfo.day}</span>
                    <span className="text-sm uppercase">{dateInfo.month}</span>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-card-foreground mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {event.start_time && event.end_time && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.start_time} - {event.end_time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {event.description && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
