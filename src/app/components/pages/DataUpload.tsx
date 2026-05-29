import {
  CloudUpload,
  Database,
  Download,
  Eye,
  FileSpreadsheet,
  Loader2,
  RefreshCw,
} from "lucide-react";
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
import { PageShell, Panel } from "../shared";

export function DataUpload() {
  return (
    <PageShell
      title="Crime Dataset Upload Center"
      subtitle="Upload Excel datasets to automatically generate intelligence reports and enforcement analytics."
    >
      <Panel>
        <div className="border-2 border-dashed border-[#BFDBFE] bg-[#F8FAFF] rounded-xl p-12 text-center hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#DBEAFE] flex items-center justify-center mb-4">
            <CloudUpload className="w-8 h-8 text-[#1D4ED8]" />
          </div>
          <h3
            className="text-[#0F172A] mb-1"
            style={{ fontSize: 18, fontWeight: 600 }}
          >
            Drop your crime dataset here
          </h3>
          <p className="text-[14px] text-[#6B7280] mb-5">
            Drag & drop or browse your file. Supports .xlsx and .csv up to
            50 MB.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white">
              <FileSpreadsheet className="w-4 h-4" />
              Browse Files
            </Button>
            <Button
              variant="outline"
              className="border-[#E5E7EB]"
            >
              <Download className="w-4 h-4" />
              Download Template
            </Button>
          </div>
          <div className="mt-5 flex justify-center gap-2">
            <Badge variant="outline" className="border-[#BFDBFE] text-[#1D4ED8]">
              .xlsx
            </Badge>
            <Badge variant="outline" className="border-[#BFDBFE] text-[#1D4ED8]">
              .csv
            </Badge>
            <Badge variant="outline" className="border-[#BFDBFE] text-[#1D4ED8]">
              max 50 MB
            </Badge>
          </div>
        </div>
      </Panel>

      <Panel
        title="Recent Upload History"
        action={
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[12px] border-[#E5E7EB]"
          >
            <Database className="w-3.5 h-3.5" />
            Manage Datasets
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow className="border-[#F1F5F9]">
              {[
                "Upload ID",
                "File Name",
                "Uploaded By",
                "Upload Date",
                "Records",
                "Status",
                "Actions",
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
              {
                id: "UPL-3411",
                f: "crime_dataset_may_2026.xlsx",
                u: "SP S. Kumar",
                d: "28 May 2026, 10:14",
                r: "48,210",
                s: "Processing",
              },
              {
                id: "UPL-3410",
                f: "seizure_report_q2.xlsx",
                u: "DSP V. Iyer",
                d: "27 May 2026, 18:32",
                r: "12,841",
                s: "Completed",
              },
              {
                id: "UPL-3409",
                f: "officer_perf_apr.csv",
                u: "Insp. R. Patel",
                d: "25 May 2026, 09:50",
                r: "2,104",
                s: "Completed",
              },
              {
                id: "UPL-3408",
                f: "interstate_routes.xlsx",
                u: "ADGP K. Menon",
                d: "23 May 2026, 14:08",
                r: "884",
                s: "Failed",
              },
              {
                id: "UPL-3407",
                f: "narcotics_master_2026.xlsx",
                u: "DSP V. Iyer",
                d: "20 May 2026, 11:21",
                r: "6,732",
                s: "Completed",
              },
            ].map((r) => {
              const tone =
                r.s === "Completed"
                  ? "bg-[#ECFDF5] text-[#16A34A]"
                  : r.s === "Processing"
                  ? "bg-[#EFF6FF] text-[#1D4ED8]"
                  : "bg-[#FEF2F2] text-[#DC2626]";
              return (
                <TableRow
                  key={r.id}
                  className="border-[#F1F5F9] hover:bg-[#F9FAFB]"
                >
                  <TableCell className="text-[13px] font-medium text-[#1D4ED8]">
                    {r.id}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#374151]">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-[#16A34A]" />
                      {r.f}
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] text-[#374151]">
                    {r.u}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#374151]">
                    {r.d}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#374151]">
                    {r.r}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${tone} border-0 text-[11px]`}>
                      {r.s === "Processing" && (
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      )}
                      {r.s}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#6B7280]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#6B7280]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Download className="w-3.5 h-3.5 text-[#6B7280]" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Panel>
    </PageShell>
  );
}
