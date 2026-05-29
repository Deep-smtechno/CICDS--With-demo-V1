import { Settings as SettingsIcon, ShieldCheck, Bell, KeyRound, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { PageShell, Panel } from "../shared";

export function Settings() {
  return (
    <PageShell
      title="System Settings"
      subtitle="Configure your enforcement analytics platform, alerts and access control."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="Organization Profile" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[13px]">Department Name</Label>
              <Input defaultValue="Gujarat State Police — Crime Intelligence" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[13px]">Region Code</Label>
              <Input defaultValue="GJ-CI-2026" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[13px]">Primary Email</Label>
              <Input defaultValue="cieas@gjpolice.gov.in" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[13px]">Helpline</Label>
              <Input defaultValue="+91 79 0000 0000" />
            </div>
          </div>
        </Panel>

        <Panel title="System Status">
          <div className="space-y-3 text-[13px]">
            {[
              { l: "Data Pipeline", v: "Operational", tone: "green" },
              { l: "Analytics Engine", v: "Operational", tone: "green" },
              { l: "Geographic Service", v: "Degraded", tone: "amber" },
              { l: "Export Service", v: "Operational", tone: "green" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between">
                <span className="text-[#6B7280]">{r.l}</span>
                <Badge
                  className={`border-0 text-[11px] ${
                    r.tone === "green"
                      ? "bg-[#ECFDF5] text-[#16A34A]"
                      : "bg-[#FFFBEB] text-[#D97706]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      r.tone === "green"
                        ? "bg-[#16A34A]"
                        : "bg-[#D97706]"
                    }`}
                  />
                  {r.v}
                </Badge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Notifications" className="lg:col-span-2">
          <div className="space-y-4">
            {[
              { i: Bell, l: "High-value crime alerts", d: "Get notified when seizure value exceeds ₹10L." },
              { i: ShieldCheck, l: "Repeat offender re-registration", d: "Alert when a listed offender is re-registered." },
              { i: KeyRound, l: "Login from new device", d: "Receive an email when a new device signs in." },
              { i: Users, l: "Officer performance digest", d: "Weekly leaderboard summary on Monday 09:00." },
            ].map((n, i) => (
              <div
                key={n.l}
                className="flex items-start justify-between gap-4 pb-4 border-b border-[#F1F5F9] last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
                    <n.i className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#0F172A]">{n.l}</div>
                    <div className="text-[12px] text-[#6B7280] mt-0.5">{n.d}</div>
                  </div>
                </div>
                <Switch defaultChecked={i !== 2} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Access Control">
          <div className="space-y-3 text-[13px]">
            {[
              { r: "Commissioner", c: 4, tone: "#1D4ED8" },
              { r: "ADGP", c: 12, tone: "#1E3A8A" },
              { r: "DSP", c: 86, tone: "#16A34A" },
              { r: "Inspector", c: 412, tone: "#D97706" },
              { r: "Sub-Inspector", c: 1208, tone: "#6B7280" },
            ].map((r) => (
              <div key={r.r} className="flex items-center justify-between">
                <span className="font-medium text-[#0F172A]">{r.r}</span>
                <Badge
                  className="border-0 text-[11px]"
                  style={{
                    backgroundColor: `${r.tone}1A`,
                    color: r.tone,
                  }}
                >
                  {r.c} users
                </Badge>
              </div>
            ))}
            <Button className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white h-9 mt-2">
              Manage Roles
            </Button>
          </div>
        </Panel>
      </div>
    </PageShell>
  );
}
