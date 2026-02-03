import Layout from "@/Components/Layout/Layout";
import { BookOpen, Target, Eye, History, Award, Users, Heart } from "lucide-react";
import principalImage from "@/assets/principal.jpg";
import heroSchool from "@/Assets/Hero-School.png";

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
                Welcome To Goodwill Public School
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Goodwill Public School, Located In The Heart Of Patti, Pratapgarh, Uttar Pradesh, 
                  Is A Premier Educational Institution Committed To Providing Quality Education 
                  Following The CBSE Curriculum. Established With A Vision To Create Enlightened 
                  Citizens, We Have Been Serving The Community With Dedication And Excellence.
                </p>
                <p>
                  Our School Provides A Nurturing Environment Where Students Are Encouraged To 
                  Explore Their Potential, Develop Critical Thinking Skills, And Cultivate Values 
                  That Will Guide Them Throughout Their Lives. With State-Of-The-Art Facilities 
                  And A Dedicated Faculty, We Ensure That Every Child Receives Personalized   
                  Attention And Guidance.
                </p>
                <p>
                  From Nursery To Senior Secondary, We Offer A Comprehensive Curriculum That 
                  Balances Academic Rigor With Co-Curricular Activities, Sports, And Value 
                  Education To Ensure Holistic Development Of Every Student.
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
                <div className="text-sm">Years Of Excellence</div>
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
                To Be A Center Of Educational Excellence That Nurtures Young Minds To Become 
                Responsible, Compassionate, And Innovative Citizens Who Contribute Positively 
                To Society. We Envision A School Where Every Child Discovers Their Unique 
                Potential And Develops The Skills Necessary To Thrive In An Ever-Changing World.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To Provide Holistic Education That Combines Academic Excellence With Moral 
                Values, Character Building, And Life Skills. We Are Committed To Creating A 
                Safe, Inclusive, And Stimulating Learning Environment Where Students Are 
                Encouraged To Question, Explore, And Grow Into Confident Individuals Ready 
                To Face The Challenges Of Tomorrow.
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
                  It Gives Me Immense Pleasure To Welcome You To Goodwill Public School. Our 
                  Institution Stands As A Beacon Of Quality Education, Where We Strive To 
                  Develop Not Just Academic Excellence But Also Strong Moral Character In 
                  Our Students.
                </p>
                <p>
                  Education At Goodwill Goes Beyond Textbooks. We Believe In Nurturing The 
                  Complete Personality Of A Child - Intellectual, Physical, Emotional, And 
                  Spiritual. Our Dedicated Team Of Educators Works Tirelessly To Create An 
                  Environment That Fosters Curiosity, Creativity, And Critical Thinking.
                </p>
                <p>
                  As We Prepare Our Students For The Challenges Of The 21st Century, We 
                  Remain Committed To Our Core Values Of Integrity, Discipline, And 
                  Compassion. I Invite You To Join Us In This Beautiful Journey Of 
                  Learning And Growth.
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
              { icon: Award, title: "Excellence", desc: "Striving For The Highest Standards In Everything We Do" },
              { icon: Users, title: "Integrity", desc: "Upholding Honesty, Ethics, And Moral Principles" },
              { icon: Heart, title: "Compassion", desc: "Fostering Empathy And Care For Others" },
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
          <div className="w-full border-t-4 border-accent mt-12"></div>
      </section>
    </Layout>
  );
};

export default About;
