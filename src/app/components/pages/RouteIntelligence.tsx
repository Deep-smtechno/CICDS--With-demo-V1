import { useState, useMemo, useRef } from "react";
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Navigation,
  Filter,
  Download,
  Calendar,
  Route as RouteIcon,
  Wine,
  Pill,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Panel, rand } from "../shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import districtGeoData from "../../data/district-data.json";

const C = {
  primary: "#1D4ED8",
  primaryDark: "#1E3A8A",
  primaryLight: "#3B82F6",
  surface: "#EFF6FF",
  green: "#16A34A",
  amber: "#D97706",
  red: "#DC2626",
  border: "#E5E7EB",
  muted: "#6B7280",
  text: "#0F172A",
};

interface DistrictData {
  code: string;
  name: string;
  path: string;
  center: { x: number; y: number };
}

// Lookup: district code -> { name, center } from the actual GeoJSON
const DISTRICT_LOOKUP: Record<string, { name: string; x: number; y: number }> =
  (districtGeoData.districts as DistrictData[]).reduce((acc, d) => {
    acc[d.code] = { name: d.name, x: d.center.x, y: d.center.y };
    return acc;
  }, {} as Record<string, { name: string; x: number; y: number }>);

// Label placement hint — lets us push a label off its pin without colliding
// with neighbouring pins. `place` controls anchor + default offset direction.
type LabelPlace = "top" | "bottom" | "left" | "right";

// External (out-of-state) source markers positioned just outside Gujarat boundary.
// `place` is the side the label sits on relative to its pin.
const EXTERNAL_SOURCES: Record<
  string,
  { x: number; y: number; label: string; place: LabelPlace }
> = {
  udaipur: { x: 900, y: 50,  label: "Udaipur, Rajasthan",  place: "top" },
  jalore:  { x: 540, y: 35,  label: "Jalore, Rajasthan",   place: "top" },
  barmer:  { x: 380, y: 50,  label: "Barmer, Rajasthan",   place: "top" },
  indore:  { x: 1060, y: 250, label: "Indore, MP",         place: "right" },
  // South cluster: spread out from Vapi (800,700) so labels don't collide.
  daman:   { x: 880, y: 735, label: "Daman (UT)",          place: "right" },
  mumbai:  { x: 960, y: 770, label: "Mumbai, Maharashtra", place: "right" },
};

// Check posts mapped to real coordinates near their actual entry districts.
const CHECK_POSTS: Record<
  string,
  { x: number; y: number; name: string; place: LabelPlace }
> = {
  amirgadh:  { x: 700, y: 55,  name: "Amirgadh",  place: "top" },     // BAN border
  vapi:      { x: 800, y: 700, name: "Vapi",      place: "left" },    // VAL border
  dahod:     { x: 990, y: 275, name: "Dahod",     place: "right" },   // DAH border
  radhanpur: { x: 555, y: 110, name: "Radhanpur", place: "left" },    // PAT/BAN border
  deesa:     { x: 615, y: 55,  name: "Deesa",     place: "top" },     // BAN border
};

type Waypoint = {
  x: number;
  y: number;
  name: string;
  kind: "source" | "checkpost" | "transit" | "seizure";
  districtCode?: string;
  place?: LabelPlace;
};

// Convert a pin coordinate + side hint into text x/y + anchor. Keeps a 14px
// breathing gap so labels never sit on top of their pin.
function placeLabel(x: number, y: number, place: LabelPlace = "top") {
  const gap = 14;
  switch (place) {
    case "top":    return { x, y: y - gap, anchor: "middle" as const, dy: 0 };
    case "bottom": return { x, y: y + gap, anchor: "middle" as const, dy: 10 };
    case "left":   return { x: x - gap, y, anchor: "end" as const,    dy: 4 };
    case "right":  return { x: x + gap, y, anchor: "start" as const,  dy: 4 };
  }
}

interface RouteDef {
  id: number;
  type: "liquor" | "ndps";
  source: string;
  sourceKey: keyof typeof EXTERNAL_SOURCES;
  entryPostKey: keyof typeof CHECK_POSTS;
  entryPost: string;
  transitCodes: string[];      // district codes for transit (in order)
  destinationCode: string;     // final district where seizure happened
  destination: string;
  seizureLocation: string;
  status: "seized";
  date: string;
  value: string;
  quantity: string;
  frequency: number;
}

const routeDefs: RouteDef[] = [
  {
    id: 1, type: "liquor",
    source: "Udaipur, Rajasthan", sourceKey: "udaipur",
    entryPostKey: "amirgadh", entryPost: "Amirgadh Check Post",
    transitCodes: ["BAN", "MEH", "AHM", "SURE", "RAJ"],
    destinationCode: "RAJ", destination: "Rajkot",
    seizureLocation: "Rajkot Outskirts",
    status: "seized", date: "2026-05-28", value: "₹4.2 L", quantity: "840 L", frequency: 24,
  },
  {
    id: 2, type: "ndps",
    source: "Mumbai, Maharashtra", sourceKey: "mumbai",
    entryPostKey: "vapi", entryPost: "Vapi Check Post",
    transitCodes: ["VAL", "NAV", "SUR", "BHA"],
    destinationCode: "VAD", destination: "Vadodara",
    seizureLocation: "Bharuch–Vadodara NH-48",
    status: "seized", date: "2026-05-26", value: "₹8.4 Cr", quantity: "12 kg MDMA", frequency: 18,
  },
  {
    id: 3, type: "liquor",
    source: "Daman (UT)", sourceKey: "daman",
    entryPostKey: "vapi", entryPost: "Vapi Check Post",
    transitCodes: ["VAL", "NAV"],
    destinationCode: "SUR", destination: "Surat",
    seizureLocation: "Navsari–Surat Highway",
    status: "seized", date: "2026-05-24", value: "₹1.8 L", quantity: "620 L", frequency: 32,
  },
  {
    id: 4, type: "ndps",
    source: "Indore, MP", sourceKey: "indore",
    entryPostKey: "dahod", entryPost: "Dahod Check Post",
    transitCodes: ["DAH", "PAN", "KHE", "ANA"],
    destinationCode: "AHM", destination: "Ahmedabad",
    seizureLocation: "Anand–Ahmedabad Expressway",
    status: "seized", date: "2026-05-22", value: "₹3.2 Cr", quantity: "8 kg Ganja", frequency: 15,
  },
  {
    id: 5, type: "liquor",
    source: "Barmer, Rajasthan", sourceKey: "barmer",
    entryPostKey: "radhanpur", entryPost: "Radhanpur Check Post",
    transitCodes: ["PAT", "MEH"],
    destinationCode: "GAN", destination: "Gandhinagar",
    seizureLocation: "Mehsana–Gandhinagar Highway",
    status: "seized", date: "2026-05-20", value: "₹2.4 L", quantity: "1,120 L", frequency: 28,
  },
  {
    id: 6, type: "liquor",
    source: "Jalore, Rajasthan", sourceKey: "jalore",
    entryPostKey: "deesa", entryPost: "Deesa Check Post",
    transitCodes: ["BAN", "PAT"],
    destinationCode: "MEH", destination: "Mehsana",
    seizureLocation: "Patan–Mehsana Highway",
    status: "seized", date: "2026-05-18", value: "₹3.6 L", quantity: "1,450 L", frequency: 22,
  },
];

// Nudge each interior waypoint perpendicular to its local tangent so routes
// that share a corridor fan out into parallel strands instead of stacking.
function offsetPoints(pts: { x: number; y: number }[], offset: number) {
  if (!offset) return pts;
  return pts.map((p, i) => {
    if (i === 0 || i === pts.length - 1) return p;
    const prev = pts[i - 1];
    const next = pts[i + 1];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: p.x + (-dy / len) * offset, y: p.y + (dx / len) * offset };
  });
}

// Build a smooth Catmull-Rom spline path through the waypoints so routes
// read as flowing corridors rather than connect-the-dots polylines.
function smoothPath(pts: { x: number; y: number }[], tension = 0.5): string {
  if (pts.length < 2) return "";
  if (pts.length === 2) return `M${pts[0].x},${pts[0].y} L${pts[1].x},${pts[1].y}`;
  const t = tension;
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + ((p2.x - p0.x) / 6) * t * 2;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * t * 2;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * t * 2;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * t * 2;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

// Build the routes with real coordinates derived from the GeoJSON district centers.
const routes = routeDefs.map((r) => {
  const src = EXTERNAL_SOURCES[r.sourceKey];
  const cp = CHECK_POSTS[r.entryPostKey];
  const path: Waypoint[] = [
    { x: src.x, y: src.y, name: src.label, kind: "source", place: src.place },
    { x: cp.x, y: cp.y, name: `${cp.name} Check Post`, kind: "checkpost", place: cp.place },
    ...r.transitCodes
      .filter((c) => c !== r.destinationCode)
      .map((code) => {
        const d = DISTRICT_LOOKUP[code];
        return { x: d.x, y: d.y, name: d.name, kind: "transit" as const, districtCode: code };
      }),
    (() => {
      const d = DISTRICT_LOOKUP[r.destinationCode];
      return {
        x: d.x, y: d.y,
        name: `${d.name} (Seizure)`,
        kind: "seizure" as const,
        districtCode: r.destinationCode,
      };
    })(),
  ];
  // List of all district codes touched, derived from the path
  const districts = Array.from(
    new Set([
      ...r.transitCodes,
      r.destinationCode,
    ])
  );
  return { ...r, path, districts };
});

// Check posts list for the analytics panel
const checkPosts = [
  { key: "amirgadh",  name: "Amirgadh",  seizures: 142, type: "both"   as const },
  { key: "vapi",      name: "Vapi",      seizures: 186, type: "both"   as const },
  { key: "dahod",     name: "Dahod",     seizures: 94,  type: "ndps"   as const },
  { key: "radhanpur", name: "Radhanpur", seizures: 128, type: "liquor" as const },
  { key: "deesa",     name: "Deesa",     seizures: 76,  type: "liquor" as const },
].map((cp) => ({
  ...cp,
  x: CHECK_POSTS[cp.key as keyof typeof CHECK_POSTS].x,
  y: CHECK_POSTS[cp.key as keyof typeof CHECK_POSTS].y,
  place: CHECK_POSTS[cp.key as keyof typeof CHECK_POSTS].place,
}));

export function RouteIntelligence() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<"all" | "liquor" | "ndps">("all");
  const [timeFilter, setTimeFilter] = useState("30days");
  const [activeTab, setActiveTab] = useState("routes");
  const [hover, setHover] = useState<{ id: number; x: number; y: number } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleRouteMove = (id: number, e: React.MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHover({ id, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const filteredRoutes = routes.filter(
    (r) => filterType === "all" || r.type === filterType
  );

  const selectedRouteData = selectedRoute
    ? routes.find((r) => r.id === selectedRoute)
    : null;

  // Calculate district heatmap data
  const districtHeatmap = useMemo(() => {
    const heatmapData: Record<string, { liquor: number; ndps: number }> = {};
    routes.forEach((route) => {
      route.districts?.forEach((districtCode) => {
        if (!heatmapData[districtCode]) {
          heatmapData[districtCode] = { liquor: 0, ndps: 0 };
        }
        if (route.type === "liquor") {
          heatmapData[districtCode].liquor += 1;
        } else {
          heatmapData[districtCode].ndps += 1;
        }
      });
    });
    return heatmapData;
  }, []);

  // Top source states
  const topSources = useMemo(() => {
    const sources: Record<string, { liquor: number; ndps: number }> = {};
    routes.forEach((r) => {
      const state = r.source.split("(")[0].trim();
      if (!sources[state]) sources[state] = { liquor: 0, ndps: 0 };
      if (r.type === "liquor") sources[state].liquor += 1;
      else sources[state].ndps += 1;
    });
    return Object.entries(sources)
      .map(([state, counts]) => ({ state, ...counts, total: counts.liquor + counts.ndps }))
      .sort((a, b) => b.total - a.total);
  }, []);

  // Entry post analysis
  const entryAnalysis = checkPosts.map((cp) => ({
    ...cp,
    routes: routes.filter((r) => r.entryPost.includes(cp.name)).length,
  }));

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            className="text-[#0F172A] tracking-tight"
            style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}
          >
            Smuggling Route Intelligence
          </h1>
          <p className="text-[#6B7280] mt-1 text-[13px]">
            GIS-Based Contraband Movement & Route Analysis · Real-time tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-9 gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Wine className="w-4 h-4" />}
          label="Liquor Routes"
          value="156"
          trend="+8.2%"
          color="primary"
        />
        <StatCard
          icon={<Pill className="w-4 h-4" />}
          label="NDPS Routes"
          value="91"
          trend="+15.6%"
          color="amber"
        />
        <StatCard
          icon={<MapPin className="w-4 h-4" />}
          label="Entry Points"
          value="24"
          trend="+3"
          color="green"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map Panel */}
        <div className="lg:col-span-3">
          <Panel
            title="Route Visualization Map"
            action={
              <div className="flex items-center gap-2">
                <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
                  <SelectTrigger className="w-32 h-8 text-[12px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    <SelectItem value="liquor">Liquor Only</SelectItem>
                    <SelectItem value="ndps">NDPS Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
          >
            <div ref={mapRef} className="relative w-full bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] rounded-lg border border-[#E5E7EB] overflow-hidden" style={{ minHeight: 640 }}>
              {/* Subtle graticule background for a GIS feel */}
              <svg
                aria-hidden
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern id="ri-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.5" opacity="0.35" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ri-grid)" />
              </svg>
              {/* Gujarat GIS Map with Routes — viewBox padded to keep neighbor labels & external pins from clipping */}
              <svg
                viewBox="-30 -30 1240 820"
                preserveAspectRatio="xMidYMid meet"
                className="relative w-full h-full"
                style={{ maxHeight: 760, minHeight: 560 }}
              >
                <defs>
                  <marker id="arrow-liquor" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill={C.primary} />
                  </marker>
                  <marker id="arrow-ndps" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill={C.amber} />
                  </marker>
                  <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.25" />
                  </filter>
                  <radialGradient id="seizure-pulse">
                    <stop offset="0%" stopColor={C.red} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={C.red} stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Neighboring state labels */}
                <g className="pointer-events-none" fill="#94A3B8" style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
                  <text x={500} y={25} textAnchor="middle">RAJASTHAN</text>
                  <text x={1050} y={170} textAnchor="middle" transform="rotate(90 1050 170)">MADHYA PRADESH</text>
                  <text x={870} y={735} textAnchor="middle">MAHARASHTRA</text>
                  <text x={200} y={500} textAnchor="middle" transform="rotate(-90 200 500)">ARABIAN SEA</text>
                </g>

                {/* Gujarat District Boundaries */}
                <g>
                  {districtGeoData.districts.map((district: DistrictData) => {
                    const routesOn = filteredRoutes.filter((r) => r.districts?.includes(district.code));
                    const isOnRoute = routesOn.length > 0;
                    const selOnDistrict = selectedRoute && routesOn.some((r) => r.id === selectedRoute);
                    const selRoute = selectedRoute ? routes.find((r) => r.id === selectedRoute) : null;
                    const isDestination = selRoute && selRoute.destinationCode === district.code;

                    let fill = "#E2E8F0";
                    if (selOnDistrict) {
                      fill = selRoute?.type === "liquor" ? "rgba(29, 78, 216, 0.22)" : "rgba(217, 119, 6, 0.22)";
                    } else if (selectedRoute) {
                      fill = "#EAEEF3";
                    } else if (isOnRoute) {
                      fill = "rgba(59, 130, 246, 0.10)";
                    }

                    return (
                      <path
                        key={district.code}
                        d={district.path}
                        fill={fill}
                        stroke={isDestination ? C.red : "#94A3B8"}
                        strokeWidth={isDestination ? 2 : 0.8}
                        className="transition-all duration-200"
                      />
                    );
                  })}
                </g>

                {/* District name labels for the selected route */}
                {selectedRouteData && (
                  <g className="pointer-events-none">
                    {selectedRouteData.districts.map((code) => {
                      const d = DISTRICT_LOOKUP[code];
                      if (!d) return null;
                      return (
                        <text
                          key={code}
                          x={d.x}
                          y={d.y - 4}
                          textAnchor="middle"
                          fill={C.text}
                          style={{ fontSize: 10, fontWeight: 600 }}
                          paintOrder="stroke"
                          stroke="white"
                          strokeWidth={3}
                          strokeLinejoin="round"
                        >
                          {d.name}
                        </text>
                      );
                    })}
                  </g>
                )}

                {/* Routes */}
                {filteredRoutes.map((route) => {
                  const isSelected = selectedRoute === route.id;
                  const isHovered = hover?.id === route.id;
                  const isActive = isSelected || isHovered;
                  // Dim when there's a focus elsewhere (hover takes precedence over selection)
                  const focusId = hover?.id ?? selectedRoute;
                  const dim = focusId != null && focusId !== route.id;
                  const color = route.type === "liquor" ? C.primary : C.amber;
                  const markerId = route.type === "liquor" ? "arrow-liquor" : "arrow-ndps";
                  // Spread routes 1..6 across ±12px perpendicular bands so shared
                  // corridors render as parallel strands, not an overlapping bundle.
                  const offset = (route.id - 3.5) * 5;
                  const d = smoothPath(offsetPoints(route.path, offset));

                  return (
                    <g
                      key={route.id}
                      onClick={() => setSelectedRoute(isSelected ? null : route.id)}
                      onMouseEnter={(e) => handleRouteMove(route.id, e)}
                      onMouseMove={(e) => handleRouteMove(route.id, e)}
                      onMouseLeave={() => setHover(null)}
                      className="cursor-pointer"
                      opacity={dim ? 0.15 : 1}
                      style={{ transition: "opacity 150ms" }}
                    >
                      {/* Wide invisible hit area so hover/click is forgiving */}
                      <path
                        d={d}
                        fill="none"
                        stroke="transparent"
                        strokeWidth={18}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pointerEvents="stroke"
                      />
                      {/* Route halo (selected or hovered) */}
                      {isActive && (
                        <path
                          d={d}
                          fill="none"
                          stroke={color}
                          strokeWidth={12}
                          opacity={0.18}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pointerEvents="none"
                        />
                      )}
                      {/* White casing underneath gives the cartographic "highway shield" look */}
                      <path
                        d={d}
                        fill="none"
                        stroke="white"
                        strokeWidth={isActive ? 6 : 4.5}
                        opacity={0.9}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pointerEvents="none"
                      />
                      {/* Route line */}
                      <path
                        d={d}
                        fill="none"
                        stroke={color}
                        strokeWidth={isActive ? 3 : 2.2}
                        opacity={isActive ? 0.95 : 0.7}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        markerEnd={`url(#${markerId})`}
                        pointerEvents="none"
                      />

                      {/* Waypoints */}
                      {route.path.map((point, idx) => {
                        const isLast = idx === route.path.length - 1;
                        const showLabel = isSelected || point.kind === "checkpost" || point.kind === "source";

                        if (point.kind === "seizure") {
                          return (
                            <g key={idx} filter="url(#pin-shadow)">
                              {isActive && <circle cx={point.x} cy={point.y} r={22} fill="url(#seizure-pulse)" />}
                              <circle cx={point.x} cy={point.y} r={7} fill={C.red} stroke="white" strokeWidth={2.5} />
                              <circle cx={point.x} cy={point.y} r={2.5} fill="white" />
                            </g>
                          );
                        }
                        if (point.kind === "source") {
                          const lbl = placeLabel(point.x, point.y, point.place);
                          return (
                            <g key={idx} filter="url(#pin-shadow)">
                              <circle cx={point.x} cy={point.y} r={8} fill={C.amber} stroke="white" strokeWidth={2.5} />
                              {showLabel && (
                                <text
                                  x={lbl.x}
                                  y={lbl.y}
                                  textAnchor={lbl.anchor}
                                  fill={C.text}
                                  style={{ fontSize: 10, fontWeight: 700 }}
                                  paintOrder="stroke"
                                  stroke="white"
                                  strokeWidth={3}
                                  strokeLinejoin="round"
                                >
                                  {point.name}
                                </text>
                              )}
                            </g>
                          );
                        }
                        // checkpost rendered separately; transit waypoints are
                        // intentionally not drawn to keep the corridor clean.
                        return null;
                      })}
                    </g>
                  );
                })}

                {/* Check posts - always visible on top */}
                {checkPosts.map((cp) => {
                  const fill = cp.type === "liquor" ? C.primary : cp.type === "ndps" ? C.amber : C.green;
                  const lbl = placeLabel(cp.x, cp.y, cp.place);
                  return (
                    <g key={cp.name} filter="url(#pin-shadow)">
                      <circle cx={cp.x} cy={cp.y} r={11} fill="white" stroke={fill} strokeWidth={2} />
                      <circle cx={cp.x} cy={cp.y} r={7} fill={fill} />
                      <text
                        x={lbl.x}
                        y={lbl.y}
                        textAnchor={lbl.anchor}
                        fill={C.text}
                        style={{ fontSize: 10, fontWeight: 700 }}
                        paintOrder="stroke"
                        stroke="white"
                        strokeWidth={3}
                        strokeLinejoin="round"
                      >
                        <tspan x={lbl.x} dy={0}>{cp.name}</tspan>
                        <tspan x={lbl.x} dy={11} fill={C.muted} style={{ fontSize: 9, fontWeight: 600 }}>
                          {cp.seizures} seizures
                        </tspan>
                      </text>
                    </g>
                  );
                })}

                {/* North arrow */}
                <g transform="translate(1140, 30)">
                  <circle r={16} fill="white" stroke="#CBD5E1" strokeWidth={1} />
                  <polygon points="0,-10 5,6 0,2 -5,6" fill={C.primary} />
                  <text y={22} textAnchor="middle" fill={C.muted} style={{ fontSize: 9, fontWeight: 700 }}>N</text>
                </g>
              </svg>

              {/* Hover tooltip */}
              {hover && (() => {
                const r = routes.find((x) => x.id === hover.id);
                if (!r) return null;
                const accent = r.type === "liquor" ? C.primary : C.amber;
                // Flip the tooltip to the left of cursor if it would overflow the right edge.
                const rect = mapRef.current?.getBoundingClientRect();
                const flipLeft = rect ? hover.x > rect.width - 260 : false;
                const left = flipLeft ? hover.x - 244 : hover.x + 16;
                const top = Math.min(hover.y + 12, (rect?.height ?? 600) - 160);
                return (
                  <div
                    className="absolute z-20 pointer-events-none bg-white rounded-[10px] border border-[#E5E7EB] shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                    style={{ left, top, width: 228 }}
                  >
                    <div className="px-3 py-2 border-b border-[#F1F5F9] flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: accent }}
                      />
                      <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
                        {r.type === "liquor" ? "Liquor" : "NDPS"} · Route #{r.id}
                      </span>
                    </div>
                    <div className="px-3 py-2.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[12px] text-[#0F172A]">
                        <span className="font-semibold truncate">{r.source.split(",")[0]}</span>
                        <ArrowRight className="w-3 h-3 text-[#94A3B8] shrink-0" />
                        <span className="font-semibold truncate">{r.destination}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                        <span className="text-[#6B7280]">Quantity</span>
                        <span className="text-right font-semibold text-[#0F172A]">{r.quantity}</span>
                        <span className="text-[#6B7280]">Value</span>
                        <span className="text-right font-semibold text-[#0F172A]">{r.value}</span>
                        <span className="text-[#6B7280]">Frequency</span>
                        <span className="text-right font-semibold text-[#0F172A]">{r.frequency}/mo</span>
                        <span className="text-[#6B7280]">Seized</span>
                        <span className="text-right font-semibold text-[#16A34A]">{r.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-[#E5E7EB] p-3 shadow-lg">
                <div className="text-[12px] font-semibold text-[#0F172A] mb-2">
                  Legend
                </div>
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#1D4ED8]"></div>
                    <span>Liquor Route</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#D97706]"></div>
                    <span>NDPS Route</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#DC2626]"></div>
                    <span>Seizure Point</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#16A34A]" style={{ opacity: 0.6 }}></div>
                    <span>Check Post</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Route Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedRouteData ? (
            <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[13px]">
              <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium leading-none mb-1">
                      Route #{selectedRouteData.id}
                    </div>
                    <h3 className="text-[#0F172A] font-bold leading-tight" style={{ fontSize: 14 }}>
                      {selectedRouteData.source.split(",")[0]} → {selectedRouteData.destination}
                    </h3>
                  </div>
                </div>
                <Badge
                  className={
                    selectedRouteData.type === "liquor"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF] text-[10px] px-1.5 py-0.5"
                      : "bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB] text-[10px] px-1.5 py-0.5"
                  }
                >
                  {selectedRouteData.type === "liquor" ? "Liquor" : "NDPS"}
                </Badge>
              </div>

              <div className="p-4 space-y-3">
                {/* Route Path */}
                <div>
                  <div className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    Route Path
                  </div>
                  <div className="space-y-1.5">
                    {selectedRouteData.path.map((point, idx) => {
                      const dotColor =
                        point.kind === "source" ? "bg-[#D97706]"
                        : point.kind === "checkpost" ? "bg-[#16A34A]"
                        : point.kind === "seizure" ? "bg-[#DC2626]"
                        : "bg-[#94A3B8]";
                      const kindLabel =
                        point.kind === "source" ? "Origin"
                        : point.kind === "checkpost" ? "Border Post"
                        : point.kind === "seizure" ? "Seizure"
                        : "Transit";
                      return (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="flex flex-col items-center mt-1 shrink-0">
                            <div className={`w-2 h-2 rounded-full ring-2 ring-white shadow ${dotColor}`}></div>
                            {idx < selectedRouteData.path.length - 1 && (
                              <div className="w-0.5 h-5 bg-[#E5E7EB]"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-semibold text-[#0F172A] truncate">
                              {point.name}
                            </div>
                            <div className="text-[10px] text-[#6B7280] leading-none mt-0.5">{kindLabel}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Details */}
                <div className="pt-2 border-t border-[#F1F5F9] space-y-2">
                  <DetailRow label="Entry Point" value={selectedRouteData.entryPost.replace(" Check Post", "")} />
                  <DetailRow label="Location" value={selectedRouteData.seizureLocation} />
                  <DetailRow label="Date" value={selectedRouteData.date} />
                  <DetailRow label="Quantity" value={selectedRouteData.quantity} />
                  <DetailRow label="Value" value={selectedRouteData.value} />
                  <DetailRow
                    label="Frequency"
                    value={`${selectedRouteData.frequency}/mo`}
                  />
                  <DetailRow
                    label="Status"
                    value={
                      <Badge className="bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5] text-[10px] px-1.5 py-0">
                        Seized
                      </Badge>
                    }
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-[#F1F5F9]">
                  <Button variant="default" size="sm" className="w-full h-8 text-[12px] bg-[#1D4ED8] hover:bg-[#1E3A8A]">
                    View Case Details
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[10px] border border-dashed border-[#CBD5E1] p-6 text-center h-full min-h-[300px] flex flex-col items-center justify-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center mb-2">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="text-[14px] font-semibold text-[#0F172A]">
                Select a Route
              </div>
              <p className="text-[12px] text-[#6B7280] mt-1 px-2">
                Click on a route line or marker on the map to see details here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Tabs */}
      <Panel title="Route Intelligence & Analysis">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#F9FAFB]">
            <TabsTrigger value="routes">Route Frequency</TabsTrigger>
            <TabsTrigger value="sources">Source Analysis</TabsTrigger>
            <TabsTrigger value="checkposts">Entry Points</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Entry Point</TableHead>
                  <TableHead className="text-right">Frequency</TableHead>
                  <TableHead>Last Seizure</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoutes.map((route) => (
                  <TableRow
                    key={route.id}
                    className="hover:bg-[#F9FAFB] cursor-pointer"
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <TableCell className="font-medium">
                      {route.source} → {route.destination}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          route.type === "liquor"
                            ? "bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]"
                            : "bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]"
                        }
                      >
                        {route.type === "liquor" ? "Liquor" : "NDPS"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#6B7280]">{route.entryPost}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {route.frequency}
                    </TableCell>
                    <TableCell className="text-[#6B7280]">{route.date}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]">
                        Seized
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="sources" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topSources.map((source, idx) => (
                <div
                  key={source.state}
                  className="rounded-lg border border-[#E5E7EB] p-4 hover:border-[#1D4ED8] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[16px] font-bold text-[#0F172A]">
                        #{idx + 1} {source.state}
                      </div>
                      <div className="text-[13px] text-[#6B7280]">
                        {source.total} total routes
                      </div>
                    </div>
                    <Badge
                      className={
                        idx === 0
                          ? "bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]"
                          : "bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]"
                      }
                    >
                      {idx === 0 ? "Highest" : "High"}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-[13px]">
                    <div>
                      <span className="text-[#6B7280]">Liquor:</span>{" "}
                      <span className="font-semibold text-[#1D4ED8]">
                        {source.liquor}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">NDPS:</span>{" "}
                      <span className="font-semibold text-[#D97706]">
                        {source.ndps}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="checkposts" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Check Post</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Total Routes</TableHead>
                  <TableHead className="text-right">Seizures</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entryAnalysis
                  .sort((a, b) => b.seizures - a.seizures)
                  .map((cp) => (
                    <TableRow key={cp.name} className="hover:bg-[#F9FAFB]">
                      <TableCell className="font-medium">{cp.name}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            cp.type === "liquor"
                              ? "bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]"
                              : cp.type === "ndps"
                              ? "bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]"
                              : "bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]"
                          }
                        >
                          {cp.type === "both" ? "Both" : cp.type === "liquor" ? "Liquor" : "NDPS"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {cp.routes}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-[#DC2626]">
                        {cp.seizures}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            cp.seizures > 150
                              ? "bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]"
                              : cp.seizures > 100
                              ? "bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]"
                              : "bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]"
                          }
                        >
                          {cp.seizures > 150 ? "Critical" : cp.seizures > 100 ? "High" : "Medium"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TrendCard title="Monthly Trend" value="+12.4%" label="vs last month" up />
              <TrendCard title="Yearly Trend" value="+24.8%" label="vs last year" up />
              <TrendCard
                title="Most Active"
                value="Vapi-Surat"
                label="186 seizures"
                up
              />
            </div>
            <div className="mt-6 text-center text-[13px] text-[#6B7280]">
              Detailed trend charts and historical analysis available in full report
            </div>
          </TabsContent>
        </Tabs>
      </Panel>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  color: string;
}) {
  const colors = {
    blue: { bg: "#EFF6FF", fg: "#1D4ED8" },
    green: { bg: "#ECFDF5", fg: "#16A34A" },
    amber: { bg: "#FFFBEB", fg: "#D97706" },
    primary: { bg: "#EFF6FF", fg: "#1D4ED8" },
  }[color] || { bg: "#EFF6FF", fg: "#1D4ED8" };

  return (
    <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-3 flex items-center gap-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(29,78,216,0.05)] transition-all">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: colors.bg, color: colors.fg }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold truncate">{label}</div>
        <div className="flex items-baseline gap-2">
          <span className="text-[18px] font-bold text-[#0F172A]">{value}</span>
          <span className="text-[11px] text-[#16A34A] font-semibold">{trend}</span>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="text-[#6B7280]">{label}</span>
      <span className="font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}

function TrendCard({
  title,
  value,
  label,
  up,
}: {
  title: string;
  value: string;
  label: string;
  up: boolean;
}) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] p-4">
      <div className="text-[12px] text-[#6B7280] mb-1">{title}</div>
      <div className="text-[22px] font-bold text-[#0F172A]">{value}</div>
      <div
        className={`text-[12px] mt-1 flex items-center gap-1 ${
          up ? "text-[#16A34A]" : "text-[#DC2626]"
        }`}
      >
        <TrendingUp className="w-3 h-3" />
        {label}
      </div>
    </div>
  );
}

export default RouteIntelligence;
