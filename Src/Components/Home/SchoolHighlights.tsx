import { GraduationCap, Users, Trophy, Monitor, Palette, BookCheck } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    number: "500+",
    label: "Students",
    color: "bg-primary",
  },
  {
    icon: Users,
    number: "35+",
    label: "Expert Teachers",
    color: "bg-info",
  },
  {
    icon: Trophy,
    number: "50+",
    label: "Awards Won",
    color: "bg-accent",
  },
  {
    icon: Monitor,
    number: "15+",
    label: "Smart Classrooms",
    color: "bg-primary",
  },
  {
    icon: Palette,
    number: "20+",
    label: "Activities",
    color: "bg-destructive",
  },
  {
    icon: BookCheck,
    number: "98%",
    label: "Pass Rate",
    color: "bg-info",
  },
];

const SchoolHighlights = () => {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
            Our Achievements
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            School Highlights
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Numbers That Speak For Our Commitment To Quality Education And All-Round Development.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <item.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                {item.number}
              </div>
              <div className="text-sm text-primary-foreground/80 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolHighlights;
