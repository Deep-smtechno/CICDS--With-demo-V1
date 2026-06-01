import { useState, useMemo } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Download,
  FileWarning,
  Filter,
  MapPin,
  Package,
  Search,
  Shield,
  TrendingUp,
  Users,
  Wine,
  Pill,
  IndianRupee,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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

const otherStates = [
  { name: "Maharashtra", code: "MH" },
  { name: "Rajasthan", code: "RJ" },
  { name: "Madhya Pradesh", code: "MP" },
  { name: "Uttar Pradesh", code: "UP" },
  { name: "Punjab", code: "PB" },
  { name: "Haryana", code: "HR" },
  { name: "Daman & Diu", code: "DD" },
  { name: "Goa", code: "GA" },
];

const interstateCases = [
  { no: 1, state: "Maharashtra", dist: "Mumbai", type: "MDMA Smuggling", qty: "3.2 kg", value: "6.4 Cr", suspects: 4, linked: "Ahmedabad", status: "Active", date: "2026-05-22" },
  { no: 2, state: "Rajasthan", dist: "Jaisalmer", type: "IMFL Smuggling", qty: "2,840 L", value: "1.8 Cr", suspects: 2, linked: "Banaskantha", status: "Active", date: "2026-05-20" },
  { no: 3, state: "Madhya Pradesh", dist: "Indore", type: "Ganja Transit", qty: "156 kg", value: "1.2 Cr", suspects: 5, linked: "Vadodara", status: "Closed", date: "2026-05-15" },
  { no: 4, state: "Punjab", dist: "Amritsar", type: "Heroin Route", qty: "480 g", value: "2.4 Cr", suspects: 3, linked: "Mehsana", status: "Active", date: "2026-05-18" },
  { no: 5, state: "Daman & Diu", dist: "Daman", type: "Country Liquor", qty: "1,240 L", value: "0.6 Cr", suspects: 2, linked: "Valsad", status: "Active", date: "2026-05-25" },
  { no: 6, state: "Maharashtra", dist: "Pune", type: "Cocaine", qty: "120 g", value: "3.6 Cr", suspects: 2, linked: "Surat", status: "Pending", date: "2026-05-24" },
  { no: 7, state: "Uttar Pradesh", dist: "Agra", type: "MDMA Transit", qty: "1.8 kg", value: "3.6 Cr", suspects: 4, linked: "Rajkot", status: "Active", date: "2026-05-19" },
  { no: 8, state: "Rajasthan", dist: "Udaipur", type: "IMFL", qty: "920 L", value: "0.7 Cr", suspects: 1, linked: "Bharuch", status: "Closed", date: "2026-05-12" },
];

const systemAlerts = [
  { id: 1, type: "error", severity: "high", module: "Data Upload", message: "Failed to process district report from Kutch - Invalid CSV format", timestamp: "2026-05-28 14:32", status: "unresolved" },
  { id: 2, type: "warning", severity: "medium", module: "Report Generator", message: "Monthly report generation delayed - Database connection timeout", timestamp: "2026-05-28 13:15", status: "resolved" },
  { id: 3, type: "error", severity: "critical", module: "Interstate API", message: "Maharashtra API connection failed - Authentication token expired", timestamp: "2026-05-28 12:45", status: "unresolved" },
  { id: 4, type: "warning", severity: "low", module: "Filter Bar", message: "District filter slow performance detected - Consider data optimization", timestamp: "2026-05-28 11:20", status: "acknowledged" },
  { id: 5, type: "error", severity: "high", module: "Seizure Upload", message: "Duplicate seizure entry detected - FIR 124/2026 already exists", timestamp: "2026-05-28 10:55", status: "unresolved" },
  { id: 6, type: "warning", severity: "medium", module: "Dashboard", message: "Chart rendering performance degraded for large datasets", timestamp: "2026-05-28 09:30", status: "acknowledged" },
  { id: 7, type: "error", severity: "critical", module: "Database", message: "Connection pool exhausted - Maximum connections reached", timestamp: "2026-05-27 18:42", status: "resolved" },
  { id: 8, type: "warning", severity: "low", module: "Export", message: "Excel export taking longer than expected for 10K+ records", timestamp: "2026-05-27 16:20", status: "acknowledged" },
];

export function OtherState() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [alertFilter, setAlertFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const stateStats = useMemo(() => {
    const r = rand(42);
    return otherStates.map((s) => ({
      state: s.name,
      code: s.code,
      cases: Math.round(12 + r() * 45),
      liquor: Math.round(800 + r() * 2200),
      NDPSs: Math.round(2 + r() * 18),
      value: Math.round(10 + r() * 90) / 10,
      suspects: Math.round(15 + r() * 85),
    }));
  }, []);

  const monthlyInterstateData = useMemo(() => {
    const r = rand(84);
    const months = ["Jan", "Feb", "Mar", "Apr", "May"];
    return months.map((m) => ({
      month: m,
      cases: Math.round(45 + r() * 35),
      suspects: Math.round(60 + r() * 50),
    }));
  }, []);

  const casesByType = useMemo(() => {
    return [
      { type: "Liquor Smuggling", count: 24, color: C.primary },
      { type: "NDPS Transit", count: 18, color: C.amber },
      { type: "MDMA/Cocaine", count: 12, color: C.red },
      { type: "Heroin Route", count: 8, color: C.primaryDark },
    ];
  }, []);

  const filteredCases = interstateCases.filter((c) => {
    const matchSearch = searchQuery === "" ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.linked.toLowerCase().includes(searchQuery.toLowerCase());
    const matchState = stateFilter === "all" || c.state === stateFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchState && matchStatus;
  });

  const filteredAlerts = systemAlerts.filter((a) => {
    const matchAlert = alertFilter === "all" || a.type === alertFilter;
    const matchSeverity = severityFilter === "all" || a.severity === severityFilter;
    return matchAlert && matchSeverity;
  });

  const alertCounts = {
    total: systemAlerts.length,
    error: systemAlerts.filter((a) => a.type === "error").length,
    warning: systemAlerts.filter((a) => a.type === "warning").length,
    critical: systemAlerts.filter((a) => a.severity === "critical").length,
    unresolved: systemAlerts.filter((a) => a.status === "unresolved").length,
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[#0F172A] tracking-tight" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.15 }}>
            Interstate Crime Intelligence
          </h1>
          <p className="text-[#6B7280] mt-1 text-[13px]">
            Cross-border liquor & narcotics cases linked with Gujarat operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 gap-2">
            <Download className="w-4 h-4" /> Export Data
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard icon={<MapPin className="w-5 h-5" />} label="કુલ રાજ્યો" value={otherStates.length.toString()} color="blue" />
        <StatCard icon={<Shield className="w-5 h-5" />} label="સક્રિય કેસ" value="62" color="green" />
        <StatCard icon={<Package className="w-5 h-5" />} label="કુલ જપ્તી" value="₹28.4 Cr" color="amber" />
        <StatCard icon={<Users className="w-5 h-5" />} label="શંકાસ્પદ" value="184" color="blue" />
        <StatCard icon={<Wine className="w-5 h-5" />} label="દારૂના કેસ" value="38" color="primary" />
        <StatCard icon={<Pill className="w-5 h-5" />} label="NDPS કેસ" value="24" color="red" />
      </div>

      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="bg-white border border-[#E5E7EB] p-1">
          <TabsTrigger value="cases">આંતર-રાજ્ય કેસ</TabsTrigger>
          <TabsTrigger value="analytics">એનાલિટિક્સ</TabsTrigger>
        </TabsList>

        {/* Interstate Cases Tab */}
        <TabsContent value="cases" className="mt-6 space-y-6">
          <Panel
            title="Interstate Crime Cases"
            action={
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 w-4 h-4 text-[#6B7280]" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cases..."
                    className="pl-8 h-8 w-48 bg-[#F9FAFB] border-[#E5E7EB] text-[13px]"
                  />
                </div>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="h-8 px-2 text-[13px] border border-[#E5E7EB] rounded-md bg-[#F9FAFB]"
                >
                  <option value="all">બધા રાજ્યો</option>
                  {otherStates.map((s) => (
                    <option key={s.code} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-8 px-2 text-[13px] border border-[#E5E7EB] rounded-md bg-[#F9FAFB]"
                >
                  <option value="all">બધી સ્થિતિ</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">No.</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Crime Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">શંકાસ્પદ</TableHead>
                    <TableHead>Gujarat Link</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((c) => (
                    <TableRow key={c.no} className="hover:bg-[#F9FAFB]">
                      <TableCell>{c.no}</TableCell>
                      <TableCell className="font-medium">{c.state}</TableCell>
                      <TableCell className="text-[#6B7280]">{c.dist}</TableCell>
                      <TableCell className="font-medium">{c.type}</TableCell>
                      <TableCell>{c.qty}</TableCell>
                      <TableCell className="text-right">₹{c.value}</TableCell>
                      <TableCell className="text-right">{c.suspects}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#EFF6FF]">
                          {c.linked}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#6B7280] text-[13px]">{c.date}</TableCell>
                      <TableCell>
                        <Badge className={
                          c.status === "Active" ? "bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]" :
                            c.status === "Pending" ? "bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]" :
                              "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#F3F4F6]"
                        }>
                          {c.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-[13px] text-[#6B7280]">
              Showing {filteredCases.length} of {interstateCases.length} cases
            </div>
          </Panel>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="State-wise Case Distribution">
              <div className="h-80 w-full" style={{ minHeight: 320, minWidth: 300 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={320} minWidth={300}>
                  <BarChart data={stateStats} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="code" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar key="cases" dataKey="cases" fill={C.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel title="Crime Type Distribution">
              <div className="h-80 w-full" style={{ minHeight: 320, minWidth: 300 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={320} minWidth={300}>
                  <PieChart>
                    <Pie
                      data={casesByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {casesByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel title="Monthly Interstate Cases Trend">
              <div className="h-72 w-full" style={{ minHeight: 288, minWidth: 300 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300}>
                  <LineChart data={monthlyInterstateData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Line key="cases" type="monotone" dataKey="cases" stroke={C.primary} strokeWidth={2.5} dot={{ r: 3 }} name="Cases" />
                    <Line key="suspects" type="monotone" dataKey="suspects" stroke={C.amber} strokeWidth={2} dot={{ r: 3 }} name="શંકાસ્પદ" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel title="State-wise Seizure Value">
              <div className="h-72 w-full" style={{ minHeight: 288, minWidth: 300 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300}>
                  <BarChart data={stateStats.slice(0, 6)} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                    <CartesianGrid stroke="#F1F5F9" horizontal={false} />
                    <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="state" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                    <Tooltip />
                    <Bar key="value" dataKey="value" fill={C.green} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>

          {/* Detailed State Stats Table */}
          <Panel title="Detailed State-wise Statistics">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead className="text-right">Cases</TableHead>
                  <TableHead className="text-right">Liquor (L)</TableHead>
                  <TableHead className="text-right">NDPSs (kg)</TableHead>
                  <TableHead className="text-right">Value (₹ Cr)</TableHead>
                  <TableHead className="text-right">શંકાસ્પદ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stateStats.map((s) => (
                  <TableRow key={s.code} className="hover:bg-[#F9FAFB]">
                    <TableCell className="font-medium">{s.state}</TableCell>
                    <TableCell className="text-right">{s.cases}</TableCell>
                    <TableCell className="text-right">{s.liquor.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{s.NDPSs}</TableCell>
                    <TableCell className="text-right">{s.value}</TableCell>
                    <TableCell className="text-right">{s.suspects}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        </TabsContent>

      </Tabs>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors = {
    blue: { bg: "#EFF6FF", fg: "#1D4ED8" },
    green: { bg: "#ECFDF5", fg: "#16A34A" },
    amber: { bg: "#FFFBEB", fg: "#D97706" },
    red: { bg: "#FEF2F2", fg: "#DC2626" },
    primary: { bg: "#EFF6FF", fg: "#1D4ED8" },
  }[color] || { bg: "#EFF6FF", fg: "#1D4ED8" };

  return (
    <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between mb-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.bg, color: colors.fg }}>
          {icon}
        </div>
      </div>
      <div className="text-[#0F172A]" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.15 }}>
        {value}
      </div>
      <div className="text-[12px] text-[#6B7280] mt-1">{label}</div>
    </div>
  );
}

function AlertStatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors = {
    blue: { bg: "#EFF6FF", fg: "#1D4ED8" },
    red: { bg: "#FEF2F2", fg: "#DC2626" },
    amber: { bg: "#FFFBEB", fg: "#D97706" },
  }[color] || { bg: "#EFF6FF", fg: "#1D4ED8" };

  return (
    <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: colors.bg, color: colors.fg }}>
        {icon}
      </div>
      <div className="text-[#0F172A]" style={{ fontSize: 22, fontWeight: 700 }}>
        {value}
      </div>
      <div className="text-[12px] text-[#6B7280]">{label}</div>
    </div>
  );
}

export default OtherState;
