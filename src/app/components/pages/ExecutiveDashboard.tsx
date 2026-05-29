import {
  AlertTriangle,
  Briefcase,
  FileText,
  Gavel,
  MoreHorizontal,
  Package,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";
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
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { COLORS, PageShell, Panel, SectionTitle, StatCard } from "../shared";

const spark = (seed: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    v: 30 + ((seed * (i + 1) * 7) % 50) + (i % 3) * 4,
  }));

const trendData = [
  { m: "Jan", cases: 420, arrests: 280 },
  { m: "Feb", cases: 480, arrests: 320 },
  { m: "Mar", cases: 510, arrests: 350 },
  { m: "Apr", cases: 470, arrests: 330 },
  { m: "May", cases: 560, arrests: 410 },
  { m: "Jun", cases: 620, arrests: 470 },
  { m: "Jul", cases: 590, arrests: 450 },
  { m: "Aug", cases: 680, arrests: 510 },
  { m: "Sep", cases: 720, arrests: 560 },
  { m: "Oct", cases: 690, arrests: 540 },
  { m: "Nov", cases: 760, arrests: 590 },
  { m: "Dec", cases: 820, arrests: 640 },
];

const districtHeat = [
  { name: "Surat", value: 92 },
  { name: "Ahmedabad", value: 88 },
  { name: "Vadodara", value: 74 },
  { name: "Rajkot", value: 68 },
  { name: "Bhavnagar", value: 54 },
  { name: "Jamnagar", value: 41 },
  { name: "Junagadh", value: 36 },
  { name: "Gandhinagar", value: 28 },
];

const seizureData = [
  { m: "Jan", liquor: 120, drugs: 45 },
  { m: "Feb", liquor: 145, drugs: 52 },
  { m: "Mar", liquor: 170, drugs: 68 },
  { m: "Apr", liquor: 150, drugs: 60 },
  { m: "May", liquor: 195, drugs: 82 },
  { m: "Jun", liquor: 220, drugs: 91 },
  { m: "Jul", liquor: 205, drugs: 88 },
  { m: "Aug", liquor: 240, drugs: 104 },
];

const enforcement = [
  { m: "Jan", raids: 145, seizures: 98 },
  { m: "Feb", raids: 168, seizures: 112 },
  { m: "Mar", raids: 192, seizures: 134 },
  { m: "Apr", raids: 178, seizures: 121 },
  { m: "May", raids: 210, seizures: 156 },
  { m: "Jun", raids: 240, seizures: 178 },
];

const heatColor = (v: number) => {
  if (v >= 80) return "#DC2626";
  if (v >= 60) return "#D97706";
  if (v >= 40) return "#EAB308";
  return "#16A34A";
};

export function ExecutiveDashboard() {
  return (
    <PageShell
      title="Executive Intelligence Dashboard"
      subtitle="Real-time liquor and narcotics intelligence, enforcement performance and operational analytics"
      actions={
        <>
          <Badge className="bg-[#ECFDF5] text-[#16A34A] border border-[#A7F3D0] hover:bg-[#ECFDF5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mr-1.5 animate-pulse" />
            Live · Synced 2m ago
          </Badge>
          <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white h-9">
            Generate Brief
          </Button>
        </>
      }
    >
      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Total Cases Registered"
          value="12,486"
          trend="+8.2%"
          trendUp
          series={spark(3)}
          tone="blue"
        />
        <StatCard
          icon={<Package className="w-5 h-5" />}
          label="Liquor & Drug Seizure Value"
          value="₹48.2 Cr"
          trend="+14.6%"
          trendUp
          series={spark(7)}
          tone="green"
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Bootleggers & NDPS Offenders"
          value="2,341"
          trend="+3.1%"
          trendUp
          series={spark(11)}
          tone="amber"
        />
        <StatCard
          icon={<ShieldAlert className="w-5 h-5" />}
          label="Repeat Offenders"
          value="876"
          trend="-2.4%"
          trendUp={false}
          series={spark(13)}
          tone="red"
        />
        <StatCard
          icon={<Search className="w-5 h-5" />}
          label="Active Investigations"
          value="1,204"
          trend="+5.7%"
          trendUp
          series={spark(17)}
          tone="blue"
        />
        <StatCard
          icon={<Gavel className="w-5 h-5" />}
          label="Total Arrests"
          value="6,932"
          trend="+11.3%"
          trendUp
          series={spark(19)}
          tone="green"
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="High-Risk Districts"
          value="14"
          trend="+2"
          trendUp={false}
          series={spark(23)}
          tone="red"
        />
        <StatCard
          icon={<Briefcase className="w-5 h-5" />}
          label="Pending Investigations"
          value="487"
          trend="-6.8%"
          trendUp
          series={spark(29)}
          tone="amber"
        />
      </div>

      {/* Main analytics grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
        <div className="lg:col-span-7 space-y-5">
          <Panel
            title="Crime Registration Trend"
            action={
              <div className="flex gap-1.5">
                {["1M", "3M", "6M", "1Y"].map((p) => (
                  <button
                    key={p}
                    className={`px-2.5 py-1 rounded text-[12px] font-medium ${
                      p === "1Y"
                        ? "bg-[#EFF6FF] text-[#1D4ED8]"
                        : "text-[#6B7280] hover:bg-[#F3F4F6]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            }
          >
            <div className="h-72" key="crime-trend-container" style={{ minHeight: '288px', minWidth: '300px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300} key="crime-trend-responsive">
                <LineChart data={trendData} id="crime-trend-chart" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gradientCasesTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.2} />
                      <stop
                        offset="100%"
                        stopColor="#1D4ED8"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="crime-grid" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    key="crime-xaxis"
                    dataKey="m"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    key="crime-yaxis"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    key="crime-tooltip"
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    key="crime-legend"
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    iconType="circle"
                  />
                  <Line
                    key="cases-line"
                    type="monotone"
                    dataKey="cases"
                    name="Cases Registered"
                    stroke={COLORS.primary}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    isAnimationActive={false}
                  />
                  <Line
                    key="arrests-line"
                    type="monotone"
                    dataKey="arrests"
                    name="Arrests Made"
                    stroke={COLORS.green}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Panel title="District-wise Crime Heatmap">
              <div className="grid grid-cols-4 gap-2">
                {districtHeat.map((d) => (
                  <div
                    key={d.name}
                    className="rounded-lg p-3 flex flex-col justify-between aspect-square text-white"
                    style={{ backgroundColor: heatColor(d.value) }}
                  >
                    <div className="text-[11px] font-medium opacity-90">
                      {d.name}
                    </div>
                    <div>
                      <div className="text-[20px] font-bold leading-none">
                        {d.value}
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        intensity
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 text-[11px] text-[#6B7280]">
                <span>Intensity:</span>
                {[
                  { c: "#16A34A", l: "Low" },
                  { c: "#EAB308", l: "Med" },
                  { c: "#D97706", l: "High" },
                  { c: "#DC2626", l: "Critical" },
                ].map((x) => (
                  <span key={x.l} className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: x.c }}
                    />
                    {x.l}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Liquor & Drug Seizure Analytics">
              <div className="h-56" key="seizure-container" style={{ minHeight: '224px', minWidth: '300px' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={224} minWidth={300} key="seizure-responsive">
                  <AreaChart data={seizureData} id="seizure-chart">
                    <defs>
                      <linearGradient id="gradientLiquorSeizure" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#1D4ED8"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#1D4ED8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="gradientDrugSeizure" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#DC2626"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#DC2626"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid key="seizure-grid" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      key="seizure-xaxis"
                      dataKey="m"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      key="seizure-yaxis"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      key="seizure-tooltip"
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #E5E7EB",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      key="liquor-area"
                      type="monotone"
                      dataKey="liquor"
                      stroke="#1D4ED8"
                      strokeWidth={2}
                      fill="url(#gradientLiquorSeizure)"
                      name="Liquor (lakh ₹)"
                      isAnimationActive={false}
                    />
                    <Area
                      key="drugs-area"
                      type="monotone"
                      dataKey="drugs"
                      stroke="#DC2626"
                      strokeWidth={2}
                      fill="url(#gradientDrugSeizure)"
                      name="Drugs (lakh ₹)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>

          <Panel title="Monthly Enforcement Activity">
            <div className="h-64" key="enforcement-container" style={{ minHeight: '256px', minWidth: '300px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={256} minWidth={300} key="enforcement-responsive">
                <BarChart data={enforcement} id="enforcement-chart" barCategoryGap={28}>
                  <CartesianGrid key="enforcement-grid" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    key="enforcement-xaxis"
                    dataKey="m"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    key="enforcement-yaxis"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    key="enforcement-tooltip"
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    key="enforcement-legend"
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    iconType="circle"
                  />
                  <Bar
                    key="raids-bar"
                    dataKey="raids"
                    name="Raids Conducted"
                    fill="#1D4ED8"
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={false}
                  />
                  <Bar
                    key="seizures-bar"
                    dataKey="seizures"
                    name="Seizure Operations"
                    fill="#1E3A8A"
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* Right intel rail */}
        <div className="lg:col-span-3 space-y-5">
          <Panel title="Top Repeat Offenders">
            <div className="space-y-3">
              {[
                { name: "R. Mehta", cases: 14, district: "Surat", risk: "high" },
                {
                  name: "K. Joshi",
                  cases: 11,
                  district: "Ahmedabad",
                  risk: "high",
                },
                {
                  name: "B. Singh",
                  cases: 9,
                  district: "Vadodara",
                  risk: "med",
                },
                { name: "A. Khan", cases: 8, district: "Rajkot", risk: "med" },
                {
                  name: "S. Yadav",
                  cases: 7,
                  district: "Bhavnagar",
                  risk: "low",
                },
              ].map((o, i) => (
                <div
                  key={o.name}
                  className="flex items-center justify-between py-1.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center text-[12px] font-semibold">
                      {i + 1}
                    </div>
                    <div className="leading-tight">
                      <div className="text-[13px] font-medium text-[#0F172A]">
                        {o.name}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        {o.district}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#6B7280]">
                      {o.cases} cases
                    </span>
                    <Badge
                      className={`text-[10px] border ${
                        o.risk === "high"
                          ? "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]"
                          : o.risk === "med"
                          ? "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                          : "bg-[#ECFDF5] text-[#16A34A] border-[#A7F3D0]"
                      }`}
                    >
                      {o.risk.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="High-Risk Districts">
            <div className="space-y-3">
              {districtHeat.slice(0, 5).map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-[#0F172A]">
                      {d.name}
                    </span>
                    <span className="text-[12px] text-[#6B7280]">
                      {d.value}/100
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.value}%`,
                        backgroundColor: heatColor(d.value),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Most Active Police Stations">
            <div className="space-y-2.5">
              {[
                { n: "Sector 21 PS", c: 184, eff: 92 },
                { n: "Civil Lines PS", c: 161, eff: 88 },
                { n: "Central PS", c: 148, eff: 84 },
                { n: "Adajan PS", c: 132, eff: 78 },
              ].map((s) => (
                <div key={s.n}>
                  <div className="flex items-center justify-between text-[13px] mb-1">
                    <span className="font-medium text-[#0F172A]">{s.n}</span>
                    <span className="text-[#6B7280]">{s.c} cases</span>
                  </div>
                  <Progress value={s.eff} className="h-1.5" />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Bottom analytics widgets */}
      <div>
        <SectionTitle>Operational Scorecards</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Panel title="Officer Productivity Leaderboard">
            <div className="space-y-3">
              {[
                { n: "Insp. R. Patel", s: 94, c: 87 },
                { n: "SI A. Sharma", s: 91, c: 81 },
                { n: "Insp. M. Joshi", s: 88, c: 76 },
                { n: "SI N. Verma", s: 85, c: 72 },
                { n: "Insp. K. Rao", s: 82, c: 68 },
              ].map((o, i) => (
                <div
                  key={o.n}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        i === 0
                          ? "bg-[#FFFBEB] text-[#D97706]"
                          : i === 1
                          ? "bg-[#F1F5F9] text-[#6B7280]"
                          : i === 2
                          ? "bg-[#FEF3C7] text-[#92400E]"
                          : "bg-[#F9FAFB] text-[#6B7280]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-medium text-[#0F172A]">
                      {o.n}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <span className="text-[#6B7280]">{o.c} cases</span>
                    <Badge className="bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE] border">
                      {o.s}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Raid Success Rate">
            <div className="flex items-center gap-5">
              <div className="relative w-28 h-28 shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="w-28 h-28 -rotate-90"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#16A34A"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(78 / 100) * 263.9} 263.9`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[24px] font-bold text-[#0F172A]">
                    78%
                  </span>
                  <span className="text-[10px] text-[#6B7280]">success</span>
                </div>
              </div>
              <div className="space-y-2 text-[13px] flex-1">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Total Raids</span>
                  <span className="font-medium text-[#0F172A]">1,184</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Successful</span>
                  <span className="font-medium text-[#16A34A]">923</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Aborted</span>
                  <span className="font-medium text-[#DC2626]">261</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">vs last month</span>
                  <span className="font-medium text-[#16A34A]">+4.2%</span>
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Monthly Enforcement Scorecard">
            <div className="space-y-3">
              {[
                {
                  l: "Crime-to-Arrest Ratio",
                  v: "1 : 0.74",
                  trend: "+0.06",
                  good: true,
                },
                {
                  l: "Seizure Efficiency",
                  v: "82%",
                  trend: "+3.1%",
                  good: true,
                },
                {
                  l: "Avg Investigation Time",
                  v: "21 days",
                  trend: "-2 days",
                  good: true,
                },
                {
                  l: "Pending > 60 days",
                  v: "18 cases",
                  trend: "+4",
                  good: false,
                },
              ].map((m) => (
                <div
                  key={m.l}
                  className="flex items-center justify-between border-b border-[#F1F5F9] pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-[13px] text-[#6B7280]">{m.l}</span>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold text-[#0F172A]">
                      {m.v}
                    </div>
                    <div
                      className={`text-[11px] font-medium ${
                        m.good ? "text-[#16A34A]" : "text-[#DC2626]"
                      }`}
                    >
                      {m.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Live table */}
      <Panel
        title="Recent Cases"
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <Input
                placeholder="Search by FIR, name…"
                className="pl-8 h-8 w-56 text-[13px]"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-[12px] border-[#E5E7EB]"
            >
              Export
            </Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#F1F5F9]">
                {[
                  "FIR No.",
                  "Date",
                  "District",
                  "Crime Type",
                  "Officer",
                  "Status",
                  "Severity",
                  "",
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
                  fir: "FIR-2026-04812",
                  d: "28 May 2026",
                  dist: "Surat",
                  t: "Illegal Liquor",
                  off: "Insp. R. Patel",
                  s: "Under Investigation",
                  sev: "High",
                },
                {
                  fir: "FIR-2026-04811",
                  d: "28 May 2026",
                  dist: "Ahmedabad",
                  t: "Narcotics/NDPS",
                  off: "SI A. Sharma",
                  s: "Chargesheet Filed",
                  sev: "Critical",
                },
                {
                  fir: "FIR-2026-04810",
                  d: "27 May 2026",
                  dist: "Vadodara",
                  t: "Illegal Liquor",
                  off: "Insp. M. Joshi",
                  s: "Closed",
                  sev: "Medium",
                },
                {
                  fir: "FIR-2026-04809",
                  d: "27 May 2026",
                  dist: "Rajkot",
                  t: "Narcotics/NDPS",
                  off: "SI N. Verma",
                  s: "Under Investigation",
                  sev: "High",
                },
                {
                  fir: "FIR-2026-04808",
                  d: "26 May 2026",
                  dist: "Bhavnagar",
                  t: "Illegal Liquor",
                  off: "Insp. K. Rao",
                  s: "Pending Arrest",
                  sev: "Medium",
                },
              ].map((r) => {
                const sevTone =
                  r.sev === "Critical"
                    ? "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]"
                    : r.sev === "High"
                    ? "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]"
                    : r.sev === "Medium"
                    ? "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                    : "bg-[#ECFDF5] text-[#16A34A] border-[#A7F3D0]";
                const statTone =
                  r.s === "Closed"
                    ? "bg-[#ECFDF5] text-[#16A34A]"
                    : r.s === "Chargesheet Filed"
                    ? "bg-[#EFF6FF] text-[#1D4ED8]"
                    : r.s === "Pending Arrest"
                    ? "bg-[#FFFBEB] text-[#D97706]"
                    : "bg-[#F1F5F9] text-[#475569]";
                return (
                  <TableRow
                    key={r.fir}
                    className="border-[#F1F5F9] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <TableCell className="text-[#1D4ED8] font-medium text-[13px]">
                      {r.fir}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.d}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.dist}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.t}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#374151]">
                      {r.off}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statTone} border-0 text-[11px]`}>
                        {r.s}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${sevTone} border text-[11px]`}
                      >
                        {r.sev}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <MoreHorizontal className="w-4 h-4 text-[#6B7280]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4 text-[12px] text-[#6B7280]">
          <span>Showing 1–5 of 12,486 cases</span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[12px] border-[#E5E7EB]"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[12px] border-[#E5E7EB]"
            >
              1
            </Button>
            <Button
              size="sm"
              className="h-7 text-[12px] bg-[#1D4ED8] hover:bg-[#1E40AF]"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[12px] border-[#E5E7EB]"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[12px] border-[#E5E7EB]"
            >
              Next
            </Button>
          </div>
        </div>
      </Panel>
    </PageShell>
  );
}
