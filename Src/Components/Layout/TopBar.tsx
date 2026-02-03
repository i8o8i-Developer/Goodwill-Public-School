import { Phone, Mail, MessageCircle, LogIn, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+91 9876543210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">info@goodwillschool.edu.in</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/mandatory-public-disclosure"
              className="flex items-center gap-1 hover:text-accent transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Mandatory Public Disclosure</span>
            </Link>
            <Link 
              to="/erp/login" 
              className="flex items-center gap-1 hover:text-accent transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">ERP Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
