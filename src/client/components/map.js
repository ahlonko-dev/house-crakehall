/* becodeorg/mwenbwa
 *
 * /src/client/components/map.js - Map Component
 *
 
 */

import React, {useState, useEffect} from "react";

import {Map, TileLayer, Marker, Popup, Circle} from "react-leaflet";
import {insideCircle} from "geolocation-utils";
import axios from "axios";

const position = [50.65156, 5.5806785];
let myGetArray = [];
let clickData;

const App = () => {
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
    //console.log(allTrees);
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
                if (element.comment == null) {
                    element.comment = "Pas de commentaire";
                    myGetArray.push(element);
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

    if (click === true) {
        return (
            <Map center={position} zoom={13} onClick={handleClick}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </Map>
        );
    }
    return (
        <Map center={position} zoom={13} onClick={handleClick}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
        </Map>
    );
};

export default App;
