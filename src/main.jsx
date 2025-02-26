import { createRoot } from 'react-dom/client'
import {StrictMode} from 'react'
import App from './App.jsx'
import "./index.css";
import bridge from '@vkontakte/vk-bridge';

bridge.send("VKWebAppInit")

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);