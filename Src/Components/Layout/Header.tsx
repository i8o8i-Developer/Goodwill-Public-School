import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import schoolLogo from "@/Assets/School-Logo.png";

const navGroups = [
  {
    name: "Admissions",
    items: [
      { name: "Online Admission", path: "/admissions" },
      { name: "Appointments", path: "/appointment" },
      { name: "Fee & Rules", path: "/fee-and-rules" },
    ],
  },
  {
    name: "Academics",
    items: [
      { name: "Academics", path: "/academics" },
      { name: "Facilities", path: "/facilities" },
      { name: "Gallery", path: "/gallery" },
      { name: "Notices", path: "/notices" },
      { name: "Calendar", path: "/academic-calendar" },
    ],
  },
  {
    name: "School",
    items: [
      { name: "Management Speaks", path: "/management-speaks" },
      { name: "Teachers", path: "/teachers" },
      { name: "About Us", path: "/about" },
      { name: "Administration", path: "/administration" },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and School Name */}
          <Link to="/" className="flex items-center gap-3 py-2">
            <img 
              src={schoolLogo} 
              alt="Goodwill Public School Logo" 
              className="h-14 w-14 md:h-16 md:w-16 object-contain"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary leading-tight">
                Goodwill Public School
              </h1>
              <p className="hidden sm:block text-xs md:text-sm text-muted-foreground">
                Patti, Pratapgarh | CBSE Affiliated
              </p>
            </div>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary hover:text-secondary-foreground ${location.pathname === "/" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
            >
              Home
            </Link>
            {navGroups.map((group) => (
              <div key={group.name} className="relative group">
                <button className="px-3 py-2 text-sm font-medium flex items-center gap-1 rounded-md hover:bg-secondary hover:text-secondary-foreground text-foreground">
                  {group.name}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 top-full min-w-[180px] bg-card border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground rounded-md ${location.pathname === item.path ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              to="/tcdownload"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary hover:text-secondary-foreground ${location.pathname === "/tcdownload" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
            >
              TC Download
            </Link>
            <Link
              to="/examresult"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary hover:text-secondary-foreground ${location.pathname === "/examresult" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
            >
              Exam Result
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary hover:text-secondary-foreground ${location.pathname === "/contact" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${location.pathname === "/" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
              >
                Home
              </Link>
              {navGroups.map((group) => (
                <div key={group.name} className="mb-2">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.name}</div>
                  <div className="flex flex-col gap-1 pl-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`px-6 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${location.pathname === item.path ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/tcdownload"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${location.pathname === "/tcdownload" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
              >
                TC Download
              </Link>
              <Link
                to="/examresult"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${location.pathname === "/examresult" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
              >
                Exam Result
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${location.pathname === "/contact" ? "bg-primary text-primary-foreground" : "text-foreground"}`}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
