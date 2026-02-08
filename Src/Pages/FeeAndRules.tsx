import { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { FeeChart, FeeRules } from "../Components/Rules/FeeAndDiscipline";
import heroSchool from "@/Assets/Hero-School.png";
import { Download } from "lucide-react";

interface FeeDocument {
  id: number;
  title: string;
  attachment?: string;
}

const FeeAndRulesPage = () => {
  const [feeDocuments, setFeeDocuments] = useState<FeeDocument[]>([]);

  useEffect(() => {
    fetchFeeDocuments();
  }, []);

  const fetchFeeDocuments = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/public/fee-rules?category=FeeChartDownload');
      if (response.ok) {
        const data: FeeDocument[] = await response.json();
        // Filter Items With Attachments
        const docs = data.filter((item) => item.attachment);
        setFeeDocuments(docs);
      }
    } catch (error) {
      console.error('Failed To Fetch Fee Documents:', error);
    }
  };

  return (
  <Layout>
    {/* Hero Banner */}
    <section className="relative h-64 md:h-80">
      <img src={heroSchool} alt="Fee & Rules" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fee Structure & Rules</h1>
          <p className="text-lg opacity-90">Transparent Policies For A Better Learning Environment</p>
        </div>
      </div>
    </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Fee Chart Download Links */}
          {feeDocuments.length > 0 && (
            <div className="flex flex-wrap justify-end gap-4 mb-6">
              {feeDocuments.map((doc) => (
                <a
                  key={doc.id}
                  href={`http://localhost:8000${doc.attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors border border-primary"
                >
                  <Download className="h-5 w-5" />
                  Download {doc.title}
                </a>
              ))}
            </div>
          )}
          <FeeChart />
          <FeeRules />
        </div>
      </section>
    </Layout>
  );
};

export default FeeAndRulesPage;
