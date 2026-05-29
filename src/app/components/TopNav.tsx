import { Bell, Shield, ChevronDown, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export type PageKey = "dashboard" | "upload" | "otherstate" | "map";

const NAV: { key: PageKey; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "upload", label: "Upload Data" },
  { key: "otherstate", label: "Other State" },
  { key: "map", label: "Map View" },
];

export function TopNav({
  active,
  onChange,
}: {
  active: PageKey;
  onChange: (k: PageKey) => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center gap-6">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#1D4ED8] flex items-center justify-center text-white">
            <Shield className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold text-[#1E3A8A]">Gujarat police</div>
            <div className="text-[11px] text-[#6B7280] -mt-0.5">
              dashboard
            </div>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-1 flex-1">
          {NAV.map((n) => {
            const isActive = active === n.key;
            return (
              <button
                key={n.key}
                onClick={() => onChange(n.key)}
                className={`px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-180 ${
                  isActive
                    ? "bg-[#EFF6FF] text-[#1D4ED8]"
                    : "text-[#374151] hover:bg-[#F3F4F6]"
                }`}
              >
                {n.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-2.5 w-4 h-4 text-[#6B7280]" />
          <Input
            placeholder="Search cases, officers..."
            className="pl-8 w-56 h-9 bg-[#F9FAFB] border-[#E5E7EB]"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto xl:ml-0">
          <button className="relative w-9 h-9 rounded-full hover:bg-[#F3F4F6] flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5 text-[#374151]" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 bg-[#DC2626] text-white text-[10px] rounded-full">
              7
            </Badge>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[#F3F4F6] transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#1E3A8A] text-white text-[12px]">
                    SK
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left leading-tight">
                  <div className="text-[13px] font-medium text-[#111827]">
                    SP S. Kumar
                  </div>
                  <div className="text-[11px] text-[#6B7280]">Commissioner</div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#6B7280] hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Security & Access</DropdownMenuItem>
              <DropdownMenuItem>Activity Log</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#DC2626]">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-6 flex flex-col gap-1">
                {NAV.map((n) => (
                  <button
                    key={n.key}
                    onClick={() => onChange(n.key)}
                    className={`text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                      active === n.key
                        ? "bg-[#EFF6FF] text-[#1D4ED8]"
                        : "text-[#374151] hover:bg-[#F3F4F6]"
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
