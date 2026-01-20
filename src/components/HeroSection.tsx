import { Button } from "@/components/ui/button";
import logoExtended from "@/assets/logo-extended.png";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToContacts = () => {
    const contactsSection = document.getElementById("contacts");
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Extended Logo with shimmer animation */}
          <div className="flex justify-center mb-8 fade-up">
            <div className="relative logo-shimmer">
              <img
                src={logoExtended}
                alt="Финомен"
                className="w-auto h-32 md:h-40 lg:h-48 object-contain relative z-10"
              />
            </div>
          </div>

          {/* Title - elegant, not bold, using Patriciana */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-patriciana font-normal mb-4 tracking-wide fade-up fade-up-delay-1">
            <span className="text-foreground">ФИНОМЕН</span>
          </h1>

          {/* Subtitle - white */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/90 mb-4 fade-up fade-up-delay-2">
            Банковские гарантии и тендерное сопровождение
            <br />
            <span className="text-foreground/70">для вашего бизнеса</span>
          </p>

          {/* Horizontal divider */}
          <div className="w-48 h-px bg-foreground/20 mx-auto mb-4 fade-up fade-up-delay-2" />

          {/* Tagline - more visible, no quotes, no italic */}
          <p className="text-lg md:text-xl font-patriciana text-foreground/35 mb-12 fade-up fade-up-delay-3">
            знак феноменальных побед
          </p>

          {/* CTA Button */}
          <div className="fade-up fade-up-delay-4">
            <Button
              onClick={scrollToContacts}
              className="btn-shine h-14 text-lg rounded-xl hover:scale-105 transition-transform duration-500 px-8"
            >
              Получить консультацию
            </Button>
          </div>

          {/* Increased spacing before scroll indicator */}
          <div className="mt-16"></div>
        </div>
      </div>

      {/* Scroll indicator - animated arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-sm">Узнать больше</span>
        <div className="scroll-arrow">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
