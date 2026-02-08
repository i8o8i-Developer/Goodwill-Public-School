import { useState, useEffect } from "react";
import Layout from "@/Components/Layout/Layout";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";
import { Download, FileText, Send } from "lucide-react";
import { toast } from "sonner";
import { tcRequestsAPIEnhanced, tcRequestsAPI, TCRequest } from "@/Services/Api";

const Downloads = () => {
  const [activeTab, setActiveTab] = useState<"request" | "download">("request");
  const [myRequests, setMyRequests] = useState<TCRequest[]>([]);
  const [verifiedStudentId, setVerifiedStudentId] = useState<string>("");
  const [verificationForm, setVerificationForm] = useState({
    student_id: "",
    class: ""
  });
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    class: "",
    reason: ""
  });

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const data = await tcRequestsAPIEnhanced.getAll();
      setMyRequests(data);
    } catch (error) {
      console.error("Failed To Fetch TC Requests");
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.student_id || !formData.student_name || !formData.class || !formData.reason) {
      toast.error("Please Fill All Required Fields");
      return;
    }

    try {
      await tcRequestsAPI.create({
        student_id: formData.student_id,
        student_name: formData.student_name,
        class: formData.class,
        reason: formData.reason,
        request_date: new Date().toISOString().split('T')[0]
      });
      toast.success("TC Request Submitted Successfully!");
      setFormData({
        student_id: "",
        student_name: "",
        class: "",
        reason: ""
      });
      fetchMyRequests();
    } catch (error) {
      toast.error("Failed To Submit Request");
    }
  };

  const handleDownloadTC = async (request: TCRequest) => {
    if (!request.id) return;
    try {
      const data = await tcRequestsAPIEnhanced.getTCDownload(request.id);
      window.open(`http://localhost:8000${data.tc_document}`, '_blank');
    } catch (error) {
      toast.error((error as Error).message || "TC Not Available");
    }
  };

  const handleVerifyStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationForm.student_id || !verificationForm.class) {
      toast.error("Please Fill All Fields");
      return;
    }
    
    // Check If Student Has Approved TC (Match Backend Fields)
    const studentTC = myRequests.find(
      req => req.student_id === verificationForm.student_id &&
             req.class === verificationForm.class &&
             req.status === "Approved" &&
             req.tcDocument
    );
    if (studentTC) {
      setVerifiedStudentId(verificationForm.student_id);
      setIsVerified(true);
      toast.success("Verification Successful!");
    } else {
      toast.error("No Approved TC Found For This Student");
      setIsVerified(false);
    }
  };

  const approvedRequests = myRequests.filter(
    req => req.status === "Approved" && 
           req.tcDocument && 
           req.student_id === verifiedStudentId
  );

  return (
    <Layout>
      <section className="py-16 bg-gradient-to-br from-background via-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-primary text-center mb-4">Downloads</h1>
            <p className="text-center text-muted-foreground mb-8">
              Request And Download Transfer Certificates
            </p>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-border">
              <button
                onClick={() => setActiveTab("request")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "request"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="inline-block h-5 w-5 mr-2" />
                Request TC
              </button>
              <button
                onClick={() => setActiveTab("download")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "download"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Download className="inline-block h-5 w-5 mr-2" />
                Download TC
              </button>
            </div>

            {/* Request TC Tab */}
            {activeTab === "request" && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Request Transfer Certificate</h2>
                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="student_id">Student ID *</Label>
                      <Input
                        id="student_id"
                        placeholder="e.g., S001"
                        value={formData.student_id}
                        onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="student_name">Student Name *</Label>
                      <Input
                        id="student_name"
                        placeholder="Enter full name"
                        value={formData.student_name}
                        onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="class">Class *</Label>
                    <Input
                      id="class"
                      placeholder="e.g., 10th A"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason For TC *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please explain why you need a transfer certificate..."
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Submit Request
                  </Button>
                </form>

                {/* My Requests */}
                {myRequests.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">My Requests</h3>
                    <div className="space-y-3">
                      {myRequests.map((request) => (
                        <Card key={request.id} className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{request.student_name}</p>
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
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Download TC Tab */}
            {activeTab === "download" && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Download Transfer Certificate</h2>
                
                {!isVerified ? (
                  <div>
                    <p className="text-muted-foreground mb-6">
                      Please verify your identity to download your Transfer Certificate
                    </p>
                    <form onSubmit={handleVerifyStudent} className="space-y-4 max-w-md mx-auto">
                      <div>
                        <Label htmlFor="verify_student_id">Student ID *</Label>
                        <Input
                          id="verify_student_id"
                          placeholder="Enter your Student ID"
                          value={verificationForm.student_id}
                          onChange={(e) => setVerificationForm({ ...verificationForm, student_id: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="verify_class">Class *</Label>
                        <Input
                          id="verify_class"
                          placeholder="Enter your Class (e.g., 10th A)"
                          value={verificationForm.class}
                          onChange={(e) => setVerificationForm({ ...verificationForm, class: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Verify & View TC
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Verified as:</p>
                        <p className="font-semibold">{verifiedStudentId}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsVerified(false);
                          setVerifiedStudentId("");
                          setVerificationForm({ student_id: "", class: "" });
                        }}
                      >
                        Change Student
                      </Button>
                    </div>
                    
                    {approvedRequests.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          No Approved Transfer Certificate Available For This Student.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {approvedRequests.map((request) => (
                          <Card key={request.id} className="p-4 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-bold text-lg">{request.student_name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {request.student_id} • Class {request.class}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Approved on {new Date(request.request_date).toLocaleDateString()}
                                </p>
                              </div>
                              <Button
                                onClick={() => handleDownloadTC(request)}
                                className="gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download TC
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Downloads;
