import Layout from "@/Components/Layout/Layout";
import { Calendar } from "@/Components/ui/Calendar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, GraduationCap, PartyPopper, Users, Briefcase } from "lucide-react";

// Example Events Data
const initialEvents = [
  {
    date: new Date("2026-02-10").toLocaleDateString('en-CA'),
    title: "Annual Exam - Class X",
    type: "Exam",
    icon: "exam"
  },
  {
    date: new Date("2026-02-15").toLocaleDateString('en-CA'),
    title: "Sports Day",
    type: "Event",
    icon: "event"
  },
  {
    date: new Date("2026-02-20").toLocaleDateString('en-CA'),
    title: "Holiday - Guru Ravidas Jayanti",
    type: "Holiday",
    icon: "holiday"
  },
  {
    date: new Date("2026-02-25").toLocaleDateString('en-CA'),
    title: "Parent-Teacher Meeting",
    type: "Meeting",
    icon: "meeting"
  },
];

const AcademicCalendar = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [eventList] = useState(initialEvents);

  // Get Selected Date As String For Comparison
  const selectedDate = selected ? selected.toLocaleDateString('en-CA') : null;
  
  // Get Formatted Date For Display
  const formattedDate = selected 
    ? selected.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : "Select a date";
  
  // Fix: Use local Date String For Comparison
  const dayEvents = selectedDate
    ? eventList.filter(e => e.date === selectedDate)
    : [];

  // Get Icon For Event Type
  const getEventIcon = (iconType: string) => {
    switch(iconType) {
      case "exam": return <GraduationCap className="w-6 h-6" />;
      case "event": return <PartyPopper className="w-6 h-6" />;
      case "holiday": return <CalendarIcon className="w-6 h-6" />;
      case "meeting": return <Users className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background min-h-[85vh]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
              Academic Calendar
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay Updated With All Important Academic Events, Examinations, And Holidays
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-7xl mx-auto">
            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-auto"
            >
              <div className="bg-card rounded-2xl shadow-2xl p-6 border border-border/50">
                <Calendar
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  modifiers={{
                    event: (date) => eventList.some(e => e.date === date.toLocaleDateString('en-CA')),
                  }}
                  modifiersClassNames={{
                    event: "bg-primary/20 text-primary font-semibold rounded-full border-2 border-primary/40 shadow-lg hover:scale-110 transition-transform",
                  }}
                  className="rounded-xl"
                />
                <div className="mt-6 p-4 bg-card rounded-lg border border-primary/30">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary"></div>
                    <span>Days With Events</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Events Display Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 w-full max-w-2xl"
            >
              <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50 min-h-[400px]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                  <CalendarIcon className="w-7 h-7 text-primary" />
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      {dayEvents.length > 0 ? `${dayEvents.length} Event${dayEvents.length > 1 ? 's' : ''}` : 'Events'}
                    </h2>
                    <p className="text-sm text-muted-foreground">{formattedDate}</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {dayEvents.length === 0 ? (
                    <motion.div
                      key="no-events"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center py-12"
                    >
                      <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                        <CalendarIcon className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-lg font-medium">No Events Scheduled</p>
                      <p className="text-muted-foreground/70 text-sm mt-2">Select A Highlighted Date To View Events</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="events-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {dayEvents.map((event, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02, translateX: 5 }}
                          className="group relative"
                        >
                          <div className="p-6 rounded-xl border-2 border-primary bg-card shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-5"> 
                            <div className="w-14 h-14 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                              {getEventIcon(event.icon)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight text-foreground">
                                {event.title}
                              </h3>
                              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold uppercase tracking-wider">
                                {event.type}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AcademicCalendar;
