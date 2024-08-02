import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.js';
import MainPage from "./pages/MainPage";
import HandGameInfo from "./pages/hand/HandGameInfo";
import LipGameInfo from "./pages/lip/LipGameInfo";
import SoundGameInfo from "./pages/sound/SoundGameInfo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<MainPage/>}/>
                <Route path="game">
                    <Route path="hand" element={<HandGameInfo/>}/>
                    <Route path="sound" element={<SoundGameInfo/>}/>
                    <Route path="lip" element={<LipGameInfo/>}/>
                </Route>
            </Route>

        </Routes>
    );
}

export default App;
