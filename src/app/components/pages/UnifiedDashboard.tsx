import { useState, useMemo, ReactNode } from "react";
import {
  AlertTriangle,
  Award,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  FileWarning,
  MapPin,
  Package,
  Search,
  Shield,
  TrendingUp,
  Users,
  Wine,
  X,
  Pill,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
} from "lucide-react";
import districtGeoData from "../../data/district-data.json";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Panel, rand } from "../shared";

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

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const districts = [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Gandhinagar",
  "Anand",
  "Mehsana",
  "Junagadh",
  "Kutch",
  "Bharuch",
  "Navsari",
  "Valsad",
  "Banaskantha",
];

const officers = [
  {
    name: "ACP R. Patel",
    district: "Ahmedabad",
    cases: 142,
    value: 3.2,
    strike: 92,
  },
  {
    name: "PI K. Shah",
    district: "Surat",
    cases: 128,
    value: 2.7,
    strike: 88,
  },
  {
    name: "PI M. Joshi",
    district: "Vadodara",
    cases: 111,
    value: 2.4,
    strike: 85,
  },
  {
    name: "PSI A. Mehta",
    district: "Rajkot",
    cases: 98,
    value: 1.9,
    strike: 81,
  },
  {
    name: "PI S. Desai",
    district: "Bhavnagar",
    cases: 91,
    value: 1.6,
    strike: 79,
  },
  {
    name: "ACP N. Trivedi",
    district: "Anand",
    cases: 84,
    value: 1.4,
    strike: 77,
  },
  {
    name: "PI V. Pandya",
    district: "Mehsana",
    cases: 78,
    value: 1.2,
    strike: 74,
  },
];

const bootleggers = [
  {
    no: 1,
    dist: "Ahmedabad",
    ps: "Naroda",
    name: "Rameshbhai Solanki",
    addr: "Naroda Road",
    caste: "—",
    crimes: 14,
    arrest: "2025-12-04",
    seizureValue: "₹4.2 લાખ",
    liquorSeized: "2,840 L",
    risk: "high",
    repeat: true,
    interstate: true,
  },
  {
    no: 2,
    dist: "Surat",
    ps: "Varachha",
    name: "Bharatbhai Patel",
    addr: "Varachha",
    caste: "—",
    crimes: 11,
    arrest: "2026-01-22",
    seizureValue: "₹3.8 લાખ",
    liquorSeized: "2,520 L",
    risk: "high",
    repeat: true,
    interstate: false,
  },
  {
    no: 3,
    dist: "Rajkot",
    ps: "Gondal",
    name: "Mukeshbhai Vaghela",
    addr: "Gondal",
    caste: "—",
    crimes: 9,
    arrest: "2026-02-11",
    seizureValue: "₹2.9 લાખ",
    liquorSeized: "1,960 L",
    risk: "medium",
    repeat: true,
    interstate: true,
  },
  {
    no: 4,
    dist: "Vadodara",
    ps: "Akota",
    name: "Hiteshbhai Chauhan",
    addr: "Akota",
    caste: "—",
    crimes: 7,
    arrest: "2026-03-09",
    seizureValue: "₹2.1 લાખ",
    liquorSeized: "1,480 L",
    risk: "medium",
    repeat: true,
    interstate: false,
  },
  {
    no: 5,
    dist: "Bhavnagar",
    ps: "Sihor",
    name: "Jayeshbhai Parmar",
    addr: "Sihor",
    caste: "—",
    crimes: 6,
    arrest: "2026-03-28",
    seizureValue: "₹1.8 લાખ",
    liquorSeized: "1,220 L",
    risk: "medium",
    repeat: false,
    interstate: false,
  },
  {
    no: 6,
    dist: "Jamnagar",
    ps: "City",
    name: "Dineshbhai Bhatti",
    addr: "City",
    caste: "—",
    crimes: 5,
    arrest: "2026-04-14",
    seizureValue: "₹1.5 લાખ",
    liquorSeized: "980 L",
    risk: "low",
    repeat: false,
    interstate: false,
  },
  {
    no: 7,
    dist: "Anand",
    ps: "Borsad",
    name: "Kishorbhai Rathod",
    addr: "Borsad",
    caste: "—",
    crimes: 5,
    arrest: "2026-04-21",
    seizureValue: "₹1.2 લાખ",
    liquorSeized: "840 L",
    risk: "low",
    repeat: false,
    interstate: false,
  },
];

const trend12 = (seed: number, base = 200, jitter = 80) => {
  const r = rand(seed);
  return months.map((m, i) => ({
    m,
    liquor: Math.round(base + r() * jitter + i * 6),
    NDPS: Math.round(base * 0.55 + r() * jitter * 0.6 + i * 3),
    cases: Math.round(base * 1.6 + r() * jitter * 1.2 + i * 8),
  }));
};

const mini = (seed: number) => {
  const r = rand(seed);
  return Array.from({ length: 12 }, () => ({
    v: Math.round(20 + r() * 80),
  }));
};

type CardId =
  | "bootleggers"
  | "repeat"
  | "liquor"
  | "NDPS"
  | "value"
  | "arrests"
  | "pending"
  | "missing"
  | "officer"
  | "topDistrict";

const cards: {
  id: CardId;
  icon: ReactNode;
  label: string;
  value: string;
  trend: string;
  up: boolean;
  tone: "blue" | "green" | "amber" | "red";
  seed: number;
}[] = [
    {
      id: "bootleggers",
      icon: <Users className="w-5 h-5" />,
      label: "Total Bootleggers",
      value: "12,847",
      trend: "8.2%",
      up: true,
      tone: "blue",
      seed: 11,
    },
    {
      id: "repeat",
      icon: <AlertTriangle className="w-5 h-5" />,
      label: "Repeat Offenders",
      value: "2,341",
      trend: "12.5%",
      up: true,
      tone: "red",
      seed: 22,
    },
    {
      id: "liquor",
      icon: <Wine className="w-5 h-5" />,
      label: "Total Liquor Seized",
      value: "184,520 L",
      trend: "6.1%",
      up: true,
      tone: "blue",
      seed: 33,
    },
    {
      id: "NDPS",
      icon: <Pill className="w-5 h-5" />,
      label: "Total NDPS Cases",
      value: "3,962",
      trend: "9.4%",
      up: true,
      tone: "amber",
      seed: 44,
    },
    {
      id: "value",
      icon: <IndianRupee className="w-5 h-5" />,
      label: "Total Seizure Value",
      value: "₹284.6 Cr",
      trend: "14.3%",
      up: true,
      tone: "green",
      seed: 55,
    },
    {
      id: "arrests",
      icon: <Shield className="w-5 h-5" />,
      label: "Total Arrests",
      value: "9,431",
      trend: "5.7%",
      up: true,
      tone: "blue",
      seed: 66,
    },
    {
      id: "pending",
      icon: <Clock className="w-5 h-5" />,
      label: "Pending Investigations",
      value: "1,284",
      trend: "3.2%",
      up: false,
      tone: "amber",
      seed: 77,
    },
    {
      id: "missing",
      icon: <FileWarning className="w-5 h-5" />,
      label: "Missing District Reports",
      value: "4",
      trend: "1",
      up: false,
      tone: "red",
      seed: 88,
    },
    {
      id: "officer",
      icon: <Award className="w-5 h-5" />,
      label: "Top Performing Officer",
      value: "ACP R. Patel",
      trend: "Ahmedabad",
      up: true,
      tone: "green",
      seed: 99,
    },
    {
      id: "topDistrict",
      icon: <MapPin className="w-5 h-5" />,
      label: "Highest Crime District",
      value: "Ahmedabad",
      trend: "2,184 cases",
      up: true,
      tone: "blue",
      seed: 101,
    },
  ];

interface DistrictData {
  code: string;
  name: string;
  path: string;
  center: { x: number; y: number };
}

interface CrimeData {
  liquor: number;
  NDPS: number;
  totalCases: number;
  arrests: number;
  seizureValue: number;
  pending: number;
  repeatOffenders: number;
}

export function UnifiedDashboard() {
  const [openCard, setOpenCard] = useState<CardId | null>(null);
  const [drillTab, setDrillTab] = useState("overview");
  const [tableQuery, setTableQuery] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState<
    string | null
  >(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<
    string | null
  >(null);
  const [drillDownView, setDrillDownView] = useState<
    "cases" | "arrests" | "liquor" | "NDPS" | null
  >(null);

  const monthly = useMemo(() => trend12(7), []);
  const districtData = useMemo(() => {
    const r = rand(13);
    return districts.map((d) => ({
      d,
      liquor: Math.round(200 + r() * 1800),
      NDPS: Math.round(50 + r() * 600),
      value: Math.round(20 + r() * 280),
    }));
  }, []);

  // Generate crime data for map districts
  const districtCrimeData = useMemo(() => {
    const r = rand(42);
    const data: Record<string, CrimeData> = {};

    districtGeoData.districts.forEach(
      (district: DistrictData) => {
        data[district.code] = {
          liquor: Math.round(500 + r() * 2500),
          NDPS: Math.round(50 + r() * 600),
          totalCases: Math.round(600 + r() * 3200),
          arrests: Math.round(400 + r() * 2000),
          seizureValue: Math.round((20 + r() * 180) * 10) / 10,
          pending: Math.round(50 + r() * 400),
          repeatOffenders: Math.round(20 + r() * 180),
        };
      },
    );

    return data;
  }, []);
  const stationData = useMemo(() => {
    const r = rand(17);
    return [
      "Naroda",
      "Varachha",
      "Gondal",
      "Akota",
      "Sihor",
      "Borsad",
      "Bhuj",
      "Surendranagar",
      "Nadiad",
      "Mehsana City",
    ]
      .map((s) => ({ s, cases: Math.round(80 + r() * 400) }))
      .sort((a, b) => b.cases - a.cases);
  }, []);

  const openDrill = (id: CardId) => {
    setOpenCard((cur) => (cur === id ? null : id));
    setDrillTab("overview");
    setTimeout(() => {
      document
        .getElementById("drill-workspace")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 60);
  };

  const getDistrictColor = (
    districtCode: string,
    isHovered: boolean,
    isSelected: boolean,
  ) => {
    const crimeData = districtCrimeData[districtCode];
    if (!crimeData) return C.surface;

    const allCases = Object.values(districtCrimeData).map(
      (d) => d.totalCases,
    );
    const maxCases = Math.max(...allCases);
    const minCases = Math.min(...allCases);
    const intensity =
      (crimeData.totalCases - minCases) / (maxCases - minCases);

    if (isSelected) {
      return C.primary;
    }
    if (isHovered) {
      return `rgba(29, 78, 216, ${0.3 + intensity * 0.5})`;
    }

    return `rgba(29, 78, 216, ${0.1 + intensity * 0.7})`;
  };

  const activeCard = cards.find((c) => c.id === openCard);
  const selectedDistrictData = selectedDistrict
    ? districtGeoData.districts.find(
      (d: DistrictData) => d.code === selectedDistrict,
    )
    : null;
  const selectedCrimeData = selectedDistrict
    ? districtCrimeData[selectedDistrict]
    : null;
  const hoveredDistrictData = hoveredDistrict
    ? districtGeoData.districts.find(
      (d: DistrictData) => d.code === hoveredDistrict,
    )
    : null;
  const hoveredCrimeData = hoveredDistrict
    ? districtCrimeData[hoveredDistrict]
    : null;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            className="text-[#0F172A] tracking-tight"
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            State Monitoring Cell Dashboard
          </h1>
          <p className="text-[#6B7280] mt-1 text-[13px]">
            Gujarat Police · Liquor & Narcotics enforcement
            analytics workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 gap-2">
            <Download className="w-4 h-4" /> Export Dashboard
          </Button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-[#0F172A]"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            Executive Summary
          </h2>
          <span className="text-[12px] text-[#6B7280]">
            Click any card to open drill-down analytics below
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map((c) => (
            <ExecCard
              key={c.id}
              card={c}
              active={openCard === c.id}
              onClick={() => openDrill(c.id)}
            />
          ))}
        </div>
      </section>

      {/* Main Analytics Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-10 gap-6">
        {/* Left 70% */}
        <div className="xl:col-span-7 space-y-6">
          <Panel
            title="Monthly Crime Registration Trend"
            action={<TrendBadge value="+11.4%" />}
          >
            <div
              className="h-72 w-full"
              style={{ minHeight: 288, minWidth: 300 }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
                minHeight={288}
                minWidth={300}
              >
                <LineChart
                  data={monthly}
                  margin={{
                    top: 8,
                    right: 12,
                    left: -10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    key="grid-monthly"
                    stroke="#F1F5F9"
                    vertical={false}
                  />
                  <XAxis
                    key="xaxis-monthly"
                    dataKey="m"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    key="yaxis-monthly"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip key="tooltip-monthly" />
                  <Legend
                    key="legend-monthly"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                  <Line
                    key="cases"
                    type="monotone"
                    dataKey="cases"
                    stroke={C.primary}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    name="Total Cases"
                  />
                  <Line
                    key="liquor"
                    type="monotone"
                    dataKey="liquor"
                    stroke={C.green}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Liquor"
                  />
                  <Line
                    key="NDPS"
                    type="monotone"
                    dataKey="NDPS"
                    stroke={C.amber}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="NDPS"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Liquor Seizure Analytics">
              <div
                className="h-60 w-full"
                style={{ minHeight: 240, minWidth: 300 }}
              >
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minHeight={240}
                  minWidth={300}
                >
                  <AreaChart
                    data={monthly}
                    margin={{
                      top: 8,
                      right: 12,
                      left: -12,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="liquorArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={C.primary}
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor={C.primary}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      key="grid-liquor"
                      stroke="#F1F5F9"
                      vertical={false}
                    />
                    <XAxis
                      key="xaxis-liquor"
                      dataKey="m"
                      stroke="#94A3B8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      key="yaxis-liquor"
                      stroke="#94A3B8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      key="tooltip-liquor"
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-[#E5E7EB] rounded shadow-md text-[12px]">
                              <p className="font-semibold text-[#0F172A] mb-1">{label}</p>
                              <p className="text-[#1D4ED8]">
                                Liquor: {payload[0].value} (L)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      key="liquor"
                      type="monotone"
                      dataKey="liquor"
                      stroke={C.primary}
                      strokeWidth={2}
                      fill="url(#liquorArea)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel title="NDPS Seizure Analytics">
              <div
                className="h-60 w-full"
                style={{ minHeight: 240, minWidth: 300 }}
              >
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minHeight={240}
                  minWidth={300}
                >
                  <AreaChart
                    data={monthly}
                    margin={{
                      top: 8,
                      right: 12,
                      left: -12,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="NDPSArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={C.amber}
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor={C.amber}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      key="grid-NDPS"
                      stroke="#F1F5F9"
                      vertical={false}
                    />
                    <XAxis
                      key="xaxis-NDPS"
                      dataKey="m"
                      stroke="#94A3B8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      key="yaxis-NDPS"
                      stroke="#94A3B8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      key="tooltip-NDPS"
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-[#E5E7EB] rounded shadow-md text-[12px]">
                              <p className="font-semibold text-[#0F172A] mb-1">{label}</p>
                              <p className="text-[#D97706]">
                                NDPS: {payload[0].value} (G)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      key="NDPS"
                      type="monotone"
                      dataKey="NDPS"
                      stroke={C.amber}
                      strokeWidth={2}
                      fill="url(#NDPSArea)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>

          <Panel
            title="Interactive District Crime Map"
            action={
              selectedDistrict && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedDistrict(null);
                    setDrillDownView(null);
                  }}
                  className="h-7 text-[12px]"
                >
                  <X className="w-3 h-3 mr-1" /> Clear Selection
                </Button>
              )
            }
          >
            <div
              className={`grid ${selectedDistrict ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6 transition-all duration-300`}
            >
              {/* Map */}
              <div className="relative">
                <svg
                  viewBox="0 0 1100 700"
                  className="w-full h-full"
                  style={{
                    maxHeight: selectedDistrict ? 500 : 600,
                    minHeight: 400,
                  }}
                >
                  <g>
                    {districtGeoData.districts.map(
                      (district: DistrictData) => {
                        const isHovered =
                          hoveredDistrict === district.code;
                        const isSelected =
                          selectedDistrict === district.code;

                        return (
                          <g key={district.code}>
                            <path
                              d={district.path}
                              fill={getDistrictColor(
                                district.code,
                                isHovered,
                                isSelected,
                              )}
                              stroke={
                                isSelected
                                  ? C.primary
                                  : isHovered
                                    ? C.primaryLight
                                    : "#94A3B8"
                              }
                              strokeWidth={
                                isSelected
                                  ? 2.5
                                  : isHovered
                                    ? 2
                                    : 1
                              }
                              className="cursor-pointer transition-all duration-200"
                              onMouseEnter={() =>
                                setHoveredDistrict(
                                  district.code,
                                )
                              }
                              onMouseLeave={() =>
                                setHoveredDistrict(null)
                              }
                              onClick={() => {
                                setSelectedDistrict(
                                  district.code,
                                );
                                setDrillDownView(null);
                              }}
                            />
                            <text
                              x={district.center.x}
                              y={district.center.y}
                              textAnchor="middle"
                              className="pointer-events-none select-none"
                              style={{
                                fontSize: isSelected ? 13 : 11,
                                fontWeight: isSelected
                                  ? 700
                                  : 600,
                                fill: isSelected
                                  ? "#fff"
                                  : "#0F172A",
                              }}
                            >
                              {district.name}
                            </text>
                          </g>
                        );
                      },
                    )}
                  </g>
                </svg>

                {/* Hover Tooltip */}
                {hoveredDistrictData &&
                  hoveredCrimeData &&
                  !selectedDistrict && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg border border-[#E5E7EB] p-3 shadow-lg min-w-[200px] animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#1D4ED8]" />
                        <span className="font-semibold text-[14px] text-[#0F172A]">
                          {hoveredDistrictData.name}
                        </span>
                      </div>
                      <div className="space-y-1 text-[12px]">
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">
                            Total Cases:
                          </span>
                          <span className="font-semibold text-[#0F172A]">
                            {hoveredCrimeData.totalCases.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">
                            Liquor:
                          </span>
                          <span className="font-semibold text-[#1D4ED8]">
                            {hoveredCrimeData.liquor.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">
                            NDPS:
                          </span>
                          <span className="font-semibold text-[#D97706]">
                            {hoveredCrimeData.NDPS.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-[#E5E7EB] p-3 shadow-lg">
                  <div className="text-[12px] font-semibold text-[#0F172A] mb-2">
                    Crime Intensity
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0.1, 0.3, 0.5, 0.7, 0.9].map(
                        (intensity, i) => (
                          <div
                            key={i}
                            className="w-6 h-3 rounded"
                            style={{
                              backgroundColor: `rgba(29, 78, 216, ${intensity})`,
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#6B7280] mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              {/* District Details Panel */}
              {selectedDistrictData && selectedCrimeData && (
                <div className="space-y-4">
                  <div className="bg-[#EFF6FF] rounded-lg p-4 border border-[#3B82F6]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[#1D4ED8]" />
                      <h3 className="text-[18px] font-bold text-[#0F172A]">
                        {selectedDistrictData.name}
                      </h3>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <button
                        onClick={() =>
                          setDrillDownView(
                            drillDownView === "cases"
                              ? null
                              : "cases",
                          )
                        }
                        className={`rounded-lg border p-3 text-left transition-all hover:shadow-md ${drillDownView === "cases"
                          ? "border-[#1D4ED8] bg-white shadow-md"
                          : "border-[#E5E7EB] bg-white hover:border-[#3B82F6]"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Shield className="w-4 h-4 text-[#1D4ED8]" />
                          {drillDownView === "cases" && (
                            <ExternalLink className="w-3 h-3 text-[#1D4ED8]" />
                          )}
                        </div>
                        <div className="text-[16px] font-bold text-[#0F172A]">
                          {selectedCrimeData.totalCases.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-[#6B7280]">
                          Total Cases
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          setDrillDownView(
                            drillDownView === "liquor"
                              ? null
                              : "liquor",
                          )
                        }
                        className={`rounded-lg border p-3 text-left transition-all hover:shadow-md ${drillDownView === "liquor"
                          ? "border-[#1D4ED8] bg-white shadow-md"
                          : "border-[#E5E7EB] bg-white hover:border-[#1D4ED8]"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Wine className="w-4 h-4 text-[#1D4ED8]" />
                          {drillDownView === "liquor" && (
                            <ExternalLink className="w-3 h-3 text-[#1D4ED8]" />
                          )}
                        </div>
                        <div className="text-[16px] font-bold text-[#0F172A]">
                          {selectedCrimeData.liquor.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-[#6B7280]">
                          Liquor Cases
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          setDrillDownView(
                            drillDownView === "NDPS"
                              ? null
                              : "NDPS",
                          )
                        }
                        className={`rounded-lg border p-3 text-left transition-all hover:shadow-md ${drillDownView === "NDPS"
                          ? "border-[#D97706] bg-white shadow-md"
                          : "border-[#E5E7EB] bg-white hover:border-[#D97706]"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Pill className="w-4 h-4 text-[#D97706]" />
                          {drillDownView === "NDPS" && (
                            <ExternalLink className="w-3 h-3 text-[#D97706]" />
                          )}
                        </div>
                        <div className="text-[16px] font-bold text-[#0F172A]">
                          {selectedCrimeData.NDPS.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-[#6B7280]">
                          NDPS Cases
                        </div>
                      </button>
                    </div>

                    {/* Detailed Metrics */}
                    <div className="space-y-2 pt-3 border-t border-[#CBD5E1]">
                      <div className="flex items-center justify-between text-[13px]">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-[#16A34A]" />
                          <span className="text-[#6B7280]">
                            Seizure Value
                          </span>
                        </div>
                        <span className="font-semibold text-[#0F172A]">
                          ₹{selectedCrimeData.seizureValue} Cr
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                          <span className="text-[#6B7280]">
                            Repeat Offenders
                          </span>
                        </div>
                        <span className="font-semibold text-[#0F172A]">
                          {selectedCrimeData.repeatOffenders.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Drill-down Details */}
                  {drillDownView && (
                    <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 animate-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[14px] font-semibold text-[#0F172A]">
                          {drillDownView === "cases" &&
                            "All Cases"}
                          {drillDownView === "liquor" &&
                            "Liquor Cases"}
                          {drillDownView === "NDPS" &&
                            "NDPS Cases"}
                        </h4>
                        <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                          {drillDownView === "cases" &&
                            selectedCrimeData.totalCases}
                          {drillDownView === "liquor" &&
                            selectedCrimeData.liquor}
                          {drillDownView === "NDPS" &&
                            selectedCrimeData.NDPS}{" "}
                          records
                        </Badge>
                      </div>
                      <div className="overflow-x-auto max-h-[400px]">
                        <Table>
                          <TableHeader className="sticky top-0 bg-white">
                            <TableRow>
                              <TableHead>અ.નં.</TableHead>
                              <TableHead>જિલ્લો</TableHead>
                              <TableHead>
                                પોલીસ સ્ટેશન
                              </TableHead>
                              <TableHead>બુટલેગર નામ</TableHead>
                              <TableHead>સરનામું</TableHead>
                              <TableHead className="text-right">
                                ગુનાઓ
                              </TableHead>
                              <TableHead>
                                અરૈસ્ટ તારીખ
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Array.from({
                              length: Math.min(
                                10,
                                drillDownView === "cases"
                                  ? selectedCrimeData.totalCases
                                  : drillDownView === "liquor"
                                    ? selectedCrimeData.liquor
                                    : selectedCrimeData.NDPS,
                              ),
                            }).map((_, i) => {
                              const psNames = [
                                "City",
                                "Rural",
                                "Highway",
                                "Railway",
                                "Cyber",
                              ];
                              const names = [
                                "Rameshbhai",
                                "Bharatbhai",
                                "Mukeshbhai",
                                "Hiteshbhai",
                                "Jayeshbhai",
                                "Dineshbhai",
                                "Kishorbhai",
                              ];
                              const surnames = [
                                "Patel",
                                "Shah",
                                "Vaghela",
                                "Chauhan",
                                "Parmar",
                                "Bhatti",
                                "Rathod",
                                "Solanki",
                              ];
                              const areas = [
                                "Road",
                                "Area",
                                "Chowk",
                                "Circle",
                                "Nagar",
                              ];

                              return (
                                <TableRow
                                  key={i}
                                  className="hover:bg-[#F9FAFB]"
                                >
                                  <TableCell>{i + 1}</TableCell>
                                  <TableCell className="font-medium">
                                    {selectedDistrictData.name}
                                  </TableCell>
                                  <TableCell className="text-[#6B7280]">
                                    {
                                      psNames[
                                      i % psNames.length
                                      ]
                                    }{" "}
                                    PS
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {names[i % names.length]}{" "}
                                    {
                                      surnames[
                                      (i + 3) %
                                      surnames.length
                                      ]
                                    }
                                  </TableCell>
                                  <TableCell className="text-[#6B7280]">
                                    {
                                      psNames[
                                      i % psNames.length
                                      ]
                                    }{" "}
                                    {
                                      areas[
                                      (i + 2) % areas.length
                                      ]
                                    }
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {Math.floor(
                                      3 + ((i * 2.3) % 10),
                                    )}
                                  </TableCell>
                                  <TableCell className="text-[#6B7280]">
                                    2026-
                                    {String(
                                      5 - Math.floor(i / 3),
                                    ).padStart(2, "0")}
                                    -
                                    {String(28 - i).padStart(
                                      2,
                                      "0",
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                      {(drillDownView === "cases"
                        ? selectedCrimeData.totalCases
                        : drillDownView === "liquor"
                          ? selectedCrimeData.liquor
                          : selectedCrimeData.NDPS) > 10 && (
                          <div className="text-center mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[12px]"
                            >
                              View All{" "}
                              {(drillDownView === "cases"
                                ? selectedCrimeData.totalCases
                                : drillDownView === "liquor"
                                  ? selectedCrimeData.liquor
                                  : selectedCrimeData.NDPS
                              ).toLocaleString()}{" "}
                              Records
                            </Button>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Panel>

          <Panel title="Police Station-wise Crime Ranking">
            <div
              className="h-72 w-full"
              style={{ minHeight: 288, minWidth: 300 }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
                minHeight={288}
                minWidth={300}
              >
                <BarChart
                  data={stationData}
                  layout="vertical"
                  margin={{
                    top: 8,
                    right: 16,
                    left: 8,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    key="grid-station"
                    stroke="#F1F5F9"
                    horizontal={false}
                  />
                  <XAxis
                    key="xaxis-station"
                    type="number"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    key="yaxis-station"
                    type="category"
                    dataKey="s"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <Tooltip key="tooltip-station" />
                  <Bar
                    key="station-cases"
                    dataKey="cases"
                    radius={[0, 6, 6, 0]}
                  >
                    {stationData.map((s, i) => (
                      <Cell
                        key={`station-cell-${s.s}-${i}`}
                        fill={
                          i === 0
                            ? C.primaryDark
                            : i < 3
                              ? C.primary
                              : C.primaryLight
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel
            title="District-wise Muddamal Analytics"
            action={
              <span className="text-[12px] text-[#6B7280]">
                Liquor · NDPS · Total value (₹ Cr)
              </span>
            }
          >
            <div
              className="h-72 w-full"
              style={{ minHeight: 288, minWidth: 300 }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
                minHeight={288}
                minWidth={300}
              >
                <BarChart
                  data={districtData.slice(0, 10)}
                  margin={{
                    top: 8,
                    right: 12,
                    left: -10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    key="grid-muddamal"
                    stroke="#F1F5F9"
                    vertical={false}
                  />
                  <XAxis
                    key="xaxis-muddamal"
                    dataKey="d"
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    angle={-20}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis
                    key="yaxis-muddamal"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip key="tooltip-muddamal" />
                  <Legend
                    key="legend-muddamal"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                  <Bar
                    key="liquor"
                    dataKey="liquor"
                    stackId="a"
                    fill={C.primary}
                    name="Liquor (L)"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    key="NDPS"
                    dataKey="NDPS"
                    stackId="a"
                    fill={C.amber}
                    name="NDPS (g)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Right 30% */}
        <div className="xl:col-span-3 space-y-6">
          <SidePanel
            title="Top Repeat Offenders"
            icon={<AlertTriangle className="w-4 h-4" />}
          >
            {bootleggers.slice(0, 5).map((b, i) => (
              <SideRow
                key={b.no}
                left={`${i + 1}. ${b.name}`}
                sub={`${b.dist} · ${b.ps}`}
                right={
                  <Badge className="bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]">
                    {b.crimes} crimes
                  </Badge>
                }
              />
            ))}
          </SidePanel>

          <SidePanel
            title="Top Performing Officers"
            icon={<Award className="w-4 h-4" />}
          >
            {officers.slice(0, 5).map((o, i) => (
              <SideRow
                key={o.name}
                left={`${i + 1}. ${o.name}`}
                sub={`${o.district} · ${o.cases} cases`}
                right={
                  <Badge className="bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]">
                    {o.strike}%
                  </Badge>
                }
              />
            ))}
          </SidePanel>

          <SidePanel
            title="High-Risk Districts"
            icon={<MapPin className="w-4 h-4" />}
          >
            {[...districtData]
              .sort(
                (a, b) =>
                  b.liquor + b.NDPS - (a.liquor + a.NDPS),
              )
              .slice(0, 5)
              .map((d, i) => (
                <SideRow
                  key={d.d}
                  left={`${i + 1}. ${d.d}`}
                  sub={`${(d.liquor + d.NDPS).toLocaleString()} cases`}
                  right={
                    <Badge className="bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]">
                      ₹{d.value} Cr
                    </Badge>
                  }
                />
              ))}
          </SidePanel>

          <SidePanel
            title="High-Value Seizures"
            icon={<Package className="w-4 h-4" />}
          >
            <SideRow
              key="seizure-1"
              left="MDMA · 2.4 kg"
              sub="Surat · PI K. Shah"
              right={
                <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                  ₹4.8 Cr
                </Badge>
              }
            />
            <SideRow
              key="seizure-2"
              left="IMFL · 1,820 L"
              sub="Ahmedabad · ACP R. Patel"
              right={
                <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                  ₹1.2 Cr
                </Badge>
              }
            />
            <SideRow
              key="seizure-3"
              left="Ganja · 84 kg"
              sub="Vadodara · PI M. Joshi"
              right={
                <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                  ₹92 L
                </Badge>
              }
            />
            <SideRow
              key="seizure-4"
              left="Country liquor · 920 L"
              sub="Rajkot · PSI A. Mehta"
              right={
                <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                  ₹68 L
                </Badge>
              }
            />
          </SidePanel>

          <SidePanel
            title="Pending Investigations"
            icon={<Clock className="w-4 h-4" />}
          >
            <SideRow
              key="pending-1"
              left="FIR · Wanted"
              sub="Stage tracking"
              right={
                <Badge className="bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]">
                  428
                </Badge>
              }
            />
            <SideRow
              key="pending-2"
              left="PA · Court Pending"
              sub="Disposal queue"
              right={
                <Badge className="bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]">
                  612
                </Badge>
              }
            />
            <SideRow
              key="pending-3"
              left="Investigation · Arrested"
              sub="Chargesheet due"
              right={
                <Badge className="bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]">
                  244
                </Badge>
              }
            />
          </SidePanel>

          <SidePanel
            title="Recent Arrests"
            icon={<Shield className="w-4 h-4" />}
          >
            <SideRow
              key="arrest-1"
              left="Rameshbhai S."
              sub="Ahmedabad · 2h ago"
              right={
                <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                  Liquor
                </Badge>
              }
            />
            <SideRow
              key="arrest-2"
              left="Bharatbhai P."
              sub="Surat · 5h ago"
              right={
                <Badge className="bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]">
                  NDPS
                </Badge>
              }
            />
            <SideRow
              key="arrest-3"
              left="Mukeshbhai V."
              sub="Rajkot · 9h ago"
              right={
                <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                  Liquor
                </Badge>
              }
            />
          </SidePanel>
        </div>
      </section>

      {/* Bootlegger Master Analytics */}
      <Panel
        title="Bootlegger Master Analytics"
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 w-4 h-4 text-[#6B7280]" />
              <Input
                value={tableQuery}
                onChange={(e) => {
                  setTableQuery(e.target.value);
                  setTablePage(1);
                }}
                placeholder="Search bootlegger…"
                className="pl-8 h-8 w-56 bg-[#F9FAFB] border-[#E5E7EB] text-[13px]"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
          </div>
        }
      >
        <BootleggerTable
          query={tableQuery}
          page={tablePage}
          setPage={setTablePage}
        />
      </Panel>

      {/* Drill-down workspace */}
      <section id="drill-workspace">
        {activeCard ? (
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
                  {activeCard.icon}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium">
                    Drill-down · {activeCard.label}
                  </div>
                  <h3
                    className="text-[#0F172A]"
                    style={{ fontSize: 20, fontWeight: 700 }}
                  >
                    {activeCard.value}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setOpenCard(null)}
                className="w-8 h-8 rounded-md hover:bg-[#F3F4F6] flex items-center justify-center text-[#6B7280]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <Tabs
              value={drillTab}
              onValueChange={setDrillTab}
              className="w-full"
            >
              <div className="px-5 pt-3 border-b border-[#F1F5F9] overflow-x-auto">
                <TabsList className="bg-transparent p-0 h-auto gap-1">
                  {[
                    ["overview", "Overview"],
                    ["table", "Detailed Table"],
                    ["district", "District Analytics"],
                    ["station", "Police Station"],
                    ["officer", "Officer Analytics"],
                    ["timeline", "Timeline"],
                  ].map(([k, l]) => (
                    <TabsTrigger
                      key={k}
                      value={k}
                      className="data-[state=active]:bg-[#EFF6FF] data-[state=active]:text-[#1D4ED8] data-[state=active]:shadow-none rounded-md text-[13px] px-3 py-2"
                    >
                      {l}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <MetricTile
                    label="Total Records"
                    value="14,820"
                    delta="+6.4%"
                    up
                  />
                  <MetricTile
                    label="Repeat Frequency"
                    value="22.4%"
                    delta="+1.8%"
                    up
                  />
                  <MetricTile
                    label="Interstate Linked"
                    value="312"
                    delta="+9 this month"
                    up
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  <div
                    className="w-full rounded-lg border border-[#E5E7EB] p-4"
                    style={{ minWidth: 300 }}
                  >
                    <div className="text-[13px] font-medium text-[#0F172A] mb-2">
                      Monthly Trend
                    </div>
                    <div
                      className="h-56 w-full"
                      style={{ minHeight: 224, minWidth: 300 }}
                    >
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minHeight={224}
                        minWidth={300}
                      >
                        <AreaChart data={monthly}>
                          <defs>
                            <linearGradient
                              id="drillA"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={C.primary}
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor={C.primary}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            key="grid-drill-monthly"
                            stroke="#F1F5F9"
                            vertical={false}
                          />
                          <XAxis
                            key="xaxis-drill-monthly"
                            dataKey="m"
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            key="yaxis-drill-monthly"
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip key="tooltip-drill-monthly" />
                          <Area
                            key="cases"
                            type="monotone"
                            dataKey="cases"
                            stroke={C.primary}
                            strokeWidth={2}
                            fill="url(#drillA)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div
                    className="w-full rounded-lg border border-[#E5E7EB] p-4"
                    style={{ minWidth: 300 }}
                  >
                    <div className="text-[13px] font-medium text-[#0F172A] mb-2">
                      Top Districts
                    </div>
                    <div
                      className="h-56 w-full"
                      style={{ minHeight: 224, minWidth: 300 }}
                    >
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minHeight={224}
                        minWidth={300}
                      >
                        <BarChart
                          data={districtData.slice(0, 7)}
                        >
                          <CartesianGrid
                            key="grid-drill-district-top"
                            stroke="#F1F5F9"
                            vertical={false}
                          />
                          <XAxis
                            key="xaxis-drill-district-top"
                            dataKey="d"
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            key="yaxis-drill-district-top"
                            stroke="#94A3B8"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip key="tooltip-drill-district-top" />
                          <Bar
                            key="liquor"
                            dataKey="liquor"
                            fill={C.primary}
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="table" className="p-5">
                <BootleggerTable
                  query={tableQuery}
                  page={tablePage}
                  setPage={setTablePage}
                />
              </TabsContent>

              <TabsContent value="district" className="p-5">
                <div
                  className="h-80 w-full"
                  style={{ minHeight: 320, minWidth: 300 }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={320}
                    minWidth={300}
                  >
                    <BarChart data={districtData}>
                      <CartesianGrid
                        key="grid-drill-district"
                        stroke="#F1F5F9"
                        vertical={false}
                      />
                      <XAxis
                        key="xaxis-drill-district"
                        dataKey="d"
                        stroke="#94A3B8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        key="yaxis-drill-district"
                        stroke="#94A3B8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip key="tooltip-drill-district" />
                      <Legend
                        key="legend-drill-district"
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12 }}
                      />
                      <Bar
                        key="liquor"
                        dataKey="liquor"
                        fill={C.primary}
                        name="Liquor"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        key="NDPS"
                        dataKey="NDPS"
                        fill={C.amber}
                        name="NDPS"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="station" className="p-5">
                <div
                  className="h-80 w-full"
                  style={{ minHeight: 320, minWidth: 300 }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={320}
                    minWidth={300}
                  >
                    <BarChart
                      data={stationData}
                      layout="vertical"
                      margin={{ left: 10 }}
                    >
                      <CartesianGrid
                        key="grid-drill-station"
                        stroke="#F1F5F9"
                        horizontal={false}
                      />
                      <XAxis
                        key="xaxis-drill-station"
                        type="number"
                        stroke="#94A3B8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        key="yaxis-drill-station"
                        type="category"
                        dataKey="s"
                        stroke="#94A3B8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={120}
                      />
                      <Tooltip key="tooltip-drill-station" />
                      <Bar
                        key="cases"
                        dataKey="cases"
                        fill={C.primary}
                        radius={[0, 6, 6, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="officer" className="p-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Officer</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead className="text-right">
                        Cases
                      </TableHead>
                      <TableHead className="text-right">
                        Seizure (₹ Cr)
                      </TableHead>
                      <TableHead className="text-right">
                        બદલી પૂર્વેનું સ્થળ
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {officers.map((o) => (
                      <TableRow key={o.name}>
                        <TableCell className="font-medium">
                          {o.name}
                        </TableCell>
                        <TableCell className="text-[#6B7280]">
                          {o.district}
                        </TableCell>
                        <TableCell className="text-right">
                          {o.cases}
                        </TableCell>
                        <TableCell className="text-right">
                          {o.value}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]">
                            {o.strike}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="timeline" className="p-5">
                <div
                  className="h-72 w-full"
                  style={{ minHeight: 288, minWidth: 300 }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={288}
                    minWidth={300}
                  >
                    <LineChart data={monthly}>
                      <CartesianGrid
                        key="grid-drill-timeline"
                        stroke="#F1F5F9"
                        vertical={false}
                      />
                      <XAxis
                        key="xaxis-drill-timeline"
                        dataKey="m"
                        stroke="#94A3B8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        key="yaxis-drill-timeline"
                        stroke="#94A3B8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip key="tooltip-drill-timeline" />
                      <Legend
                        key="legend-drill-timeline"
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12 }}
                      />
                      <Line
                        key="cases"
                        type="monotone"
                        dataKey="cases"
                        stroke={C.primary}
                        strokeWidth={2.5}
                      />
                      <Line
                        key="liquor"
                        type="monotone"
                        dataKey="liquor"
                        stroke={C.green}
                        strokeWidth={2}
                      />
                      <Line
                        key="NDPS"
                        type="monotone"
                        dataKey="NDPS"
                        stroke={C.amber}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="supplier" className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Rajasthan border ring",
                    "Daman supply chain",
                    "MP transit network",
                    "Maharashtra MDMA route",
                    "Punjab IMFL pipeline",
                  ].map((s, i) => (
                    <div
                      key={s}
                      className="rounded-lg border border-[#E5E7EB] p-4 hover:border-[#1D4ED8] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-[14px]">
                          {s}
                        </div>
                        <Badge className="bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]">
                          High
                        </Badge>
                      </div>
                      <div className="text-[12px] text-[#6B7280] mt-1">
                        {12 + i * 3} linked accused · {2 + i}{" "}
                        districts
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="geo" className="p-5">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {districtData.map((d) => {
                    const max = Math.max(
                      ...districtData.map(
                        (x) => x.liquor + x.NDPS,
                      ),
                    );
                    const intensity =
                      (d.liquor + d.NDPS) / max;
                    const bg = `rgba(29, 78, 216, ${0.12 + intensity * 0.78})`;
                    const fg =
                      intensity > 0.55 ? "#fff" : "#0F172A";
                    return (
                      <div
                        key={d.d}
                        className="rounded-lg p-3"
                        style={{
                          backgroundColor: bg,
                          color: fg,
                        }}
                      >
                        <div className="text-[12px] opacity-80">
                          {d.d}
                        </div>
                        <div className="text-[16px] font-semibold leading-tight mt-0.5">
                          {(
                            d.liquor + d.NDPS
                          ).toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="bg-white rounded-[14px] border border-dashed border-[#CBD5E1] p-8 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-[15px] font-semibold text-[#0F172A]">
              Drill-down Intelligence Workspace
            </div>
            <p className="text-[13px] text-[#6B7280] mt-1">
              Click any executive card above to open detailed
              analytics, district breakdowns, officer rankings
              and supplier intelligence inline.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function ExecCard({
  card,
  active,
  onClick,
}: {
  card: (typeof cards)[number];
  active: boolean;
  onClick: () => void;
}) {
  const tones = {
    blue: { bg: "#EFF6FF", fg: "#1D4ED8" },
    green: { bg: "#ECFDF5", fg: "#16A34A" },
    amber: { bg: "#FFFBEB", fg: "#D97706" },
    red: { bg: "#FEF2F2", fg: "#DC2626" },
  }[card.tone];
  const data = useMemo(() => mini(card.seed), [card.seed]);
  const gid = `mini-${card.id}`;
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white rounded-[14px] border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(29,78,216,0.10)] hover:-translate-y-0.5 transition-all duration-180 ${active
        ? "border-[#1D4ED8] ring-2 ring-[#3B82F6]/20"
        : "border-[#E5E7EB]"
        }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: tones.bg, color: tones.fg }}
        >
          {card.icon}
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-[11px] font-medium px-1.5 py-0.5 rounded ${card.up ? "text-[#16A34A] bg-[#ECFDF5]" : "text-[#DC2626] bg-[#FEF2F2]"}`}
        >
          {card.up ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {card.trend}
        </span>
      </div>
      <div
        className="text-[#0F172A] truncate"
        style={{
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.15,
        }}
      >
        {card.value}
      </div>
      <div className="flex items-end justify-between mt-1 gap-2">
        <div className="text-[12px] text-[#6B7280] leading-tight">
          {card.label}
        </div>
        <div
          style={{
            width: 56,
            height: 32,
            minHeight: 32,
            minWidth: 56,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight={32}
            minWidth={56}
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={gid}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={tones.fg}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor={tones.fg}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                key="v"
                type="monotone"
                dataKey="v"
                stroke={tones.fg}
                strokeWidth={1.5}
                fill={`url(#${gid})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div
        className={`mt-2 text-[11px] flex items-center gap-1 ${active ? "text-[#1D4ED8]" : "text-[#94A3B8]"}`}
      >
        {active ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
        {active ? "Drill-down open" : "View details"}
      </div>
    </button>
  );
}

function SidePanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
          {icon}
        </div>
        <h3
          className="text-[#0F172A]"
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          {title}
        </h3>
      </div>
      <div className="px-4 py-2 divide-y divide-[#F1F5F9]">
        {children}
      </div>
    </div>
  );
}

function SideRow({
  left,
  sub,
  right,
}: {
  left: string;
  sub: string;
  right: ReactNode;
}) {
  return (
    <div className="py-2.5 flex items-center justify-between gap-2 hover:bg-[#F9FAFB] -mx-2 px-2 rounded-md cursor-pointer transition-colors">
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-[#0F172A] truncate">
          {left}
        </div>
        <div className="text-[11px] text-[#6B7280] truncate">
          {sub}
        </div>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

function TrendBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] font-medium px-2 py-1 rounded text-[#16A34A] bg-[#ECFDF5]">
      <TrendingUp className="w-3.5 h-3.5" /> {value}
    </span>
  );
}

function MetricTile({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] p-4">
      <div className="text-[12px] text-[#6B7280]">{label}</div>
      <div
        className="text-[#0F172A] mt-1"
        style={{ fontSize: 22, fontWeight: 700 }}
      >
        {value}
      </div>
      <div
        className={`text-[12px] mt-1 inline-flex items-center gap-0.5 ${up ? "text-[#16A34A]" : "text-[#DC2626]"}`}
      >
        {up ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}{" "}
        {delta}
      </div>
    </div>
  );
}

function BootleggerTable({
  query,
  page,
  setPage,
}: {
  query: string;
  page: number;
  setPage: (n: number) => void;
}) {
  const filtered = bootleggers.filter((b) =>
    [b.name, b.dist, b.ps, b.addr].some((v) =>
      v.toLowerCase().includes(query.toLowerCase()),
    ),
  );
  const perPage = 5;
  const pages = Math.max(
    1,
    Math.ceil(filtered.length / perPage),
  );
  const slice = filtered.slice(
    (page - 1) * perPage,
    page * perPage,
  );
  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white">
            <TableRow>
              <TableHead>અ.નં.</TableHead>
              <TableHead>જિલ્લો</TableHead>
              <TableHead>પોલીસ સ્ટેશન</TableHead>
              <TableHead>બુટલેગર નામ</TableHead>
              <TableHead>સરનામું</TableHead>
              <TableHead className="text-right">
                ગુનાઓ
              </TableHead>
              <TableHead>પકડાયેલ મુદામાલ ની કિંમત</TableHead>
              <TableHead>દારૂ જપ્ત</TableHead>
              <TableHead>અરૈસ્ટ તારીખ</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((b) => (
              <TableRow
                key={b.no}
                className="hover:bg-[#F9FAFB]"
              >
                <TableCell>{b.no}</TableCell>
                <TableCell className="font-medium">
                  {b.dist}
                </TableCell>
                <TableCell className="text-[#6B7280]">
                  {b.ps}
                </TableCell>
                <TableCell className="font-medium">
                  {b.name}
                </TableCell>
                <TableCell className="text-[#6B7280]">
                  {b.addr}
                </TableCell>
                <TableCell className="text-right">
                  {b.crimes}
                </TableCell>
                <TableCell className="font-semibold text-[#16A34A]">
                  {b.seizureValue}
                </TableCell>
                <TableCell className="font-medium text-[#1D4ED8]">
                  {b.liquorSeized}
                </TableCell>
                <TableCell className="text-[#6B7280]">
                  {b.arrest}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {b.repeat && (
                      <Badge className="bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]">
                        Repeat
                      </Badge>
                    )}
                    {b.risk === "high" && (
                      <Badge className="bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]">
                        High Risk
                      </Badge>
                    )}
                    {b.interstate && (
                      <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                        Interstate
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {slice.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center text-[#6B7280] py-6"
                >
                  No matching records.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-[12px] text-[#6B7280]">
          Showing {slice.length} of {filtered.length} records
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-[12px] text-[#6B7280] px-2">
            Page {page} / {pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnifiedDashboard;