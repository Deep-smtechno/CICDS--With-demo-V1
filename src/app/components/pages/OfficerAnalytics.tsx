import { Award, Crown, Medal, Target, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
import { PageShell, Panel, SectionTitle } from "../shared";

const trend = [
  { m: "Jan", cases: 18, success: 14 },
  { m: "Feb", cases: 22, success: 18 },
  { m: "Mar", cases: 26, success: 21 },
  { m: "Apr", cases: 24, success: 20 },
  { m: "May", cases: 31, success: 26 },
  { m: "Jun", cases: 34, success: 29 },
  { m: "Jul", cases: 38, success: 32 },
];

const radar = [
  { k: "Detection", v: 92 },
  { k: "Raids", v: 88 },
  { k: "Seizure", v: 94 },
  { k: "Arrest", v: 81 },
  { k: "Chargesheet", v: 78 },
  { k: "Conviction", v: 74 },
];

const podium = [
  { rank: 2, n: "SI A. Sharma", c: 81, v: "₹3.2 Cr", initials: "AS", tone: "#94A3B8" },
  { rank: 1, n: "Insp. R. Patel", c: 87, v: "₹4.1 Cr", initials: "RP", tone: "#D97706" },
  { rank: 3, n: "Insp. M. Joshi", c: 76, v: "₹2.8 Cr", initials: "MJ", tone: "#A16207" },
];

export function OfficerAnalytics() {
  return (
    <PageShell
      title="Officer Performance Intelligence"
      subtitle="Officer-level productivity, strike rate and seizure performance analytics."
      actions={
        <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white h-9">
          Export Leaderboard
        </Button>
      }
    >
      <Panel title="Top Performers — This Month">
        <div className="grid grid-cols-3 gap-5 items-end">
          {podium.map((p) => {
            const isFirst = p.rank === 1;
            return (
              <div
                key={p.rank}
                className={`relative rounded-xl border p-5 text-center ${
                  isFirst
                    ? "border-[#FDE68A] bg-gradient-to-b from-[#FFFBEB] to-white shadow-[0_8px_24px_rgba(217,119,6,0.15)] -translate-y-2"
                    : "border-[#E5E7EB] bg-white"
                }`}
              >
                {isFirst && (
                  <Crown className="w-7 h-7 text-[#D97706] mx-auto mb-1" />
                )}
                <Avatar className="w-16 h-16 mx-auto mb-2">
                  <AvatarFallback
                    className="text-white"
                    style={{ backgroundColor: p.tone }}
                  >
                    {p.initials}
                  </AvatarFallback>
                </Avatar>
                <Badge
                  className="border-0 text-[10px] mb-1.5"
                  style={{
                    backgroundColor: isFirst ? "#FFFBEB" : "#F1F5F9",
                    color: p.tone,
                  }}
                >
                  Rank #{p.rank}
                </Badge>
                <div
                  className="text-[#0F172A]"
                  style={{ fontSize: 15, fontWeight: 600 }}
                >
                  {p.n}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                  <div className="rounded-md bg-[#F9FAFB] p-2">
                    <div className="text-[#6B7280]">Cases</div>
                    <div className="font-semibold text-[#0F172A]">{p.c}</div>
                  </div>
                  <div className="rounded-md bg-[#F9FAFB] p-2">
                    <div className="text-[#6B7280]">Seizure</div>
                    <div className="font-semibold text-[#0F172A]">{p.v}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel
          title="Cases vs Successful Operations"
          className="lg:col-span-2"
        >
          <div className="h-72" key="officer-cases-container" style={{ minHeight: '288px', minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300} key="officer-cases-responsive">
              <LineChart data={trend} id="officer-cases-trend">
                <CartesianGrid stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="m"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Line
                  key="officer-cases-line"
                  type="monotone"
                  dataKey="cases"
                  stroke="#1D4ED8"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name="Total Cases"
                  isAnimationActive={false}
                />
                <Line
                  key="officer-success-line"
                  type="monotone"
                  dataKey="success"
                  stroke="#16A34A"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name="Successful"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Skill Coverage — Insp. R. Patel">
          <div className="h-72" key="officer-skills-container" style={{ minHeight: '288px', minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300} key="officer-skills-responsive">
              <RadarChart data={radar} id="officer-skills-radar">
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis
                  dataKey="k"
                  tick={{ fill: "#374151", fontSize: 11 }}
                />
                <Radar
                  dataKey="v"
                  stroke="#1D4ED8"
                  fill="#1D4ED8"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Officer Ranking">
        <Table>
          <TableHeader>
            <TableRow className="border-[#F1F5F9] bg-[#F9FAFB]">
              {[
                "#",
                "Officer",
                "District",
                "Cases",
                "Strike Rate",
                "Avg Case Value",
                "Total Seizure",
                "Score",
                "Trend",
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
              { n: "Insp. R. Patel", d: "Surat", c: 87, sr: 94, av: "₹4.7L", t: "₹4.1Cr", s: 94, td: "+8%" },
              { n: "SI A. Sharma", d: "Ahmedabad", c: 81, sr: 91, av: "₹3.9L", t: "₹3.2Cr", s: 91, td: "+6%" },
              { n: "Insp. M. Joshi", d: "Vadodara", c: 76, sr: 88, av: "₹3.7L", t: "₹2.8Cr", s: 88, td: "+4%" },
              { n: "SI N. Verma", d: "Rajkot", c: 72, sr: 85, av: "₹3.1L", t: "₹2.2Cr", s: 85, td: "+2%" },
              { n: "Insp. K. Rao", d: "Bhavnagar", c: 68, sr: 82, av: "₹2.8L", t: "₹1.9Cr", s: 82, td: "-1%" },
              { n: "SI P. Desai", d: "Jamnagar", c: 64, sr: 79, av: "₹2.4L", t: "₹1.5Cr", s: 79, td: "+3%" },
            ].map((o, i) => (
              <TableRow
                key={o.n}
                className="border-[#F1F5F9] hover:bg-[#F9FAFB]"
              >
                <TableCell>
                  <span className="w-6 h-6 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center text-[11px] font-bold">
                    {i + 1}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="bg-[#1E3A8A] text-white text-[10px]">
                        {o.n
                          .split(" ")
                          .slice(-1)[0]
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[13px] font-medium text-[#0F172A]">
                      {o.n}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] text-[#374151]">
                  {o.d}
                </TableCell>
                <TableCell className="text-[13px] text-[#374151]">
                  {o.c}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                      <div
                        className="h-full bg-[#16A34A]"
                        style={{ width: `${o.sr}%` }}
                      />
                    </div>
                    <span className="text-[12px] text-[#374151]">
                      {o.sr}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] text-[#374151]">
                  {o.av}
                </TableCell>
                <TableCell className="text-[13px] font-medium text-[#0F172A]">
                  {o.t}
                </TableCell>
                <TableCell>
                  <Badge className="bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE] border text-[11px]">
                    {o.s}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`text-[12px] font-medium ${
                    o.td.startsWith("-")
                      ? "text-[#DC2626]"
                      : "text-[#16A34A]"
                  }`}
                >
                  {o.td}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </PageShell>
  );
}
