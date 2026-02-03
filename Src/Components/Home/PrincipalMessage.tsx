import { Quote } from "lucide-react";
import principalImage from "@/Assets/Principal.jpg";

const PrincipalMessage = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              From The Principal's Desk
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              A Message of Welcome
            </h2>
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 h-12 w-12 text-primary/20" />
              <blockquote className="text-muted-foreground leading-relaxed space-y-4 pl-8">
                <p>
                  Dear Parents and Students,
                </p>
                <p>
                  Welcome To Goodwill Public School, Here We Believe In Nurturing Not Just 
                  Academic Excellence But Also The Moral And Ethical Values That Make A 
                  Complete Human Being. Our Dedicated Faculty Works Tirelessly To Provide 
                  An Environment That Encourages Curiosity, Creativity, And Critical Thinking.
                </p>
                <p>
                  At Goodwill, We Understand That Every Child Is Unique And Has The Potential 
                  To Excel. Our Holistic Approach To Education Ensures That Students Develop 
                  Into Responsible Citizens Who Contribute Positively To Society.
                </p>
                <p>
                  I Invite You To Join Our Goodwill Family And Experience The Difference 
                  That Value-Based Education Can Make In Your Child's Life.
                </p>
              </blockquote>
            </div>
            <div className="mt-6 pl-8">
              <p className="font-bold text-foreground">Dr. Rajesh Kumar Singh</p>
              <p className="text-primary font-medium">Principal</p>
              <p className="text-sm text-muted-foreground">M.A., M.Ed., Ph.D.</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-lg transform rotate-3"></div>
              <img
                src={principalImage}
                alt="Principal - Dr. Rajesh Kumar Singh"
                className="relative w-72 h-72 md:w-80 md:h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent px-6 py-3 rounded-lg shadow-md">
                <p className="font-bold text-accent-foreground text-sm">25+ Years</p>
                <p className="text-xs text-accent-foreground/80">in Education</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
