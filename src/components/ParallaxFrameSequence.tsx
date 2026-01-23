import { useEffect, useState, useRef } from "react";

const TOTAL_FRAMES = 192;

// Generate frame paths
const getFramePath = (index: number): string => {
  const paddedIndex = String(index).padStart(3, '0');
  const delays = ['0.041s', '0.042s'];
  const delay = delays[index % 3 === 0 || index % 3 === 1 ? 1 : 0];
  
  // Alternating pattern based on actual file names
  const delayPattern = index % 3 === 1 || index % 3 === 2 ? '0.042s' : '0.041s';
  
  return `/parallaks/frame_${paddedIndex}_delay-${delayPattern}.webp`;
};

const ParallaxFrameSequence = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];
      
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = getFramePath(i);
        });
        imagePromises.push(promise);
      }

      try {
        imagesRef.current = await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true); // Still show even if some images fail
      }
    };

    preloadImages();
  }, []);

  // Handle scroll to change frames
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollTop / docHeight, 1);
      const frameIndex = Math.min(
        Math.floor(scrollPercent * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );
      setCurrentFrame(frameIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/70 z-10" />
      
      {/* Frame images */}
      {Array.from({ length: TOTAL_FRAMES }, (_, i) => (
        <img
          key={i}
          src={getFramePath(i)}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
            i === currentFrame ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            willChange: i === currentFrame ? 'opacity' : 'auto',
          }}
          loading={i < 10 ? "eager" : "lazy"}
        />
      ))}

      {/* Loading indicator */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ParallaxFrameSequence;
