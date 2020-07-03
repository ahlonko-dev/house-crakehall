/* eslint-disable react/jsx-handler-names */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* creation du model button pour l'app arbre
 * /src/components/profil/login.js - model fromulaire de connection au jeux
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat 25/05/2020
 */
import React from "react";
import {useFormik} from "formik";
import axios from "axios";

const Login = () => {
    const formik = useFormik({
        initialValues: {
            password: "",
            pseudo: "",
        },
        onSubmit: (values) => {
            console.warn(JSON.stringify(values, null, 2));
        },
    });
    axios
        .post(
            "https://crack-hall-trees.herokuapp.com/users/authenticate",
            formik.values,
        )
        .then((res) => {
            localStorage.setItem("tokenUserId", JSON.stringify(res.data.id));
            console.warn(res.data.id);
        })
        .catch((erreur) => {
            console.warn(`Error${erreur.response.data.message}`);
            //this.messsageError = erreur.response.data.message;
        });
    console.warn(formik.values.pseudo);
    return (
        <form onSubmit={formik.handleSubmit} className={["block"].join(" ")}>
            <div className={"field"}>
                <p className={"control has-icons-left has-icons-right"}>
                    <label htmlFor={"pseudo"}>{"pseudo"}</label>
                    <input
                        className={"input"}
                        id={"pseudo"}
                        name={"pseudo"}
                        type={"text"}
                        onChange={formik.handleChange}
                        value={formik.values.pseudo}
                    />
                </p>
            </div>
            <div className={"field"}>
                <p className={"control has-icons-left has-icons-right"}>
                    <label htmlFor={"password"}>{"Password"}</label>
                    <input
                        className={"input"}
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </p>
            </div>
            <div className={"field"}>
                <p className={"control"}>
                    <button className={"button is-success"} type={"submit"}>
                        {"Submit"}
                    </button>
                </p>
            </div>
        </form>
    );
};

export default Login;
