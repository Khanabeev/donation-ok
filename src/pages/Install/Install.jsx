import React from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import InstallDesktop from "@/pages/Install/InstallDesktop.jsx";
import InstallMobile from "@/pages/Install/InstallMobile.jsx";

const Install = () => {
    return (
        <>
            <BrowserView>
                <InstallDesktop/>
            </BrowserView>
            <MobileView>
                <InstallMobile/>
            </MobileView>

        </>
    );
};

Install.propTypes = {};

export default Install;