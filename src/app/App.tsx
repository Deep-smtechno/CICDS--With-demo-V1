import { useState } from "react";
import { FilterBar } from "./components/FilterBar";
import { PageKey, TopNav } from "./components/TopNav";
import { DataUpload } from "./components/pages/DataUpload";
import { OtherState } from "./components/pages/OtherState";
import { UnifiedDashboard } from "./components/pages/UnifiedDashboard";
import { GujaratMap } from "./components/pages/GujaratMap";
import { LoginPage } from "./components/pages/LoginPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      const now = new Date().getTime();
      // 15 minutes in milliseconds
      if (now - parseInt(loginTime, 10) < 15 * 60 * 1000) {
        return true;
      }
      localStorage.removeItem("loginTime");
    }
    return false;
  });
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

  const handleLogin = () => {
    localStorage.setItem("loginTime", new Date().getTime().toString());
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] text-[#0F172A]">
      <TopNav active={page} onChange={handleNav} onLogout={handleLogout} />
      <FilterBar />
      {renderPage()}
    </div>
  );
}
