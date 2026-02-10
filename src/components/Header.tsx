import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Услуги", href: "#services", isSection: true },
  { label: "Преимущества", href: "#advantages", isSection: true },
  { label: "О компании", href: "#about", isSection: true },
  { label: "Контакты", href: "#contacts", isSection: true },
  { label: "Агентам", href: "/agents", isSection: false },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    
    if (item.isSection) {
      // If we're on home page, scroll to section
      if (location.pathname === "/") {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page first, then scroll
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      // Navigate to another page
      navigate(item.href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const scrollToContacts = () => {
    if (location.pathname === "/") {
      const element = document.querySelector("#contacts");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector("#contacts");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border/50"
          : "bg-background/0 border-transparent"
      }`}
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={handleLogoClick}
          >
            <img
              src={logo}
              alt="Финомен"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-patriciana font-bold text-foreground hidden sm:inline">
              ФИНОМЕН
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium animated-underline"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact info and CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone and Email stacked */}
            <div className="flex flex-col items-end text-sm">
              <a
                href="tel:+79817626363"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>+7(981) 762-63-63</span>
              </a>
              <a
                href="mailto:finomen.bg@ya.ru"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>finomen.bg@ya.ru</span>
              </a>
            </div>
            
            <Button
              onClick={scrollToContacts}
              className="btn-gold px-6 rounded-xl h-10 flex items-center justify-center"
            >
              Оставить заявку
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item)}
                  className="text-foreground hover:text-primary transition-colors text-lg font-medium text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile contact info */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <a
                  href="tel:+79817626363"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>+7(981) 762-63-63</span>
                </a>
                <a
                  href="mailto:finomen.bg@ya.ru"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>finomen.bg@ya.ru</span>
                </a>
              </div>
              
              <Button
                onClick={scrollToContacts}
                className="btn-gold w-full mt-4 h-12 rounded-xl"
              >
                Оставить заявку
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
