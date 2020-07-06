/* eslint-disable react/jsx-handler-names */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as React from "react";
import axios from "axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pseudo: "",
            password: "",
            onClose: true,
        };
    }
    onChangePseudo(e) {
        this.setState({
            pseudo: e.target.value,
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            pseudo: this.state.pseudo,
            password: this.state.password,
        };
        this.state.onClose = false;
        console.log(this.state.onClose);

        // console.log(user);
        //let messsageError "";
        axios
            .post("http://localhost/users/authenticate", user)
            .then(res => {
                localStorage.setItem(
                    "tokenUserId",
                    JSON.stringify(res.data.id),
                );
                console.log(res.data.id);
            })
            .catch(erreur => {
                console.warn(`Error${erreur.response.data.message}`);
                //this.messsageError = erreur.response.data.message;
            });
        console.warn(user.pseudo);
        //recharge la page pour entrer un nouveau user
        /* this.setState({
            pseudo: "",
            color: "",
            email: "",
            password: "",
        }); */
        //sinon redirection profil à créer
        //window.location = "/";
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className={["block"].join(" ")}>
                <div className={"field box"}>
                    <p className={"control has-icons-left has-icons-right"}>
                        <label>{"Pseudo"}</label>
                        <input
                            className={"input"}
                            type={"text"}
                            placeholder={"Your Pseudo"}
                            value={this.state.pseudo}
                            onChange={this.onChangePseudo}
                        />
                    </p>
                </div>

                <div className={"field box"}>
                    <p className={"control has-icons-left has-icons-right"}>
                        <label>{"Password"}</label>
                        <input
                            className={"input"}
                            type={"password"}
                            placeholder={"Password"}
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </p>
                </div>
                <div className={"field box"}>
                    <p className={"control"}>
                        <button
                            className={"button is-success"}
                            variant={"primary"}
                            type={"submit"}>
                            {"Submit"}
                        </button>
                    </p>
                </div>
            </form>
        );
    }
}
