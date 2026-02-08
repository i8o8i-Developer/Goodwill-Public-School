import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/Dialog";
import { CheckCircle, XCircle, Clock, Upload, Download } from "lucide-react";
import { Label } from "@/Components/ui/Label";
import { toast } from "sonner";
import { tcRequestsAPIEnhanced, TCRequest } from "@/Services/Api";

const TCRequests = () => {
  const [requests, setRequests] = useState<TCRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TCRequest | null>(null);
  const [tcDocument, setTCDocument] = useState<File | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await tcRequestsAPIEnhanced.getAll();
      setRequests(data);
    } catch (error) {
      toast.error("Failed To Fetch TC Requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClick = (request: TCRequest) => {
    setSelectedRequest(request);
    setIsApproveDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedRequest?.id) return;
    
    try {
      await tcRequestsAPIEnhanced.approveTCRequest(selectedRequest.id, tcDocument || undefined);
      await fetchRequests();
      toast.success("TC Request Approved Successfully!");
      setIsApproveDialogOpen(false);
      setSelectedRequest(null);
      setTCDocument(null);
    } catch (error) {
      toast.error("Failed To Approve Request");
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm("Are you sure you want to reject this TC request?")) return;
    try {
      await tcRequestsAPIEnhanced.updateStatus(id, "Rejected");
      await fetchRequests();
      toast.success("TC Request Rejected");
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
                  Student ID: {request.student_id} <br />
                  Class: {request.class} {request.section ? `Section: ${request.section}` : ""}
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
              <p><strong>Request Date :</strong> {request.request_date ? new Date(request.request_date).toLocaleDateString() : "Not Provided"}</p>
              <p><strong>Reason :</strong> {request.reason}</p>
            </div>
            {request.status === "Pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleApproveClick(request)}
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2 text-red-600 hover:text-red-700"
                  onClick={() => request.id && handleReject(request.id)}
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
            {request.status === "Approved" && request.tcDocument && (
              <div className="mt-4">
                <a
                  href={`http://localhost:8000${request.tcDocument}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Download className="h-4 w-4" />
                  View TC Document
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
      )}

      {/* Approve Dialog with File Upload */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Approve TC Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload The Transfer Certificate Document For <strong>{selectedRequest?.student_name}</strong>
            </p>
            <div>
              <Label htmlFor="tc_document">TC Document (PDF)</Label>
              <Input
                id="tc_document"
                type="file"
                accept=".pdf"
                onChange={(e) => setTCDocument(e.target.files?.[0] || null)}
                className="mt-1.5"
              />
              {tcDocument && (
                <p className="text-xs text-muted-foreground mt-1">
                  Selected: {tcDocument.name}
                </p>
              )}
            </div>
          </div>
          <div className="border-t pt-4 flex gap-2">
            <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve & Upload
            </Button>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TCRequests;
