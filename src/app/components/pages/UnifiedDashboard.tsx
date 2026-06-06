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
  Dices,
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
    destination: "Bharuch",
    investigatedBy: "State Monitoring Cell",
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
    destination: "Surat",
    investigatedBy: "Local Police Station",
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
    destination: "Jamnagar",
    investigatedBy: "State Monitoring Cell",
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
    destination: "Vadodara",
    investigatedBy: "Local Police Station",
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
    destination: "Bharuch",
    investigatedBy: "Local Police Station",
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
    destination: "Rajkot",
    investigatedBy: "State Monitoring Cell",
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
    destination: "Anand",
    investigatedBy: "Local Police Station",
  },
];

const ndpsAccused = [
  {
    no: 1,
    dist: "Ahmedabad",
    ps: "Vastrapur",
    name: "Sajid Khan",
    addr: "Vastrapur",
    caste: "—",
    crimes: 3,
    arrest: "2026-03-15",
    seizureValue: "₹15.2 લાખ",
    drugsSeized: "150 G",
    risk: "high",
    repeat: true,
    interstate: true,
    destination: "Bharuch",
    investigatedBy: "State Monitoring Cell",
  },
  {
    no: 2,
    dist: "Surat",
    ps: "Adajan",
    name: "Raju Bhai",
    addr: "Adajan",
    caste: "—",
    crimes: 1,
    arrest: "2026-04-10",
    seizureValue: "₹5.8 લાખ",
    drugsSeized: "50 G",
    risk: "medium",
    repeat: false,
    interstate: false,
    destination: "Surat",
    investigatedBy: "Local Police Station",
  },
];

const trend12 = (seed: number, base = 200, jitter = 80) => {
  const r = rand(seed);
  return months.map((m, i) => {
    const liquor = Math.round(base + r() * jitter + i * 6);
    const NDPS = Math.round(base * 0.55 + r() * jitter * 0.6 + i * 3);
    const gambling = Math.round(base * 0.4 + r() * jitter * 0.5 + i * 2);
    return {
      m,
      liquor,
      NDPS,
      gambling,
      cases: liquor + NDPS + gambling,
    };
  });
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
  | "gambling"
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
  tone: "blue" | "green" | "amber" | "red" | "purple";
  seed: number;
}[] = [
    {
      id: "bootleggers",
      icon: <Users className="w-5 h-5" />,
      label: "કુલ બુટલેગર્સ",
      value: "12,847",
      trend: "8.2%",
      up: true,
      tone: "blue",
      seed: 11,
    },
    {
      id: "repeat",
      icon: <AlertTriangle className="w-5 h-5" />,
      label: "વારંવાર ગુનો કરનારા",
      value: "2,341",
      trend: "12.5%",
      up: true,
      tone: "red",
      seed: 22,
    },
    {
      id: "liquor",
      icon: <Wine className="w-5 h-5" />,
      label: "કુલ જપ્ત કરેલ દારૂ",
      value: "184,520 L",
      trend: "6.1%",
      up: true,
      tone: "blue",
      seed: 33,
    },
    {
      id: "NDPS",
      icon: <Pill className="w-5 h-5" />,
      label: "કુલ NDPS કેસ",
      value: "3,962",
      trend: "9.4%",
      up: true,
      tone: "amber",
      seed: 44,
    },
    {
      id: "gambling",
      icon: <Dices className="w-5 h-5" />,
      label: "કુલ જુગાર કેસ",
      value: "5,842",
      trend: "4.2%",
      up: true,
      tone: "purple",
      seed: 66,
    },
    {
      id: "value",
      icon: <IndianRupee className="w-5 h-5" />,
      label: "કુલ જપ્તી કિંમત",
      value: "₹284.6 Cr",
      trend: "14.3%",
      up: true,
      tone: "green",
      seed: 55,
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
  gambling: number;
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
  const [masterType, setMasterType] = useState<"bootlegger" | "ndps" | "gambling">("bootlegger");
  const [selectedDistrict, setSelectedDistrict] = useState<
    string | null
  >(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<
    string | null
  >(null);
  const [drillDownView, setDrillDownView] = useState<
    "cases" | "arrests" | "liquor" | "NDPS" | "gambling" | null
  >(null);
  const [filterMode, setFilterMode] = useState<"overall" | "bootlegger" | "ndps" | "gambling">("overall");

  const filteredCards = useMemo(() => {
    return cards
      .filter((c) => {
        if (filterMode === "bootlegger") {
          return c.id === "bootleggers" || c.id === "repeat" || c.id === "liquor" || c.id === "value";
        }
        if (filterMode === "ndps") {
          return c.id === "NDPS" || c.id === "value";
        }
        if (filterMode === "gambling") {
          return c.id === "gambling" || c.id === "value";
        }
        return true;
      })
      .map((c) => {
        if (c.id === "value") {
          if (filterMode === "bootlegger") {
            return { ...c, label: "દારૂ જપ્તી કિંમત", value: "₹192.2 Cr" };
          }
          if (filterMode === "ndps") {
            return { ...c, label: "NDPS જપ્તી કિંમત", value: "₹92.4 Cr" };
          }
          if (filterMode === "gambling") {
            return { ...c, label: "જુગાર જપ્તી કિંમત", value: "₹18.5 Cr" };
          }
        }
        return c;
      });
  }, [filterMode]);

  const monthly = useMemo(() => trend12(7), []);

  const bottleVarietyData = useMemo(() => {
    return {
      categories: [
        { name: "Whiskey", count: 148200, percentage: 40, color: "#1D4ED8", sub: "IMFL Category" },
        { name: "Beer", count: 92600, percentage: 25, color: "#3B82F6", sub: "IMFL Category" },
        { name: "Country Liquor (Desi)", count: 84780, percentage: 23, color: "#D97706", sub: "Desi Daru" },
        { name: "Rum & Vodka", count: 43460, percentage: 12, color: "#16A34A", sub: "IMFL Category" },
      ],
      sizes: [
        { name: "Quart (750ml)", count: 166068, percentage: 45, color: "#4F46E5" },
        { name: "Pint (375ml)", count: 110712, percentage: 30, color: "#06B6D4" },
        { name: "Nip (180ml)", count: 55356, percentage: 15, color: "#EC4899" },
        { name: "Beer Bottle (650ml)", count: 36904, percentage: 10, color: "#10B981" },
      ],
      brands: [
        { name: "Royal Stag", type: "Whiskey (750ml)", count: "42,300", volume: "31,725 L", value: "₹63.4 Lakh" },
        { name: "McDowell's No.1", type: "Whiskey (375ml)", count: "38,400", volume: "14,400 L", value: "₹28.8 Lakh" },
        { name: "Kingfisher Strong", type: "Beer (650ml)", count: "35,200", volume: "22,880 L", value: "₹17.6 Lakh" },
        { name: "Officer's Choice", type: "Whiskey (180ml)", count: "29,600", volume: "5,328 L", value: "₹11.8 Lakh" },
        { name: "Imperial Blue", type: "Whiskey (750ml)", count: "24,800", volume: "18,600 L", value: "₹37.2 Lakh" },
      ]
    };
  }, []);

  const bottleMonthlyData = useMemo(() => {
    return monthly.map((m) => ({
      m: m.m,
      imfl: Math.round(m.liquor * 2 * 0.77),
      desi: Math.round(m.liquor * 2 * 0.23),
      total: m.liquor * 2,
    }));
  }, [monthly]);

  const ndpsVarietyData = useMemo(() => {
    return {
      categories: [
        { name: "Ganja (Cannabis)", count: 1845, weight: "2,450 kg", percentage: 46, color: "#16A34A" },
        { name: "Mephedrone (MD)", count: 911, weight: "18.4 kg", percentage: 23, color: "#D97706" },
        { name: "Heroin / Brown Sugar", count: 594, weight: "12.6 kg", percentage: 15, color: "#DC2626" },
        { name: "Opium (Afeem)", count: 356, weight: "42.8 kg", percentage: 9, color: "#4F46E5" },
        { name: "Prescription Drugs", count: 256, weight: "48,500 units", percentage: 7, color: "#EC4899" },
      ],
      types: [
        { name: "Synthetic Drugs (MDMA, MD, Heroin)", percentage: 38, count: 1505, color: "#DC2626" },
        { name: "Natural/Plant-based (Ganja, Opium, Charas)", percentage: 55, count: 2201, color: "#16A34A" },
        { name: "Prescription / Pharmaceutical", percentage: 7, count: 256, color: "#3B82F6" },
      ],
      topSeizures: [
        { district: "Surat", drug: "MDMA", quantity: "12.4 kg", value: "₹24.8 Cr", date: "2026-05-26" },
        { district: "Ahmedabad", drug: "Heroin", quantity: "8.2 kg", value: "₹24.6 Cr", date: "2026-04-18" },
        { district: "Bharuch", drug: "Mephedrone (MD)", quantity: "6.8 kg", value: "₹13.6 Cr", date: "2026-05-10" },
        { district: "Valsad", drug: "Ganja", quantity: "450 kg", value: "₹0.9 Cr", date: "2026-03-22" },
        { district: "Vapi", drug: "Cocaine", quantity: "1.2 kg", value: "₹8.4 Cr", date: "2026-05-15" },
      ]
    };
  }, []);

  const gamblingVarietyData = useMemo(() => {
    return {
      categories: [
        { name: "Card Den (પાના ક્લબ)", count: 2450, value: "₹5.4 Cr", percentage: 42, color: "#4F46E5" },
        { name: "Online Gambling (ઓનલાઇન આઈડી/બેટિંગ)", count: 1680, value: "₹8.2 Cr", percentage: 29, color: "#06B6D4" },
        { name: "Street Gambling (વરલી મટકા/ખુલ્લો જુગાર)", count: 1120, value: "₹1.8 Cr", percentage: 19, color: "#D97706" },
        { name: "Club Raids (મોટી જુગાર ક્લબો)", count: 592, value: "₹3.1 Cr", percentage: 10, color: "#16A34A" },
      ],
      types: [
        { name: "Structured Clubs & Dens", percentage: 52, count: 3042, color: "#4F46E5" },
        { name: "Digital & Online Networks", percentage: 29, count: 1680, color: "#06B6D4" },
        { name: "Street & Localized Gambling", percentage: 19, count: 1120, color: "#D97706" },
      ],
      topRaids: [
        { district: "Ahmedabad", location: "S.G. Highway Club", players: 42, seizedValue: "₹45.2 Lakh", date: "2026-05-28" },
        { district: "Surat", location: "Adajan Luxury Apartment", players: 28, seizedValue: "₹32.8 Lakh", date: "2026-05-15" },
        { district: "Rajkot", location: "Moti Taki Den", players: 35, seizedValue: "₹24.5 Lakh", date: "2026-04-30" },
        { district: "Vadodara", location: "Gotri Villa Raid", players: 19, seizedValue: "₹18.9 Lakh", date: "2026-05-02" },
        { district: "Mehsana", location: "Highway Farmhouse", players: 31, seizedValue: "₹15.4 Lakh", date: "2026-03-24" },
      ]
    };
  }, []);

  const districtData = useMemo(() => {
    const r = rand(13);
    return districts.map((d) => ({
      d,
      liquor: Math.round(200 + r() * 1800),
      NDPS: Math.round(50 + r() * 600),
      gambling: Math.round(100 + r() * 1000),
      value: Math.round(20 + r() * 280),
    }));
  }, []);

  // Generate crime data for map districts
  const districtCrimeData = useMemo(() => {
    const r = rand(42);
    const data = new Map<string, CrimeData>();

    districtGeoData.districts.forEach(
      (district: DistrictData) => {
        const liquor = Math.round(500 + r() * 2500);
        const NDPS = Math.round(50 + r() * 600);
        const gambling = Math.round(200 + r() * 1500);
        data.set(district.code, {
          liquor,
          NDPS,
          gambling,
          totalCases: liquor + NDPS + gambling,
          arrests: Math.round(400 + r() * 2000),
          seizureValue: Math.round((20 + r() * 180) * 10) / 10,
          pending: Math.round(50 + r() * 400),
          repeatOffenders: Math.round(20 + r() * 180),
        });
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
  };

  const getDistrictColor = (
    districtCode: string,
    isHovered: boolean,
    isSelected: boolean,
  ) => {
    const crimeData = districtCrimeData.get(districtCode);
    if (!crimeData) return C.surface;

    const getValue = (d: CrimeData) => {
      if (filterMode === "bootlegger") return d.liquor;
      if (filterMode === "ndps") return d.NDPS;
      if (filterMode === "gambling") return d.gambling;
      return d.totalCases;
    };

    const allValues = Array.from(districtCrimeData.values()).map(getValue);
    const maxVal = Math.max(...allValues);
    const minVal = Math.min(...allValues);
    const val = getValue(crimeData);
    const intensity = maxVal === minVal ? 0.5 : (val - minVal) / (maxVal - minVal);

    const baseColor =
      filterMode === "ndps"
        ? "217, 119, 6"
        : filterMode === "gambling"
          ? "79, 70, 229"
          : "29, 78, 216"; // Purple for Gambling, Amber for NDPS, Blue for liquor/overall

    if (isSelected) {
      return filterMode === "ndps" ? C.amber : filterMode === "gambling" ? "#4F46E5" : C.primary;
    }
    if (isHovered) {
      return `rgba(${baseColor}, ${0.3 + intensity * 0.5})`;
    }

    return `rgba(${baseColor}, ${0.1 + intensity * 0.7})`;
  };

  const activeCard = cards.find((c) => c.id === openCard);

  const drillMetrics = useMemo(() => {
    if (activeCard?.id === "NDPS") {
      return {
        records: "3,962",
        repeatFreq: "18.5%",
        interstate: "84",
        interstateSub: "+4 this month"
      };
    }
    if (activeCard?.id === "gambling") {
      return {
        records: "5,842",
        repeatFreq: "14.8%",
        interstate: "48",
        interstateSub: "+6 this month"
      };
    }
    return {
      records: "14,820",
      repeatFreq: "22.4%",
      interstate: "312",
      interstateSub: "+9 this month"
    };
  }, [activeCard]);

  const drillChartConfig = useMemo(() => {
    if (activeCard?.id === "NDPS") {
      return {
        dataKey: "NDPS",
        color: C.amber,
        label: "NDPS Cases",
      };
    }
    if (activeCard?.id === "gambling") {
      return {
        dataKey: "gambling",
        color: "#4F46E5",
        label: "Gambling Cases",
      };
    }
    return {
      dataKey: "liquor",
      color: C.primary,
      label: "Liquor Seized (L)",
    };
  }, [activeCard]);

  const selectedDistrictData = selectedDistrict
    ? districtGeoData.districts.find(
      (d: DistrictData) => d.code === selectedDistrict,
    )
    : null;
  const selectedCrimeData = selectedDistrict
    ? districtCrimeData.get(selectedDistrict) || null
    : null;
  const hoveredDistrictData = hoveredDistrict
    ? districtGeoData.districts.find(
      (d: DistrictData) => d.code === hoveredDistrict,
    )
    : null;
  const hoveredCrimeData = hoveredDistrict
    ? districtCrimeData.get(hoveredDistrict) || null
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
            Gujarat Police · Liquor, Narcotics & Gambling enforcement
            analytics workspace
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#EFF6FF]/60 p-1 rounded-lg border border-[#3B82F6]/15">
            <button
              onClick={() => { setFilterMode("overall"); setOpenCard(null); }}
              className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                filterMode === "overall"
                  ? "bg-[#1D4ED8] text-white shadow-sm"
                  : "text-[#475569] hover:bg-white"
              }`}
            >
              Overall
            </button>
            <button
              onClick={() => { setFilterMode("bootlegger"); setOpenCard(null); }}
              className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                filterMode === "bootlegger"
                  ? "bg-[#16A34A] text-white shadow-sm"
                  : "text-[#475569] hover:bg-white"
              }`}
            >
              Bootlegger
            </button>
            <button
              onClick={() => { setFilterMode("ndps"); setOpenCard(null); }}
              className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                filterMode === "ndps"
                  ? "bg-[#D97706] text-white shadow-sm"
                  : "text-[#475569] hover:bg-white"
              }`}
            >
              Narcotics (NDPS)
            </button>
            <button
              onClick={() => { setFilterMode("gambling"); setOpenCard(null); }}
              className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                filterMode === "gambling"
                  ? "bg-[#4F46E5] text-white shadow-sm"
                  : "text-[#475569] hover:bg-white"
              }`}
            >
              Gambling (જુગાર)
            </button>
          </div>
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
        <div className={`grid grid-cols-2 md:grid-cols-3 ${filteredCards.length >= 6 ? "lg:grid-cols-6" : "lg:grid-cols-5"} gap-4`}>
          {filteredCards.map((c) => (
            <ExecCard
              key={c.id}
              card={c}
              active={openCard === c.id}
              onClick={() => openDrill(c.id)}
            />
          ))}
        </div>
      </section>


      {/* Drill-down workspace */}
      <section id="drill-workspace">
        {activeCard ? (
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor:
                      activeCard.tone === "purple"
                        ? "#F5F3FF"
                        : activeCard.tone === "amber"
                          ? "#FFFBEB"
                          : activeCard.tone === "green"
                            ? "#ECFDF5"
                            : activeCard.tone === "red"
                              ? "#FEF2F2"
                              : "#EFF6FF",
                    color:
                      activeCard.tone === "purple"
                        ? "#4F46E5"
                        : activeCard.tone === "amber"
                          ? "#D97706"
                          : activeCard.tone === "green"
                            ? "#16A34A"
                            : activeCard.tone === "red"
                              ? "#DC2626"
                              : "#1D4ED8",
                  }}
                >
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
                    ...(activeCard?.id === "liquor" ? [["bottles", "Bottle Variety & Analytics"]] : []),
                    ...(activeCard?.id === "NDPS" ? [["ndps_categories", "NDPS Category & Analytics"]] : []),
                    ...(activeCard?.id === "gambling" ? [["gambling_categories", "Gambling Category & Analytics"]] : []),
                    ["table", "Detailed Table"],
                    ["district", "District Analytics"],
                    ["station", "Police Station"],
                    ["officer", "Officer Analytics"],
                    ["timeline", "Timeline"],
                  ].map(([k, l]) => {
                    const activeStyles =
                      activeCard?.tone === "purple"
                        ? "data-[state=active]:bg-[#F5F3FF] data-[state=active]:text-[#4F46E5]"
                        : activeCard?.tone === "amber"
                          ? "data-[state=active]:bg-[#FFFBEB] data-[state=active]:text-[#D97706]"
                          : activeCard?.tone === "green"
                            ? "data-[state=active]:bg-[#ECFDF5] data-[state=active]:text-[#16A34A]"
                            : activeCard?.tone === "red"
                              ? "data-[state=active]:bg-[#FEF2F2] data-[state=active]:text-[#DC2626]"
                              : "data-[state=active]:bg-[#EFF6FF] data-[state=active]:text-[#1D4ED8]";
                    return (
                      <TabsTrigger
                        key={k}
                        value={k}
                        className={`${activeStyles} data-[state=active]:shadow-none rounded-md text-[13px] px-3 py-2`}
                      >
                        {l}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <MetricTile
                    label="Total Records"
                    value={drillMetrics.records}
                    delta="+6.4%"
                    up
                  />
                  <MetricTile
                    label="Repeat Frequency"
                    value={drillMetrics.repeatFreq}
                    delta="+1.8%"
                    up
                  />
                  <MetricTile
                    label="Interstate Linked"
                    value={drillMetrics.interstate}
                    delta={drillMetrics.interstateSub}
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
                                stopColor={drillChartConfig.color}
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor={drillChartConfig.color}
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
                            key="dynamic-cases"
                            type="monotone"
                            dataKey={drillChartConfig.dataKey}
                            stroke={drillChartConfig.color}
                            strokeWidth={2}
                            fill="url(#drillA)"
                            name={drillChartConfig.label}
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
                            key="dynamic-bar"
                            dataKey={drillChartConfig.dataKey}
                            fill={drillChartConfig.color}
                            radius={[4, 4, 0, 0]}
                            name={drillChartConfig.label}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bottles" className="p-5 space-y-6">
                {/* Bottles KPI Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
                    <div className="text-[12px] text-[#1E3A8A] font-semibold uppercase tracking-wider">કુલ જપ્ત બોટલ (Total Bottles Seized)</div>
                    <div className="text-[24px] font-bold text-[#1E3A8A] mt-1">3,69,040</div>
                  </div>
                  <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg p-4">
                    <div className="text-[12px] text-[#065F46] font-semibold uppercase tracking-wider">IMFL બોટલ (IMFL Share)</div>
                    <div className="text-[24px] font-bold text-[#065F46] mt-1">2,84,260</div>
                  </div>
                  <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-4">
                    <div className="text-[12px] text-[#92400E] font-semibold uppercase tracking-wider">દેશી દારૂ બોટલ (Country Liquor Share)</div>
                    <div className="text-[24px] font-bold text-[#92400E] mt-1">84,780</div>
                  </div>
                </div>

                {/* Distribution Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Category & Size Breakdown */}
                  <div className="border border-[#E5E7EB] rounded-lg p-4 bg-white">
                    <h4 className="text-[14px] font-bold text-[#0F172A] mb-4">Bottle Categories & Size Shares</h4>
                    
                    <div className="space-y-4">
                      {/* Categories */}
                      <div>
                        <div className="text-[12px] text-[#6B7280] font-semibold uppercase tracking-wider mb-2">Category Distribution</div>
                        <div className="space-y-2">
                          {bottleVarietyData.categories.map((c) => (
                            <div key={c.name}>
                              <div className="flex justify-between text-[13px] mb-1">
                                <span className="font-medium text-[#374151]">{c.name} <span className="text-[11px] text-[#9CA3AF]">({c.sub})</span></span>
                                <span className="font-bold text-[#0F172A]">{c.count.toLocaleString()} ({c.percentage}%)</span>
                              </div>
                              <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                                <div className="rounded-full h-2 transition-all" style={{ width: `${c.percentage}%`, backgroundColor: c.color }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sizes */}
                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <div className="text-[12px] text-[#6B7280] font-semibold uppercase tracking-wider mb-2">Seized Bottle Sizes</div>
                        <div className="space-y-2">
                          {bottleVarietyData.sizes.map((s) => (
                            <div key={s.name}>
                              <div className="flex justify-between text-[13px] mb-1">
                                <span className="font-medium text-[#374151]">{s.name}</span>
                                <span className="font-bold text-[#0F172A]">{s.count.toLocaleString()} ({s.percentage}%)</span>
                              </div>
                              <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                                <div className="rounded-full h-2 transition-all" style={{ width: `${s.percentage}%`, backgroundColor: s.color }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Brands Table */}
                  <div className="border border-[#E5E7EB] rounded-lg p-4 bg-white flex flex-col justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0F172A] mb-3">Top 5 Seized Brands</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[12px]">Brand Name</TableHead>
                            <TableHead className="text-[12px]">Type & Size</TableHead>
                            <TableHead className="text-right text-[12px]">Bottles</TableHead>
                            <TableHead className="text-right text-[12px]">Volume (L)</TableHead>
                            <TableHead className="text-right text-[12px]">Seizure Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bottleVarietyData.brands.map((b) => (
                            <TableRow key={b.name} className="hover:bg-[#F9FAFB]">
                              <TableCell className="font-medium text-[13px] text-[#0F172A]">{b.name}</TableCell>
                              <TableCell className="text-[#6B7280] text-[12px]">{b.type}</TableCell>
                              <TableCell className="text-right font-semibold text-[13px] text-[#0F172A]">{b.count}</TableCell>
                              <TableCell className="text-right text-[12px] text-[#475569]">{b.volume}</TableCell>
                              <TableCell className="text-right font-medium text-[13px] text-[#16A34A]">{b.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ndps_categories" className="p-5 space-y-6">
                {/* NDPS KPI Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4">
                    <div className="text-[12px] text-[#991B1B] font-semibold uppercase tracking-wider">કુલ જપ્તી કિંમત (Total Seizure Value)</div>
                    <div className="text-[24px] font-bold text-[#991B1B] mt-1">₹92.4 Cr</div>
                  </div>
                  <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-4">
                    <div className="text-[12px] text-[#92400E] font-semibold uppercase tracking-wider">કોમર્શિયલ જથ્થો કેસ (Commercial Quantity Cases)</div>
                    <div className="text-[24px] font-bold text-[#92400E] mt-1">482</div>
                  </div>
                  <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg p-4">
                    <div className="text-[12px] text-[#065F46] font-semibold uppercase tracking-wider">કુલ ધરપકડ (Total Arrests)</div>
                    <div className="text-[24px] font-bold text-[#065F46] mt-1">4,892</div>
                  </div>
                </div>

                {/* Distribution Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Category & Type Share Breakdown */}
                  <div className="border border-[#E5E7EB] rounded-lg p-4 bg-white">
                    <h4 className="text-[14px] font-bold text-[#0F172A] mb-4">NDPS Drug Categories & Type Shares</h4>
                    
                    <div className="space-y-4">
                      {/* Categories */}
                      <div>
                        <div className="text-[12px] text-[#6B7280] font-semibold uppercase tracking-wider mb-2">Drug Category Distribution</div>
                        <div className="space-y-2">
                          {ndpsVarietyData.categories.map((c) => (
                            <div key={c.name}>
                              <div className="flex justify-between text-[13px] mb-1">
                                <span className="font-medium text-[#374151]">{c.name} <span className="text-[11px] text-[#9CA3AF]">({c.weight})</span></span>
                                <span className="font-bold text-[#0F172A]">{c.count.toLocaleString()} cases ({c.percentage}%)</span>
                              </div>
                              <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                                <div className="rounded-full h-2 transition-all" style={{ width: `${c.percentage}%`, backgroundColor: c.color }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Types */}
                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <div className="text-[12px] text-[#6B7280] font-semibold uppercase tracking-wider mb-2">Drug Class Distribution</div>
                        <div className="space-y-2">
                          {ndpsVarietyData.types.map((t) => (
                            <div key={t.name}>
                              <div className="flex justify-between text-[13px] mb-1">
                                <span className="font-medium text-[#374151]">{t.name}</span>
                                <span className="font-bold text-[#0F172A]">{t.count.toLocaleString()} cases ({t.percentage}%)</span>
                              </div>
                              <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                                <div className="rounded-full h-2 transition-all" style={{ width: `${t.percentage}%`, backgroundColor: t.color }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top NDPS Seizures Table */}
                  <div className="border border-[#E5E7EB] rounded-lg p-4 bg-white flex flex-col justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0F172A] mb-3">Top 5 Major Seizure Incidents</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[12px]">District</TableHead>
                            <TableHead className="text-[12px]">Contraband</TableHead>
                            <TableHead className="text-right text-[12px]">Quantity Seized</TableHead>
                            <TableHead className="text-right text-[12px]">Seizure Value</TableHead>
                            <TableHead className="text-right text-[12px]">Incident Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ndpsVarietyData.topSeizures.map((s, idx) => (
                            <TableRow key={idx} className="hover:bg-[#F9FAFB]">
                              <TableCell className="font-medium text-[13px] text-[#0F172A]">{s.district}</TableCell>
                              <TableCell className="text-[#6B7280] text-[12px]">{s.drug}</TableCell>
                              <TableCell className="text-right font-semibold text-[13px] text-[#0F172A]">{s.quantity}</TableCell>
                              <TableCell className="text-right font-medium text-[13px] text-[#DC2626]">{s.value}</TableCell>
                              <TableCell className="text-right text-[12px] text-[#475569]">{s.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gambling_categories" className="p-5 space-y-6">
                {/* Gambling KPI Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-lg p-4">
                    <div className="text-[12px] text-[#4F46E5] font-semibold uppercase tracking-wider">કુલ જપ્ત રોકડ (Total Cash Seized)</div>
                    <div className="text-[24px] font-bold text-[#4F46E5] mt-1">₹18.5 Cr</div>
                  </div>
                  <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-4">
                    <div className="text-[12px] text-[#B45309] font-semibold uppercase tracking-wider">ધરપકડ કરેલ જુગારીઓ (Arrested Players)</div>
                    <div className="text-[24px] font-bold text-[#B45309] mt-1">6,942</div>
                  </div>
                  <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg p-4">
                    <div className="text-[12px] text-[#047857] font-semibold uppercase tracking-wider">કુલ રેડ ઓપરેશન (Total Raid Operations)</div>
                    <div className="text-[24px] font-bold text-[#047857] mt-1">1,280</div>
                  </div>
                </div>

                {/* Distribution Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Category & Type Share Breakdown */}
                  <div className="border border-[#E5E7EB] rounded-lg p-4 bg-white">
                    <h4 className="text-[14px] font-bold text-[#0F172A] mb-4">Gambling Categories & Type Shares</h4>
                    
                    <div className="space-y-4">
                      {/* Categories */}
                      <div>
                        <div className="text-[12px] text-[#6B7280] font-semibold uppercase tracking-wider mb-2">Category Distribution</div>
                        <div className="space-y-2">
                          {gamblingVarietyData.categories.map((c) => (
                            <div key={c.name}>
                              <div className="flex justify-between text-[13px] mb-1">
                                <span className="font-medium text-[#374151]">{c.name} <span className="text-[11px] text-[#9CA3AF]">({c.value})</span></span>
                                <span className="font-bold text-[#0F172A]">{c.count.toLocaleString()} cases ({c.percentage}%)</span>
                              </div>
                              <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                                <div className="rounded-full h-2 transition-all" style={{ width: `${c.percentage}%`, backgroundColor: c.color }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Types */}
                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <div className="text-[12px] text-[#6B7280] font-semibold uppercase tracking-wider mb-2">Gambling Class Distribution</div>
                        <div className="space-y-2">
                          {gamblingVarietyData.types.map((t) => (
                            <div key={t.name}>
                              <div className="flex justify-between text-[13px] mb-1">
                                <span className="font-medium text-[#374151]">{t.name}</span>
                                <span className="font-bold text-[#0F172A]">{t.count.toLocaleString()} cases ({t.percentage}%)</span>
                              </div>
                              <div className="w-full bg-[#F3F4F6] rounded-full h-2">
                                <div className="rounded-full h-2 transition-all" style={{ width: `${t.percentage}%`, backgroundColor: t.color }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Gambling Raids Table */}
                  <div className="border border-[#E5E7EB] rounded-lg p-4 bg-white flex flex-col justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0F172A] mb-3">Top 5 Major Raid Operations</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[12px]">District</TableHead>
                            <TableHead className="text-[12px]">Location</TableHead>
                            <TableHead className="text-right text-[12px]">Players Arrested</TableHead>
                            <TableHead className="text-right text-[12px]">Cash Seized</TableHead>
                            <TableHead className="text-right text-[12px]">Incident Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gamblingVarietyData.topRaids.map((s, idx) => (
                            <TableRow key={idx} className="hover:bg-[#F9FAFB]">
                              <TableCell className="font-medium text-[13px] text-[#0F172A]">{s.district}</TableCell>
                              <TableCell className="text-[#6B7280] text-[12px]">{s.location}</TableCell>
                              <TableCell className="text-right font-semibold text-[13px] text-[#0F172A]">{s.players}</TableCell>
                              <TableCell className="text-right font-medium text-[13px] text-[#4F46E5]">{s.seizedValue}</TableCell>
                              <TableCell className="text-right text-[12px] text-[#475569]">{s.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="table" className="p-5">
                {activeCard?.id === "NDPS" ? (
                  <NDPSTable
                    query={tableQuery}
                    page={tablePage}
                    setPage={setTablePage}
                  />
                ) : activeCard?.id === "gambling" ? (
                  <GamblingTable
                    query={tableQuery}
                    page={tablePage}
                    setPage={setTablePage}
                  />
                ) : (
                  <BootleggerTable
                    query={tableQuery}
                    page={tablePage}
                    setPage={setTablePage}
                  />
                )}
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
                      <Bar
                        key="gambling"
                        dataKey="gambling"
                        fill="#4F46E5"
                        name="Gambling"
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

      {/* Main Analytics Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-10 gap-6">
        {/* Left 70% */}
        <div className="xl:col-span-7 space-y-6">
          <Panel
            title="માસિક ગુના નોંધણી"
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
                  {(filterMode === "overall" || filterMode === "bootlegger") && (
                    <Line
                      key="cases"
                      type="monotone"
                      dataKey="cases"
                      stroke={C.primary}
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      name="Total Cases"
                    />
                  )}
                  {(filterMode === "overall" || filterMode === "bootlegger") && (
                    <Line
                      key="liquor"
                      type="monotone"
                      dataKey="liquor"
                      stroke={C.green}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Liquor"
                    />
                  )}
                  {(filterMode === "overall" || filterMode === "ndps") && (
                    <Line
                      key="NDPS"
                      type="monotone"
                      dataKey="NDPS"
                      stroke={C.amber}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="NDPS"
                    />
                  )}
                  {(filterMode === "overall" || filterMode === "gambling") && (
                    <Line
                      key="gambling"
                      type="monotone"
                      dataKey="gambling"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Gambling"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <div className={filterMode === "overall" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "grid grid-cols-1"}>
            {(filterMode === "overall" || filterMode === "bootlegger") && (
              <Panel title="દારૂ જપ્તી એનાલિટિક્સ">
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
                        right: 25,
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
            )}

            {(filterMode === "overall" || filterMode === "ndps") && (
              <Panel title="NDPS જપ્તી એનાલિટિક્સ">
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
                        right: 25,
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
            )}

            {(filterMode === "overall" || filterMode === "gambling") && (
              <div className={filterMode === "overall" ? "lg:col-span-2" : ""}>
                <Panel title="જુગાર જપ્તી એનાલિટિક્સ">
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
                          right: 25,
                          left: -12,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="gamblingArea"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#4F46E5"
                              stopOpacity={0.35}
                            />
                            <stop
                              offset="100%"
                              stopColor="#4F46E5"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          key="grid-gambling"
                          stroke="#F1F5F9"
                          vertical={false}
                        />
                        <XAxis
                          key="xaxis-gambling"
                          dataKey="m"
                          stroke="#94A3B8"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          key="yaxis-gambling"
                          stroke="#94A3B8"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          key="tooltip-gambling"
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-2 border border-[#E5E7EB] rounded shadow-md text-[12px]">
                                  <p className="font-semibold text-[#0F172A] mb-1">{label}</p>
                                  <p className="text-[#4F46E5]">
                                    Gambling: {payload[0].value} cases
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          key="gambling"
                          type="monotone"
                          dataKey="gambling"
                          stroke="#4F46E5"
                          strokeWidth={2}
                          fill="url(#gamblingArea)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
              </div>
            )}
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
                  viewBox="0 0 1100 850"
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
                                  ? (filterMode === "ndps" ? C.amber : filterMode === "gambling" ? "#4F46E5" : C.primary)
                                  : isHovered
                                    ? (filterMode === "ndps" ? "#FBBF24" : filterMode === "gambling" ? "#818CF8" : C.primaryLight)
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
                        <MapPin
                          className="w-4 h-4"
                          style={{
                            color:
                              filterMode === "ndps"
                                ? C.amber
                                : filterMode === "gambling"
                                  ? "#4F46E5"
                                  : C.primary,
                          }}
                        />
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
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">
                            Gambling:
                          </span>
                          <span className="font-semibold text-[#4F46E5]">
                            {hoveredCrimeData.gambling.toLocaleString()}
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
                        (intensity, i) => {
                          const baseColor =
                            filterMode === "ndps"
                              ? "217, 119, 6"
                              : filterMode === "gambling"
                                ? "79, 70, 229"
                                : "29, 78, 216";
                          return (
                            <div
                              key={i}
                              className="w-6 h-3 rounded"
                              style={{
                                backgroundColor: `rgba(${baseColor}, ${intensity})`,
                              }}
                            />
                          );
                        },
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
                  <div className={`rounded-lg p-4 border transition-all ${
                    filterMode === "ndps"
                      ? "bg-[#FFFBEB] border-[#FDE68A]/30"
                      : filterMode === "gambling"
                        ? "bg-[#F5F3FF] border-[#DDD6FE]/30"
                        : "bg-[#EFF6FF] border-[#3B82F6]/20"
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className={`w-5 h-5 ${
                        filterMode === "ndps"
                          ? "text-[#D97706]"
                          : filterMode === "gambling"
                            ? "text-[#4F46E5]"
                            : "text-[#1D4ED8]"
                      }`} />
                      <h3 className="text-[18px] font-bold text-[#0F172A]">
                        {selectedDistrictData.name}
                      </h3>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
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

                      {(filterMode === "overall" || filterMode === "bootlegger") && (
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
                      )}

                      {(filterMode === "overall" || filterMode === "ndps") && (
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
                      )}

                      {(filterMode === "overall" || filterMode === "gambling") && (
                        <button
                          onClick={() =>
                            setDrillDownView(
                              drillDownView === "gambling"
                                ? null
                                : "gambling",
                            )
                          }
                          className={`rounded-lg border p-3 text-left transition-all hover:shadow-md ${drillDownView === "gambling"
                            ? "border-[#4F46E5] bg-white shadow-md"
                            : "border-[#E5E7EB] bg-white hover:border-[#4F46E5]"
                            }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Dices className="w-4 h-4 text-[#4F46E5]" />
                            {drillDownView === "gambling" && (
                              <ExternalLink className="w-3 h-3 text-[#4F46E5]" />
                            )}
                          </div>
                          <div className="text-[16px] font-bold text-[#0F172A]">
                            {selectedCrimeData.gambling.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            Gambling Cases
                          </div>
                        </button>
                      )}
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
                          {drillDownView === "gambling" &&
                            "Gambling Cases"}
                        </h4>
                        <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                          {drillDownView === "cases" &&
                            selectedCrimeData.totalCases}
                          {drillDownView === "liquor" &&
                            selectedCrimeData.liquor}
                          {drillDownView === "NDPS" &&
                            selectedCrimeData.NDPS}
                          {drillDownView === "gambling" &&
                            selectedCrimeData.gambling}{" "}
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
                              <TableHead>
                                {drillDownView === "NDPS"
                                  ? "આરોપી નામ"
                                  : drillDownView === "gambling"
                                    ? "આરોપી / ઓર્ગેનાઇઝર"
                                    : "બુટલેગર નામ"}
                              </TableHead>
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
                                    : drillDownView === "NDPS"
                                      ? selectedCrimeData.NDPS
                                      : selectedCrimeData.gambling,
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
                                    {psNames.at(i % psNames.length)}{" "}
                                    PS
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {names.at(i % names.length)}{" "}
                                    {surnames.at((i + 3) % surnames.length)}
                                  </TableCell>
                                  <TableCell className="text-[#6B7280]">
                                    {psNames.at(i % psNames.length)}{" "}
                                    {areas.at((i + 2) % areas.length)}
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
                          : drillDownView === "NDPS"
                            ? selectedCrimeData.NDPS
                            : selectedCrimeData.gambling) > 10 && (
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
                                  : drillDownView === "NDPS"
                                    ? selectedCrimeData.NDPS
                                    : selectedCrimeData.gambling
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

          <Panel title="પોલીસ સ્ટેશન મુજબ ક્રાઇમ રેન્કિંગ">
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


        </div>

        {/* Right 30% */}
        <div className="xl:col-span-3 space-y-6">
          {filterMode === "ndps" ? (
            <SidePanel
              title="NDPS Repeat Offenders"
              icon={<AlertTriangle className="w-4 h-4" />}
            >
              {ndpsAccused.map((a, i) => (
                <SideRow
                  key={a.no}
                  left={`${i + 1}. ${a.name}`}
                  sub={`${a.dist} · ${a.ps}`}
                  right={
                    <Badge className="bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]">
                      {a.crimes} crimes
                    </Badge>
                  }
                />
              ))}
            </SidePanel>
          ) : filterMode === "gambling" ? (
            <SidePanel
              title="Gambling Repeat Offenders"
              icon={<AlertTriangle className="w-4 h-4" />}
            >
              {gamblingCases.map((a, i) => (
                <SideRow
                  key={a.no}
                  left={`${i + 1}. ${a.name}`}
                  sub={`${a.dist} · ${a.ps}`}
                  right={
                    <Badge className="bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]">
                      {a.crimes} crimes
                    </Badge>
                  }
                />
              ))}
            </SidePanel>
          ) : (
            <SidePanel
              title="પુનરાવર્તિત ગુનેગારો"
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
          )}

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
              .sort((a, b) => {
                const aVal =
                  filterMode === "bootlegger"
                    ? a.liquor
                    : filterMode === "ndps"
                      ? a.NDPS
                      : filterMode === "gambling"
                        ? a.gambling
                        : a.liquor + a.NDPS + a.gambling;
                const bVal =
                  filterMode === "bootlegger"
                    ? b.liquor
                    : filterMode === "ndps"
                      ? b.NDPS
                      : filterMode === "gambling"
                        ? b.gambling
                        : b.liquor + b.NDPS + b.gambling;
                return bVal - aVal;
              })
              .slice(0, 5)
              .map((d, i) => {
                const casesCount =
                  filterMode === "bootlegger"
                    ? d.liquor
                    : filterMode === "ndps"
                      ? d.NDPS
                      : filterMode === "gambling"
                        ? d.gambling
                        : d.liquor + d.NDPS + d.gambling;
                const valCr =
                  filterMode === "bootlegger"
                    ? Math.round(d.value * 0.67)
                    : filterMode === "ndps"
                      ? Math.round(d.value * 0.33)
                      : filterMode === "gambling"
                        ? Math.round(d.value * 0.1)
                        : d.value;
                return (
                  <SideRow
                    key={d.d}
                    left={`${i + 1}. ${d.d}`}
                    sub={`${casesCount.toLocaleString()} cases`}
                    right={
                      <Badge className="bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]">
                        ₹{valCr} Cr
                      </Badge>
                    }
                  />
                );
              })}
          </SidePanel>

          <SidePanel
            title="High-Value Seizures"
            icon={<Package className="w-4 h-4" />}
          >
            {(filterMode === "overall" || filterMode === "ndps") && (
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
            )}
            {(filterMode === "overall" || filterMode === "bootlegger") && (
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
            )}
            {(filterMode === "overall" || filterMode === "ndps") && (
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
            )}
            {(filterMode === "overall" || filterMode === "bootlegger") && (
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
            )}
            {(filterMode === "overall" || filterMode === "gambling") && (
              <SideRow
                key="seizure-5"
                left="S.G. Highway Club Raid"
                sub="Ahmedabad · ACP R. Patel"
                right={
                  <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                    ₹45.2 L
                  </Badge>
                }
              />
            )}
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


        </div>
      </section>

      {/* Master Analytics */}
      {(() => {
        const currentMasterType = filterMode === "overall" ? masterType : filterMode;
        return (
          <Panel
            title={
              currentMasterType === "bootlegger"
                ? "Bootlegger Master Analytics"
                : currentMasterType === "ndps"
                  ? "NDPS Master Analytics"
                  : "Gambling Master Analytics"
            }
            action={
              <div className="flex items-center gap-4">
                {filterMode === "overall" && (
                  <Tabs value={masterType} onValueChange={(val: any) => { setMasterType(val); setTablePage(1); }} className="w-[270px]">
                    <TabsList className="grid w-full grid-cols-3 h-8 p-0.5">
                      <TabsTrigger value="bootlegger" className="text-[12px] h-6">Bootlegger</TabsTrigger>
                      <TabsTrigger value="ndps" className="text-[12px] h-6">NDPS</TabsTrigger>
                      <TabsTrigger value="gambling" className="text-[12px] h-6">Gambling</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2 w-4 h-4 text-[#6B7280]" />
                    <Input
                      value={tableQuery}
                      onChange={(e) => {
                        setTableQuery(e.target.value);
                        setTablePage(1);
                      }}
                      placeholder={
                        currentMasterType === "bootlegger"
                          ? "Search bootlegger…"
                          : currentMasterType === "ndps"
                            ? "Search NDPS accused…"
                            : "Search gambling cases…"
                      }
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
              </div>
            }
          >
            {currentMasterType === "bootlegger" ? (
              <BootleggerTable
                query={tableQuery}
                page={tablePage}
                setPage={setTablePage}
              />
            ) : currentMasterType === "ndps" ? (
              <NDPSTable
                query={tableQuery}
                page={tablePage}
                setPage={setTablePage}
              />
            ) : (
              <GamblingTable
                query={tableQuery}
                page={tablePage}
                setPage={setTablePage}
              />
            )}
          </Panel>
        );
      })()}

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
  const tones = card.tone === "blue"
    ? { bg: "#EFF6FF", fg: "#1D4ED8" }
    : card.tone === "green"
      ? { bg: "#ECFDF5", fg: "#16A34A" }
      : card.tone === "amber"
        ? { bg: "#FFFBEB", fg: "#D97706" }
        : card.tone === "purple"
          ? { bg: "#F5F3FF", fg: "#4F46E5" }
          : { bg: "#FEF2F2", fg: "#DC2626" };
  const data = useMemo(() => mini(card.seed), [card.seed]);
  const gid = `mini-${card.id}`;
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white rounded-[14px] border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(29,78,216,0.10)] hover:-translate-y-0.5 transition-all duration-180 ${active
        ? card.tone === "purple"
          ? "border-[#4F46E5] ring-2 ring-[#818CF8]/20"
          : card.tone === "amber"
            ? "border-[#D97706] ring-2 ring-[#FBBF24]/20"
            : card.tone === "green"
              ? "border-[#16A34A] ring-2 ring-[#34D399]/20"
              : "border-[#1D4ED8] ring-2 ring-[#3B82F6]/20"
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
      {card.id === "liquor" && (
        <div className="text-[12px] text-[#475569] font-semibold mt-0.5 leading-none">
          (3,69,040 Bottles)
        </div>
      )}
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
    [b.name, b.dist, b.ps, b.addr, b.destination, b.investigatedBy].some((v) =>
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
              <TableHead>રૂટ (પકડાયેલ ➔ ડેસ્ટિનેશન)</TableHead>
              <TableHead>પોલીસ સ્ટેશન</TableHead>
              <TableHead>બુટલેગર નામ</TableHead>
              <TableHead>સરનામું</TableHead>
              <TableHead className="text-right">
                ગુનાઓ
              </TableHead>
              <TableHead>પકડાયેલ મુદામાલ ની કિંમત</TableHead>
              <TableHead>દારૂ જપ્ત</TableHead>
              <TableHead>તપાસ સંસ્થા</TableHead>
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
                  {b.dist !== b.destination ? (
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-[13px] font-medium text-[#0F172A]">
                        <span>{b.dist}</span>
                        <span className="text-[#94A3B8]">➔</span>
                        <span className="text-[#DC2626] font-semibold">{b.destination}</span>
                      </div>
                      <span className="text-[10px] text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded w-fit font-medium border border-[#FEE2E2] whitespace-nowrap">
                        રૂટ બદલાયેલ (Mismatch)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-[13px] text-[#6B7280]">
                        <span>{b.dist}</span>
                        <span className="text-[#94A3B8]">➔</span>
                        <span>{b.destination}</span>
                      </div>
                      <span className="text-[10px] text-[#16A34A] bg-[#ECFDF5] px-1.5 py-0.5 rounded w-fit font-medium border border-[#D1FAE5] whitespace-nowrap">
                        સ્થાનિક ડિલિવરી
                      </span>
                    </div>
                  )}
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
                <TableCell>
                  {b.investigatedBy === "State Monitoring Cell" ? (
                    <Badge className="bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] hover:bg-[#FFF1F2] font-semibold text-[11px] px-2 py-0.5 flex items-center gap-1 w-fit whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                      સ્ટેટ મોનિટરિંગ સેલ (SMC)
                    </Badge>
                  ) : (
                    <Badge className="bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] hover:bg-[#EFF6FF] font-semibold text-[11px] px-2 py-0.5 flex items-center gap-1 w-fit whitespace-nowrap">
                      સ્થાનિક પોલીસ ({b.ps})
                    </Badge>
                  )}
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
                  colSpan={11}
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

function NDPSTable({
  query,
  page,
  setPage,
}: {
  query: string;
  page: number;
  setPage: (n: number) => void;
}) {
  const filtered = ndpsAccused.filter((b) =>
    [b.name, b.dist, b.ps, b.addr, b.destination, b.investigatedBy].some((v) =>
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
              <TableHead>રૂટ (પકડાયેલ ➔ ડેસ્ટિનેશન)</TableHead>
              <TableHead>પોલીસ સ્ટેશન</TableHead>
              <TableHead>આરોપી નામ</TableHead>
              <TableHead>સરનામું</TableHead>
              <TableHead className="text-right">
                ગુનાઓ
              </TableHead>
              <TableHead>પકડાયેલ મુદામાલ ની કિંમત</TableHead>
              <TableHead>ડ્રગ્સ જપ્ત</TableHead>
              <TableHead>તપાસ સંસ્થા</TableHead>
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
                  {b.dist !== b.destination ? (
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-[13px] font-medium text-[#0F172A]">
                        <span>{b.dist}</span>
                        <span className="text-[#94A3B8]">➔</span>
                        <span className="text-[#DC2626] font-semibold">{b.destination}</span>
                      </div>
                      <span className="text-[10px] text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded w-fit font-medium border border-[#FEE2E2] whitespace-nowrap">
                        રૂટ બદલાયેલ (Mismatch)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-[13px] text-[#6B7280]">
                        <span>{b.dist}</span>
                        <span className="text-[#94A3B8]">➔</span>
                        <span>{b.destination}</span>
                      </div>
                      <span className="text-[10px] text-[#16A34A] bg-[#ECFDF5] px-1.5 py-0.5 rounded w-fit font-medium border border-[#D1FAE5] whitespace-nowrap">
                        સ્થાનિક ડિલિવરી
                      </span>
                    </div>
                  )}
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
                <TableCell className="font-medium text-[#D97706]">
                  {b.drugsSeized}
                </TableCell>
                <TableCell>
                  {b.investigatedBy === "State Monitoring Cell" ? (
                    <Badge className="bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] hover:bg-[#FFF1F2] font-semibold text-[11px] px-2 py-0.5 flex items-center gap-1 w-fit whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                      સ્ટેટ મોનિટરિંગ સેલ (SMC)
                    </Badge>
                  ) : (
                    <Badge className="bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] hover:bg-[#EFF6FF] font-semibold text-[11px] px-2 py-0.5 flex items-center gap-1 w-fit whitespace-nowrap">
                      સ્થાનિક પોલીસ ({b.ps})
                    </Badge>
                  )}
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
                  colSpan={11}
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

const gamblingCases = [
  {
    no: 1,
    dist: "Ahmedabad",
    ps: "Naroda",
    name: "Mohanbhai Thakor",
    addr: "Kubera Nagar",
    caste: "—",
    crimes: 8,
    arrest: "2026-05-18",
    seizureValue: "₹45.2 લાખ",
    type: "Card Den (પાના ક્લબ)",
    playersCount: 42,
    risk: "high",
    repeat: true,
    interstate: false,
  },
  {
    no: 2,
    dist: "Surat",
    ps: "Varachha",
    name: "Sanjay Patel",
    addr: "Katargam",
    caste: "—",
    crimes: 5,
    arrest: "2026-05-15",
    seizureValue: "₹32.8 લાખ",
    type: "Online (બેટિંગ આઈડી)",
    playersCount: 28,
    risk: "high",
    repeat: false,
    interstate: true,
  },
  {
    no: 3,
    dist: "Rajkot",
    ps: "Gondal",
    name: "Mansukhbhai Vaghela",
    addr: "Moti Taki",
    caste: "—",
    crimes: 6,
    arrest: "2026-04-30",
    seizureValue: "₹24.5 લાખ",
    type: "Card Den (પાના ક્લબ)",
    playersCount: 35,
    risk: "medium",
    repeat: true,
    interstate: false,
  },
  {
    no: 4,
    dist: "Vadodara",
    ps: "Akota",
    name: "Paresh Shah",
    addr: "Gotri Road",
    caste: "—",
    crimes: 3,
    arrest: "2026-05-02",
    seizureValue: "₹18.9 લાખ",
    type: "Club Raid (મોટી ક્લબ)",
    playersCount: 19,
    risk: "medium",
    repeat: false,
    interstate: false,
  },
  {
    no: 5,
    dist: "Mehsana",
    ps: "City",
    name: "Kirit Patel",
    addr: "Highway Road",
    caste: "—",
    crimes: 4,
    arrest: "2026-03-24",
    seizureValue: "₹15.4 લાખ",
    type: "Street (વરલી મટકા)",
    playersCount: 31,
    risk: "low",
    repeat: true,
    interstate: false,
  },
];

function GamblingTable({
  query,
  page,
  setPage,
}: {
  query: string;
  page: number;
  setPage: (n: number) => void;
}) {
  const filtered = gamblingCases.filter((b) =>
    [b.name, b.dist, b.ps, b.addr, b.type].some((v) =>
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
              <TableHead>આરોપી / ઓર્ગેનાઇઝર</TableHead>
              <TableHead>સરનામું</TableHead>
              <TableHead className="text-right">ગુનાઓ</TableHead>
              <TableHead>જુગારનો પ્રકાર</TableHead>
              <TableHead className="text-right">સંડોવાયેલ પ્લેયર્સ</TableHead>
              <TableHead>જપ્ત રોકડ કિંમત</TableHead>
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
                <TableCell>
                  <Badge variant="outline" className="border-[#4F46E5] text-[#4F46E5]">
                    {b.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {b.playersCount}
                </TableCell>
                <TableCell className="font-semibold text-[#16A34A]">
                  {b.seizureValue}
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
                  colSpan={11}
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