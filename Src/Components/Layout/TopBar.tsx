import { Phone, Mail, Facebook, MessageCircle, LogIn } from "lucide-react";
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
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <Link 
              to="/login" 
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
