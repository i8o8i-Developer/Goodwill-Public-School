import { Award, Shield, Heart, BookOpen, Users, Star } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Excellence For All",
    description: "We Strive For Academic Excellence While Nurturing Individual Talents And Abilities Of Every Student.",
  },
  {
    icon: BookOpen,
    title: "Value Based Education",
    description: "Instilling Moral Values, Ethics, And Character Building Alongside Academic Curriculum.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "A Secure And Disciplined Campus Where Students Can Learn And Grow Without Concerns.",
  },
  {
    icon: Users,
    title: "Experienced Faculty",
    description: "Dedicated And Qualified Teachers Committed To Bringing Out The Best In Every Child.",
  },
  {
    icon: Heart,
    title: "Holistic Development",
    description: "Focus On Physical, Mental, Emotional, And Social Development Of Students.",
  },
  {
    icon: Star,
    title: "Modern Facilities",
    description: "Smart Classrooms, Science Labs, Library, And Sports Facilities For Complete Learning.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Why Parents Trust Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Goodwill Public School?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We Provide A Nurturing Environment Where Students Develop Academically, Socially, And Emotionally To Become Responsible Citizens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
