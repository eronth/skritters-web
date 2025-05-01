import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'rpg-awesome/css/rpg-awesome.min.css'
import FancyIndexPage from './pages/FancyIndexPage'
import SkrittersListPage from './pages/Skritters/SkrittersListPage'
import HowToPlayPage from './pages/HowToPlay/HowToPlayPage'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FancyIndexPage />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/skritters" element={<SkrittersListPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        {/* 
        <Route path="/story" element={<StoryPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/character-creation" element={<CharacterCreationPage />} />
        <Route path="/additional-equipment" element={<AdditionalEquipmentPage />} />
        <Route path="/advanced-perks" element={<AdvancedPerksPage />} />
        <Route path="/magic" element={<MagicPage />} />
        <Route path="/creatures" element={<CreaturesPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
