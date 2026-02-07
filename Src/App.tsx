import { Toaster } from "@/Components/ui/Toaster";
import { Toaster as Sonner } from "@/Components/ui/Sonner";
import { TooltipProvider } from "@/Components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import About from "./Pages/About";
import Admissions from "./Pages/Admissions";
import Academics from "./Pages/Academics";
import Administration from "./Pages/Administration";
import Rules from "./Pages/Rules";
import Gallery from "./Pages/Gallery";
import Notices from "./Pages/Notices";
import Contact from "./Pages/Contact";


import NotFound from "./Pages/NotFound";
import AcademicCalendar from "./Pages/AcademicCalendar";
import Teachers from "./Pages/Teachers";
import MandatoryPublicDisclosure from "./Pages/MandatoryPublicDisclosure";
import ComingSoon from "./Pages/ComingSoon";
import FacilitiesPage from "./Pages/Facilities";
import FeeAndRulesPage from "./Pages/FeeAndRules";
import TCAndResultPage from "./Pages/TCAndResult";
import TCDownload from "./Pages/TCDownload";
import ExamResult from "./Pages/ExamResult";
import AppointmentPage from "./Pages/Appointment";
import ManagementSpeaksPage from "./Pages/ManagementSpeaks";

// Admin Imports
import AdminLogin from "./Pages/Admin/Login";
import AdminLayout from "./Components/Layout/AdminLayout";
import AdminDashboard from "./Pages/Admin/Dashboard";
import AdminStudents from "./Pages/Admin/Students";
import AdminTeachers from "./Pages/Admin/Teachers";
import AdminNotices from "./Pages/Admin/Notices";
import AdminGallery from "./Pages/Admin/Gallery";
import AdminResults from "./Pages/Admin/Results";
import AdminTCRequests from "./Pages/Admin/TCRequests";
import AdminAppointments from "./Pages/Admin/Appointments";
import AdminAdmissions from "./Pages/Admin/Admissions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/academic-calendar" element={<AcademicCalendar />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/mandatory-public-disclosure" element={<MandatoryPublicDisclosure />} />
          <Route path="/erp/login" element={<ComingSoon />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/fee-and-rules" element={<FeeAndRulesPage />} />
          <Route path="/tcdownload" element={<TCDownload />} />
          <Route path="/examresult" element={<ExamResult />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/management-speaks" element={<ManagementSpeaksPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="notices" element={<AdminNotices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="results" element={<AdminResults />} />
            <Route path="tc-requests" element={<AdminTCRequests />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="admissions" element={<AdminAdmissions />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
