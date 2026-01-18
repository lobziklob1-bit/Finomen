import { Clock, Building, Eye, Zap } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const advantages = [
  {
    icon: Clock,
    title: "Более 5 лет опыта",
    description: "Профессионально понимаем все сложности и нюансы сферы госзаказа",
  },
  {
    icon: Building,
    title: "Работа напрямую с банками",
    description: "Сотрудничаем с 80% банков России, включая топ-партнёров",
  },
  {
    icon: Eye,
    title: "Без скрытых комиссий",
    description: "Максимальная прозрачность сделки — договор напрямую с банком",
  },
  {
    icon: Zap,
    title: "Быстрые решения",
    description: "Переговоры на уровне руководителей для оперативного результата",
  },
];

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-24 relative overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <span className="text-foreground">Почему мы</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ваши интересы — наш приоритет, мы действуем решительно и быстро
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <ScrollAnimation key={advantage.title} delay={index * 100}>
              <div className="group relative h-full">
                <div className="glass-card p-8 h-full text-center hover:bg-primary/5 transition-all duration-500 group-hover:scale-105">
                  {/* Icon container with glow */}
                  <div className="relative mx-auto mb-6 w-16 h-16">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-full golden-glass-icon flex items-center justify-center">
                      <advantage.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
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

export default AdvantagesSection;
