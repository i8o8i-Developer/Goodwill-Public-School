import Layout from "@/Components/Layout/Layout";
import { BookOpen, Target, Eye, History, Award, Users, Heart } from "lucide-react";
import principalImage from "@/assets/principal.jpg";
import heroSchool from "@/assets/hero-school.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroSchool} alt="About Us" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg opacity-90">Know More About Goodwill Public School</p>
          </div>
        </div>
      </section>

      {/* School Introduction */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Welcome to Goodwill Public School
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Goodwill Public School, located in the heart of Patti, Pratapgarh, Uttar Pradesh, 
                  is a premier educational institution committed to providing quality education 
                  following the CBSE curriculum. Established with a vision to create enlightened 
                  citizens, we have been serving the community with dedication and excellence.
                </p>
                <p>
                  Our school provides a nurturing environment where students are encouraged to 
                  explore their potential, develop critical thinking skills, and cultivate values 
                  that will guide them throughout their lives. With state-of-the-art facilities 
                  and a dedicated faculty, we ensure that every child receives personalized 
                  attention and guidance.
                </p>
                <p>
                  From Nursery to Senior Secondary, we offer a comprehensive curriculum that 
                  balances academic rigor with co-curricular activities, sports, and value 
                  education to ensure holistic development of every student.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroSchool} 
                alt="School Campus" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-md border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a center of educational excellence that nurtures young minds to become 
                responsible, compassionate, and innovative citizens who contribute positively 
                to society. We envision a school where every child discovers their unique 
                potential and develops the skills necessary to thrive in an ever-changing world.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide holistic education that combines academic excellence with moral 
                values, character building, and life skills. We are committed to creating a 
                safe, inclusive, and stimulating learning environment where students are 
                encouraged to question, explore, and grow into confident individuals ready 
                to face the challenges of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <img 
                  src={principalImage} 
                  alt="Principal" 
                  className="w-64 h-80 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-md text-center min-w-max">
                  <p className="font-bold">Dr. Rajesh Kumar Singh</p>
                  <p className="text-sm opacity-90">Principal</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Principal's Message
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Word From Our Principal
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dear Parents and Students,
                </p>
                <p>
                  It gives me immense pleasure to welcome you to Goodwill Public School. Our 
                  institution stands as a beacon of quality education, where we strive to 
                  develop not just academic excellence but also strong moral character in 
                  our students.
                </p>
                <p>
                  Education at Goodwill goes beyond textbooks. We believe in nurturing the 
                  complete personality of a child - intellectual, physical, emotional, and 
                  spiritual. Our dedicated team of educators works tirelessly to create an 
                  environment that fosters curiosity, creativity, and critical thinking.
                </p>
                <p>
                  As we prepare our students for the challenges of the 21st century, we 
                  remain committed to our core values of integrity, discipline, and 
                  compassion. I invite you to join us in this beautiful journey of 
                  learning and growth.
                </p>
                <p className="font-semibold text-foreground">
                  Dr. Rajesh Kumar Singh<br />
                  <span className="text-primary">Principal, Goodwill Public School</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Excellence", desc: "Striving for the highest standards in everything we do" },
              { icon: Users, title: "Integrity", desc: "Upholding honesty, ethics, and moral principles" },
              { icon: Heart, title: "Compassion", desc: "Fostering empathy and care for others" },
            ].map((value, index) => (
              <div key={index} className="text-center text-primary-foreground">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                  <value.icon className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="opacity-90">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
