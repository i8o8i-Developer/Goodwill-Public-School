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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
