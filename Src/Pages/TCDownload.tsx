import React from "react";
import Layout from "../Components/Layout/Layout";
import { TCDownloadSection } from "../Components/Results/TCAndExamResult";
import heroSchool from "@/Assets/Hero-School.png";

const TCDownloadPage = () => (
  <Layout>
    {/* Hero Banner */}
    <section className="relative h-64 md:h-80">
      <img src={heroSchool} alt="Transfer Certificate" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transfer Certificate (TC) Download</h1>
          <p className="text-lg opacity-90">Download Your Transfer Certificate</p>
        </div>
      </div>
    </section>

    {/* Content */}
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <TCDownloadSection />
      </div>
    </section>
  </Layout>
);

export default TCDownloadPage;
