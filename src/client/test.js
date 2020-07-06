/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import ReactDOM from "react-dom";

// import HelloWorld from "./components/hello";
import Map from "./components/map";
import "./style/map.scss";
//let geoloc = [50.6514745, 5.5805];

//ReactDOM.render(<HelloWorld name={"Hello"} />, document.querySelector("#app"));
ReactDOM.render(Map, document.querySelector("#mapid"));

const myHeaders = new Headers();

const myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
};

const fetchPromise = new Request("/allthrees", myInit);
let threeLat;
let threeLon;
const nextFunction = (myGetArray) => {
    //console.log(myGetArray);
    //let elementInvalides = 0;
    const filter = (obj) => {
        if (obj.circonf !== null) {
            return true;
        }
        //elementInvalides++;
        return false;
    };
    // Nettoyage ddes informations en excluant les valeurs null
    const arrById = myGetArray.filter(filter);
    // const arrByIdLength = arrById.length;
    // const de DEV :
    const arrByIdLength = 25;

    for (let i = 0; i < arrByIdLength; i++) {
        // Définition du prix d'un arbre "FREE"
        threeLat = arrById[i].geoloc.lat;
        threeLon = arrById[i].geoloc.lon;
    }
    console.log(arrById);
};

fetch(fetchPromise).then((response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const myGetArray = [];
        response.json().then((json) => {
            // traitement du JSON

            json.forEach((element) => {
                myGetArray.push(element);
            });

            nextFunction(myGetArray);
        });
    }
    console.log("Oops, nous n'avons pas du JSON!");
});
