import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Search, Plus, Trash2, FileText, Upload, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/Components/ui/Dialog";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/Select";
import { toast } from "sonner";
import { feeRulesAPI, FeeRule } from "@/Services/Api";

const FeeRules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<FeeRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"structure" | "downloads">("structure");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "FeeStructure",
    amount: ""
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await feeRulesAPI.getAll();
      setItems(data);
    } catch (error) {
      toast.error("Failed To Fetch Items");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAdd = async () => {
    // Different validation for different categories
    if (formData.category === "FeeStructure") {
      if (!formData.title || !formData.description || !formData.amount) {
        toast.error("Please Fill All Required Fields");
        return;
      }
    } else if (formData.category === "FeeChartDownload") {
      if (!formData.title) {
        toast.error("Please Enter Document Title");
        return;
      }
      if (!selectedFile) {
        toast.error("Please Upload A Document For Fee Chart Download");
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      if (formData.amount) {
        formDataToSend.append('amount', formData.amount);
      }
      if (selectedFile) {
        formDataToSend.append('attachment', selectedFile);
      }

      await feeRulesAPI.createWithAttachment(formDataToSend);
      toast.success("Added Successfully!");
      setIsDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "FeeStructure",
        amount: ""
      });
      setSelectedFile(null);
      fetchItems();
    } catch (error) {
      toast.error("Failed To Add");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are You Sure You Want To Delete This Item?")) return;
    try {
      await feeRulesAPI.delete(id);
      fetchItems();
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Failed To Delete");
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const structureItems = filteredItems.filter(item => item.category === "FeeStructure");
  const downloadItems = filteredItems.filter(item => item.category === "FeeChartDownload");

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Fee Management</h1>
          <p className="text-muted-foreground">Manage Fee Structure & Download Links</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">Add Fee Item</DialogTitle>
              <DialogDescription>Choose Type And Fill Details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Type *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FeeStructure">Fee Structure (Table Data)</SelectItem>
                    <SelectItem value="FeeChartDownload">Fee Chart Download (PDF)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">{formData.category === "FeeStructure" ? "Class Name" : "Document Title"} *</Label>
                <Input
                  id="title"
                  placeholder={formData.category === "FeeStructure" ? "e.g., Nursery, Primary (I-V)" : "e.g., Annual Fee Chart 2026"}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              {formData.category === "FeeStructure" && (
                <>
                  <div>
                    <Label htmlFor="description">Fee Details *</Label>
                    <Textarea
                      id="description"
                      placeholder="e.g., Annual And Quarterly Fee Breakdown"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount *</Label>
                    <Input
                      id="amount"
                      placeholder="e.g., Annual: ₹15,000 | Quarterly: ₹3,750"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </>
              )}
              {formData.category === "FeeChartDownload" && (
                <>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Brief Description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="file">Upload Document (PDF) *</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="mt-1.5"
                    />
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </>  
              )}
            </div>
            <div className="border-t pt-4">
              <Button onClick={handleAdd} className="w-full">
                {formData.category === "FeeStructure" ? "Add Fee Structure" : "Add Download Link"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("structure")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "structure"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Fee Structure ({structureItems.length})
          </button>
          <button
            onClick={() => setActiveTab("downloads")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "downloads"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Download Links ({downloadItems.length})
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading...</div>
        ) : (
          <>
            {activeTab === "structure" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold">Class</th>
                      <th className="px-4 py-3 text-left font-semibold">Fee Details</th>
                      <th className="px-4 py-3 text-left font-semibold">Amount</th>
                      <th className="px-4 py-3 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {structureItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                          No Fee Structure Added Yet
                        </td>
                      </tr>
                    ) : (
                      structureItems.map((item) => (
                        <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-4 py-4 font-medium">{item.title}</td>
                          <td className="px-4 py-4 text-muted-foreground">{item.description}</td>
                          <td className="px-4 py-4 font-semibold text-primary">{item.amount}</td>
                          <td className="px-4 py-4 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => item.id && handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "downloads" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {downloadItems.length === 0 ? (
                  <div className="col-span-2 text-center text-muted-foreground py-12">
                    No Download Links Added Yet
                  </div>
                ) : (
                  downloadItems.map((item) => (
                    <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-xs font-medium text-primary">PDF Document</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => item.id && handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      )}
                      {item.attachment && (
                        <a
                          href={`http://localhost:8000${item.attachment}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <Download className="h-4 w-4" />
                          Download Document
                        </a>
                      )}
                    </Card>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default FeeRules;
