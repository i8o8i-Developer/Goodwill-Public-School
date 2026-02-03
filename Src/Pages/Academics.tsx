import Layout from "@/Components/Layout/Layout";
import { BookOpen, Calculator, FlaskConical, Globe, Music, Palette, Dumbbell, MonitorPlay } from "lucide-react";
import heroClassroom from "@/Assets/Hero-Classroom.png";

const Academics = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroClassroom} alt="Academics" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Academics</h1>
            <p className="text-lg opacity-90">Excellence In Education</p>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Our Curriculum
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              CBSE Curriculum
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Goodwill Public School Follows The CBSE (Central Board of Secondary Education) 
              Curriculum, Which Provides A Comprehensive And Well-Rounded Education That 
              Prepares Students For Higher Studies And Competitive Examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Class Structure</h3>
              <div className="space-y-4">
                {[
                  { level: "Pre-Primary", classes: "Nursery, LKG, UKG", desc: "Foundation Years With Play-Based Learning" },
                  { level: "Primary", classes: "Class I to V", desc: "Building Core Skills In Language, Math, And Science" },
                  { level: "Middle School", classes: "Class VI to VIII", desc: "Expanding Knowledge Across Subjects" },
                  { level: "Secondary", classes: "Class IX to X", desc: "Board Examination Preparation" },
                  { level: "Senior Secondary", classes: "Class XI to XII", desc: "Specialization In Science/Commerce/Arts" },
                ].map((item, index) => (
                  <div key={index} className="bg-card border border-border p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-card-foreground">{item.level}</h4>
                      <span className="text-primary font-semibold text-sm">{item.classes}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Teaching Methodology</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our Teaching Methodology Is Designed To Make Learning Engaging, Interactive, 
                  And Effective. We Employ A Blend Of Traditional And Modern Teaching Techniques 
                  To Cater To Different Learning Styles.
                </p>
                <ul className="space-y-3">
                  {[
                    "Interactive Classroom Discussions",
                    "Hands-On Experiments And Projects",
                    "Audio-Visual Learning With Smart Boards",
                    "Regular Assessments And Feedback",
                    "Personalized Attention For Slow Learners",
                    "Advanced Programs For Gifted Students",
                    "Group Activities And Collaborative Learning",
                    "Real-World Application Of Concepts",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              What We Teach
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Subjects Offered
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, name: "English", color: "bg-info" },
              { icon: BookOpen, name: "Hindi", color: "bg-primary" },
              { icon: Calculator, name: "Mathematics", color: "bg-accent" },
              { icon: FlaskConical, name: "Science", color: "bg-destructive" },
              { icon: Globe, name: "Social Studies", color: "bg-info" },
              { icon: MonitorPlay, name: "Computer Science", color: "bg-primary" },
              { icon: Palette, name: "Art & Craft", color: "bg-accent" },
              { icon: Music, name: "Music", color: "bg-destructive" },
              { icon: Dumbbell, name: "Physical Education", color: "bg-info" },
              { icon: BookOpen, name: "Sanskrit", color: "bg-primary" },
              { icon: Globe, name: "Environmental Science", color: "bg-accent" },
              { icon: BookOpen, name: "Moral Science", color: "bg-destructive" },
            ].map((subject, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 mx-auto mb-4 ${subject.color}/10 rounded-lg flex items-center justify-center`}>
                  <subject.icon className={`h-7 w-7 text-primary`} />
                </div>
                <h3 className="font-semibold text-card-foreground">{subject.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Evaluation System
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Assessment & Examination
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Continuous Assessment",
                desc: "Regular Class Tests, Assignments, And Project Work To Evaluate Ongoing Learning Progress.",
              },
              {
                title: "Periodic Tests",
                desc: "Unit Tests Conducted Periodically To Assess Understanding Of Concepts Covered In Each Unit.",
              },
              {
                title: "Term Examinations",
                desc: "Comprehensive Examinations At The End Of Each Term Covering The Entire Syllabus.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-lg">
                <h3 className="text-xl font-bold text-card-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
