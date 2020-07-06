/* creation du model button pour l'app arbre
 * /src/components/modal/modalconnect.js - creation du modal de connection
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat 25/05/2020
 */
import React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
// import ConnectForm from "../tools/fromconnect";
import {NBSP} from "../tools/constants";
import Login from "../profil/login";

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

const ConnectModal = ({connectshow = false, onHide}) => {
    if (connectshow === true) {
        return createPortal(
            <div style={containerStyles}>
                <div className={"box"}>
                    <button
                        className={"button is-success is-small is-pulled-right"}
                        label={"Close"}
                        onClick={onHide}>
                        {"X"}
                    </button>
                    <h1 className={"title"}>{"Welcom"}</h1>
                    {NBSP}
                    <Login />
                    {NBSP}
                </div>
            </div>,
            document.querySelector("#modals"),
        );
    }
    return null;
};

ConnectModal.propTypes = {
    connectshow: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
};

export default ConnectModal;
