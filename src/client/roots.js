/* eslint-disable react/jsx-no-undef */
/* eslint-disable class-methods-use-this */
/* creation du model button pour l'app arbre
 * /src/roots.js - root por regrouper homme connect et leaflet
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat 25/05/2020
 */
import React from "react";
import HomeConnect from "./components/profil/navbar";
import "./components/scss/roots.scss";
import LeafMyMap from "./components/leaflet/leaf";
//import Userinfos from "./components/profil/userinfo";

const RootComponent = () => (
    <div>
        <HomeConnect />
        <LeafMyMap />
    </div>
);

export default RootComponent;
