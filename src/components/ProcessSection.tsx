import { Send, CheckCircle, Handshake, Award } from "lucide-react";

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
      {/* Decorative line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            <span className="text-foreground">Как мы работаем</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Работаем быстро, комфортно, и главное — результат
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="glass-card p-6 pt-8 text-center h-full hover:border-primary/50 transition-all duration-500 group-hover:-translate-y-2">
                {/* Number badge - expanded for visibility */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-primary-foreground golden-glass-icon px-4 py-2 rounded-full">
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
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
