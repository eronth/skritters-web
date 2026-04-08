import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FancyIndexPage from './pages/FancyIndexPage/FancyIndexPage'
import SkrittersListPage from './pages/Skritters/SkrittersListPage'
import HowToPlayPage from './pages/HowToPlay/HowToPlayPage'
import CampaignPage from './pages/Campaign/CampaignPage'
import AboutPage from './pages/About/AboutPage'
import EquipmentPage from './pages/Equipment/EquipmentPage'
import CrewBuilderPage from './pages/CrewBuilder/CrewBuilderPage'
import ScenariosPage from './pages/Scenarios/ScenariosPage'
import './App.css'
import 'rpg-awesome/css/rpg-awesome.min.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        <Route path="/about" element={<AboutPage />} /> {/* TODO add content */}
        <Route path="/skritters" element={<SkrittersListPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} /> {/* TODO add content */}
        <Route path="/equipment" element={<EquipmentPage />} /> {/* TODO add content */}
        <Route path="/campaign" element={<CampaignPage />} />
        <Route path="/scenarios" element={<ScenariosPage />} /> {/* TODO add content */}
        <Route path="/crew-builder" element={<CrewBuilderPage />} /> {/* TODO add content */}
      </Routes>
    </BrowserRouter>
  )
}
