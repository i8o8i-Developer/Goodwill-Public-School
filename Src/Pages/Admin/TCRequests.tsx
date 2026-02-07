import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { tcRequestsAPI, TCRequest } from "@/Services/Api";

const TCRequests = () => {
  const [requests, setRequests] = useState<TCRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await tcRequestsAPI.getAll();
      setRequests(data);
    } catch (error) {
      toast.error("Failed To Fetch TC Requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await tcRequestsAPI.updateStatus(id, newStatus);
      await fetchRequests();
      toast.success(`TC Request ${newStatus}`);
    } catch (error) {
      toast.error("Failed To Update Status");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">TC Requests Management</h1>
        <p className="text-muted-foreground">Manage Transfer Certificate Requests</p>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading TC Requests...</div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">{request.student_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {request.student_id} • Class {request.class}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded text-xs font-medium ${
                  request.status === "Approved"
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : request.status === "Rejected"
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                }`}
              >
                {request.status}
              </span>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <p><strong>Request Date :</strong> {new Date(request.request_date).toLocaleDateString()}</p>
              <p><strong>Reason :</strong> {request.reason}</p>
            </div>
            {request.status === "Pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatusChange(request.id, "Approved")}
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2 text-red-600 hover:text-red-700"
                  onClick={() => handleStatusChange(request.id, "Rejected")}
                >
                  <XCircle className="h-4 w-4" />
                  Reject
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

export default TCRequests;
