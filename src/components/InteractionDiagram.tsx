import { useEffect, useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const InteractionDiagram = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      setIsAnimating(true);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto">
      <svg viewBox="0 0 1000 650" className="w-full h-auto" style={{ minHeight: "500px" }}>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43, 74%, 49%)" />
            <stop offset="100%" stopColor="hsl(43, 74%, 60%)" />
          </linearGradient>

          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>

          <marker id="arrowHeadWhite" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="rgba(255,255,255,0.8)" />
          </marker>
          
          <marker id="arrowHeadGold" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="hsl(43, 74%, 49%)" />
          </marker>
        </defs>

        {/* ================= АГЕНТ (верхний левый) ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <rect x="50" y="50" width="160" height="120" rx="16"
            fill="url(#glassGradient)" stroke="hsl(43, 74%, 49%)" strokeWidth="1.5" />
          <circle cx="130" cy="95" r="25" fill="rgba(100,150,200,0.3)" />
          <text x="130" y="103" textAnchor="middle" fontSize="28">👤</text>
          <text x="130" y="145" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">АГЕНТ</text>
        </g>

        {/* ================= КЛИЕНТ (на одной линии с Финомен) ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
           style={{ transitionDelay: "150ms" }}>
          <rect x="50" y="250" width="160" height="120" rx="16"
            fill="url(#glassGradient)" stroke="hsl(43, 74%, 49%)" strokeWidth="1.5" />
          <text x="130" y="300" textAnchor="middle" fontSize="28">🤝</text>
          <text x="130" y="345" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">КЛИЕНТ</text>
        </g>

        {/* ================= ФИНОМЕН (центр, на линии с клиентом, сдвинут правее) ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
           style={{ transitionDelay: "300ms" }}>
          <rect x="380" y="230" width="200" height="160" rx="20"
            fill="url(#goldGradient)" />
          <text x="480" y="295" textAnchor="middle" fontSize="36">📈</text>
          <text x="480" y="345" textAnchor="middle" fontSize="24" fontWeight="700">ФИНОМЕН</text>
        </g>

        {/* ================= Г-образная стрелка Агент → Клиент (рекомендация) ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "200ms" }}>
          <line x1="130" y1="170" x2="130" y2="245"
            stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)" />
          <text x="130" y="162" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">
            рекомендация
          </text>
        </g>

        {/* ================= Клиент ↔ ФИНОМЕН (взаимодействие / получение БГ) - увеличенное расстояние ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "400ms" }}>
          {/* Клиент → Финомен (взаимодействие) */}
          <line x1="210" y1="280" x2="375" y2="280"
            stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)" />
          <text x="292" y="268" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">
            взаимодействие
          </text>

          {/* Финомен → Клиент (получение БГ) - увеличено расстояние */}
          <line x1="375" y1="340" x2="210" y2="340"
            stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)" />
          <text x="292" y="356" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">
            получение БГ
          </text>
        </g>

        {/* ================= Г-образная стрелка Финомен → Агент (7,5% комиссия) ================= */}
        <g
          className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <path
            d="M480 230 L480 110 L215 110"
            fill="none"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadGold)"
          />
          <text x="300" y="100" fontSize="13" fill="hsl(43, 74%, 49%)">
            7,5% комиссия агента
          </text>
        </g>


        {/* ================= "переговоры" справа от Финомен (повернуто на -90) ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "550ms" }}>
          <text x="590" y="310" textAnchor="middle" fontSize="14" fill="hsl(43, 74%, 49%)" transform="rotate(-90, 590, 310)">
            переговоры
          </text>
        </g>

        {/* ================= БАНКИ (справа) ================= */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}
             className={`transition-all duration-1000 ${isAnimating ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
             style={{ transitionDelay: `${600 + i * 80}ms` }}>
            <rect
              x="780"
              y={80 + i * 85}
              width="150"
              height="60"
              rx="14"
              fill="url(#glassGradient)"
              stroke="hsl(43, 74%, 49%)"
              strokeWidth="1"
            />
            <text x="820" y={118 + i * 85} fontSize="20">🏦</text>
            <text x="870" y={118 + i * 85} fill="white" fontSize="15">
              Банк<tspan baselineShift="super" fontSize="10">{i === 4 ? "n" : i + 1}</tspan>
            </text>

            {/* Стрелки от "переговоры" к банкам */}
            <line
              x1="630"
              y1="310"
              x2="775"
              y2={110 + i * 85}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              markerEnd="url(#arrowHeadWhite)"
            />
          </g>
        ))}

        {/* ================= БАНК С НАИЛУЧШИМ ПРЕДЛОЖЕНИЕМ (под Финомен) ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
           style={{ transitionDelay: "900ms" }}>
          <rect x="380" y="480" width="200" height="80" rx="16"
            fill="url(#glassGradient)" stroke="hsl(43, 74%, 49%)" strokeWidth="1.5" />
          <text x="420" y="528" fontSize="24">🏦</text>
          <text x="480" y="528" fill="white" fontSize="16" fontWeight="600">БАНК</text>
          <text x="480" y="575" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">
            С наилучшим предложением
          </text>
        </g>

        {/* ================= Стрелка от Финомен к Банку с наилучшим предложением ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "850ms" }}>
          <line x1="480" y1="390" x2="480" y2="475"
            stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"
            markerEnd="url(#arrowHeadWhite)" strokeDasharray="5,3" />
        </g>

        {/* ================= Г-образная стрелка Клиент → Банк (оплата) ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "1000ms" }}>
          <path
            d="M130 370 L130 520 L375 520"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)"
          />
          <text x="145" y="510" fontSize="13" fill="rgba(255,255,255,0.7)">
            оплата
          </text>
        </g>

      </svg>
    </div>
  );
};

export default InteractionDiagram;
