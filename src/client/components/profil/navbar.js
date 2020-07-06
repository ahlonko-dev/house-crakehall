/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/button-has-type */
/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

// import * as React from "react";
// import Userinfos from "./userinfo";
// import Login from "./login";
// import Logup from "./logup";

import "./scss/navbar.scss";
import ToolsInfo from "../tools/toolsinfo";

import React, {useState, useCallback} from "react";
import ModalHome from "../modal/modalacc";
import ModalInfo from "../modal/modalinfo";

const HomeConnect = () => {
    const [modalShowHome, setModalShowHome] = useState(true);
    const [modalShowInfo, setModalShowInfo] = useState(false);

    const handleCloseModalHome = useCallback(() => {
        setModalShowHome(false);
    }, [setModalShowHome]);
    const handleCloseModalInfo = useCallback(() => {
        setModalShowInfo(false);
    }, [setModalShowInfo]);
    const handleModalInfo = useCallback(() => {
        setModalShowInfo(true);
    }, [setModalShowInfo]);

    return (
        <div
            className={["is-mobile", "is-multiline", "is-full", "sg-up"].join(
                " ",
            )}>
            <div className={"buttons has-addons is-centered btn-sg"}>
                <ToolsInfo onInfo={handleModalInfo} onOut={handleModalInfo} />
            </div>

            <ModalInfo showInfo={modalShowInfo} onHide={handleCloseModalInfo} />

            <ModalHome showHome={modalShowHome} onHide={handleCloseModalHome} />
        </div>
    );
};

export default HomeConnect;
