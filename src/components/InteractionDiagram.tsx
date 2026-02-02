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
        viewBox="0 0 1000 600"
        className="w-full h-auto"
        style={{ minHeight: "450px" }}
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

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrow markers */}
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
          
          <marker
            id="arrowHeadWhite"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="5"
            orient="auto"
          >
            <path
              d="M0,0 L10,5 L0,10 L3,5 Z"
              fill="rgba(255,255,255,0.8)"
            />
          </marker>
        </defs>

        {/* Agent Node - Top Left */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '0ms' }}>
          {/* Gold corner accent */}
          <path
            d="M50 80 L50 50 L120 50"
            fill="none"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="3"
          />
          <rect
            x="50"
            y="50"
            width="160"
            height="150"
            rx="16"
            fill="url(#glassGradient)"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <circle cx="130" cy="110" r="30" fill="rgba(100,150,200,0.3)" />
          <text x="130" y="118" textAnchor="middle" fill="rgba(100,150,200,0.8)" fontSize="32">👤</text>
          <text x="130" y="165" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">АГЕНТ</text>
          <text x="130" y="185" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12">рекомендация</text>
        </g>

        {/* Client Node - Below Agent */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '200ms' }}>
          <rect
            x="50"
            y="280"
            width="160"
            height="120"
            rx="16"
            fill="url(#glassGradient)"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <text x="130" y="335" textAnchor="middle" fill="hsl(43, 74%, 49%)" fontSize="32">🤝</text>
          <text x="130" y="375" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">КЛИЕНТ</text>
        </g>

        {/* Arrow: Agent to Client (down) */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '300ms' }}>
          <line
            x1="130"
            y1="200"
            x2="130"
            y2="275"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)"
          />
        </g>

        {/* Finomen Node - Center */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '400ms' }}>
          <rect
            x="400"
            y="180"
            width="200"
            height="180"
            rx="20"
            fill="url(#goldGradient)"
            filter="url(#glow)"
          />
          <text x="500" y="260" textAnchor="middle" fill="hsl(222, 47%, 11%)" fontSize="36">📈</text>
          <text x="500" y="310" textAnchor="middle" fill="hsl(222, 47%, 11%)" fontSize="24" fontWeight="700" fontFamily="Patriciana, serif">ФИНОМЕН</text>
        </g>

        {/* Arrow: Agent to Finomen (with bend) */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '450ms' }}>
          <path
            d="M210 125 L320 125 L320 270 L395 270"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)"
          />
        </g>

        {/* Arrow: Client to Finomen */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '500ms' }}>
          <line
            x1="210"
            y1="340"
            x2="395"
            y2="290"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)"
          />
        </g>

        {/* "переговоры" text - rotated vertically */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '550ms' }}>
          <text 
            x="640" 
            y="270" 
            textAnchor="middle" 
            fill="hsl(43, 74%, 49%)" 
            fontSize="16"
            transform="rotate(90, 640, 270)"
            fontStyle="italic"
          >
            переговоры
          </text>
        </g>

        {/* Banks - Right side stacked vertically */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} 
             className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: `${600 + i * 80}ms` }}>
            <rect
              x="750"
              y={60 + i * 95}
              width="160"
              height="70"
              rx="14"
              fill="url(#glassGradient)"
              stroke="hsl(43, 74%, 49%)"
              strokeWidth="1"
              opacity="0.8"
            />
            <text x="795" y={103 + i * 95} fill="hsl(43, 74%, 49%)" fontSize="22">🏦</text>
            <text x="850" y={103 + i * 95} fill="rgba(255,255,255,0.9)" fontSize="16">
              Банк<tspan baselineShift="super" fontSize="11">{i === 4 ? 'n' : i + 1}</tspan>
            </text>
            
            {/* Arrow: Finomen to Bank */}
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

        {/* Best Bank - Bottom Center */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '1000ms' }}>
          <rect
            x="420"
            y="440"
            width="160"
            height="70"
            rx="14"
            fill="url(#glassGradient)"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1"
            opacity="0.8"
          />
          <text x="465" y="483" fill="hsl(43, 74%, 49%)" fontSize="22">🏦</text>
          <text x="530" y="483" fill="rgba(255,255,255,0.9)" fontSize="16">Банк</text>
          
          {/* Label below */}
          <text x="500" y="540" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14">
            С наиболее выгодным
          </text>
          <text x="500" y="560" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14">
            предложением
          </text>
        </g>

        {/* Arrow: Best Bank back to Agent */}
        <g className={`transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '1100ms' }}>
          <path
            d="M420 475 L130 475 L130 205"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadWhite)"
          />
        </g>
      </svg>
    </div>
  );
};

export default InteractionDiagram;
