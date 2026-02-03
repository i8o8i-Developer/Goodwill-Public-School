import { useState } from "react";
import Layout from "@/Components/Layout/Layout";
import heroSchool from "@/Assets/Hero-School.png";
import heroClassroom from "@/Assets/Hero-Classroom.png";
import heroSports from "@/Assets/Hero-Sports.png";
import culturalprogram from "@/Assets/Cultural-Program.png";  
import annualfunction from "@/Assets/Annual-Function.png";
import sciencelab from "@/Assets/Science-Lab.png";
import { X } from "lucide-react";

const galleryData = [
  {
    category: "Campus",
    images: [
      { src: heroSchool, title: "Campus View" },
    ],
  },
  {
    category: "Academics",
    images: [
      { src: heroClassroom, title: "Smart Classroom" },
      { src: sciencelab, title: "Science Lab" },
    ],
  },
  {
    category: "Events",
    images: [
      { src: annualfunction, title: "Annual Function" },
      { src: culturalprogram, title: "Cultural Program" },
    ],
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...galleryData.map((g) => g.category)];
  const filteredImages =
    activeCategory === "All"
      ? galleryData.flatMap((g) => g.images.map((img) => ({ ...img, category: g.category })))
      : galleryData
          .find((g) => g.category === activeCategory)
          ?.images.map((img) => ({ ...img, category: activeCategory })) || [];

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroSchool} alt="Gallery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-lg opacity-90">Memories & Moments</p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-background transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">
                    {image.category}
                  </p>
                  <h3 className="font-bold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-background/20 rounded-full hover:bg-background/40 transition-colors text-background"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-lg">
              <h3 className="text-background font-bold text-lg">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
