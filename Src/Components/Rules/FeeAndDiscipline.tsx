import { useState, useEffect } from "react";
import { IndianRupee, Clock, CreditCard, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface FeeStructureItem {
  id: number;
  title: string;
  description: string;
  category: string;
  amount?: string;
  attachment?: string;
}

const FeeChart = () => {
  const [feeItems, setFeeItems] = useState<FeeStructureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeeStructure();
  }, []);

  const fetchFeeStructure = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/public/fee-rules?category=FeeStructure');
      if (response.ok) {
        const data = await response.json();
        setFeeItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch fee structure:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mb-12">
        <div className="text-center text-muted-foreground">Loading Fee Structure...</div>
      </section>
    );
  }

  if (feeItems.length === 0) {
    return (
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <IndianRupee className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Fee Structure</h2>
        </div>
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 text-center text-muted-foreground">
          No Fee Structure Available
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <IndianRupee className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Fee Structure</h2>
      </div>
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-6 py-4 text-left font-semibold">Class</th>
                <th className="px-6 py-4 text-left font-semibold">Fee Details</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {feeItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{item.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.description}</td>
                  <td className="px-6 py-4 text-muted-foreground font-semibold">{item.amount || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const FeeRules = () => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        <Clock className="h-5 w-5 text-primary" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Fee Payment Rules</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Payment Deadline</h3>
          <p className="text-muted-foreground text-sm">Fees Must Be Paid By The 10th Of Each Quarter</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Late Fee Penalty</h3>
          <p className="text-muted-foreground text-sm">Late Payment Will Incur A Fine Of ₹100 Per Week</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <CreditCard className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Payment Methods</h3>
          <p className="text-muted-foreground text-sm">Fees Can Be Paid Online, UPI, Or At The School Office</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <XCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">No Refund Policy</h3>
          <p className="text-muted-foreground text-sm">No Refund Will Be Given After Admission Confirmation</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Installment Plans</h3>
          <p className="text-muted-foreground text-sm">Quarterly Installment Plans Available For All Classes</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Fee Defaulters</h3>
          <p className="text-muted-foreground text-sm">Students With Pending Fees May Not Be Allowed In Exams</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Fee Receipt</h3>
          <p className="text-muted-foreground text-sm">Always Collect And Keep Fee Receipt For Future Reference</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Sibling Discount</h3>
          <p className="text-muted-foreground text-sm">Special Discount Available For Multiple Siblings In School</p>
        </div>
      </div>
    </div>
  </section>
);

const DisciplineRules = () => (
  <section>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        <AlertCircle className="h-5 w-5 text-primary" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Discipline Rules</h2>
    </div>
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Students Must Wear Proper Uniform Every Day</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
        <XCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Mobile Phones Are Strictly Prohibited In School Premises</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Respect Teachers, Staff, And Fellow Students At All Times</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Maintain Cleanliness In Classrooms And Campus</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
        <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Any Act Of Indiscipline Will Be Dealt With Strictly As Per School Policy</p>
      </div>
    </div>
  </section>
);

export { FeeChart, FeeRules, DisciplineRules };