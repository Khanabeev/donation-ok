import {Routes, Route, HashRouter} from "react-router";
import Donation from "./pages/Donation/Donation.jsx";
import Welcome from "./pages/Welcome/Welcome.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Install from "@/pages/Install/Install.jsx";
import {AppProvider} from "@/context/AppContext.jsx";
import NotRegistered from "@/pages/NotRegistered/NotRegistered.jsx";
import ProtectedRoute from "@/middleware/ProtectedRoute.jsx";

const App = () => {

    return (
        <AppProvider>
            <HashRouter>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route index path="/" element={<Welcome/>}/>
                    </Route>

                    <Route path="/install" element={<Install/>}/>
                    <Route path="/donate" element={<Donation/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/not-registered" element={<NotRegistered/>}/>
                </Routes>
            </HashRouter>
        </AppProvider>
    );
};

export default App;