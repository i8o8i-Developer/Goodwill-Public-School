import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/Components/ui/Card";
import { Users, UserCircle, Bell, Image, Trophy, FileText, Calendar, UserCheck } from "lucide-react";
import { studentsAPI, teachersAPI, noticesAPI, galleryAPI, resultsAPI, tcRequestsAPI, appointmentsAPI, admissionsAPI } from "@/Services/Api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    notices: 0,
    gallery: 0,
    results: 0,
    tcRequests: 0,
    appointments: 0,
    admissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [students, teachers, notices, gallery, results, tcRequests, appointments, admissions] = await Promise.all([
          studentsAPI.getAll(),
          teachersAPI.getAll(),
          noticesAPI.getAll(),
          galleryAPI.getAll(),
          resultsAPI.getAll(),
          tcRequestsAPI.getAll(),
          appointmentsAPI.getAll(),
          admissionsAPI.getAll(),
        ]);
        setCounts({
          students: students.length,
          teachers: teachers.length,
          notices: notices.length,
          gallery: gallery.length,
          results: results.length,
          tcRequests: tcRequests.length,
          appointments: appointments.length,
          admissions: admissions.length,
        });
      } catch (e) {
        // Optionally Handle Error
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  const stats = [
    { label: "Total Students", value: counts.students, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { label: "Total Teachers", value: counts.teachers, icon: UserCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20" },
    { label: "Active Notices", value: counts.notices, icon: Bell, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
    { label: "Gallery Images", value: counts.gallery, icon: Image, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/20" },
    { label: "Exam Results", value: counts.results, icon: Trophy, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/20" },
    { label: "TC Requests", value: counts.tcRequests, icon: FileText, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/20" },
    { label: "Appointments", value: counts.appointments, icon: Calendar, color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-950/20" },
    { label: "New Admissions", value: counts.admissions, icon: UserCheck, color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/20" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome Back, Administrator</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <div className="col-span-4 text-center text-muted-foreground py-12">Loading Statistics...</div>
        ) : (
          stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`${stat.bg} p-4 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Recent Activities - Hidden Until Activity Logging Is Implemented */}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card 
          className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/admin/students')}
        >
          <Users className="h-8 w-8 mb-2" />
          <h3 className="font-semibold">Add Student</h3>
        </Card>
        <Card 
          className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/admin/notices')}
        >
          <Bell className="h-8 w-8 mb-2" />
          <h3 className="font-semibold">Post Notice</h3>
        </Card>
        <Card 
          className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/admin/results')}
        >
          <Trophy className="h-8 w-8 mb-2" />
          <h3 className="font-semibold">Upload Result</h3>
        </Card>
        <Card 
          className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/admin/gallery')}
        >
          <Image className="h-8 w-8 mb-2" />
          <h3 className="font-semibold">Upload Image</h3>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
