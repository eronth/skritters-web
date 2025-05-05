import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FancyIndexPage from './pages/FancyIndexPage'
import SkrittersListPage from './pages/Skritters/SkrittersListPage'
import HowToPlayPage from './pages/HowToPlay/HowToPlayPage'
import CampaignPage from './pages/Campaign/CampaignPage'
import AboutPage from './pages/About/AboutPage'
import EquipmentPage from './pages/Equipment/EquipmentPage'
import CrewBuilderPage from './pages/CrewBuilder/CrewBuilderPage'
import './App.css'
import 'rpg-awesome/css/rpg-awesome.min.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skritters" element={<SkrittersListPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/campaign" element={<CampaignPage />} />
        <Route path="/crew-builder" element={<CrewBuilderPage />} />
      </Routes>
    </BrowserRouter>
  )
}
