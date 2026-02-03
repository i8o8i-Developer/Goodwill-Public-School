import React from "react";

const disclosureData = [
  {
    title: "A. GENERAL INFORMATION",
    items: [
      { label: "Name of the School", value: "Goodwill Public School" },
      { label: "Affiliation Number", value: "1234567" },
      { label: "School Code", value: "98765" },
      { label: "Complete Address", value: "Patti, Pratapgarh, Uttar Pradesh - 230141" },
      { label: "Principal Name & Qualification", value: "Dr. S. Sharma, M.Sc., Ph.D." },
      { label: "School Email ID", value: "info@goodwillschool.edu.in" },
      { label: "Contact Number", value: "+91 9876543210" },
    ],
  },
  {
    title: "B. DOCUMENTS AND INFORMATION",
    items: [
      { label: "Affiliation Letter", value: <a href="#">View Document</a> },
      { label: "NOC from State Govt.", value: <a href="#">View Document</a> },
      { label: "Recognition Certificate", value: <a href="#">View Document</a> },
      { label: "Building Safety Certificate", value: <a href="#">View Document</a> },
      { label: "Fire Safety Certificate", value: <a href="#">View Document</a> },
      { label: "Health & Sanitation Certificate", value: <a href="#">View Document</a> },
    ],
  },
  {
    title: "C. RESULT AND ACADEMICS",
    items: [
      { label: "Academic Calendar", value: <a href="/academic-calendar">View</a> },
      { label: "List of Books", value: <a href="#">View Document</a> },
      { label: "Annual Report", value: <a href="#">View Document</a> },
    ],
  },
];

const MandatoryPublicDisclosure = () => {
  return (
    <div className="container mx-auto px-2 xs:px-3 sm:px-4 py-6 min-h-screen">
      <h1 className="text-2xl xs:text-3xl font-bold mb-6 xs:mb-8 text-center text-primary tracking-tight">Mandatory Public Disclosure</h1>
      <div className="flex flex-col gap-6 xs:gap-8">
        {disclosureData.map((section, idx) => (
          <section
            key={idx}
            className="bg-white/90 rounded-lg xs:rounded-xl shadow-md xs:shadow-lg p-4 xs:p-6 border border-gray-200"
          >
            <h2 className="text-lg xs:text-xl font-semibold mb-3 xs:mb-4 text-accent border-b border-accent/20 pb-2 xs:pb-3">
              {section.title}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-[320px] w-full text-left border-separate border-spacing-y-1 xs:border-spacing-y-2 text-sm xs:text-base">
                <tbody>
                  {section.items.map((item, i) => (
                    <tr key={i} className="align-top">
                      <td className="font-medium pr-2 xs:pr-4 py-2 w-1/2 text-gray-700 whitespace-pre-line align-top">
                        {item.label}
                      </td>
                      <td className="py-2 text-gray-900 w-1/2 align-top break-words">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MandatoryPublicDisclosure;