import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Link } from "react-router-dom";
import heroSchool from "@/Assets/Hero-School.jpg";
import heroClassroom from "@/Assets/Hero-Classroom.jpg";
import heroSports from "@/Assets/Hero-Sports.jpg";

const slides = [
  {
    image: heroSchool,
    title: "Welcome To Goodwill Public School",
    subtitle: "Nurturing Young Minds For A Brighter Tomorrow",
    description: "Excellence In Education | CBSE Affiliated",
  },
  {
    image: heroClassroom,
    title: "Smart Learning Environment",
    subtitle: "Modern Classrooms With Latest Technology",
    description: "Interactive Smart Boards | Digital Learning",
  },
  {
    image: heroSports,
    title: "Holistic Development",
    subtitle: "Sports, Culture & Academic Excellence",
    description: "Annual Sports Day | Cultural Programs | Competitions",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
              {/* Content - perfectly centered, improved spacing, enhanced View Notices hover */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full flex justify-center items-center">
                  <motion.div
                    className="w-full max-w-2xl text-background space-y-4 md:space-y-6 bg-black/70 p-10 rounded-3xl shadow-2xl backdrop-blur-lg border border-white/10 flex flex-col items-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
                  >
                    <p className="text-accent font-semibold text-base md:text-lg uppercase tracking-wider mb-2 text-center">
                      {slide.description}
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg mb-2 text-center">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-2xl opacity-90 mb-6 text-center">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 pt-2 w-full justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="bg-accent text-accent-foreground font-semibold w-full md:w-auto px-8 py-3 text-lg rounded-lg shadow-md transition-all duration-200 hover:bg-accent/90 hover:shadow-xl hover:scale-105 focus:scale-105"
                      >
                        <Link to="/admissions" className="flex items-center justify-center w-full h-full">Apply For Admission</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="bg-white text-black border-2 border-white font-semibold w-full md:w-auto px-8 py-3 text-lg rounded-lg shadow-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary focus:scale-105"
                      >
                        <Link to="/notices" className="flex items-center justify-center w-full h-full">View Notices</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 rounded-full transition-colors text-background"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 rounded-full transition-colors text-background"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-accent w-8"
                : "bg-background/50 hover:bg-background/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
