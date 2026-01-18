import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Финомен" className="w-10 h-10 object-contain" />
            <div>
              <span className="text-lg font-patriciana text-gradient-gold">ФИНОМЕН</span>
              <p className="text-xs text-muted-foreground">ИП Терентьева О.А.</p>
            </div>
          </div>

          {/* Legal info */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              ИНН: 110605898614 | ОГРНИП: 325784700214308
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              © {currentYear} Финомен. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
