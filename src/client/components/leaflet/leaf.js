/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-literals */
/* creation du model button pour l'app arbre
 * /src/components/leaflet/fleaf.js - carte du jeux
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat 25/05/2020
 */
import React, {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {Map, Marker, Popup, TileLayer, Circle} from "react-leaflet";
import {insideCircle} from "geolocation-utils";

import "./scss/leaflet.scss";
import Leaflet from "leaflet";
import L from "leaflet";

import marker from "leaflet/dist/images/marker-icon.png";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow,
});

const position = [50.65156, 5.5806785];

// UserForTest
const LeafMyMap = () => {
    const handelbuyTree = (hrefLink, playerId, treeId) => {
        console.log("achat d'un arbre");
        //console.log(hrefLink, playerId, treeId);
        const postParams = [playerId, treeId];
        axios
            .post(hrefLink, postParams)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error.repsonse.data.message);
            });
    };

    // Stoque l'ensemble des arbres
    const [allTrees, setAllTrees] = useState([]);
    const [playerId, setPlayerId] = useState();
    const myGetArray = [];

    useEffect(() => {
        setPlayerId(localStorage.getItem("tokenUserId").replace(/\"/g, ""));
        axios
            .get("https://crack-hall-trees.herokuapp.com/trees/alltrees")
            .then((res) => setAllTrees(res.data))
            .catch((erreur) => {
                console.warn(erreur); // c'est la ligne 71
            });
    }, []);

    allTrees.forEach((element) => {
        if (element.comment == null) {
            element.comment = "Pas de commentaire";
            myGetArray.push(element);
        }

        // vérifie si l'arbre est achetable et dispo
        if (element.free === true) {
            element.butonInfo = "Buy Me !";
            element.buyButton = `https://crack-hall-trees.herokuapp.com/trees/buyafreetree`;
            element.butonStatus = false;
            myGetArray.push(element);
            // vérifie si l'abre est achetable et appartient à un joueur qui ne l'a pas encore lock
        } else if (element.free === false && element.locked === false) {
            element.butonInfo = "Acheter l'arbre d'un autre joueur";
            element.buyButton = `https://crack-hall-trees.herokuapp.com/trees/buyotherplayertree`;
            element.butonStatus = false;
            myGetArray.push(element);

            // Vérifie si l'abre n'est plus achetable car a été lock par un joueur
        } else if (element.free === false && element.locked === true) {
            element.butonInfo = "Arbre verouillé";
            element.buyButton = "Non non non";
            element.butonStatus = true;
            myGetArray.push(element);
        }
    });

    // console.log(allTrees);

    let myColorista;

    myGetArray.map((itemColor) => {
        if (itemColor.player_color === "red") {
            myColorista = "#d81205";
        } else if (itemColor.player_color === "yellow") {
            myColorista = "#f1ca08";
        } else if (itemColor.player_color === "green") {
            myColorista = "#0ca702";
        } else if (itemColor.player_color === "dark") {
            myColorista = "#030303";
        } else if (itemColor.player_color === "grey") {
            myColorista = "#737171";
        } else if (itemColor.player_color === "orange") {
            myColorista = "#e56704";
        } else if (itemColor.player_color === "purple") {
            myColorista = "#8002de";
        } else if (itemColor.player_color === "white") {
            myColorista = "#fcfbfc";
        } else {
            myColorista = "#03f3d2";
        }
    });

    const markerHtmlStyles = `
    background-color: ${myColorista};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

    const icon = Leaflet.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`,
    });

    return (
        <Map className={"leaflet-container"} center={position} zoom={13}>
            <TileLayer
                url={
                    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                }
                attribution={
                    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                }
            />
            <MarkerClusterGroup>
                {myGetArray.map((item) => (
                    <React.Fragment key={item._id}>
                        <Marker
                            icon={icon}
                            position={[item.geoloc.lat, item.geoloc.lon]}>
                            <Popup>
                                <div
                                    className={[
                                        "title",
                                        "modal-card",
                                        "sg-tree",
                                    ].join(" ")}>
                                    <header className={"modal-card-head"}>
                                        <p
                                            className={
                                                "modal-card-title is-6 is-spaced"
                                            }>
                                            <strong>{"Profile tree"}</strong>
                                        </p>
                                    </header>
                                    <section className={"modal-card-body"}>
                                        <p className={"subtitle is-5"}>
                                            <strong>{"Nom de l'arbre:"}</strong>{" "}
                                            {item.random_name}{" "}
                                        </p>

                                        <p className={"subtitle is-5"}>
                                            <strong>
                                                {"Nombre de feuilles :"}
                                            </strong>{" "}
                                            {item.leave}
                                        </p>

                                        <a
                                            className={"subtitle is-5"}
                                            href={item.wikilink}>
                                            {"Lien wikipédia"}
                                        </a>

                                        <p className={"subtitle is-5"}>
                                            <strong>{"Commentaire :"}</strong>{" "}
                                            {item.comment}
                                        </p>

                                        <p className={"subtitle is-5"}>
                                            <strong>{"lat:"}</strong>{" "}
                                            {item.geoloc.lat} <br />{" "}
                                            <strong>{"long:"}</strong>
                                            {item.geoloc.lon}
                                        </p>
                                    </section>
                                    <footer className={"modal-card-foot"}>
                                        <button
                                            disabled={item.butonStatus}
                                            className={
                                                "button is-success is-small is-pulled-right"
                                            }
                                            label={"Close"}
                                            // {() => this.handleClick(id)}
                                            onClick={() =>
                                                handelbuyTree(
                                                    item.buyButton,
                                                    playerId,
                                                    item.id,
                                                )
                                            }>
                                            {item.butonInfo}
                                        </button>
                                    </footer>
                                </div>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </MarkerClusterGroup>
        </Map>
    );
};

export default LeafMyMap;
