import Layout from "@/Components/Layout/Layout";
import { useState, useEffect } from "react";
import femaleTeacher from "@/Assets/Teachers/Female-Teacher.png";
import maleTeacher from "@/Assets/Teachers/Male-Teacher.png";
import { teachersAPI, Teacher } from "@/Services/Api";

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const data = await teachersAPI.getAllPublic();
        setTeachers(data);
      } catch (error) {
        console.error("Failed To Fetch Teachers", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">Our Teachers</h1>
          {loading ? (
            <div className="text-center text-muted-foreground py-12">Loading Teachers...</div>
          ) : teachers.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">No Teachers Available Yet.</div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teachers.map((teacher, idx) => (
              <div key={idx} className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-3xl mb-4 border-2 border-primary">
                  {teacher.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h2 className="text-xl font-bold text-primary mb-2">{teacher.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{teacher.subject}</p>
                <p className="text-sm text-foreground text-center">{teacher.qualification}</p>
                <p className="text-xs text-muted-foreground mt-2">{teacher.experience} Experience</p>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Teachers;
