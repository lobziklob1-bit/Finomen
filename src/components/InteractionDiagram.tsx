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
      <svg
        viewBox="0 0 900 500"
        className="w-full h-auto"
        style={{ minHeight: "400px" }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43, 74%, 49%)" />
            <stop offset="100%" stopColor="hsl(43, 74%, 60%)" />
          </linearGradient>
          
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>

          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(43, 74%, 49%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(43, 74%, 49%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(43, 74%, 49%)" stopOpacity="0.3" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrow marker */}
          <marker
            id="arrowHead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="5"
            orient="auto"
          >
            <path
              d="M0,0 L10,5 L0,10 L3,5 Z"
              fill="hsl(43, 74%, 49%)"
            />
          </marker>

          {/* Animated dash pattern */}
          <pattern id="flowPattern" width="20" height="1" patternUnits="userSpaceOnUse">
            <rect width="10" height="1" fill="hsl(43, 74%, 49%)" opacity="0.8" />
          </pattern>
        </defs>

        {/* Background subtle grid */}
        <g opacity="0.05">
          {[...Array(10)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 50}
              x2="900"
              y2={i * 50}
              stroke="hsl(43, 74%, 49%)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(18)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="500"
              stroke="hsl(43, 74%, 49%)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Agent Node */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '0ms' }}>
          <rect
            x="50"
            y="180"
            width="140"
            height="140"
            rx="20"
            fill="url(#glassGradient)"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <circle cx="120" cy="225" r="25" fill="url(#goldGradient)" opacity="0.2" />
          <text x="120" y="230" textAnchor="middle" fill="hsl(43, 74%, 49%)" fontSize="24">👤</text>
          <text x="120" y="275" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">АГЕНТ</text>
          <text x="120" y="295" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12">рекомендация</text>
        </g>

        {/* Client Node */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '200ms' }}>
          <rect
            x="50"
            y="360"
            width="140"
            height="100"
            rx="20"
            fill="url(#glassGradient)"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <text x="120" y="400" textAnchor="middle" fill="hsl(43, 74%, 49%)" fontSize="24">🤝</text>
          <text x="120" y="435" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">КЛИЕНТ</text>
        </g>

        {/* Finomen Node - Central */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '400ms' }}>
          <rect
            x="350"
            y="180"
            width="200"
            height="160"
            rx="24"
            fill="url(#goldGradient)"
            filter="url(#glow)"
          />
          <text x="450" y="240" textAnchor="middle" fill="hsl(222, 47%, 11%)" fontSize="28">📈</text>
          <text x="450" y="285" textAnchor="middle" fill="hsl(222, 47%, 11%)" fontSize="22" fontWeight="700" fontFamily="Patriciana, serif">ФИНОМЕН</text>
          <text x="450" y="315" textAnchor="middle" fill="hsl(222, 47%, 20%)" fontSize="13">переговоры • получение БГ</text>
        </g>

        {/* Banks */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} 
             className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: `${600 + i * 100}ms` }}>
            <rect
              x="700"
              y={130 + i * 75}
              width="150"
              height="55"
              rx="12"
              fill="url(#glassGradient)"
              stroke="hsl(43, 74%, 49%)"
              strokeWidth="1"
              opacity="0.7"
            />
            <text x="730" y={165 + i * 75} fill="hsl(43, 74%, 49%)" fontSize="18">🏦</text>
            <text x="780" y={165 + i * 75} fill="rgba(255,255,255,0.8)" fontSize="14">
              Банк<tspan baselineShift="super" fontSize="10">{i + 1}</tspan>
            </text>
          </g>
        ))}

        {/* Bank N */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '1000ms' }}>
          <text x="775" y="445" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="16">...</text>
          <rect
            x="700"
            y="455"
            width="150"
            height="55"
            rx="12"
            fill="url(#glassGradient)"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1"
            opacity="0.7"
          />
          <text x="730" y="490" fill="hsl(43, 74%, 49%)" fontSize="18">🏦</text>
          <text x="780" y="490" fill="rgba(255,255,255,0.8)" fontSize="14">
            Банк<tspan baselineShift="super" fontSize="10">n</tspan>
          </text>
        </g>

        {/* Animated Arrows */}
        
        {/* Agent to Client */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '300ms' }}>
          <line
            x1="120"
            y1="320"
            x2="120"
            y2="355"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="2"
            strokeDasharray="6,4"
            opacity="0.6"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
        </g>

        {/* Agent/Client to Finomen */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '500ms' }}>
          <path
            d="M190 250 Q270 250 340 250"
            fill="none"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="3"
            markerEnd="url(#arrowHead)"
            opacity="0.8"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,200"
              to="200,0"
              dur="1.5s"
              fill="freeze"
              begin={isAnimating ? "0s" : "indefinite"}
            />
          </path>
          
          {/* Flowing dots on path */}
          <circle r="4" fill="hsl(43, 74%, 49%)" filter="url(#glow)">
            <animateMotion
              path="M190 250 Q270 250 340 250"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Client to Finomen */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '600ms' }}>
          <path
            d="M190 410 Q270 350 350 290"
            fill="none"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="2"
            strokeDasharray="6,4"
            opacity="0.5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Finomen to Banks */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '700ms' }}>
          {[0, 1, 2, 3].map((i) => (
            <g key={`arrow-${i}`}>
              <line
                x1="550"
                y1="260"
                x2="695"
                y2={157 + i * 75}
                stroke="hsl(43, 74%, 49%)"
                strokeWidth="2"
                markerEnd="url(#arrowHead)"
                opacity="0.6"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from="0,200"
                  to="200,0"
                  dur="1s"
                  fill="freeze"
                  begin={isAnimating ? `${0.2 + i * 0.1}s` : "indefinite"}
                />
              </line>
            </g>
          ))}
          
          {/* Main flowing arrow to banks */}
          <circle r="3" fill="hsl(43, 74%, 49%)" filter="url(#glow)">
            <animateMotion
              path="M550 260 L695 157"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="hsl(43, 74%, 49%)" filter="url(#glow)">
            <animateMotion
              path="M550 260 L695 232"
              dur="1.5s"
              repeatCount="indefinite"
              begin="0.3s"
            />
          </circle>
          <circle r="3" fill="hsl(43, 74%, 49%)" filter="url(#glow)">
            <animateMotion
              path="M550 260 L695 307"
              dur="1.5s"
              repeatCount="indefinite"
              begin="0.6s"
            />
          </circle>
        </g>

        {/* Commission flow - Agent to Finomen (top) */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '900ms' }}>
          <path
            d="M190 150 Q320 100 450 100 Q580 100 700 150"
            fill="none"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="2"
            strokeDasharray="8,6"
            opacity="0.4"
          />
          
          {/* Commission label */}
          <rect x="390" y="55" width="120" height="30" rx="15" fill="hsl(222, 47%, 11%)" stroke="hsl(43, 74%, 49%)" strokeWidth="1" />
          <text x="450" y="75" textAnchor="middle" fill="hsl(43, 74%, 49%)" fontSize="12" fontWeight="600">7,5% комиссия</text>
          
          {/* Flowing commission dot */}
          <circle r="5" fill="hsl(43, 74%, 49%)" filter="url(#glow)">
            <animateMotion
              path="M450 100 Q320 100 190 150"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Best Bank highlight */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '1100ms' }}>
          <rect
            x="620"
            y="200"
            width="180"
            height="85"
            rx="16"
            fill="none"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
          <text x="710" y="265" textAnchor="middle" fill="hsl(43, 74%, 49%)" fontSize="10" opacity="0.7">лучшее предложение</text>
        </g>

        {/* Legend */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '1200ms' }}>
          <rect x="30" y="30" width="200" height="80" rx="10" fill="hsl(222, 47%, 11%)" opacity="0.8" stroke="rgba(255,255,255,0.1)" />
          
          <line x1="50" y1="55" x2="80" y2="55" stroke="hsl(43, 74%, 49%)" strokeWidth="3" />
          <text x="90" y="60" fill="rgba(255,255,255,0.7)" fontSize="11">Основной поток</text>
          
          <line x1="50" y1="80" x2="80" y2="80" stroke="hsl(43, 74%, 49%)" strokeWidth="2" strokeDasharray="6,4" />
          <text x="90" y="85" fill="rgba(255,255,255,0.7)" fontSize="11">Комиссия / связь</text>
        </g>
      </svg>
    </div>
  );
};

export default InteractionDiagram;
