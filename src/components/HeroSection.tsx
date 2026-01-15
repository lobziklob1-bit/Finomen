import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast({
        title: "Введите номер телефона",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setPhone("");
      setIsSubmitting(false);
    }, 1000);
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
          {/* Logo */}
          <div className="flex justify-center mb-8 fade-up">
            <img
              src={logo}
              alt="Финомен"
              className="w-24 h-24 md:w-32 md:h-32 object-contain animate-float"
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight fade-up fade-up-delay-1">
            <span className="text-gradient-gold">ФИНОМЕН</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/90 mb-4 fade-up fade-up-delay-2">
            Банковские гарантии и тендерное сопровождение
            <br />
            <span className="text-muted-foreground">для вашего бизнеса</span>
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-display italic text-primary mb-12 fade-up fade-up-delay-3">
            «знак феноменальных побед»
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="glass-card max-w-md mx-auto p-6 md:p-8 fade-up fade-up-delay-4"
          >
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12 h-14 bg-secondary/50 border-glass-border text-lg placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold h-14 text-lg rounded-xl"
              >
                {isSubmitting ? "Отправка..." : "Получить консультацию"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-sm">Узнать больше</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
