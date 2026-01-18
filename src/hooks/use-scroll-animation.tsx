import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export function ScrollAnimation({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: ScrollAnimationProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
    fade: ''
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : undefined
      }}
      data-visible={isVisible}
    >
      <div 
        className={`transition-transform duration-700 ease-out`}
        style={{
          transitionDelay: `${delay}ms`,
          transform: isVisible ? 'translate(0, 0)' : `${directionClasses[direction] ? `translateY(${direction === 'up' ? '40px' : direction === 'down' ? '-40px' : '0'}) translateX(${direction === 'left' ? '40px' : direction === 'right' ? '-40px' : '0'})` : ''}`
        }}
      >
        {children}
      </div>
    </div>
  );
}
