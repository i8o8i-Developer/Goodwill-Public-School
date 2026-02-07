import React, { useState } from "react";
import { FileText, Download, Trophy, Search, AlertCircle, CheckCircle, HelpCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { toast } from "sonner";

const TCDownloadSection = () => {
  const [studentId, setStudentId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) {
      toast.error("Please Enter A Valid Student ID");
      return;
    }
    toast.success("TC Download Initiated. Please Check Your Downloads Folder.");
    setStudentId("");
  };

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Transfer Certificate (TC) Download</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Instructions */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg shadow-md p-6 md:p-8 h-full">
            <p className="text-muted-foreground mb-6 text-lg">
              Download Your Transfer Certificate By Entering Your Details Below:
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="tc-student-id" className="text-foreground mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Student ID
                </Label>
                <Input
                  id="tc-student-id"
                  type="text"
                  placeholder="Enter Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="text-lg py-6"
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto gap-2 text-base px-8 py-6">
                <Download className="h-5 w-5" />
                Download TC
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-6 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              For Any Issues, Contact The School Office.
            </p>
          </div>
        </div>

        {/* Important Information */}
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Requirements
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Valid Student ID Number</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>All Dues Must Be Cleared  </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Library Books Returned</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Application Submitted</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Need Help?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>info@goodwillschool.edu.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          Important Notes
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-0.5">•</span>
            <span>TC will be issued within 7 working days after application</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-0.5">•</span>
            <span>Ensure All School Property Is Returned Before Requesting TC</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-0.5">•</span>
            <span>Original TC Will Be Provided Only Once</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-0.5">•</span>
            <span>Keep A Copy Of TC For Your Records</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

const ExamResultSection = () => {
  const [studentId, setStudentId] = useState("");
  const [examType, setExamType] = useState("Annual");
  type ExamResult = {
    name: string;
    id: string;
    class: string;
    section: string;
    marks: Record<string, number>;
    percentage: number;
    grade: string;
    rank: number;
  };
  const [result, setResult] = useState<ExamResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) {
      toast.error("Please Enter A Valid Student ID");
      return;
    }
    if (!examType) {
      toast.error("Please select an exam type");
      return;
    }
    if (studentId === "123456" && examType === "Annual") {
      setResult({
        name: "Temp Student",
        id: "123456",
        class: "10",
        section: "A",
        marks: {
          English: 88,
          Math: 92,
          Science: 85,
          Social: 90,
          Hindi: 80
        },
        percentage: 87,
        grade: "A",
        rank: 5
      });
      toast.success("Result Found For Student ID 123456 (Annual)");
    } else {
      setResult(null);
      toast.error("No Result Found For This Student ID and Exam Type");
    }
    setStudentId("");
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
          <Trophy className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Exam Results</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Results Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg shadow-md p-6 md:p-8 h-full">
            <p className="text-muted-foreground mb-6 text-lg">
              Check Your Exam Results By Entering Your Details Below:
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="result-student-id" className="text-foreground font-medium flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Student ID
                </Label>
                <Input
                  id="result-student-id"
                  type="text"
                  placeholder="Enter Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="text-lg py-4 px-4 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exam-type" className="text-foreground font-medium flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Exam Type
                </Label>
                <select
                  id="exam-type"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full text-lg py-4 px-4 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-background text-foreground appearance-none"
                >
                  <option value="Annual">Annual</option>
                  <option value="PT1">PT1</option>
                  <option value="PT2">PT2</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto gap-2 text-base px-8 py-6">
                <Search className="h-5 w-5" />
                View Result
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-6 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Results Are Updated After Each Exam Cycle.
            </p>
            {result && (
              <div className="mt-10 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Result For {result.name} (ID: {result.id})
                </h3>
                <div className="mb-4 text-sm text-muted-foreground">Class: {result.class} | Section: {result.section}</div>
                <table className="w-full mb-4 text-sm">
                  <thead>
                    <tr>
                      <th className="text-left">Subject</th>
                      <th className="text-left">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.marks).map(([subject, marks]) => (
                      <tr key={subject}>
                        <td>{subject}</td>
                        <td>{String(marks)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mb-2">Percentage: <span className="font-semibold">{result.percentage}%</span></div>
                <div className="mb-2">Grade: <span className="font-semibold">{result.grade}</span></div>
                <div>Rank: <span className="font-semibold">{result.rank}</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Result Information */}
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              What You'll Get
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Subject-Wise Marks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Overall Percentage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Grade And Rank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Performance Analysis</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Need Help?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>info@goodwillschool.edu.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Result Declaration Schedule
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-muted-foreground">First Term</span>
              <span className="font-semibold text-foreground">October</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-muted-foreground">Second Term</span>
              <span className="font-semibold text-foreground">March</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-muted-foreground">Annual Exam</span>
              <span className="font-semibold text-foreground">May</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Performance Tips
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Review Your Results Carefully And Identify Weak Areas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Discuss Performance With Teachers For Improvement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Parents Can Schedule Meetings To Discuss Progress</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export { TCDownloadSection, ExamResultSection };