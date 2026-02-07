
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Card } from "@/Components/ui/Card";
import { Search, Eye, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/Components/ui/Dialog";
import { Label } from "@/Components/ui/Label";
import { resultsAPI, ExamResult } from "@/Services/Api";
import { toast } from "sonner";

const Results: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    class: "",
    section: "",
    exam_type: "",
    marks_json: "",
    percentage: "",
    grade: "",
    rank: ""
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await resultsAPI.getAll();
      setResults(data);
    } catch (error) {
      toast.error("Failed To Fetch Results");
    } finally {
      setLoading(false);
    }
  };

  const handleAddResult = async () => {
    if (!formData.student_id || !formData.student_name || !formData.class || !formData.exam_type || !formData.percentage || !formData.grade || !formData.marks_json) {
      toast.error("Please Fill All Required Fields");
      return;
    }

    // Validate marks_json Is Valid JSON
    let marksObj = {};
    try {
      marksObj = JSON.parse(formData.marks_json);
    } catch {
      toast.error("Marks Must Be A Valid JSON Object");
      return;
    }

    // Ensure Percentage And Rank Are Integers, Fallback To 0 If Empty
    const percentage = parseInt(formData.percentage) || 0;
    const rank = formData.rank ? parseInt(formData.rank) : 0;

    try {
      // Transform Data To Match Backend Expectations
      await resultsAPI.create({
        student_id: formData.student_id,
        name: formData.student_name,
        class_name: formData.class,
        section: formData.section,
        exam_type: formData.exam_type,
        marks: marksObj,  // Send As Object, Not JSON String
        percentage,
        grade: formData.grade,
        rank
      });
      await fetchResults();
      setIsDialogOpen(false);
      setFormData({
        student_id: "",
        student_name: "",
        class: "",
        section: "",
        exam_type: "",
        marks_json: "",
        percentage: "",
        grade: "",
        rank: ""
      });
      toast.success("Result Added Successfully");
    } catch (error) {
      toast.error("Failed To Add Result");
    }
  };

  const filteredResults = results.filter((result) =>
    (result.student_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (result.student_id || "").includes(searchTerm) ||
    (result.class || "").includes(searchTerm)
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Exam Results Management</h1>
          <p className="text-muted-foreground">Manage Student Exam Results</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Result
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-gradient-to-br from-background to-secondary/20">
            <DialogHeader className="border-b pb-3 shrink-0">
              <DialogTitle className="text-2xl font-bold text-primary">Add Exam Result</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">Fill In The Exam Result Details</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 py-4 px-1">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-sm text-primary mb-3">Student Information</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="student_id" className="text-xs font-medium">Student ID *</Label>
                        <Input
                          id="student_id"
                          placeholder="e.g., 2024001"
                          value={formData.student_id}
                          onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="student_name" className="text-xs font-medium">Student Name *</Label>
                        <Input
                          id="student_name"
                          placeholder="Enter Student Name"
                          value={formData.student_name}
                          onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="class" className="text-xs font-medium">Class *</Label>
                        <Input
                          id="class"
                          placeholder="e.g., 10"
                          value={formData.class}
                          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="section" className="text-xs font-medium">Section</Label>
                        <Input
                          id="section"
                          placeholder="e.g., A"
                          value={formData.section}
                          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="exam_type" className="text-xs font-medium">Exam Type *</Label>
                        <Input
                          id="exam_type"
                          placeholder="e.g., Annual, PT1, PT2"
                          value={formData.exam_type}
                          onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-sm text-primary mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="percentage" className="text-xs font-medium">Percentage *</Label>
                      <Input
                        id="percentage"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 85.5"
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade" className="text-xs font-medium">Grade *</Label>
                      <Input
                        id="grade"
                        placeholder="e.g., A+"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rank" className="text-xs font-medium">Rank</Label>
                      <Input
                        id="rank"
                        type="number"
                        placeholder="e.g., 1"
                        value={formData.rank}
                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="marks" className="text-xs font-medium">Marks (JSON) *</Label>
                    <Input
                      id="marks"
                      placeholder='e.g., {"Math": 95, "Science": 90}'
                      value={formData.marks_json}
                      onChange={(e) => setFormData({ ...formData, marks_json: e.target.value })}
                      className="mt-1.5 font-mono"
                    />
                    <div className="text-xs text-muted-foreground mt-1">Enter marks as a JSON object, e.g. <code>{'{"Math": 95, "Science": 90}'}</code></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pt-4 shrink-0">
              <Button onClick={handleAddResult} className="w-full h-11 text-base font-semibold">
                Add Result
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search By Name, Student ID, Or Class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading Results...</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Student ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Exam Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Percentage</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    {results.length === 0 ? "No Results Found. Add Your First Result!" : "No Results Match Your Search."}
                  </td>
                </tr>
              ) : (
              filteredResults.map((result) => (
                <tr key={result.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">{result.student_id}</td>
                  <td className="py-3 px-4 font-medium">{result.student_name}</td>
                  <td className="py-3 px-4">{result.class}</td>
                  <td className="py-3 px-4">{result.exam_type}</td>
                  <td className="py-3 px-4 font-semibold">{typeof result.percentage === 'number' && !isNaN(result.percentage) ? result.percentage.toFixed(2) : '0.00'}%</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 rounded text-xs font-medium">
                      {result.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4">{typeof result.rank === 'number' && !isNaN(result.rank) ? result.rank : 0}</td>
                  <td className="py-3 px-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setSelectedResult(result);
                        setViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
        )}
      </Card>

      {/* View Result Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Exam Result Details</DialogTitle>
            <DialogDescription>
              Complete Details For {selectedResult?.student_name}
            </DialogDescription>
          </DialogHeader>
          {selectedResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Student ID</Label>
                  <p className="font-medium">{selectedResult.student_id}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedResult.student_name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Class</Label>
                  <p className="font-medium">{selectedResult.class}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Exam Type</Label>
                  <p className="font-medium">{selectedResult.exam_type}</p>
                </div>
              </div>
              
              {selectedResult.marks_json && (
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Subject-wise Marks</Label>
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <pre className="text-sm">{JSON.stringify(JSON.parse(selectedResult.marks_json), null, 2)}</pre>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Label className="text-xs text-muted-foreground">Percentage</Label>
                  <p className="text-2xl font-bold text-primary">{selectedResult.percentage}%</p>
                </div>
                <div className="text-center">
                  <Label className="text-xs text-muted-foreground">Grade</Label>
                  <p className="text-2xl font-bold text-green-600">{selectedResult.grade}</p>
                </div>
                <div className="text-center">
                  <Label className="text-xs text-muted-foreground">Rank</Label>
                  <p className="text-2xl font-bold text-blue-600">{selectedResult.rank}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Results;

