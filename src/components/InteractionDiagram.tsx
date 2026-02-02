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
      <svg viewBox="0 0 1000 600" className="w-full h-auto" style={{ minHeight: "450px" }}>
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
        </defs>

        {/* ================= АГЕНТ ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}>
          <path d="M50 80 L50 50 L120 50" fill="none" stroke="hsl(43, 74%, 49%)" strokeWidth="3" />
          <rect x="50" y="50" width="160" height="150" rx="16"
            fill="url(#glassGradient)" stroke="hsl(43, 74%, 49%)" strokeWidth="1.5" />
          <circle cx="130" cy="110" r="30" fill="rgba(100,150,200,0.3)" />
          <text x="130" y="118" textAnchor="middle" fill="rgba(100,150,200,0.8)" fontSize="32">👤</text>
          <text x="130" y="165" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">АГЕНТ</text>
        </g>

        {/* ================= КЛИЕНТ ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "200ms" }}>
          <rect x="50" y="280" width="160" height="120" rx="16"
            fill="url(#glassGradient)" stroke="hsl(43, 74%, 49%)" strokeWidth="1.5" />
          <text x="130" y="335" textAnchor="middle" fill="hsl(43, 74%, 49%)" fontSize="32">🤝</text>
          <text x="130" y="375" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">КЛИЕНТ</text>
        </g>

        {/* ================= ФИНОМЕН ================= */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "400ms" }}>
          <rect x="400" y="180" width="200" height="180" rx="20"
            fill="url(#goldGradient)" />
          <text x="500" y="260" textAnchor="middle" fontSize="36">📈</text>
          <text x="500" y="310" textAnchor="middle" fontSize="24" fontWeight="700">ФИНОМЕН</text>
        </g>

        {/* ================= СТРЕЛКИ ================= */}

        {/* Клиент → Агент (рекомендация) */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "300ms" }}>
          <line x1="130" y1="280" x2="130" y2="200"
            stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)" />
          <text x="105" y="240" fontSize="13" fill="rgba(255,255,255,0.7)"
            transform="rotate(-90 105 240)">
            рекомендация
          </text>
        </g>

        {/* Клиент ↔ ФИНОМЕН (взаимодействие / получение БГ) */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "350ms" }}>
          <line x1="210" y1="260" x2="395" y2="260"
            stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)" />
          <text x="260" y="245" fontSize="13" fill="rgba(255,255,255,0.7)">
            взаимодействие
          </text>

          <line x1="395" y1="290" x2="210" y2="290"
            stroke="rgba(255,255,255,0.8)" strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)" />
          <text x="260" y="310" fontSize="13" fill="rgba(255,255,255,0.7)">
            получение БГ
          </text>
        </g>

        {/* Агент → ФИНОМЕН (7,5% комиссия) */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "450ms" }}>
          <path
            d="M210 125 L320 125 L320 220 L395 220"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)"
          />
          <text x="260" y="110" fontSize="13" fill="rgba(255,255,255,0.7)">
            7,5% комиссия
          </text>
        </g>

        {/* ФИНОМЕН → БАНКИ (переговоры) */}
        <text x="640" y="270" fontSize="14" fill="hsl(43, 74%, 49%)"
          transform="rotate(90 640 270)">
          переговоры
        </text>

        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1="600"
              y1="270"
              x2="745"
              y2={95 + i * 95}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              markerEnd="url(#arrowHeadWhite)"
            />
          </g>
        ))}

        {/* Клиент → лучший банк (оплата) */}
        <g className={`transition-all duration-1000 ${isAnimating ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "900ms" }}>
          <path
            d="M130 400 L130 475 L420 475"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)"
          />
          <text x="200" y="460" fontSize="13" fill="rgba(255,255,255,0.7)">
            оплата
          </text>
        </g>

      </svg>
    </div>
  );
};

export default InteractionDiagram;
