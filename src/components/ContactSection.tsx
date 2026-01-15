import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
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
    <section id="contacts" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            <span className="text-gradient-gold">Свяжитесь с нами</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Оставьте заявку и получите бесплатную консультацию
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              <div className="glass-card p-6 flex items-center gap-5 group hover:border-primary/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                  <a
                    href="tel:+79818060969"
                    className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    +7 (981) 806-09-69
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-5 group hover:border-primary/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a
                    href="mailto:finomen.bg@ya.ru"
                    className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    finomen.bg@ya.ru
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-5 group hover:border-primary/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Адрес</p>
                  <p className="text-lg font-medium text-foreground">
                    Санкт-Петербург
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="glass-card p-8 lg:p-10">
              <h3 className="text-2xl font-semibold mb-2">Заказать звонок</h3>
              <p className="text-muted-foreground mb-8">
                Оставьте номер телефона и мы перезвоним вам в течение 15 минут
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="btn-gold w-full h-14 text-lg rounded-xl"
                >
                  {isSubmitting ? "Отправка..." : "Получить консультацию"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
