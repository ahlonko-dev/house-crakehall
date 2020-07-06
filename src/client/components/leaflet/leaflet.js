/* eslint-disable react/jsx-no-literals */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
// @flow
import * as React from "react";
import "leaflet/dist/leaflet.css";
import "./scss/leaflet.scss";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import leafGreen from "./../../assets/leaf-green.png";
import leafRed from "./../../assets/leaf-red.png";
import leafOrange from "./../../assets/leaf-orange.png";
import leafShadow from "./../../assets/leaf-shadow.png";
import marker from "leaflet/dist/images/marker-icon.png";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow,
});

export default class Leaflet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greenIcon: {
                lat: 35.787449,
                lng: -78.6438197,
            },
            redIcon: {
                lat: 35.774416,
                lng: -78.633271,
            },
            orangeIcon: {
                lat: 35.77279,
                lng: -78.652305,
            },
            zoom: 8,
        };
    }

    grenIcon = L.icon({
        iconUrl: leafGreen,
        shadowUrl: leafShadow,
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76],
    });

    redIcon = L.icon({
        iconUrl: leafRed,
        shadowUrl: leafShadow,
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -86],
    });

    orangeIcon = L.icon({
        iconUrl: leafOrange,
        shadowUrl: leafShadow,
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -86],
    });

    render() {
        const positionRedIcon = [
            this.state.redIcon.lat,
            this.state.redIcon.lng,
        ];
        const positionGreenIcon = [
            this.state.greenIcon.lat,
            this.state.greenIcon.lng,
        ];
        const positionOrangeIcon = [
            this.state.orangeIcon.lat,
            this.state.orangeIcon.lng,
        ];
        return (
            <div className="rigth">
                <Map
                    className="map"
                    center={positionGreenIcon}
                    zoom={this.state.zoom}>
                    <TileLayer
                        attribution={
                            '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        }
                        url={
                            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                    />
                    <MarkerClusterGroup>
                        <Marker
                            position={positionGreenIcon}
                            icon={this.grenIcon}>
                            <Popup>{"I am a green leaf"}</Popup>
                        </Marker>
                        <Marker position={positionRedIcon} icon={this.redIcon}>
                            <Popup>{"I am a red leaf"}</Popup>
                        </Marker>
                        <Marker
                            position={positionOrangeIcon}
                            icon={this.orangeIcon}>
                            <Popup>{"I am an orange leaf"}</Popup>
                        </Marker>
                    </MarkerClusterGroup>
                </Map>
            </div>
        );
    }
}
