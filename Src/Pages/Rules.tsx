import Layout from "@/Components/Layout/Layout";
import { Book, Clock, Shirt, FileWarning, Users, Shield, Award, AlertTriangle } from "lucide-react";
import heroSchool from "@/Assets/Hero-School.png";

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
            <p className="text-lg opacity-90">Guidelines For A Disciplined Environment</p>
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
                Code Of Conduct
              </h2>
              <p className="text-muted-foreground">
                These Rules Are Designed To Create A Safe, Respectful, And Conducive Learning 
                Environment For All Students.
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
                      <li>• Students Must Maintain A Minimum Of 75% Attendance To Appear For Examinations.</li>
                      <li>• Late Arrivals Will Be Noted And Parents Will Be Informed.</li>
                      <li>• Leave Applications Must Be Submitted In Advance For Planned Absences.</li>
                      <li>• Medical Leave Requires A Doctor's Certificate For Absences Exceeding 3 Days.</li>
                      <li>• Students Should Reach School At Least 10 Minutes Before The Assembly.</li>
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
                      <li>• Students Must Wear The Prescribed School Uniform Every Day.</li>
                      <li>• Uniforms Should Be Clean, Ironed, And In Good Condition.</li>
                      <li>• Black Polished Shoes And White Socks Are Mandatory.</li>
                      <li>• ID Cards Must Be Worn At All Times Within The School Premises.</li>
                      <li>• No Jewelry Or Accessories Except For Small Ear Studs For Girls.</li>
                      <li>• Hair Should Be Neat And Well-Groomed. Boys Must Have Short Hair.</li>
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
                      <li>• Students Must Carry Their Admit Card For All Examinations.</li>
                      <li>• Mobile Phones And Electronic Devices Are Strictly Prohibited.</li>
                      <li>• Any Form Of Malpractice Will Result In Immediate Disqualification.</li>
                      <li>• Students Must Remain Seated Until The Exam Paper Is Collected.</li>
                      <li>• No Student Can Leave The Exam Hall Before The Specified Time.</li>
                      <li>• All Necessary Stationery Should Be Brought By The Student.</li>
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
                      <li>• Respect Teachers, Staff, And Fellow Students At All Times.</li>
                      <li>• Bullying, Ragging, Or Any Form Of Harassment Is Strictly Prohibited.</li>
                      <li>• School Property Must Be Treated With Care. Damage Will Result In Fines.</li>
                      <li>• Students Should Not Leave The Campus During School Hours Without Permission.</li>
                      <li>• Use Of Abusive Language Is Not Tolerated.</li>
                      <li>• Students Must Participate In Assembly, Sports, And Other School Activities.</li>
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
                      <li>• Mobile Phones And Other Electronic Gadgets</li>
                      <li>• Expensive Jewelry Or Large Amounts Of Cash</li>
                      <li>• Weapons Or Sharp Objects Of Any Kind</li>
                      <li>• Chewing Gum, Tobacco, Or Any Harmful Substances</li>
                      <li>• Playing Cards, Dice, Or Other Gaming Materials</li>
                      <li>• Any Material That Is Inappropriate Or Against School Values</li>
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
