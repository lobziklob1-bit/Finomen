import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Building2, Handshake, CheckCircle2 } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import InteractionDiagram from "@/components/InteractionDiagram";

const Agents = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const processSteps = [
    {
      step: 1,
      text: "Агент (Вы) сообщает о Клиенте нам или Клиент сообщает, что обратился к нам по рекомендации Агента (от Вас)."
    },
    {
      step: 2,
      text: "В ходе нашего взаимодействия, Клиент получает Банковскую гарантию."
    },
    {
      step: 3,
      text: "Банк выплачивает нашу комиссию 15% за оценку квалификации клиента, оформление и сопровождение сделки."
    },
    {
      step: 4,
      text: "Половину этой комиссии в 7,5% мы оплачиваем Агенту, за привлечение Клиента."
    }
  ];

  const clientBenefits = [
    { title: "Быструю сделку", desc: "Без затрат времени на оформление документов." },
    { title: "Комиссию ниже", desc: "чем при обращении в банк, за счет снижения нагрузки на сам банк и создания конкурентности между банками." },
    { title: "Гарантия проверена", desc: "и точно соответствует требованиям." },
    { title: "Клиент тоже может стать агентом", desc: "" }
  ];

  const agentBenefits = [
    { title: "Доход", desc: "с каждой последующей сделки клиента." },
    { title: "Прозрачная формула дохода", desc: "без скрытых условий." },
    { title: "Заработок без вложений", desc: "Вам не нужно заниматься документами, переговорами с банком или оценкой рисков — мы всё берём на себя." }
  ];

  const bankBenefits = [
    { title: "Экономию на расходах", desc: "на маркетинг и привлечение." },
    { title: "Снижение нагрузки", desc: "на своих сотрудников." },
    { title: "Готового и юридически оформленного клиента", desc: "" },
    { title: "Высокое качество заявок", desc: "за счет корректного пакета документов." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Parallax Background */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, hsla(43, 74%, 49%, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, hsla(43, 74%, 49%, 0.05) 0%, transparent 50%),
              linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)
            `
          }}
        />
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/20 animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-primary/15 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-primary/20 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation direction="fade" delay={0}>
              <h1 className="font-patriciana text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
                АГЕНТСКОЕ ПРЕДЛОЖЕНИЕ
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation direction="fade" delay={100}>
              <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                Зарабатывайте вместе с нами и получите свою форму пассивного дохода от нашей прибыли.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation direction="fade" delay={200}>
              <p className="text-base text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
                Мы предоставляем вам всю прозрачность сделки, кроме персональных данных.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={300}>
              <Button 
                className="btn-shine px-8 py-6 text-lg rounded-xl inline-flex items-center gap-2"
                onClick={() => window.open('#', '_blank')}
              >
                <ExternalLink className="w-5 h-5" />
                Перейти в личный кабинет
              </Button>
            </ScrollAnimation>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full scroll-arrow" />
          </div>
        </div>
      </section>

      {/* Program Description Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation direction="fade">
            <h2 className="font-patriciana section-title text-center mb-16">
              ОПИСАНИЕ ПРОГРАММЫ
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {processSteps.map((item, index) => (
              <ScrollAnimation key={item.step} direction="up" delay={index * 100}>
                <div className="glass-card p-8 h-full flex gap-6 items-start group hover:scale-[1.02] transition-transform duration-300">
                  <div className="golden-glass-icon w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-background">{item.step}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.text}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation direction="fade" delay={400}>
            <p className="text-center text-primary text-xl mt-12 font-medium">
              И так с каждой следующей сделки.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Interaction Diagram Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 50%, hsla(43, 74%, 49%, 0.05) 0%, transparent 60%),
                linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 100%)
              `
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation direction="fade">
            <h2 className="font-patriciana section-title text-center mb-16">
              СХЕМА ВЗАИМОДЕЙСТВИЯ
            </h2>
          </ScrollAnimation>

          <InteractionDiagram />
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation direction="fade">
            <h2 className="font-patriciana section-title text-center mb-4">
              ПОЧЕМУ ЭТО ВЫГОДНО ВСЕМ?
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-lg">
              Стратегия Win-Win
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Client Benefits */}
            <ScrollAnimation direction="up" delay={100}>
              <div className="glass-card p-8 h-full">
                <div className="golden-glass-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Handshake className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-primary text-xl font-semibold mb-6 font-patriciana">
                  КЛИЕНТ ПОЛУЧАЕТ
                </h3>
                <ul className="space-y-4">
                  {clientBenefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        <span className="text-foreground underline decoration-primary/50">{benefit.title}</span>
                        {benefit.desc && ` ${benefit.desc}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>

            {/* Agent Benefits */}
            <ScrollAnimation direction="up" delay={200}>
              <div className="glass-card p-8 h-full border-primary/30">
                <div className="golden-glass-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-primary text-xl font-semibold mb-6 font-patriciana">
                  АГЕНТ ПОЛУЧАЕТ
                </h3>
                <ul className="space-y-4">
                  {agentBenefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        <span className="text-foreground underline decoration-primary/50">{benefit.title}</span>
                        {benefit.desc && ` ${benefit.desc}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>

            {/* Bank Benefits */}
            <ScrollAnimation direction="up" delay={300}>
              <div className="glass-card p-8 h-full">
                <div className="golden-glass-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-primary text-xl font-semibold mb-6 font-patriciana">
                  БАНК ПОЛУЧАЕТ
                </h3>
                <ul className="space-y-4">
                  {bankBenefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        <span className="text-foreground underline decoration-primary/50">{benefit.title}</span>
                        {benefit.desc && ` ${benefit.desc}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 100%, hsla(43, 74%, 49%, 0.1) 0%, transparent 50%),
                linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 100%)
              `
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation direction="fade">
            <div className="glass-card p-12 max-w-3xl mx-auto text-center">
              <h2 className="font-patriciana text-3xl md:text-4xl mb-6">
                Начните зарабатывать уже сегодня
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Зарегистрируйтесь в личном кабинете и начните получать пассивный доход с каждой сделки
              </p>
              <Button 
                className="btn-shine px-6 sm:px-10 py-5 sm:py-6 text-base sm:text-lg rounded-xl inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                onClick={() => window.open('#', '_blank')}
              >
                <ExternalLink className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">Перейти в личный кабинет</span>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agents;
