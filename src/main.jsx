import { createRoot } from 'react-dom/client'
import {StrictMode} from 'react'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import "./index.css";
import {AppProvider} from "@/context/AppContext.jsx";

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <AppProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppProvider>
    </StrictMode>
);