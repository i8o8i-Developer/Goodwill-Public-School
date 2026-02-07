import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { CheckCircle, XCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { appointmentsAPI, Appointment } from "@/Services/Api";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentsAPI.getAll();
      setAppointments(data);
    } catch (error) {
      toast.error("Failed To Fetch Appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await appointmentsAPI.updateStatus(id, newStatus);
      await fetchAppointments();
      toast.success(`Appointment ${newStatus.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed To Update Status");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Appointments Management</h1>
        <p className="text-muted-foreground">Manage Appointment Requests</p>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading Appointments...</div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">{appointment.name}</h3>
                <p className="text-sm text-muted-foreground">{appointment.email}</p>
                <p className="text-sm text-muted-foreground">{appointment.phone}</p>
              </div>
              <span
                className={`px-3 py-1 rounded text-xs font-medium ${
                  appointment.status === "Confirmed"
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : appointment.status === "Completed"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                }`}
              >
                {appointment.status}
              </span>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <strong>Date & Time:</strong> {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
              <p><strong>Purpose:</strong> {appointment.purpose}</p>
            </div>
            {appointment.status === "Pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatusChange(appointment.id, "Confirmed")}
                >
                  <CheckCircle className="h-4 w-4" />
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2 text-red-600 hover:text-red-700"
                  onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                >
                  <XCircle className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      )}
    </div>
  );
};

export default Appointments;
