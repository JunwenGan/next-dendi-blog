"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

interface Location {
  name: string;
  flag: string;
  coordinates: [number, number]; // [latitude, longitude]
}

const locations: Record<string, Location> = {
  UK: { name: "UK", flag: "🇬🇧", coordinates: [51.5074, -0.1278] }, // London
  India: { name: "India", flag: "🇮🇳", coordinates: [20.5937, 78.9629] },
  USA: { name: "USA", flag: "🇺🇸", coordinates: [37.0902, -95.7129] },
  Australia: { name: "Australia", flag: "🇦🇺", coordinates: [-37.8136, 144.9631] }, // Melbourne
};

// Convert lat/lng to phi/theta for globe rotation
const locationToAngles = (lat: number, lng: number): [number, number] => {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
};

interface InteractiveGlobeProps {
  defaultLocation?: string;
  onLocationChange?: (location: string) => void;
}

export default function InteractiveGlobe({
  defaultLocation = "Australia",
  onLocationChange,
}: InteractiveGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  const targetPhiRef = useRef(0);
  const targetThetaRef = useRef(0);

  // Focus on a specific location - smooth transition via interpolation
  const focusLocation = (locationKey: string) => {
    const location = locations[locationKey];
    if (location) {
      const [phi, theta] = locationToAngles(
        location.coordinates[0],
        location.coordinates[1]
      );
      // Set target position for smooth interpolation
      targetPhiRef.current = phi;
      targetThetaRef.current = theta;
      setSelectedLocation(locationKey);
      onLocationChange?.(locationKey);
    }
  };

  useEffect(() => {
    let globe: ReturnType<typeof createGlobe> | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let isInitialized = false;

    const initGlobe = () => {
      if (!canvasRef.current || !containerRef.current) return;

      // Get container dimensions
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      // Wait for container to have dimensions
      if (width === 0 || height === 0) {
        return;
      }

      // Calculate size based on container
      const size = Math.max(
        Math.min(width, height > 50 ? height : width),
        250
      );

      // Set initial position to selected location (only on first init)
      const loc = locations[selectedLocation];
      if (loc && !isInitialized) {
        const [phi, theta] = locationToAngles(
          loc.coordinates[0],
          loc.coordinates[1]
        );
        phiRef.current = phi;
        thetaRef.current = theta;
        targetPhiRef.current = phi;
        targetThetaRef.current = theta;
        isInitialized = true;
      }

      // Destroy existing globe if any
      if (globe) {
        globe.destroy();
        globe = null;
      }

      // Create new globe
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: size * 2,
        height: size * 2,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.1, 0.1, 0.15],
        markerColor: [0.2, 0.5, 1],
        glowColor: [0.1, 0.3, 0.6],
        markers: Object.values(locations).map((loc) => ({
          location: loc.coordinates,
          size: 0.05,
        })),
        onRender: (state) => {
          // Smooth interpolation to target position
          if (!pointerInteracting.current) {
            const phiDiff = targetPhiRef.current - phiRef.current;
            const thetaDiff = targetThetaRef.current - thetaRef.current;
            // Ease toward target (0.08 = smooth, higher = faster)
            phiRef.current += phiDiff * 0.08;
            thetaRef.current += thetaDiff * 0.08;
          }

          state.phi = phiRef.current + pointerInteractionMovement.current;
          state.theta = thetaRef.current;
          state.width = size * 2;
          state.height = size * 2;
        },
      });

      canvasRef.current.style.width = `${size}px`;
      canvasRef.current.style.height = `${size}px`;
    };

    // Try immediate initialization
    const tryInit = () => {
      if (containerRef.current && canvasRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        if (width > 0 && height > 0) {
          initGlobe();
          return true;
        }
      }
      return false;
    };

    // Try multiple times with increasing delays
    const attemptInit = () => {
      if (tryInit()) return;
      
      // Try after a short delay
      setTimeout(() => {
        if (tryInit()) return;
        
        // Try again after another delay
        setTimeout(() => {
          tryInit();
        }, 100);
      }, 50);
    };

    // Start attempting initialization
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        attemptInit();
      });
    });

    // Use ResizeObserver to handle container size changes
    // This will also catch when the container gets dimensions for the first time
    if (containerRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            // Only reinitialize if globe already exists (for resize)
            // Otherwise, this is the initial setup
            if (globe) {
              globe.destroy();
              globe = null;
            }
            initGlobe();
            break;
          }
        }
      });

      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as fallback
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        if (width > 0 && height > 0) {
          if (globe) {
            globe.destroy();
            globe = null;
          }
          initGlobe();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (globe) {
        globe.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - globe created once, transitions handled via refs

  // Handle pointer/touch interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    canvasRef.current?.style.setProperty("cursor", "grabbing");
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    canvasRef.current?.style.setProperty("cursor", "grab");
  };

  const handlePointerOut = () => {
    pointerInteracting.current = null;
    canvasRef.current?.style.setProperty("cursor", "grab");
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta / 100;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col min-h-[400px]">
      {/* Country Badges */}
      <div className="flex flex-wrap gap-2 justify-center mb-4 z-10">
        {Object.entries(locations).map(([key, loc]) => (
          <button
            key={key}
            onClick={() => focusLocation(key)}
            className={`px-3 py-1.5 rounded-full border text-sm transition-all duration-300 cursor-pointer ${
              selectedLocation === key
                ? "border-blue-500/50 text-blue-400 bg-blue-500/10"
                : "border-border text-muted-foreground hover:border-border/80 hover:bg-muted/50"
            }`}
          >
            {loc.flag} {loc.name}
          </button>
        ))}
      </div>

      {/* Globe Container */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center overflow-hidden min-h-[280px]"
      >
        {/* Atmospheric Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[90%] h-[90%] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-b from-blue-500/10 via-blue-400/5 to-transparent blur-2xl" />
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerOut={handlePointerOut}
          onPointerMove={handlePointerMove}
          style={{
            cursor: "grab",
            contain: "layout paint size",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>

      {/* Location Pin */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
        <div className="relative">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500/50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-blue-500/80 animate-pulse" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-blue-500/50" />
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Remote
          </p>
          <p className="text-sm text-foreground font-medium">
            {locations[selectedLocation]?.name || "Melbourne"}
          </p>
        </div>
      </div>
    </div>
  );
}
