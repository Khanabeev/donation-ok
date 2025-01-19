import { createRoot } from 'react-dom/client'
import {StrictMode} from 'react'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import "./index.css";

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);