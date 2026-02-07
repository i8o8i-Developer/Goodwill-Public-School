import React from "react";
import { IndianRupee, Clock, CreditCard, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const FeeChart = () => (
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
              <th className="px-6 py-4 text-left font-semibold">Annual Fee</th>
              <th className="px-6 py-4 text-left font-semibold">Quarterly Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">Nursery</td>
              <td className="px-6 py-4 text-muted-foreground">₹15,000</td>
              <td className="px-6 py-4 text-muted-foreground">₹3,750</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">Primary (I-V)</td>
              <td className="px-6 py-4 text-muted-foreground">₹18,000</td>
              <td className="px-6 py-4 text-muted-foreground">₹4,500</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">Middle (VI-VIII)</td>
              <td className="px-6 py-4 text-muted-foreground">₹20,000</td>
              <td className="px-6 py-4 text-muted-foreground">₹5,000</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">Senior (IX-XII)</td>
              <td className="px-6 py-4 text-muted-foreground">₹22,000</td>
              <td className="px-6 py-4 text-muted-foreground">₹5,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

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
        <p className="text-muted-foreground">Fees Must Be Paid By The 10th Of Each Quarter</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Late Payment Will Incur A Fine Of ₹100 Per Week</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <CreditCard className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Fees Can Be Paid Online Or At The School Office</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
        <XCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">No Refund Will Be Given After Admission</p>
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