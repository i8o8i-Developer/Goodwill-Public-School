import React from "react";
import { Users, User, Briefcase, Quote } from "lucide-react";

const ManagementSpeaksSection = () => (
  <section>
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        <Users className="h-5 w-5 text-primary" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">Management Speaks</h2>
    </div>
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Chairman’s Message</h3>
      <p className="text-lg mb-2">Welcome To Goodwill Public School. Our Vision Is To Nurture Young Minds And Empower Them To Become Responsible Citizens. We Believe In Holistic Education And Strive To Provide The Best Facilities And Opportunities For Our Students.</p>
    </div>
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Principal’s Message</h3>
      <p className="text-lg mb-2">Education Is The Foundation Of A Bright Future. At Goodwill Public School, We Focus On Academic Excellence, Character Building, And Co-Curricular Development. We Invite You To Join Us In This Journey Of Learning And Growth.</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">Director’s Message</h3>
      <p className="text-lg">Our School Is Committed To Innovation And Continuous Improvement. We Encourage Students To Explore, Create, And Lead. Thank You For Trusting Us With Your Child’s Education.</p>
    </div>
  </section>
);

export default ManagementSpeaksSection;
