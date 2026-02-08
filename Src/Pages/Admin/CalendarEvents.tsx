import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Search, Plus, Trash2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/Components/ui/Dialog";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/Select";
import { toast } from "sonner";
import { calendarEventsAPI, CalendarEvent } from "@/Services/Api";

const CalendarEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    start_time: "",
    end_time: "",
    location: "",
    event_type: "General"
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await calendarEventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      toast.error("Failed To Fetch Events");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async () => {
    if (!formData.title || !formData.event_date) {
      toast.error("Please Fill Required Fields");
      return;
    }

    try {
      await calendarEventsAPI.create(formData);
      toast.success("Event Added Successfully!");
      setIsDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        event_date: "",
        start_time: "",
        end_time: "",
        location: "",
        event_type: "General"
      });
      fetchEvents();
    } catch (error) {
      toast.error("Failed To Add Event");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are You Sure You Want To Delete This Event?")) return;
    try {
      await calendarEventsAPI.delete(id);
      fetchEvents();
      toast.success("Event Deleted Successfully");
    } catch (error) {
      toast.error("Failed To Delete Event");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendar Events</h1>
          <p className="text-muted-foreground">Manage School Events & Holidays</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">Add New Event</DialogTitle>
              <DialogDescription>Fill In The Event Details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Annual Sports Day"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="event_date">Event Date *</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    type="time"
                    placeholder="9:00 AM"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="end_time">End Time</Label>
                  <Input
                    id="end_time"
                    type="time"
                    placeholder="4:00 PM"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., School Ground"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="event_type">Event Type</Label>
                <Select value={formData.event_type} onValueChange={(value) => setFormData({ ...formData, event_type: value })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Holiday">Holiday</SelectItem>
                    <SelectItem value="Exam">Exam</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Event details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1.5"
                  rows={4}
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <Button onClick={handleAddEvent} className="w-full">
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search Events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading Events...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-primary">{event.event_type}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-600"
                    onClick={() => event.id && handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {(event.start_time || event.end_time || event.location) && (
                  <div className="space-y-1 mb-2">
                    {event.start_time && event.end_time && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>🕒</span>
                        <span>{event.start_time} - {event.end_time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                )}
                {event.description && (
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CalendarEvents;
