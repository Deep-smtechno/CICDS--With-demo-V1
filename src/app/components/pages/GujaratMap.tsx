import { useState, useMemo } from "react";
import {
  X,
  MapPin,
  AlertTriangle,
  Wine,
  Pill,
  IndianRupee,
  Users,
  Shield,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Panel, rand } from "../shared";
import districtGeoData from "../../data/district-data.json";

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

interface DistrictData {
  code: string;
  name: string;
  path: string;
  center: { x: number; y: number };
}

interface CrimeData {
  liquor: number;
  NDPSs: number;
  totalCases: number;
  arrests: number;
  seizureValue: number;
  pending: number;
  repeatOffenders: number;
}

export function GujaratMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Generate crime data for each district
  const districtCrimeData = useMemo(() => {
    const r = rand(42);
    const data: Record<string, CrimeData> = {};

    districtGeoData.districts.forEach((district: DistrictData) => {
      data[district.code] = {
        liquor: Math.round(500 + r() * 2500),
        NDPSs: Math.round(50 + r() * 600),
        totalCases: Math.round(600 + r() * 3200),
        arrests: Math.round(400 + r() * 2000),
        seizureValue: Math.round((20 + r() * 180) * 10) / 10,
        pending: Math.round(50 + r() * 400),
        repeatOffenders: Math.round(20 + r() * 180),
      };
    });

    return data;
  }, []);

  // Calculate color intensity based on total cases
  const getDistrictColor = (districtCode: string, isHovered: boolean, isSelected: boolean) => {
    const crimeData = districtCrimeData[districtCode];
    if (!crimeData) return C.surface;

    const allCases = Object.values(districtCrimeData).map((d) => d.totalCases);
    const maxCases = Math.max(...allCases);
    const minCases = Math.min(...allCases);
    const intensity = (crimeData.totalCases - minCases) / (maxCases - minCases);

    if (isSelected) {
      return C.primary;
    }
    if (isHovered) {
      return `rgba(29, 78, 216, ${0.3 + intensity * 0.5})`;
    }

    // Color gradient from light to dark blue based on crime intensity
    return `rgba(29, 78, 216, ${0.1 + intensity * 0.7})`;
  };

  const selectedDistrictData = selectedDistrict
    ? districtGeoData.districts.find((d: DistrictData) => d.code === selectedDistrict)
    : null;

  const selectedCrimeData = selectedDistrict ? districtCrimeData[selectedDistrict] : null;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#0F172A] tracking-tight" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.15 }}>
            Gujarat Crime Heatmap
          </h1>
          <p className="text-[#6B7280] mt-1 text-[13px]">
            Interactive district-wise crime visualization · Click any district for detailed analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Panel */}
        <Panel title="Gujarat District Map" className="xl:col-span-2">
          <div className="relative w-full" style={{ minHeight: 600 }}>
            <svg
              viewBox="0 0 1100 850"
              className="w-full h-full"
              style={{ maxHeight: 600, minHeight: 400 }}
            >
              <g>
                {districtGeoData.districts.map((district: DistrictData) => {
                  const isHovered = hoveredDistrict === district.code;
                  const isSelected = selectedDistrict === district.code;

                  return (
                    <g key={district.code}>
                      <path
                        d={district.path}
                        fill={getDistrictColor(district.code, isHovered, isSelected)}
                        stroke={isSelected ? C.primary : isHovered ? C.primaryLight : "#94A3B8"}
                        strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredDistrict(district.code)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(district.code)}
                      />
                      {/* District Label */}
                      <text
                        x={district.center.x}
                        y={district.center.y}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        style={{
                          fontSize: isSelected ? 13 : 11,
                          fontWeight: isSelected ? 700 : 600,
                          fill: isSelected ? "#fff" : "#0F172A",
                        }}
                      >
                        {district.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-[#E5E7EB] p-3 shadow-lg">
              <div className="text-[12px] font-semibold text-[#0F172A] mb-2">Crime Intensity</div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, i) => (
                    <div
                      key={i}
                      className="w-8 h-4 rounded"
                      style={{ backgroundColor: `rgba(29, 78, 216, ${intensity})` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between w-full text-[10px] text-[#6B7280]">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* District Details Panel */}
        <div className="xl:col-span-1">
          {selectedDistrictData && selectedCrimeData ? (
            <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium">
                      District Details
                    </div>
                    <h3 className="text-[#0F172A]" style={{ fontSize: 20, fontWeight: 700 }}>
                      {selectedDistrictData.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className="w-8 h-8 rounded-md hover:bg-[#F3F4F6] flex items-center justify-center text-[#6B7280]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <StatBox
                    icon={<Shield className="w-4 h-4" />}
                    label="કુલ કેસ"
                    value={selectedCrimeData.totalCases.toLocaleString()}
                    color="blue"
                  />
                  <StatBox
                    icon={<Wine className="w-4 h-4" />}
                    label="Liquor Cases"
                    value={selectedCrimeData.liquor.toLocaleString()}
                    color="primary"
                  />
                  <StatBox
                    icon={<Pill className="w-4 h-4" />}
                    label="NDPS કેસ"
                    value={selectedCrimeData.NDPSs.toLocaleString()}
                    color="amber"
                  />
                </div>

                {/* Detailed Metrics */}
                <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
                  <MetricRow
                    icon={<IndianRupee className="w-4 h-4 text-[#16A34A]" />}
                    label="જપ્તી કિંમત"
                    value={`₹${selectedCrimeData.seizureValue} Cr`}
                  />
                  <MetricRow
                    icon={<AlertTriangle className="w-4 h-4 text-[#DC2626]" />}
                    label="Repeat Offenders"
                    value={selectedCrimeData.repeatOffenders.toLocaleString()}
                  />
                  <MetricRow
                    icon={<Clock className="w-4 h-4 text-[#D97706]" />}
                    label="Pending Cases"
                    value={selectedCrimeData.pending.toLocaleString()}
                  />
                </div>

                {/* Status Badges */}
                <div className="pt-3 border-t border-[#F1F5F9]">
                  <div className="text-[12px] text-[#6B7280] mb-2">Status</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#ECFDF5] text-[#16A34A] hover:bg-[#ECFDF5]">
                      Active Enforcement
                    </Badge>
                    {selectedCrimeData.totalCases > 2000 && (
                      <Badge className="bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]">
                        High Alert
                      </Badge>
                    )}
                    {selectedCrimeData.pending > 200 && (
                      <Badge className="bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]">
                        Backlog
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#F1F5F9] flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-[13px]">
                    View Reports
                  </Button>
                  <Button variant="default" size="sm" className="flex-1 text-[13px] bg-[#1D4ED8] hover:bg-[#1E3A8A]">
                    Drill Down
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[14px] border border-dashed border-[#CBD5E1] p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-[15px] font-semibold text-[#0F172A]">Select a District</div>
              <p className="text-[13px] text-[#6B7280] mt-1">
                Click on any district on the map to view detailed crime analytics
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Top Districts Ranking */}
      <div className="mt-6">
        <Panel title="Top 10 Districts by Crime Volume">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(districtCrimeData)
              .sort(([, a], [, b]) => b.totalCases - a.totalCases)
              .slice(0, 10)
              .map(([code, data], index) => {
                const district = districtGeoData.districts.find((d: DistrictData) => d.code === code);
                if (!district) return null;

                return (
                  <div
                    key={code}
                    onClick={() => setSelectedDistrict(code)}
                    className={`rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md ${selectedDistrict === code
                        ? "border-[#1D4ED8] bg-[#EFF6FF]"
                        : "border-[#E5E7EB] hover:border-[#3B82F6]"
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[24px] font-bold text-[#1D4ED8]">#{index + 1}</span>
                      {index < 3 && (
                        <Badge className="bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2] text-[10px]">
                          High
                        </Badge>
                      )}
                    </div>
                    <div className="text-[14px] font-semibold text-[#0F172A]">{district.name}</div>
                    <div className="text-[13px] text-[#6B7280] mt-1">
                      {data.totalCases.toLocaleString()} cases
                    </div>
                    <div className="flex gap-1 mt-2 text-[11px] text-[#6B7280]">
                      <span>L: {data.liquor}</span>
                      <span>·</span>
                      <span>D: {data.NDPSs}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors = {
    blue: { bg: "#EFF6FF", fg: "#1D4ED8" },
    green: { bg: "#ECFDF5", fg: "#16A34A" },
    amber: { bg: "#FFFBEB", fg: "#D97706" },
    primary: { bg: "#EFF6FF", fg: "#1D4ED8" },
  }[color] || { bg: "#EFF6FF", fg: "#1D4ED8" };

  return (
    <div className="rounded-lg border border-[#E5E7EB] p-3">
      <div className="w-8 h-8 rounded-md flex items-center justify-center mb-2" style={{ backgroundColor: colors.bg, color: colors.fg }}>
        {icon}
      </div>
      <div className="text-[16px] font-bold text-[#0F172A]">{value}</div>
      <div className="text-[11px] text-[#6B7280]">{label}</div>
    </div>
  );
}

function MetricRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[13px] text-[#6B7280]">{label}</span>
      </div>
      <span className="text-[13px] font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}

export default GujaratMap;
