import Layout from "@/Components/Layout/Layout";
import principalImage from "@/Assets/Principal.jpg";
import heroSchool from "@/Assets/Hero-School.png";

const administrationTeam = [
  {
    name: "Mr. Ramesh Chandra Gupta",
    designation: "Chairman",
    qualification: "M.Com, MBA",
    image: principalImage,
    message: "Education Is The Most Powerful Weapon Which You Can Use To Change The World. At Goodwill, We Are Committed To Providing Quality Education That Transforms Lives.",
  },
  {
    name: "Dr. Rajesh Kumar Singh",
    designation: "Principal",
    qualification: "M.A., M.Ed., Ph.D.",
    image: principalImage,
    message: "Our Mission Is To Nurture Young Minds And Prepare Them To Become Responsible Citizens Who Contribute Positively To Society.",
  },
  {
    name: "Mrs. Sunita Devi",
    designation: "Vice Principal",
    qualification: "M.Sc., B.Ed.",
    image: principalImage,
    message: "We Believe In Holistic Development That Goes Beyond Academics To Include Character Building And Life Skills.",
  },
];

const managementCommittee = [
  { name: "Mr. Ramesh Chandra Gupta", role: "Chairman" },
  { name: "Mrs. Kamla Devi Gupta", role: "Vice Chairperson" },
  { name: "Mr. Vijay Kumar", role: "Secretary" },
  { name: "Mr. Ashok Sharma", role: "Treasurer" },
  { name: "Dr. Priya Singh", role: "Academic Director" },
  { name: "Mr. Suresh Yadav", role: "Member" },
];

const Administration = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroSchool} alt="Administration" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
            <p className="text-lg opacity-90">Meet Our Leadership Team</p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Our Leaders
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              School Leadership
            </h2>
          </div>

          <div className="space-y-16">
            {administrationTeam.map((member, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`flex justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/10 rounded-lg transform rotate-3"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-64 h-80 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                    {member.designation}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">{member.qualification}</p>
                  <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                    "{member.message}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Committee */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Governing Body
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Management Committee
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {managementCommittee.map((member, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-bold text-card-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Administration;
