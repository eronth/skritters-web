import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Header from "../common/Header";
import NavTabs from "../common/NavTabs";
import { TabType } from "../types/types";
import "../common/nav.css";
import "./Page.css";

type Props = {
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  tab: TabType;
}

export default function Page({ tab, className, children, aside }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`page ${tab} ${className || ""}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Header />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <NavTabs selectedTab={tab} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="page-body">
        <div className="page-content">
          {children}
        </div>
        {aside}
      </div>
    </div>
  );
}
