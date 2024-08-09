import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.js';
import LipGameInfo from "./pages/LipGameInfo";
import MainPage from "./pages/MainPage";
import HandGameInfo from "./pages/hand/HandGameInfo";
import SoundGameInfo from "./pages/sound/SoundGameInfo";
import CorporateForm from "./pages/users/CorporateForm.js";
import IndividualForm from "./pages/users/IndividualForm.js";
import MemberInsertForm from "./pages/users/MemberInsertForm.js";
import SuccessPage from "./pages/users/SuccessPage.js";


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
                <Route path="users">
                    <Route path="insert" element={<MemberInsertForm />} />
                    <Route path="corporate" element={<CorporateForm />} />
                    <Route path="individual" element={<IndividualForm />} />
                    <Route path="success" element={<SuccessPage />} />
                </Route>
            </Route>

        </Routes>
    );
}

export default App;
