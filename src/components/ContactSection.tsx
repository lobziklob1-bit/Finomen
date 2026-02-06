import { useState, useEffect, useCallback } from "react";
import { Phone, Mail, MapPin, User, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";

const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { question: `${num1} + ${num2} = ?`, answer: num1 + num2 };
};

const ContactSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast({
        title: "Введите номер телефона",
        variant: "destructive",
      });
      return;
    }

    const userAnswer = parseInt(captchaInput, 10);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      toast({
        title: "Неверный ответ на капчу",
        description: "Попробуйте ещё раз",
        variant: "destructive",
      });
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-telegram', {
        body: {
          name: name.trim(),
          phone: phone.trim(),
          comment: comment.trim(),
          captchaAnswer: userAnswer,
          captchaExpected: captcha.answer,
        },
      });

      if (error) throw error;

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setName("");
      setPhone("");
      setComment("");
      refreshCaptcha();
    } catch (error) {
      console.error('Error sending form:', error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-24 relative overflow-hidden">
      {/* Background glow - reduced on mobile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[80px] md:blur-[200px] hidden sm:block" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <span className="text-foreground">Свяжитесь с нами</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Оставьте заявку и получите бесплатную консультацию
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              <ScrollAnimation delay={100}>
                <div className="glass-card p-6 flex items-center gap-5 group hover:border-primary/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl golden-glass-icon flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                    <a
                      href="tel:+79817626363"
                      className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      +7(981) 762-63-63
                    </a>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={200}>
                <div className="glass-card p-6 flex items-center gap-5 group hover:border-primary/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl golden-glass-icon flex items-center justify-center flex-shrink-0">
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
              </ScrollAnimation>

              <ScrollAnimation delay={300}>
                <div className="glass-card p-6 flex items-center gap-5 group hover:border-primary/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl golden-glass-icon flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Адрес</p>
                    <p className="text-lg font-medium text-foreground">
                      Санкт-Петербург
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Contact form */}
            <ScrollAnimation delay={150} direction="right">
              <div className="glass-card p-8 lg:p-10">
                <h3 className="text-2xl font-semibold mb-2">Заказать звонок</h3>
                <p className="text-muted-foreground mb-8">
                  Оставьте ваши данные и мы перезвоним вам в течение 15 минут
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12 h-14 bg-secondary/50 border-glass-border text-lg placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  
                  {/* Phone field */}
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
                  
                  {/* Comment field */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      placeholder="Краткий комментарий"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="pl-12 min-h-[100px] bg-secondary/50 border-glass-border text-lg placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20 resize-none"
                    />
                  </div>

                  {/* Captcha field */}
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={captcha.question}
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="pl-12 h-14 bg-secondary/50 border-glass-border text-lg placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary hover:underline"
                    >
                      Обновить
                    </button>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shine w-full h-14 text-lg rounded-xl"
                  >
                    {isSubmitting ? "Отправка..." : "Получить консультацию"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
