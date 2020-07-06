/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-literals */
import React, {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";
//
//import {render} from "react-dom";
import {Map, Marker, Popup, TileLayer, Circle} from "react-leaflet";
import {insideCircle} from "geolocation-utils";
import "leaflet/dist/leaflet.css";
import "./scss/leaflet.scss";
import L from "leaflet";
import marker from "leaflet/dist/images/marker-icon.png";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow,
});

const position = [50.65156, 5.5806785];
let myGetArray = [];
let clickData;

const Leaf = () => {
    const handelbuyTree = args => {
        console.log(args);
        //"href-buy";
        // "href-buy-cher";
        // "Non non non";
        // switch();
    };

    // Stoque l'ensemble des arbres
    const [allTrees, setAllTrees] = useState([]);
    // Stoque le centre geographique
    const [centerGeoloc, setCenterGeoloc] = useState([50.65156, 5.5806785]);
    //stoque la taille du rayon du cercle
    const [radiusGeoloc] = useState(500);

    const [click, setClick] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost/trees/alltrees")
            .then(res => setAllTrees(res.data))
            .catch(erreur => {
                console.warn(erreur);
            });
    }, []);

    const geolocCircle = getCenter => {
        allTrees.forEach(element => {
            const center = {lat: getCenter[0], lon: getCenter[1]};
            const radius = 500;

            const testCircleTree = insideCircle(
                {lat: element.geoloc.lat, lon: element.geoloc.lon},
                center,
                radius,
            );

            if (testCircleTree === true) {
                // modifie la valeur de la variable si pas de commentaire enregistré sur l'abre
                if (element.comment == null) {
                    element.comment = "Pas de commentaire";
                    myGetArray.push(element);
                }

                // vérifie si l'arbre est achetable et dispo
                if (element.free === true) {
                    element.free = "Buy Me !";
                    element.buyButton = "href-buy";
                    // vérifie si l'abre est achetable et appartient à un joueur qui ne l'a pas encore lock
                } else if (element.free === false && element.locked === false) {
                    element.free = "Tu vas devoir payer plus cher";
                    element.buyButton = "href-buy-cher";

                    // Vérifie si l'abre n'est plus achetable car a été lock par un joueur
                } else if (element.free === false && element.locked === true) {
                    element.free = "Tu ne peux pas acheter cet arbre";
                    element.buyButton = "Non non non";

                    // valeur de callback
                } else {
                    myGetArray.push(element);
                }
            }

            console.log("chargement des données en cours... Wait for it !");
        });
    };

    const handleClick = e => {
        clickData = [e.latlng.lat, e.latlng.lng];
        setCenterGeoloc(clickData);

        if (click === false) {
            myGetArray = [];
            geolocCircle(clickData);
            setClick(true);
        } else {
            setClick(false);
        }
    };

    console.log(allTrees);
    if (click === true) {
        return (
            <Map
                className={"leaflet-container"}
                center={position}
                zoom={13}
                onClick={handleClick}>
                <TileLayer
                    url={
                        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    }
                    attribution={
                        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }
                />
                <Circle center={centerGeoloc} radius={radiusGeoloc} />

                {myGetArray.map(item => (
                    <React.Fragment key={item._id}>
                        <Marker position={[item.geoloc.lat, item.geoloc.lon]}>
                            <Popup>
                                Nom de l'arbre: {item.random_name}
                                <br />
                                Nombre de feuilles : {item.leave}
                                <br /> <a href={item.wikilink}> Lien wiki</a>
                                <br /> Commentaire : {item.comment}
                                <br /> lat: {item.geoloc.lat} long:
                                {item.geoloc.lon}
                                <br /> Buy :
                                <button
                                    className={
                                        "button is-success is-small is-pulled-right"
                                    }
                                    label={"Close"}
                                    // {() => this.handleClick(id)}
                                    onClick={() =>
                                        handelbuyTree(item.buyButton)
                                    }>
                                    {item.free}
                                </button>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </Map>
        );
    }
    return (
        <Map
            className={"leaflet-container"}
            center={position}
            zoom={13}
            onClick={handleClick}>
            <TileLayer
                url={
                    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                }
                attribution={
                    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                }
            />
        </Map>
    );
};

// Leaf.propTypes = {
//     buyTree: PropTypes.func.isRequired,
// };

export default Leaf;
