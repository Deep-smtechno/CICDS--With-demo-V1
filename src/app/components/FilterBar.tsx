import { Calendar, Download, Filter, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function FilterBar() {
  return (
    <div className="sticky top-16 z-30 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-[#1E3A8A] mr-2">
          <Filter className="w-4 h-4" />
          <span className="text-[13px] font-semibold">Filters</span>
        </div>

        <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-[#E5E7EB] bg-white text-[13px] text-[#374151] hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-colors">
          <Calendar className="w-4 h-4 text-[#6B7280]" />
          Last 30 days
        </button>

        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-[150px] text-[13px]">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            <SelectItem value="surat">Surat</SelectItem>
            <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
            <SelectItem value="vadodara">Vadodara</SelectItem>
            <SelectItem value="rajkot">Rajkot</SelectItem>
            <SelectItem value="bhavnagar">Bhavnagar</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-[170px] text-[13px]">
            <SelectValue placeholder="Police Station" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stations</SelectItem>
            <SelectItem value="ps01">Sector 21 PS</SelectItem>
            <SelectItem value="ps02">Civil Lines PS</SelectItem>
            <SelectItem value="ps03">Central PS</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-[150px] text-[13px]">
            <SelectValue placeholder="Crime Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crimes</SelectItem>
            <SelectItem value="liquor">Illegal Liquor</SelectItem>
            <SelectItem value="NDPS">Narcotics</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-[150px] text-[13px]">
            <SelectValue placeholder="Officer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Officers</SelectItem>
            <SelectItem value="o1">Insp. R. Patel</SelectItem>
            <SelectItem value="o2">SI A. Sharma</SelectItem>
            <SelectItem value="o3">Insp. M. Joshi</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-[#E5E7EB] text-[13px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
          <Button
            size="sm"
            className="h-9 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-[13px]"
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-[#E5E7EB] text-[13px]"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
