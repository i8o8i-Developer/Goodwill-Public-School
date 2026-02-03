import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, MessageCircle, Clock, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import schoolLogo from "@/Assets/School-Logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-2 xs:px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={schoolLogo} 
                alt="Goodwill Public School Logo" 
                className="h-12 w-12 object-contain bg-background rounded-lg p-1"
              />
              <div>
                <h3 className="font-bold text-lg">Goodwill Public School</h3>
                <p className="text-sm opacity-90">Excellence in Education</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Nurturing Young Minds With Value-Based Education, Discipline, And Excellence Since Our Establishment.<br />
              We Are Committed To Holistic Development, Academic Achievement, And Strong Moral Values.<br />
              Join Us In Building A Brighter Future For Every Student At Goodwill Public School.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="opacity-90 hover:opacity-100 hover:underline">About Us</Link></li>
              <li><Link to="/admissions" className="opacity-90 hover:opacity-100 hover:underline">Admissions</Link></li>
              <li><Link to="/academics" className="opacity-90 hover:opacity-100 hover:underline">Academics</Link></li>
              <li><Link to="/gallery" className="opacity-90 hover:opacity-100 hover:underline">Gallery</Link></li>
              <li><Link to="/notices" className="opacity-90 hover:opacity-100 hover:underline">Notices</Link></li>
              <li><Link to="/contact" className="opacity-90 hover:opacity-100 hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Patti, Pratapgarh, Uttar Pradesh - 230141</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">info@goodwillschool.edu.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">Mon - Sat: 8:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Location Map */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Find Us</h4>
            <div className="rounded-lg overflow-hidden border-2 border-primary-foreground/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57447.15!2d82.06!3d25.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ2JzQ4LjAiTiA4MsKwMDMnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              ></iframe>
            </div>
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4 mt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-[#1877F2] hover:text-white transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-green-500 hover:text-white transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-pink-500 hover:text-white transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-blue-400 hover:text-white transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-red-600 hover:text-white transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-blue-700 hover:text-white transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20 mt-4">
        <div className="container mx-auto px-2 xs:px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-center">
            <p className="opacity-90">
              © {new Date().getFullYear()} Goodwill Public School. All Rights Reserved.
            </p>
            <p className="opacity-90">
              Designed & Developed By <span className="font-semibold text-accent">DurgaAI Solutions</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
