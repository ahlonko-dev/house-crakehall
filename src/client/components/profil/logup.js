/* eslint-disable react/jsx-handler-names */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* creation du model button pour l'app arbre
 * /src/components/profil/logup.js - model fromulaire de inscription au jeux
 * code by sarahG4000 for becode formation
 * creation for montagne
 * creat 25/05/2020
 */
import React from "react";
import axios from "axios";
import {useFormik} from "formik";

const Logup = () => {
    const formik = useFormik({
        initialValues: {
            pseudo: "",
            email: "",
            color: "",
            password: "",
        },
        onSubmit: (values) => {
            console.warn(JSON.stringify(values, null, 2));
            window.location = "/";
        },
    });
    axios
        .post(
            "https://crack-hall-trees.herokuapp.com/users/register",
            formik.values,
        )
        .then((res) => console.log(res.data))
        .catch((erreur) => {
            console.warn(`Error${erreur.response.data.message}`);
            //this.messsageError = erreur.response.data.message;
        });
    console.warn(formik.values.pseudo);
    //sinon redirection

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"field box"}>
                <p className={"control"}>
                    <label>{"Pseudo"}</label>
                    <input
                        className={"input"}
                        type={"name"}
                        name={"pseudo"}
                        id={"pseudo"}
                        placeholder={"Your Pseudo"}
                        value={formik.values.pseudo}
                        onChange={formik.handleChange}
                    />
                    <p className={"text-muted"}>
                        {"We'll never share your email with anyone else."}
                    </p>
                </p>
            </div>

            <div className={"field box"}>
                <p className={"control"}>
                    <label>{"Password"}</label>
                    <input
                        className={"input"}
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        placeholder={"Password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                </p>
            </div>
            <div className={"field box"}>
                <p className={"control"}>
                    <label>{"Email address"}</label>
                    <input
                        className={"input"}
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"name@example.com"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </p>
            </div>
            <div className={"field box"}>
                <p className={"control"}>
                    <label>{"Colors "}</label>
                    <p className={"select"}>
                        <select
                            as={"select"}
                            type={"text"}
                            name={"color"}
                            id={"color"}
                            placeholder={"Your color"}
                            value={formik.values.color}
                            onChange={formik.handleChange}>
                            <option>{"color choice"}</option>
                            <option>{"red"}</option>
                            <option>{"yellow"}</option>
                            <option>{"green"}</option>
                            <option>{"dark"}</option>
                            <option>{"grey"}</option>
                            <option>{"orange"}</option>
                            <option>{"purple"}</option>
                            <option>{"white"}</option>
                        </select>
                    </p>
                </p>
            </div>
            <div className={"field box"}>
                <p className={"control"}>
                    <button
                        className={"button is-success"}
                        variant={"success"}
                        type={"submit"}>
                        {"Submit"}
                    </button>
                </p>
            </div>
        </form>
    );
};

export default Logup;
