import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

export function PageShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            className="text-[#0F172A] tracking-tight"
            style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[#6B7280] mt-1.5 text-[14px]">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2
        className="text-[#0F172A]"
        style={{ fontSize: 22, fontWeight: 700 }}
      >
        {children}
      </h2>
      {action}
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  trendUp,
  series,
  tone = "blue",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  series: { v: number }[];
  tone?: "blue" | "green" | "amber" | "red";
}) {
  const toneMap = {
    blue: { bg: "#EFF6FF", fg: "#1D4ED8", stroke: "#1D4ED8" },
    green: { bg: "#ECFDF5", fg: "#16A34A", stroke: "#16A34A" },
    amber: { bg: "#FFFBEB", fg: "#D97706", stroke: "#D97706" },
    red: { bg: "#FEF2F2", fg: "#DC2626", stroke: "#DC2626" },
  }[tone];

  // Create unique ID based on label to avoid duplicate gradient IDs
  const gradientId = `gradient-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="group bg-white rounded-[14px] border border-[#E5E7EB] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(29,78,216,0.08)] hover:-translate-y-0.5 transition-all duration-180">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: toneMap.bg, color: toneMap.fg }}
        >
          {icon}
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-[12px] font-medium px-1.5 py-0.5 rounded ${
            trendUp
              ? "text-[#16A34A] bg-[#ECFDF5]"
              : "text-[#DC2626] bg-[#FEF2F2]"
          }`}
        >
          {trendUp ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {trend}
        </span>
      </div>
      <div
        className="text-[#0F172A]"
        style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}
      >
        {value}
      </div>
      <div className="flex items-end justify-between mt-1 gap-3">
        <div className="text-[14px] font-medium text-[#6B7280]">{label}</div>
        <div className="w-20 h-10 -mr-1" style={{ minHeight: '40px', minWidth: '80px' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={40} minWidth={80}>
            <AreaChart data={series} id={`stat-chart-${gradientId}`}>
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={toneMap.stroke}
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor={toneMap.stroke}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                key={`area-${gradientId}`}
                type="monotone"
                dataKey="v"
                stroke={toneMap.stroke}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${className}`}
    >
      {title && (
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#F1F5F9]">
          <h3
            className="text-[#0F172A]"
            style={{ fontSize: 15, fontWeight: 600 }}
          >
            {title}
          </h3>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export const COLORS = {
  primary: "#1D4ED8",
  dark: "#1E3A8A",
  green: "#16A34A",
  amber: "#D97706",
  red: "#DC2626",
  border: "#E5E7EB",
  muted: "#6B7280",
  surface: "#EFF6FF",
};

export function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
