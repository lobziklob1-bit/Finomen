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
    <div ref={ref} className="w-full max-w-6xl mx-auto">
      <svg viewBox="0 0 1200 600" className="w-full h-auto">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="white" />
          </marker>
        </defs>

        {/* АГЕНТ */}
        <g transform="translate(120,80)">
          <text x="0" y="0" fill="white" fontSize="20" fontWeight="700">АГЕНТ</text>
        </g>

        {/* КЛИЕНТ */}
        <g transform="translate(120,300)">
          <text x="0" y="0" fill="white" fontSize="20" fontWeight="700">КЛИЕНТ</text>
        </g>

        {/* ФИНОМЕН */}
        <g transform="translate(480,260)">
          <text x="0" y="0" fill="white" fontSize="22" fontWeight="700">ФИНОМЕН</text>
        </g>

        {/* Банк с лучшим предложением */}
        <g transform="translate(480,380)">
          <text x="0" y="0" fill="white" fontSize="18">БАНК</text>
          <text x="-40" y="24" fill="rgba(255,255,255,0.6)" fontSize="14">
            где самое выгодное
          </text>
          <text x="-18" y="42" fill="rgba(255,255,255,0.6)" fontSize="14">
            предложение
          </text>
        </g>

        {/* --- СТРЕЛКИ С ПОДПИСЯМИ --- */}

        {/* рекомендация (клиент → агент) */}
        <line x1="120" y1="290" x2="120" y2="110" stroke="white" markerEnd="url(#arrow)" />
        <text x="90" y="200" fill="white" fontSize="14" transform="rotate(-90 90 200)">
          рекомендация
        </text>

        {/* 7,5% комиссия (финомeн → агент) */}
        <path
          d="M480 240 L300 240 L300 100 L180 100"
          fill="none"
          stroke="white"
          markerEnd="url(#arrow)"
        />
        <text x="300" y="90" fill="white" fontSize="14">7,5% комиссия</text>

        {/* взаимодействие (клиент ↔ финомeн) */}
        <line x1="180" y1="260" x2="440" y2="260" stroke="white" markerEnd="url(#arrow)" />
        <text x="280" y="245" fill="white" fontSize="14">взаимодействие</text>

        {/* получение БГ (финомeн → клиент) */}
        <line x1="440" y1="280" x2="180" y2="280" stroke="white" markerEnd="url(#arrow)" />
        <text x="270" y="300" fill="white" fontSize="14">получение БГ</text>

        {/* оплата (клиент → банк лучший) */}
        <path
          d="M120 320 L120 420 L440 420"
          fill="none"
          stroke="white"
          markerEnd="url(#arrow)"
        />
        <text x="200" y="410" fill="white" fontSize="14">оплата</text>

        {/* переговоры (финомeн → банки) */}
        <text x="650" y="270" fill="white" fontSize="14" transform="rotate(-90 650 270)">
          переговоры
        </text>

        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1="540"
              y1="260"
              x2="900"
              y2={160 + i * 50}
              stroke="white"
              markerEnd="url(#arrow)"
            />
            <text x="910" y={165 + i * 50} fill="white" fontSize="16">
              Банк<tspan baselineShift="super">{i + 1}</tspan>
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default InteractionDiagram;
