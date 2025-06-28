"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
  startLocation?: string;
  endLocation?: string;
};

type CityPoint = {
  order: number;
  lat: number;
  lng: number;
  color: string;
  location: string;
};

export type GlobeConfig = {
  pointSize?: number;
  pointColor?: string;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[] | CityPoint[];
  onPointClick?: (location: string, position: { x: number; y: number }) => void;
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data, onPointClick }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current as any).add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    let points: any[] = [];
    let arcs: Position[] = [];
    
    // Check if data is CityPoint[] or Position[]
    const isPointData = data.length > 0 && 'lat' in data[0];
    
    if (isPointData) {
      // Handle CityPoint[] data
      for (let i = 0; i < data.length; i++) {
        const cityPoint = data[i] as CityPoint;
        points.push({
          size: defaultProps.pointSize,
          order: cityPoint.order,
          color: cityPoint.color,
          lat: cityPoint.lat,
          lng: cityPoint.lng,
          location: cityPoint.location,
        });
      }
    } else {
      // Handle Position[] data (arcs)
      arcs = data as Position[];
      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
          location: arc.startLocation || `${arc.startLat.toFixed(2)}, ${arc.startLng.toFixed(2)}`,
        });
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
          location: arc.endLocation || `${arc.endLat.toFixed(2)}, ${arc.endLng.toFixed(2)}`,
        });
      }
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
          ),
        ) === i,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    // Only render arcs if we have arc data
    if (!isPointData && arcs.length > 0) {
      globeRef.current
        .arcsData(arcs)
        .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
        .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
        .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
        .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
        .arcColor((e: any) => (e as { color: string }).color)
        .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
        .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e) => (e as { order: number }).order * 1)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaultProps.arcTime);
    } else {
      // Clear arcs if we're showing points only
      globeRef.current.arcsData([]);
    }

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => globeConfig.pointColor || (e as { color: string }).color)
      .pointsMerge(false)
      .pointAltitude(0.02)
      .pointRadius((e) => defaultProps.pointSize || 3);

    // Add invisible labels for click detection
    const labelData = filteredPoints.map(point => ({
      ...point,
      text: '', // Empty text so labels are invisible
    }));

    console.log('Label elements created:', labelData.length);
    console.log('Sample label:', labelData[0]);

    globeRef.current
      .labelsData(labelData)
      .labelLat((d: any) => d.lat)
      .labelLng((d: any) => d.lng)
      .labelAltitude((d: any) => 0.03)
      .labelText((d: any) => '') // Empty text
      .labelSize(() => 0.5)
      .labelColor(() => 'transparent'); // Make labels transparent

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [isInitialized, data, defaultProps.pointSize, defaultProps.showAtmosphere, defaultProps.atmosphereColor, defaultProps.atmosphereAltitude, defaultProps.polygonColor, defaultProps.arcLength, defaultProps.arcTime, defaultProps.rings, defaultProps.maxRings, onPointClick]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5),
      );

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => {
          // Handle both Position and CityPoint types
          if ('lat' in d) {
            // CityPoint
            return {
              lat: d.lat,
              lng: d.lng,
              color: d.color,
            };
          } else {
            // Position
            return {
              lat: d.startLat,
              lng: d.startLng,
              color: d.color,
            };
          }
        });

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(typeof window !== 'undefined' ? window.devicePixelRatio : 1);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig, data, onPointClick } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  
  // Handle click events
  const handleCanvasClick = (event: any) => {
    console.log('Canvas clicked:', event);
    if (onPointClick && data) {
      // Get mouse position relative to canvas
      const rect = event.target.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      console.log('Click coordinates:', { mouseX, mouseY, clientX: event.clientX, clientY: event.clientY });
      
             // Create all possible points from the data
       interface PointData {
         lat: number;
         lng: number;
         location: string;
         color: string;
       }
       
       const allPoints: PointData[] = [];
       
       // Check if data is CityPoint[] or Position[]
       const isPointData = data.length > 0 && 'lat' in data[0];
       
       if (isPointData) {
         // Handle CityPoint[] data
         for (const cityPoint of data as CityPoint[]) {
           allPoints.push({
             lat: cityPoint.lat,
             lng: cityPoint.lng,
             location: cityPoint.location,
             color: cityPoint.color
           });
         }
       } else {
         // Handle Position[] data (arcs)
         for (const arc of data as Position[]) {
           if (arc.startLocation) {
             allPoints.push({
               lat: arc.startLat,
               lng: arc.startLng,
               location: arc.startLocation,
               color: arc.color
             });
           }
           if (arc.endLocation) {
             allPoints.push({
               lat: arc.endLat,
               lng: arc.endLng,
               location: arc.endLocation,
               color: arc.color
             });
           }
         }
       }
      
             // Remove duplicates based on lat/lng
       const uniquePoints = allPoints.filter((point, index, self) =>
         index === self.findIndex(p => 
           Math.abs(p.lat - point.lat) < 0.001 && Math.abs(p.lng - point.lng) < 0.001
         )
       );
       
       console.log('Checking', uniquePoints.length, 'unique points for clicks');
       
       // Simple distance-based detection - find closest Indonesian point within 80px
       let closestPoint: PointData | null = null;
       let minDistance = 80; // 80px threshold for Indonesian points
      
             // For single point, use a much simpler and more generous detection
       if (uniquePoints.length === 1) {
         // For single point, just check if click is anywhere in the center area of the globe
         const centerX = rect.width / 2;
         const centerY = rect.height / 2;
         const globeRadius = Math.min(rect.width, rect.height) * 0.4; // Assume globe takes up 40% of container
         
         const distanceFromCenter = Math.sqrt(
           Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
         );
         
         console.log(`Single point detection: click at (${mouseX}, ${mouseY}), globe center at (${centerX}, ${centerY}), distance from center: ${distanceFromCenter.toFixed(1)}px, globe radius: ${globeRadius.toFixed(1)}px`);
         
         // If click is within the globe area, consider it a hit
         if (distanceFromCenter <= globeRadius) {
           closestPoint = uniquePoints[0];
           console.log(`Single point clicked: ${closestPoint.location}`);
         }
       } else {
         // For multiple points, use the more precise estimation
         uniquePoints.forEach(point => {
           const centerX = rect.width / 2;
           const centerY = rect.height / 2;
           
           // Better estimation for Indonesian coordinates
           const estimatedX = centerX + (point.lng / 180) * (rect.width * 0.3);
           const estimatedY = centerY - (point.lat / 90) * (rect.height * 0.3);
           
           const distance = Math.sqrt(
             Math.pow(mouseX - estimatedX, 2) + Math.pow(mouseY - estimatedY, 2)
           );
           
           console.log(`Point ${point.location} at (${point.lat}, ${point.lng}) -> estimated screen (${estimatedX.toFixed(1)}, ${estimatedY.toFixed(1)}) distance: ${distance.toFixed(1)}px`);
           
           if (distance < minDistance) {
             minDistance = distance;
             closestPoint = point;
           }
         });
       }
      
      if (closestPoint) {
        console.log('Closest point found:', closestPoint.location, 'at distance:', minDistance);
        onPointClick(closestPoint.location, {
          x: event.clientX,
          y: event.clientY
        });
      } else {
        console.log('No point found within threshold, using random point for demo');
        // Fallback to random point for demo purposes
        const randomPoint = data[Math.floor(Math.random() * data.length)];
        if (randomPoint) {
          let location = 'Unknown';
          if ('location' in randomPoint) {
            // CityPoint
            location = randomPoint.location;
          } else if ('startLocation' in randomPoint && randomPoint.startLocation) {
            // Position with startLocation
            location = randomPoint.startLocation;
          } else if ('endLocation' in randomPoint && randomPoint.endLocation) {
            // Position with endLocation
            location = randomPoint.endLocation;
          }
          
          onPointClick(location, {
            x: event.clientX,
            y: event.clientY
          });
        }
      }
    }
  };

  return (
    <Canvas 
      camera={{ position: [0, 0, cameraZ], fov: 50 }}
      onClick={handleCanvasClick}
      style={{ cursor: 'pointer' }}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={1.2} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
        intensity={1.5}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
        intensity={1.2}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={1.5}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
} 