import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Clock,
  FileText,
  MapPin,
  Package,
  Pill,
  Search,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PageShell, Panel, SectionTitle } from "../shared";

type Report = {
  name: string;
  desc: string;
  records: string;
  updated: string;
  trend: string;
  up: boolean;
};

const categories: {
  title: string;
  icon: any;
  tone: string;
  reports: Report[];
}[] = [
  {
    title: "Liquor Crime Intelligence",
    icon: Shield,
    tone: "#1D4ED8",
    reports: [
      {
        name: "Listed Bootlegger Report",
        desc: "Bootleggers, repeat offenders, total cases, seizure value, district-wise distribution.",
        records: "2,341",
        updated: "10 min ago",
        trend: "+3.1%",
        up: true,
      },
      {
        name: "Repeat Offender Report",
        desc: "Cases per accused, total seizures, repeat ranking.",
        records: "876",
        updated: "25 min ago",
        trend: "-2.4%",
        up: false,
      },
      {
        name: "High Value Crime Report",
        desc: "High-value liquor seizures, major offenders.",
        records: "412",
        updated: "1 hr ago",
        trend: "+8.6%",
        up: true,
      },
      {
        name: "Inter-State Bootlegger Report",
        desc: "Source analysis, route identification, state-wise cases.",
        records: "188",
        updated: "2 hr ago",
        trend: "+5.2%",
        up: true,
      },
      {
        name: "Illegal Liquor Route Report",
        desc: "Frequent transport corridors for liquor smuggling.",
        records: "64",
        updated: "3 hr ago",
        trend: "+1.4%",
        up: true,
      },
      {
        name: "Supply Chain Breakdown Report",
        desc: "Source → Transport → Seizure breakdown.",
        records: "39",
        updated: "4 hr ago",
        trend: "+0.8%",
        up: true,
      },
    ],
  },
  {
    title: "Narcotics/NDPS Intelligence",
    icon: Pill,
    tone: "#DC2626",
    reports: [
      {
        name: "Drug Seizure Analytics Report",
        desc: "Drug quantity, drug value, district trends.",
        records: "1,964",
        updated: "15 min ago",
        trend: "+9.2%",
        up: true,
      },
      {
        name: "NDPS Offender Registry",
        desc: "Registered NDPS offenders, repeat cases, seizure linkages.",
        records: "1,142",
        updated: "20 min ago",
        trend: "+6.4%",
        up: true,
      },
      {
        name: "Inter-State Drug Trafficking",
        desc: "Cross-border drug movement, source states, carrier profiles.",
        records: "94",
        updated: "1 hr ago",
        trend: "+11.2%",
        up: true,
      },
      {
        name: "Drug Supply Chain Report",
        desc: "Supply network from source to distribution.",
        records: "58",
        updated: "2 hr ago",
        trend: "+4.8%",
        up: true,
      },
      {
        name: "High-Value NDPS Seizures",
        desc: "Major drug hauls and organized crime links.",
        records: "287",
        updated: "3 hr ago",
        trend: "+7.1%",
        up: true,
      },
    ],
  },
  {
    title: "Seizure Analytics",
    icon: Package,
    tone: "#16A34A",
    reports: [
      {
        name: "Liquor Seizure Report",
        desc: "Liquor quantity, liquor value, seizure trends.",
        records: "8,412",
        updated: "12 min ago",
        trend: "+14.6%",
        up: true,
      },
      {
        name: "Seizure Efficiency Report",
        desc: "Raids vs seizure outcome analysis.",
        records: "1,184",
        updated: "1 hr ago",
        trend: "+3.1%",
        up: true,
      },
      {
        name: "Case Value Analysis Report",
        desc: "Average seizure value, highest-value cases.",
        records: "12,486",
        updated: "2 hr ago",
        trend: "+11.2%",
        up: true,
      },
      {
        name: "Monthly Crime Trend Report",
        desc: "Monthly registrations, seizure trends.",
        records: "12",
        updated: "today",
        trend: "+8.2%",
        up: true,
      },
    ],
  },
  {
    title: "Enforcement Performance",
    icon: BarChart3,
    tone: "#1E3A8A",
    reports: [
      {
        name: "District Performance Report",
        desc: "Cases registered, seizure value, liquor quantity, district ranking.",
        records: "33",
        updated: "30 min ago",
        trend: "+2.4%",
        up: true,
      },
      {
        name: "Police Station Performance Report",
        desc: "FIR count, seizures, average case value, active cases.",
        records: "412",
        updated: "45 min ago",
        trend: "+1.8%",
        up: true,
      },
      {
        name: "Raiding Officer Performance Report",
        desc: "Total raids, seizure value, cases handled.",
        records: "2,108",
        updated: "1 hr ago",
        trend: "+4.6%",
        up: true,
      },
      {
        name: "Officer Productivity Dashboard",
        desc: "Cases per officer, raid success rate.",
        records: "2,108",
        updated: "1 hr ago",
        trend: "+4.6%",
        up: true,
      },
      {
        name: "Officer Strike Rate Report",
        desc: "Successful raids per officer.",
        records: "2,108",
        updated: "1 hr ago",
        trend: "+2.2%",
        up: true,
      },
      {
        name: "Monthly Enforcement Scorecard",
        desc: "Action taken vs previous month.",
        records: "12",
        updated: "today",
        trend: "+6.4%",
        up: true,
      },
    ],
  },
  {
    title: "Investigation Monitoring",
    icon: Search,
    tone: "#D97706",
    reports: [
      {
        name: "Investigation Stage Monitoring Report",
        desc: "Investigation pending, chargesheet status, disposal status.",
        records: "1,204",
        updated: "8 min ago",
        trend: "+5.7%",
        up: true,
      },
      {
        name: "Arrest Delay Analysis",
        desc: "FIR date → arrest date timeline.",
        records: "487",
        updated: "2 hr ago",
        trend: "-6.8%",
        up: false,
      },
      {
        name: "Crime-to-Arrest Ratio Report",
        desc: "Registered vs arrested analytics.",
        records: "33",
        updated: "3 hr ago",
        trend: "+0.06",
        up: true,
      },
      {
        name: "Repeat Crime Interval Report",
        desc: "Time gap between offences.",
        records: "876",
        updated: "2 hr ago",
        trend: "-1.2%",
        up: true,
      },
    ],
  },
  {
    title: "Predictive & Special Analytics",
    icon: Brain,
    tone: "#7C3AED",
    reports: [
      {
        name: "Festival / Event Risk Report",
        desc: "Spike analysis during events.",
        records: "28",
        updated: "today",
        trend: "+12.4%",
        up: true,
      },
      {
        name: "Night Operations Report",
        desc: "Cases by time period.",
        records: "642",
        updated: "1 hr ago",
        trend: "+4.1%",
        up: true,
      },
      {
        name: "Crime Density Report",
        desc: "Crime concentration by location.",
        records: "33",
        updated: "3 hr ago",
        trend: "+2.8%",
        up: true,
      },
    ],
  },
];

export function ReportsHub({
  onOpen,
}: {
  onOpen: () => void;
}) {
  return (
    <PageShell
      title="Reports Hub"
      subtitle="Centralized access to liquor and narcotics intelligence and enforcement analytics."
      actions={
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <Input
              placeholder="Search reports…"
              className="pl-8 h-9 w-64 text-[13px]"
            />
          </div>
          <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white h-9">
            New Custom Report
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { l: "Total Reports", v: "32", i: FileText },
          { l: "Updated Today", v: "18", i: Clock },
          { l: "Categories", v: "6", i: BarChart3 },
          { l: "Active Officers", v: "2,108", i: Users },
          { l: "Districts Covered", v: "33", i: MapPin },
        ].map((s) => (
          <div
            key={s.l}
            className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
              <s.i className="w-4.5 h-4.5" />
            </div>
            <div>
              <div
                className="text-[#0F172A]"
                style={{ fontSize: 20, fontWeight: 700 }}
              >
                {s.v}
              </div>
              <div className="text-[12px] text-[#6B7280]">{s.l}</div>
            </div>
          </div>
        ))}
      </div>

      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <div key={cat.title}>
            <SectionTitle
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#1D4ED8] text-[13px] h-8"
                >
                  View All
                </Button>
              }
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: cat.tone }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {cat.title}
              </div>
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.reports.map((r) => (
                <div
                  key={r.name}
                  className="group bg-white rounded-[14px] border border-[#E5E7EB] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(29,78,216,0.08)] hover:-translate-y-0.5 transition-all duration-180 flex flex-col cursor-pointer"
                  onClick={onOpen}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4
                      className="text-[#0F172A] pr-3"
                      style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {r.name}
                    </h4>
                    <Badge
                      className={`text-[10px] border-0 ${
                        r.up
                          ? "bg-[#ECFDF5] text-[#16A34A]"
                          : "bg-[#FEF2F2] text-[#DC2626]"
                      }`}
                    >
                      {r.up ? (
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3 mr-0.5 rotate-180" />
                      )}
                      {r.trend}
                    </Badge>
                  </div>
                  <p className="text-[12.5px] text-[#6B7280] leading-relaxed mb-4 flex-1">
                    {r.desc}
                  </p>
                  <div className="flex items-center justify-between text-[11.5px] text-[#6B7280] mb-3">
                    <span>
                      <b className="text-[#0F172A] font-semibold">
                        {r.records}
                      </b>{" "}
                      records
                    </span>
                    <span>Updated {r.updated}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-[12px] border-[#E5E7EB]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Quick View
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                      }}
                      className="flex-1 h-8 text-[12px] bg-[#1D4ED8] hover:bg-[#1E40AF]"
                    >
                      Open Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </PageShell>
  );
}
