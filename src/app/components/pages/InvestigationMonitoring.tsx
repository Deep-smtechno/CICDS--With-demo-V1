import { Clock, Gavel, FileCheck2, Search, ShieldAlert } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { PageShell, Panel, StatCard } from "../shared";

const funnelData = [
  { name: "FIR Registered", value: 12486, fill: "#1D4ED8" },
  { name: "Investigation Started", value: 11240, fill: "#2563EB" },
  { name: "Suspect Identified", value: 8920, fill: "#3B82F6" },
  { name: "Arrest Made", value: 6932, fill: "#60A5FA" },
  { name: "Chargesheet Filed", value: 5104, fill: "#93C5FD" },
  { name: "Conviction", value: 3218, fill: "#BFDBFE" },
];

const delayData = [
  { d: "0–7 days", v: 4820 },
  { d: "8–15 days", v: 3140 },
  { d: "16–30 days", v: 1980 },
  { d: "31–60 days", v: 1120 },
  { d: "60+ days", v: 487 },
];

const spark = (s: number) =>
  Array.from({ length: 10 }, (_, i) => ({
    v: 20 + ((s * (i + 1)) % 40),
  }));

export function InvestigationMonitoring() {
  return (
    <PageShell
      title="Investigation Monitoring"
      subtitle="Track investigation workflow, arrest delays and case progression across the funnel."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard
          icon={<Search className="w-5 h-5" />}
          label="Active Investigations"
          value="1,204"
          trend="+5.7%"
          trendUp
          series={spark(3)}
          tone="blue"
        />
        <StatCard
          icon={<FileCheck2 className="w-5 h-5" />}
          label="Chargesheets Filed"
          value="5,104"
          trend="+8.1%"
          trendUp
          series={spark(7)}
          tone="green"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Avg Investigation Time"
          value="21 days"
          trend="-2 days"
          trendUp
          series={spark(11)}
          tone="amber"
        />
        <StatCard
          icon={<ShieldAlert className="w-5 h-5" />}
          label="Pending > 60 days"
          value="487"
          trend="+18"
          trendUp={false}
          series={spark(13)}
          tone="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <Panel
          title="Investigation Funnel"
          className="lg:col-span-3"
        >
          <div className="h-96" key="investigation-funnel-container" style={{ minHeight: '384px', minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={384} minWidth={300} key="investigation-funnel-responsive">
              <FunnelChart id="investigation-funnel-chart">
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Funnel dataKey="value" data={funnelData} isAnimationActive={false}>
                  <LabelList
                    position="right"
                    dataKey="name"
                    style={{ fill: "#0F172A", fontSize: 12, fontWeight: 500 }}
                  />
                  <LabelList
                    position="center"
                    dataKey="value"
                    style={{
                      fill: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Arrest Delay Distribution" className="lg:col-span-2">
          <div className="h-72" key="investigation-delay-container" style={{ minHeight: '288px', minWidth: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={288} minWidth={300} key="investigation-delay-responsive">
              <BarChart data={delayData} id="investigation-delay-chart">
                <CartesianGrid stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="d"
                  tick={{ fill: "#6B7280", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 11 }}
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
                <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                  {delayData.map((entry, i) => (
                    <Cell
                      key={`delay-cell-${entry.d}-${i}`}
                      fill={
                        i < 2
                          ? "#16A34A"
                          : i < 4
                          ? "#D97706"
                          : "#DC2626"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-[12px] text-[#6B7280]">
            Cases resolved in 0–15 days reflect highest enforcement efficiency.
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel title="Case Status Distribution">
          <div className="space-y-3.5">
            {[
              { l: "Under Investigation", v: 1204, max: 12486, c: "#1D4ED8" },
              { l: "Pending Arrest", v: 487, max: 12486, c: "#D97706" },
              { l: "Chargesheet Filed", v: 5104, max: 12486, c: "#16A34A" },
              { l: "Conviction", v: 3218, max: 12486, c: "#1E3A8A" },
              { l: "Closed / Disposed", v: 2473, max: 12486, c: "#6B7280" },
            ].map((s) => (
              <div key={s.l}>
                <div className="flex items-center justify-between mb-1.5 text-[13px]">
                  <span className="font-medium text-[#0F172A]">{s.l}</span>
                  <span className="text-[#6B7280]">
                    {s.v.toLocaleString()} ({Math.round((s.v / s.max) * 100)}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(s.v / s.max) * 100}%`,
                      backgroundColor: s.c,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Investigation Timeline — FIR-2026-04812">
          <div className="relative pl-6">
            <div className="absolute left-[10px] top-2 bottom-2 w-px bg-[#E5E7EB]" />
            {[
              {
                t: "FIR Registered",
                d: "12 May 2026, 09:14",
                done: true,
                c: "#16A34A",
              },
              {
                t: "Investigation Started",
                d: "12 May 2026, 14:22",
                done: true,
                c: "#16A34A",
              },
              {
                t: "Suspect Identified",
                d: "16 May 2026, 18:40",
                done: true,
                c: "#16A34A",
              },
              {
                t: "Arrest Made",
                d: "21 May 2026, 22:10",
                done: true,
                c: "#16A34A",
              },
              {
                t: "Chargesheet Filing",
                d: "In progress · due 11 Jun 2026",
                done: false,
                c: "#D97706",
              },
              {
                t: "Court Proceedings",
                d: "Awaiting chargesheet",
                done: false,
                c: "#6B7280",
              },
            ].map((s, i) => (
              <div key={i} className="relative pb-4 last:pb-0">
                <div
                  className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: s.c }}
                />
                <div className="text-[13px] font-medium text-[#0F172A]">
                  {s.t}
                </div>
                <div className="text-[12px] text-[#6B7280]">{s.d}</div>
                {!s.done && i === 4 && (
                  <Badge className="mt-1.5 bg-[#FFFBEB] text-[#D97706] border-0 text-[10px]">
                    Action required
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </PageShell>
  );
}
