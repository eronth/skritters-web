import { TabType } from "../types/types";
import GameTitle from "./GameTitle";
import NavTabs from "./NavTabs";

export default function Header({ selectedTab }: { selectedTab: TabType }) {
  return (
    <header>
      <GameTitle />
      <NavTabs selectedTab={selectedTab} />
    </header>
  );
}
