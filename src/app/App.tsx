import { useState } from "react";
import { FilterBar } from "./components/FilterBar";
import { PageKey, TopNav } from "./components/TopNav";
import { DataUpload } from "./components/pages/DataUpload";
import { OtherState } from "./components/pages/OtherState";
import { UnifiedDashboard } from "./components/pages/UnifiedDashboard";
import { GujaratMap } from "./components/pages/GujaratMap";
import { LoginPage } from "./components/pages/LoginPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<PageKey>("dashboard");

  const handleNav = (k: PageKey) => {
    setPage(k);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <UnifiedDashboard />;
      case "upload":
        return <DataUpload />;
      case "otherstate":
        return <OtherState />;
      case "map":
        return <GujaratMap />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] text-[#0F172A]">
      <TopNav active={page} onChange={handleNav} onLogout={() => setIsLoggedIn(false)} />
      <FilterBar />
      {renderPage()}
    </div>
  );
}
