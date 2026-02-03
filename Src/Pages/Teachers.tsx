import Layout from "@/Components/Layout/Layout";
import { useState } from "react";

// Example teacher data
const teachers = [
  {
    name: "Mrs. Anjali Sharma",
    subject: "Mathematics",
    photo: "/Assets/Teachers/anjali-sharma.jpg",
    bio: "Senior Mathematics teacher with 15+ years of experience."
  },
  {
    name: "Mr. Rajesh Kumar",
    subject: "Science",
    photo: "/Assets/Teachers/rajesh-kumar.jpg",
    bio: "Passionate about practical science and student engagement."
  },
  // Add more teachers as needed
];

const Teachers = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">Our Teachers</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teachers.map((teacher, idx) => (
              <div key={idx} className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img src={teacher.photo} alt={teacher.name} className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-primary" />
                <h2 className="text-xl font-bold text-primary mb-2">{teacher.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{teacher.subject}</p>
                <p className="text-sm text-foreground text-center">{teacher.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Teachers;
