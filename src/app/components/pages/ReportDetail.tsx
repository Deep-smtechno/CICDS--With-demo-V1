import {
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  Lightbulb,
  Printer,
  Sparkles,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { COLORS, PageShell, Panel, SectionTitle, StatCard } from "../shared";
import { ShieldAlert, Users, FileText as F2, Package, MapPin, Building2 } from "lucide-react";

const distData = [
  { d: "Surat", v: 412 },
  { d: "Ahmedabad", v: 384 },
  { d: "Vadodara", v: 268 },
  { d: "Rajkot", v: 241 },
  { d: "Bhavnagar", v: 188 },
  { d: "Jamnagar", v: 152 },
  { d: "Junagadh", v: 121 },
];

const pieData = [
  { n: "Repeat", v: 38, c: "#DC2626" },
  { n: "First-time", v: 47, c: "#1D4ED8" },
  { n: "Listed", v: 15, c: "#D97706" },
];

const radarData = [
  { k: "Detection", A: 88, B: 72 },
  { k: "Arrest", A: 82, B: 65 },
  { k: "Seizure", A: 91, B: 78 },
  { k: "Conviction", A: 74, B: 60 },
  { k: "Speed", A: 86, B: 70 },
  { k: "Recovery", A: 80, B: 68 },
];

const spark = (s: number) =>
  Array.from({ length: 10 }, (_, i) => ({
    v: 20 + ((s * (i + 1)) % 50),
  }));

export function ReportDetail({ onBack }: { onBack: () => void }) {
  return (
    <PageShell
      title="Listed Bootlegger Report"
      subtitle="Comprehensive intelligence on identified bootleggers across districts and crime networks."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-[#E5E7EB]"
          >
            <FileText className="w-4 h-4" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-[#E5E7EB]"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-[#E5E7EB]"
          >
            <Download className="w-4 h-4" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-[#E5E7EB]"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>
      }
    >
      <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280] -mt-4">
        <button
          onClick={onBack}
          className="hover:text-[#1D4ED8] transition-colors"
        >
          Reports Hub
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>Crime Intelligence</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0F172A] font-medium">
          Listed Bootlegger Report
        </span>
        <span className="ml-auto">Last updated · 10 min ago</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Total Bootleggers"
          value="2,341"
          trend="+3.1%"
          trendUp
          series={spark(3)}
          tone="blue"
        />
        <StatCard
          icon={<ShieldAlert className="w-5 h-5" />}
          label="Repeat Offenders"
          value="876"
          trend="-2.4%"
          trendUp={false}
          series={spark(7)}
          tone="red"
        />
        <StatCard
          icon={<F2 className="w-5 h-5" />}
          label="Total Cases"
          value="4,128"
          trend="+6.8%"
          trendUp
          series={spark(11)}
          tone="amber"
        />
        <StatCard
          icon={<Package className="w-5 h-5" />}
          label="Total Seizure Value"
          value="₹48.2 Cr"
          trend="+14.6%"
          trendUp
          series={spark(13)}
          tone="green"
        />
        <StatCard
          icon={<MapPin className="w-5 h-5" />}
          label="Districts"
          value="33"
          trend="+2"
          trendUp
          series={spark(17)}
          tone="blue"
        />
        <StatCard
          icon={<Building2 className="w-5 h-5" />}
          label="High-Risk Locations"
          value="118"
          trend="+8"
          trendUp={false}
          series={spark(19)}
          tone="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="District-wise Distribution" className="lg:col-span-2">
          <div className="h-72" key="report-district-container" style={{ minHeight: '288px', minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300} key="report-district-responsive">
              <BarChart
                data={distData}
                id="report-district-chart"
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid stroke="#F1F5F9" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="d"
                  type="category"
                  tick={{ fill: "#374151", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="v"
                  fill="#1D4ED8"
                  radius={[0, 6, 6, 0]}
                  name="Bootleggers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Offender Composition">
          <div className="h-72" key="report-pie-container" style={{ minHeight: '288px', minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300} key="report-pie-responsive">
              <PieChart id="report-offender-pie">
                <Pie
                  data={pieData}
                  dataKey="v"
                  nameKey="n"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {pieData.map((p) => (
                    <Cell key={p.n} fill={p.c} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <Panel
          title="Enforcement Performance Radar"
          className="lg:col-span-3"
        >
          <div className="h-72" key="report-radar-container" style={{ minHeight: '288px', minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300} key="report-radar-responsive">
              <RadarChart data={radarData} id="report-performance-radar">
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis
                  dataKey="k"
                  tick={{ fill: "#374151", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                  stroke="#E5E7EB"
                />
                <Radar
                  key="current-radar"
                  name="Current"
                  dataKey="A"
                  stroke="#1D4ED8"
                  fill="#1D4ED8"
                  fillOpacity={0.25}
                  isAnimationActive={false}
                />
                <Radar
                  key="previous-radar"
                  name="Previous"
                  dataKey="B"
                  stroke="#94A3B8"
                  fill="#94A3B8"
                  fillOpacity={0.15}
                  isAnimationActive={false}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Intelligence Insights"
          className="lg:col-span-2"
          action={
            <Badge className="bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-[10px]">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Generated
            </Badge>
          }
        >
          <div className="space-y-3">
            {[
              {
                t: "Surat district recorded 34% increase in repeat offenders",
                d: "Likely driven by new festival-period operations on NH48 corridor.",
                tone: "red",
              },
              {
                t: "Night raids show 28% higher seizure efficiency",
                d: "Operations between 22:00 and 03:00 yield highest case value.",
                tone: "blue",
              },
              {
                t: "Most seizures linked to interstate transport corridor",
                d: "Vadodara–Ahmedabad route accounts for 41% of liquor seizures.",
                tone: "amber",
              },
              {
                t: "District A has highest repeat crime interval",
                d: "Average repeat interval has dropped to 18 days from 26 days.",
                tone: "green",
              },
            ].map((i, k) => {
              const t =
                i.tone === "red"
                  ? "bg-[#FEF2F2] text-[#DC2626]"
                  : i.tone === "blue"
                  ? "bg-[#EFF6FF] text-[#1D4ED8]"
                  : i.tone === "amber"
                  ? "bg-[#FFFBEB] text-[#D97706]"
                  : "bg-[#ECFDF5] text-[#16A34A]";
              return (
                <div
                  key={k}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#F9FAFB] border border-[#F1F5F9]"
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${t}`}
                  >
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-[#0F172A] leading-tight">
                      {i.t}
                    </h5>
                    <p className="text-[12px] text-[#6B7280] mt-1 leading-relaxed">
                      {i.d}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel
        title="Bootlegger Registry"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-[12px] border-[#E5E7EB]"
            >
              Advanced Filters
            </Button>
            <Button
              size="sm"
              className="h-8 text-[12px] bg-[#1D4ED8] hover:bg-[#1E40AF]"
            >
              Export Table
            </Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#F1F5F9] bg-[#F9FAFB]">
                {[
                  "ID",
                  "Name",
                  "District",
                  "Police Station",
                  "Cases",
                  "Seizure Value",
                  "Last Activity",
                  "Risk",
                  "Status",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-[#6B7280] text-[13px] font-semibold"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "BL-1041",
                  n: "Ramesh Mehta",
                  d: "Surat",
                  ps: "Adajan PS",
                  c: 14,
                  v: "₹2.4 Cr",
                  la: "24 May 2026",
                  r: "Critical",
                  s: "Active",
                },
                {
                  id: "BL-1042",
                  n: "Kalpesh Joshi",
                  d: "Ahmedabad",
                  ps: "Civil Lines PS",
                  c: 11,
                  v: "₹1.8 Cr",
                  la: "23 May 2026",
                  r: "High",
                  s: "Active",
                },
                {
                  id: "BL-1043",
                  n: "Bhavesh Singh",
                  d: "Vadodara",
                  ps: "Sayajigunj PS",
                  c: 9,
                  v: "₹1.2 Cr",
                  la: "21 May 2026",
                  r: "High",
                  s: "Watch",
                },
                {
                  id: "BL-1044",
                  n: "Aamir Khan",
                  d: "Rajkot",
                  ps: "Aji Dam PS",
                  c: 8,
                  v: "₹98 L",
                  la: "20 May 2026",
                  r: "Medium",
                  s: "Active",
                },
                {
                  id: "BL-1045",
                  n: "Suresh Yadav",
                  d: "Bhavnagar",
                  ps: "Bhavnagar City PS",
                  c: 7,
                  v: "₹74 L",
                  la: "18 May 2026",
                  r: "Medium",
                  s: "Detained",
                },
                {
                  id: "BL-1046",
                  n: "Naveen Verma",
                  d: "Jamnagar",
                  ps: "Jamnagar City PS",
                  c: 6,
                  v: "₹58 L",
                  la: "15 May 2026",
                  r: "Low",
                  s: "Active",
                },
              ].map((r) => {
                const risk =
                  r.r === "Critical"
                    ? "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]"
                    : r.r === "High"
                    ? "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]"
                    : r.r === "Medium"
                    ? "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                    : "bg-[#ECFDF5] text-[#16A34A] border-[#A7F3D0]";
                const status =
                  r.s === "Active"
                    ? "bg-[#EFF6FF] text-[#1D4ED8]"
                    : r.s === "Detained"
                    ? "bg-[#F1F5F9] text-[#475569]"
                    : "bg-[#FFFBEB] text-[#D97706]";
                return (
                  <TableRow
                    key={r.id}
                    className="border-[#F1F5F9] hover:bg-[#F9FAFB]"
                  >
                    <TableCell className="text-[13px] font-medium text-[#1D4ED8]">
                      {r.id}
                    </TableCell>
                    <TableCell className="text-[13px] font-medium text-[#0F172A]">
                      {r.n}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.d}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.ps}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.c}
                    </TableCell>
                    <TableCell className="text-[13px] font-medium text-[#0F172A]">
                      {r.v}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.la}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${risk} border text-[11px]`}>
                        {r.r}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${status} border-0 text-[11px]`}>
                        {r.s}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </PageShell>
  );
}
