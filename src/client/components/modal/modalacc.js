/* creation du model button pour l'app arbre
 * /src/components/modal/modalhome.js - creation du modal de connection au jeux
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat start projet 25/05/2020
 */
import React, {useState, useCallback} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import Tools from "../tools/tools";

import Modal from "./modalsignup";
import ConnectModal from "./modalconnect";

const containerStyles = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    zIndex: 1100,
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.5)",
};

const ModalHome = ({showHome = true, onHide}) => {
    const [modalShow, setModalShow] = useState(false);
    const [connectModalShow, setConnectModalShow] = useState(false);

    const handleInscription = useCallback(() => {
        setModalShow(true);
    }, [setModalShow]);

    const handleConnection = useCallback(() => {
        setConnectModalShow(true);
    }, [setConnectModalShow]);

    const handleCloseModal = useCallback(() => {
        setModalShow(false);
    }, [setModalShow]);

    const handleCloseModalConnect = useCallback(() => {
        setConnectModalShow(false);
    }, [setConnectModalShow]);
    if (showHome === true) {
        return createPortal(
            <div style={containerStyles}>
                <div
                    className={[
                        "columns",
                        "box",
                        "box-shadow",
                        "is-mobile",
                        "is-multiline",
                    ].join(" ")}>
                    <div>
                        <div
                            className={[
                                "box",
                                "box-shadow",
                                "column",
                                "is-centered",
                            ].join(" ")}>
                            <button
                                className={
                                    "button is-success is-small is-pulled-right"
                                }
                                label={"Close"}
                                onClick={onHide}>
                                {"X"}
                            </button>
                            <div
                                className={[
                                    "box",
                                    "box-shadow",
                                    "has-text-success",
                                    "is-centrerd",
                                ].join(" ")}>
                                <h1 className={[""].join(" ")}>
                                    {"Welcom"} <br /> {"The tree buying game !"}
                                </h1>
                            </div>

                            <Tools
                                onConnection={handleConnection}
                                onInscription={handleInscription}
                            />

                            <Modal show={modalShow} onHide={handleCloseModal} />
                            <ConnectModal
                                connectshow={connectModalShow}
                                onHide={handleCloseModalConnect}
                            />
                        </div>
                    </div>
                </div>
            </div>,
            document.querySelector("#modals"),
        );
    }
    return null;
};

ModalHome.propTypes = {
    showHome: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
};

export default ModalHome;
