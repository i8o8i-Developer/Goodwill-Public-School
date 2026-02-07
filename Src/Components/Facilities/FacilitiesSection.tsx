import React from "react";
import { Bus, TreePalm, Palette, Music, BookOpen, Wifi, Building2, Presentation } from "lucide-react";

const SchoolFacilities = () => (
  <section className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">School Facilities</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Bus className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">School Bus</h3>
          <p className="text-muted-foreground text-sm">Safe And Reliable Transportation For Students</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <TreePalm className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">Playground</h3>
          <p className="text-muted-foreground text-sm">Spacious Outdoor Area For Sports And Recreation</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Palette className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">Dance And Art Room</h3>
          <p className="text-muted-foreground text-sm">Creative Spaces For Artistic Development</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Music className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">Music Room</h3>
          <p className="text-muted-foreground text-sm">Equipped Studio For Musical Training</p>
        </div>
      </div>
    </div>
  </section>
);

const CampusFacilities = () => (
  <section>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Campus Facilities</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">Library</h3>
          <p className="text-muted-foreground text-sm">Well-Stocked Library With Diverse Collection</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Wifi className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">WiFi Campus</h3>
          <p className="text-muted-foreground text-sm">High-Speed Internet Connectivity Throughout</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">Indoor Stadium</h3>
          <p className="text-muted-foreground text-sm">Modern Indoor Sports Facility</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Presentation className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-1">Seminar Hall</h3>
          <p className="text-muted-foreground text-sm">State-Of-The-Art Auditorium For Events</p>
        </div>
      </div>
    </div>
  </section>
);

export { SchoolFacilities, CampusFacilities };