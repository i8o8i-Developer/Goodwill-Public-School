import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Search, Mail, Trash2, CheckCircle, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/Dialog";
import { toast } from "sonner";
import { contactMessagesAPI, ContactMessage } from "@/Services/Api";
import { Badge } from "@/Components/ui/Badge";

const ContactMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await contactMessagesAPI.getAll();
      setMessages(data);
    } catch (error) {
      toast.error("Failed To Fetch Messages");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    if (message.status === "Unread" && message.id) {
      handleMarkAsRead(message.id);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await contactMessagesAPI.updateStatus(id, "Read");
      fetchMessages();
    } catch (error) {
      toast.error("Failed To Update Status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are You Sure You Want To Delete This Message?")) return;
    try {
      await contactMessagesAPI.delete(id);
      fetchMessages();
      toast.success("Message Deleted Successfully");
    } catch (error) {
      toast.error("Failed To Delete Message");
    }
  };

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Messages</h1>
          <p className="text-muted-foreground">Manage Incoming Messages</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search Messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading Messages...</div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`p-4 hover:shadow-lg transition-shadow ${
                  message.status === "Unread" ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <h3 className="font-bold text-lg">{message.name}</h3>
                      <Badge variant={message.status === "Unread" ? "default" : "secondary"}>
                        {message.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Email:</strong> {message.email}
                    </p>
                    {message.phone && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Phone:</strong> {message.phone}
                      </p>
                    )}
                    <p className="text-sm font-medium mb-2">
                      <strong>Subject:</strong> {message.subject}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                    {message.created_at && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleView(message)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {message.id && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600"
                        onClick={() => handleDelete(message.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">From:</label>
                <p className="text-lg">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email:</label>
                <p>{selectedMessage.email}</p>
              </div>
              {selectedMessage.phone && (
                <div>
                  <label className="text-sm font-medium">Phone:</label>
                  <p>{selectedMessage.phone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Subject:</label>
                <p className="text-lg font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Message:</label>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              {selectedMessage.created_at && (
                <div>
                  <label className="text-sm font-medium">Received:</label>
                  <p className="text-sm">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactMessages;
