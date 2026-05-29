import { Layers, Locate, Maximize2, Minus, Plus, Route } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PageShell, Panel } from "../shared";

const hotspots = [
  { id: 1, x: 32, y: 28, r: 28, name: "Surat", c: 412 },
  { id: 2, x: 48, y: 38, r: 26, name: "Vadodara", c: 268 },
  { id: 3, x: 56, y: 22, r: 32, name: "Ahmedabad", c: 384 },
  { id: 4, x: 22, y: 56, r: 18, name: "Rajkot", c: 241 },
  { id: 5, x: 14, y: 70, r: 12, name: "Jamnagar", c: 152 },
  { id: 6, x: 70, y: 60, r: 14, name: "Bhavnagar", c: 188 },
  { id: 7, x: 78, y: 76, r: 9, name: "Junagadh", c: 121 },
];

export function GeographicIntelligence() {
  return (
    <PageShell
      title="Geographic Intelligence"
      subtitle="Spatial analytics: crime density, transport corridors and seizure hotspots."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 border-[#E5E7EB]">
            <Layers className="w-4 h-4" />
            Layers
          </Button>
          <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white h-9">
            <Route className="w-4 h-4" />
            Route Analysis
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <Panel className="lg:col-span-3 !p-0 overflow-hidden">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFF] to-[#DBEAFE]">
            {/* Grid lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={`${(i / 12) * 100}%`}
                  x2={`${(i / 12) * 100}%`}
                  y1="0"
                  y2="100%"
                  stroke="#BFDBFE"
                  strokeOpacity="0.4"
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  y1={`${(i / 8) * 100}%`}
                  y2={`${(i / 8) * 100}%`}
                  x1="0"
                  x2="100%"
                  stroke="#BFDBFE"
                  strokeOpacity="0.4"
                />
              ))}
            </svg>

            {/* Routes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 32 28 Q 42 18 56 22"
                stroke="#1D4ED8"
                strokeWidth="0.5"
                strokeDasharray="1.5 1"
                fill="none"
              />
              <path
                d="M 32 28 Q 40 32 48 38"
                stroke="#DC2626"
                strokeWidth="0.5"
                strokeDasharray="1.5 1"
                fill="none"
              />
              <path
                d="M 48 38 Q 60 50 70 60"
                stroke="#D97706"
                strokeWidth="0.5"
                strokeDasharray="1.5 1"
                fill="none"
              />
              <path
                d="M 22 56 Q 18 62 14 70"
                stroke="#1D4ED8"
                strokeWidth="0.4"
                strokeDasharray="1.5 1"
                fill="none"
              />
            </svg>

            {/* Hotspots */}
            {hotspots.map((h) => {
              const intensity =
                h.c > 350
                  ? "#DC2626"
                  : h.c > 200
                  ? "#D97706"
                  : "#1D4ED8";
              return (
                <div
                  key={h.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-30 animate-ping"
                    style={{
                      width: h.r * 2,
                      height: h.r * 2,
                      backgroundColor: intensity,
                      transform: "translate(-50%, -50%)",
                      left: "50%",
                      top: "50%",
                    }}
                  />
                  <div
                    className="rounded-full opacity-40"
                    style={{
                      width: h.r * 2,
                      height: h.r * 2,
                      backgroundColor: intensity,
                    }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: intensity }}
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-md px-2 py-0.5 shadow-md text-[11px] font-medium text-[#0F172A] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {h.name} · {h.c} cases
                  </div>
                </div>
              );
            })}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col bg-white rounded-lg shadow-md border border-[#E5E7EB] overflow-hidden">
              <button className="p-2 hover:bg-[#F3F4F6]">
                <Plus className="w-4 h-4 text-[#374151]" />
              </button>
              <div className="h-px bg-[#E5E7EB]" />
              <button className="p-2 hover:bg-[#F3F4F6]">
                <Minus className="w-4 h-4 text-[#374151]" />
              </button>
              <div className="h-px bg-[#E5E7EB]" />
              <button className="p-2 hover:bg-[#F3F4F6]">
                <Locate className="w-4 h-4 text-[#374151]" />
              </button>
              <div className="h-px bg-[#E5E7EB]" />
              <button className="p-2 hover:bg-[#F3F4F6]">
                <Maximize2 className="w-4 h-4 text-[#374151]" />
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-md border border-[#E5E7EB]">
              <div className="text-[11px] font-semibold text-[#0F172A] mb-2">
                Crime Density
              </div>
              <div className="space-y-1.5 text-[11px] text-[#374151]">
                {[
                  { c: "#DC2626", l: "Critical (300+)" },
                  { c: "#D97706", l: "High (150–300)" },
                  { c: "#1D4ED8", l: "Moderate (<150)" },
                ].map((x) => (
                  <div key={x.l} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: x.c }}
                    />
                    {x.l}
                  </div>
                ))}
              </div>
            </div>

            {/* Scale */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded px-2 py-1 text-[10px] text-[#6B7280] border border-[#E5E7EB]">
              0 ───── 50 km
            </div>
          </div>
        </Panel>

        <div className="lg:col-span-1 space-y-5">
          <Panel title="Top Hotspots">
            <div className="space-y-3">
              {hotspots
                .slice()
                .sort((a, b) => b.c - a.c)
                .slice(0, 6)
                .map((h, i) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center text-[11px] font-bold">
                        {i + 1}
                      </span>
                      <span className="text-[13px] font-medium text-[#0F172A]">
                        {h.name}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#6B7280]">
                      {h.c}
                    </span>
                  </div>
                ))}
            </div>
          </Panel>

          <Panel title="Transport Corridors">
            <div className="space-y-2.5">
              {[
                {
                  n: "NH48 — Surat–Ahmedabad",
                  v: 42,
                  tone: "bg-[#DC2626]",
                },
                {
                  n: "NH47 — Vadodara–Halol",
                  v: 31,
                  tone: "bg-[#D97706]",
                },
                {
                  n: "NH27 — Rajkot–Jamnagar",
                  v: 22,
                  tone: "bg-[#1D4ED8]",
                },
                {
                  n: "SH06 — Bhavnagar–Talaja",
                  v: 18,
                  tone: "bg-[#1D4ED8]",
                },
              ].map((r) => (
                <div
                  key={r.n}
                  className="p-2.5 rounded-lg border border-[#F1F5F9] hover:bg-[#F9FAFB] cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12.5px] font-medium text-[#0F172A]">
                      {r.n}
                    </span>
                    <Badge className="bg-[#FEF2F2] text-[#DC2626] border-0 text-[10px]">
                      {r.v}%
                    </Badge>
                  </div>
                  <div className="h-1 rounded-full bg-[#F1F5F9] overflow-hidden">
                    <div
                      className={`h-full ${r.tone} rounded-full`}
                      style={{ width: `${r.v * 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
