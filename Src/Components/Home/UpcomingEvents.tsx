import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/Button";

const events = [
  {
    id: 1,
    title: "Annual Sports Day",
    date: "2026-02-15",
    time: "9:00 AM - 4:00 PM",
    venue: "School Ground",
    description: "Annual Sports Competition With Various Track And Field Events.",  
  },
  {
    id: 2,
    title: "Science Exhibition",
    date: "2026-02-22",
    time: "10:00 AM - 2:00 PM",
    venue: "School Auditorium",
    description: "Students Showcase Their Innovative Science Projects.",
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    date: "2026-03-05",
    time: "9:00 AM - 1:00 PM",
    venue: "Respective Classrooms",
    description: "Discussion On Student Progress And Academic Performance.",
  },
];

const UpcomingEvents = () => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString('en-IN', { day: '2-digit' }),
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      year: date.toLocaleDateString('en-IN', { year: 'numeric' }),
    };
  };

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
            <Link to="/calendar" className="flex items-center gap-2">
              View Calendar <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => {
            const dateInfo = formatDate(event.date);
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
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
