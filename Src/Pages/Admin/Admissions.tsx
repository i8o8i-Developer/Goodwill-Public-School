import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/Components/ui/Dialog";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { admissionsAPI, Admission } from "@/Services/Api";

const Admissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const data = await admissionsAPI.getAll();
      setAdmissions(data);
    } catch (error) {
      toast.error("Failed To Fetch Admissions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setStatusUpdating(true);
    try {
      await admissionsAPI.updateStatus(id, newStatus);
      await fetchAdmissions();
      toast.success(`Admission ${newStatus.toLowerCase()}`);
      setModalOpen(false);
    } catch (error) {
      toast.error("Failed To Update Status");
    } finally {
      setStatusUpdating(false);
    }
  };

  const filteredAdmissions = admissions.filter((admission) =>
    admission.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admission.application_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admissions Management</h1>
        <p className="text-muted-foreground">Manage Admission Applications</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search By Name Or Application ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading Admissions...</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Application ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Father Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Applied Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmissions.map((admission) => (
                <tr key={admission.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4 font-medium">{admission.application_id}</td>
                  <td className="py-3 px-4">{admission.student_name}</td>
                  <td className="py-3 px-4">{admission.class}</td>
                  <td className="py-3 px-4">{admission.father_name || admission.mother_name || "-"}</td>
                  <td className="py-3 px-4 text-sm">{admission.contact}</td>
                  <td className="py-3 px-4 text-sm">{admission.applied_date && admission.applied_date !== "-" ? new Date(admission.applied_date).toLocaleDateString() : "-"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        admission.status === "Approved"
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : admission.status === "Rejected"
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                      }`}
                    >
                      {admission.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Dialog open={modalOpen && selectedAdmission?.id === admission.id} onOpenChange={(open) => { setModalOpen(open); if (!open) setSelectedAdmission(null); }}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => { setSelectedAdmission(admission); setModalOpen(true); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <div className="text-lg font-bold mb-2">Admission Details</div>
                          </DialogHeader>
                          {selectedAdmission && (
                            <div className="space-y-2">
                              <div><b>Application ID:</b> {selectedAdmission.application_id}</div>
                              <div><b>Student Name:</b> {selectedAdmission.student_name}</div>
                              <div><b>Class:</b> {selectedAdmission.class}</div>
                              <div><b>Date of Birth:</b> {selectedAdmission.dob}</div>
                              <div><b>Father Name:</b> {selectedAdmission.father_name || '-'}</div>
                              <div><b>Mother Name:</b> {selectedAdmission.mother_name || '-'}</div>
                              <div><b>Contact:</b> {selectedAdmission.contact}</div>
                              <div><b>Email:</b> {selectedAdmission.email}</div>
                              <div><b>Address:</b> {selectedAdmission.address}</div>
                              <div><b>Status:</b> {selectedAdmission.status}</div>
                              <div><b>Applied Date:</b> {selectedAdmission.applied_date && selectedAdmission.applied_date !== '-' ? new Date(selectedAdmission.applied_date).toLocaleDateString() : '-'}</div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {admission.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            onClick={() => handleStatusChange(admission.id, "Approved")}
                            disabled={statusUpdating}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleStatusChange(admission.id, "Rejected")}
                            disabled={statusUpdating}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </Card>
    </div>
  );
};

export default Admissions;
