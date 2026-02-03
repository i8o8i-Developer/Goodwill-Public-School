import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/Button";
import { motion } from "framer-motion";
import heroSchool from "@/Assets/Hero-School.jpg";
import heroClassroom from "@/Assets/Hero-Classroom.jpg";
import heroSports from "@/Assets/Hero-Sports.jpg";

const galleryImages = [
  {
    id: 1,
    src: heroSchool,
    title: "School Campus",
    category: "Campus",
  },
  {
    id: 2,
    src: heroClassroom,
    title: "Smart Classroom",
    category: "Academics",
  },
  {
    id: 3,
    src: heroSports,
    title: "Sports Day",
    category: "Events",
  },
  {
    id: 4,
    src: heroSchool,
    title: "Annual Function",
    category: "Events",
  },
  {
    id: 5,
    src: heroClassroom,
    title: "Science Lab",
    category: "Facilities",
  },
  {
    id: 6,
    src: heroSports,
    title: "Cultural Program",
    category: "Events",
  },
];

const GalleryPreview = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Memories & Moments
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Gallery
            </h2>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/gallery" className="flex items-center gap-2">
              View Full Gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-lg ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Link to="/gallery">
                <img
                  src={image.src}
                  alt={image.title}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    index === 0 ? 'h-64 md:h-full' : 'h-48 md:h-56'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-background transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">
                    {image.category}
                  </p>
                  <h3 className="font-bold">{image.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
