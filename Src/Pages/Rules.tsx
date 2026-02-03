import Layout from "@/Components/Layout/Layout";
import { Book, Clock, Shirt, FileWarning, Users, Shield, Award, AlertTriangle } from "lucide-react";
import heroSchool from "@/assets/hero-school.jpg";

const Rules = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <img src={heroSchool} alt="Rules" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rules & Regulations</h1>
            <p className="text-lg opacity-90">Guidelines for a Disciplined Environment</p>
          </div>
        </div>
      </section>

      {/* Rules Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                School Discipline
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Code of Conduct
              </h2>
              <p className="text-muted-foreground">
                These rules are designed to create a safe, respectful, and conducive learning 
                environment for all students.
              </p>
            </div>

            <div className="space-y-8">
              {/* Attendance */}
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">Attendance Policy</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Students must maintain a minimum of 75% attendance to appear for examinations.</li>
                      <li>• Late arrivals will be noted and parents will be informed.</li>
                      <li>• Leave applications must be submitted in advance for planned absences.</li>
                      <li>• Medical leave requires a doctor's certificate for absences exceeding 3 days.</li>
                      <li>• Students should reach school at least 10 minutes before the assembly.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Uniform */}
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shirt className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">Uniform Guidelines</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Students must wear the prescribed school uniform every day.</li>
                      <li>• Uniforms should be clean, ironed, and in good condition.</li>
                      <li>• Black polished shoes and white socks are mandatory.</li>
                      <li>• ID cards must be worn at all times within the school premises.</li>
                      <li>• No jewelry or accessories except for small ear studs for girls.</li>
                      <li>• Hair should be neat and well-groomed. Boys must have short hair.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Examination */}
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">Examination Rules</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Students must carry their admit card for all examinations.</li>
                      <li>• Mobile phones and electronic devices are strictly prohibited.</li>
                      <li>• Any form of malpractice will result in immediate disqualification.</li>
                      <li>• Students must remain seated until the exam paper is collected.</li>
                      <li>• No student can leave the exam hall before the specified time.</li>
                      <li>• All necessary stationery should be brought by the student.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Discipline */}
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">General Discipline</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Respect teachers, staff, and fellow students at all times.</li>
                      <li>• Bullying, ragging, or any form of harassment is strictly prohibited.</li>
                      <li>• School property must be treated with care. Damage will result in fines.</li>
                      <li>• Students should not leave the campus during school hours without permission.</li>
                      <li>• Use of abusive language is not tolerated.</li>
                      <li>• Students must participate in assembly, sports, and other school activities.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prohibited Items */}
              <div className="bg-card border border-l-4 border-l-destructive p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">Prohibited Items</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Mobile phones and other electronic gadgets</li>
                      <li>• Expensive jewelry or large amounts of cash</li>
                      <li>• Weapons or sharp objects of any kind</li>
                      <li>• Chewing gum, tobacco, or any harmful substances</li>
                      <li>• Playing cards, dice, or other gaming materials</li>
                      <li>• Any material that is inappropriate or against school values</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rules;
