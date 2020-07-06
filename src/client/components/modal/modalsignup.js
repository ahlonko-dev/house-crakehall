/* creation du model button pour l'app arbre
 * /src/components/modal/modal.js - creation du modal
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat 25/05/2020
 */
import React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
//import SignupForm from "../tools/from";
import {NBSP} from "../tools/constants";
import Logup from "../profil/logup";

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

const Modal = ({show = false, onHide}) => {
    if (show === true) {
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
                    <Logup />
                    {NBSP}
                </div>
            </div>,
            document.querySelector("#modals"),
        );
    }
    return null;
};

Modal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
};

export default Modal;
