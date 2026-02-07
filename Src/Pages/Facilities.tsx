import React from "react";
import { SchoolFacilities, CampusFacilities } from "../Components/Facilities/FacilitiesSection";

import Layout from "../Components/Layout/Layout";
import heroSchool from "@/Assets/Hero-School.png";

const FacilitiesPage = () => (
  <Layout>
    {/* Hero Banner */}
    <section className="relative h-64 md:h-80">
      <img src={heroSchool} alt="Facilities" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
          <p className="text-lg opacity-90">World-Class Infrastructure For Holistic Development</p>
        </div>
      </div>
    </section>

    {/* Facilities Content */}
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <SchoolFacilities />
        <CampusFacilities />
      </div>
    </section>
  </Layout>
);

export default FacilitiesPage;
