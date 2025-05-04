import Header from "../common/Header";
import { TabType } from "../types/types";

type Props = {
  children?: React.ReactNode;
  className?: string;
  tab: TabType;
}

export default function Page({ tab, className, children }: Props) {
  return (<div className={`page ${className || ""}`}>
    <Header selectedTab={tab} />
    <div className="page-content">
      {children}
    </div>
  </div>);
}
