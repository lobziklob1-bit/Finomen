import { CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo.png";

const highlights = [
  "Заключение договора напрямую с банком",
  "Предупреждение о всех возможных рисках",
  "Переговоры на уровне руководства банков",
  "Сжатые сроки — действуем решительно",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Logo and decoration */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px] animate-pulse-glow" />
                <div className="glass-card p-12 rounded-3xl">
                  <img
                    src={logo}
                    alt="Финомен"
                    className="w-48 h-48 object-contain mx-auto"
                  />
                  <p className="text-center mt-6 font-display text-xl italic text-primary">
                    «знак феноменальных побед»
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div>
              <h2 className="section-title mb-6">
                <span className="text-gradient-gold">О компании</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Работаем в сфере государственного заказа и взаимодействия с банками{" "}
                <span className="text-primary font-semibold">более 5 лет</span>. 
                Профессионально понимаем все сложности и нюансы этого направления.
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Мы предоставим вам максимальную прозрачность сделки — вы сможете
                заключить договор непосредственно с банком и без посредников,
                что позволит избежать дополнительных комиссий.
              </p>

              <ul className="space-y-4">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
