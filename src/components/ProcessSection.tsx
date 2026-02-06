import { Send, CheckCircle, Handshake, Award } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    icon: Send,
    number: "01",
    title: "Ваша заявка",
    description:
      "Отправьте номер процедуры или ссылку на закупку и ИНН вашей организации",
  },
  {
    icon: CheckCircle,
    number: "02",
    title: "Предодобрение",
    description:
      "Получите варианты пред одобренных гарантий от наших банков-партнёров",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Согласование",
    description:
      "Мы добьёмся скидки и получим для вас наиболее выгодное предложение",
  },
  {
    icon: Award,
    number: "04",
    title: "Выпуск гарантии",
    description:
      "Получите счёт от банка, скан-копию и все документы на гарантию",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-gradient-dark relative overflow-hidden">
      {/* Decorative line - desktop only */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block will-change-auto" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <span className="text-foreground">БАНКОВСКИЕ ГАРАНТИИ ВСЕХ ВИДОВ</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Мы разработали процесс таким образом, чтобы вы не тратили ни минуты лишнего времени: достаточно вашего стартового запроса, всё остальное мы сделаем сами
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch equal-height-cards">
          {steps.map((step, index) => (
            <ScrollAnimation key={step.number} delay={index * 150} className="h-full flex">
              <div className="relative group h-full w-full flex flex-col">
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                
                <div className="glass-card p-6 pt-12 text-center h-full hover:border-primary/50 transition-all duration-500 group-hover:-translate-y-2 flex flex-col flex-grow">
                  {/* Number badge - expanded for visibility */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-primary-foreground golden-glass-icon px-5 pt-[0.925rem] pb-2.5 rounded-full">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
