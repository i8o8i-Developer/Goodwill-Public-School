import Layout from "@/Components/Layout/Layout";
import { useState } from "react";
import femaleTeacher from "@/Assets/Teachers/Female-Teacher.png";
import maleTeacher from "@/Assets/Teachers/Male-Teacher.png";

// Example teacher data
const teachers = [
  {
    name: "Mrs. Anjali Sharma",
    subject: "Mathematics",
    photo: femaleTeacher,
    bio: "Senior Mathematics Teacher With 15+ Years Of Experience."
  },
  {
    name: "Mr. Rajesh Kumar",
    subject: "Science",
    photo: maleTeacher,
    bio: "Passionate About Practical Science And Student Engagement."
  },
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
