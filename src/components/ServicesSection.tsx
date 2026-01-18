import { Shield, FileCheck, Briefcase, Users } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: Shield,
    title: "Банковские гарантии",
    description: "44-ФЗ, 223-ФЗ, 615-ПП, коммерческие банковские гарантии",
    details: "От простых до самых сложных случаев",
  },
  {
    icon: FileCheck,
    title: "Тендерное сопровождение",
    description: "От поиска и получения экспертизы до подписания контракта",
    details: "Полное сопровождение на всех этапах",
  },
  {
    icon: Briefcase,
    title: "Экспертиза в области закупок",
    description: "Консультации на любом этапе участия в закупке",
    details: "От регистрации до подписания контракта",
  },
  {
    icon: Users,
    title: "Агентское предложение",
    description: "Программа пассивного дохода для партнёров",
    details: "Половину комиссии с каждой сделки",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <span className="text-foreground">Наши предложения</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Работаем быстро, комфортно, и главное — результат
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ScrollAnimation key={service.title} delay={index * 100}>
              <div
                className="glass-card p-8 group hover:scale-[1.02] transition-all duration-500 h-full"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl golden-glass-icon flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {service.description}
                    </p>
                    <p className="text-sm text-foreground/70 font-medium">
                      {service.details}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
