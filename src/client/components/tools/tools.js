/* creation du model button pour l'app arbre
 * /src/components/tools/button.js - model button
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat 25/05/2020
 */

import {NBSP} from "./constants";
import PropType from "prop-types";
import React from "react";
import ButtonRect from "./buttonrect";

const Tools = ({onConnection, onInscription}) => (
    <div className={["is-flex", "columns"].join(" ")}>
        <div className={["is-centrerd", "column"].join(" ")}>
            <ButtonRect
                label={"Connection"}
                title={"connection au profil"}
                disabled={onclick}
                onClick={onConnection}
            />
            {NBSP}
            <ButtonRect
                label={"inscription"}
                title={"inscription au profil"}
                disabled={onclick}
                onClick={onInscription}
            />
        </div>
    </div>
);

Tools.propType = {
    onConnection: PropType.func.isRequired,
    onInscription: PropType.func.disabled,
};

export default Tools;
