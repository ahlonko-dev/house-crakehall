/* eslint-disable react/jsx-handler-names */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as React from "react";
import axios from "axios";

export default class Logup extends React.Component {
    constructor(props) {
        super(props);

        this.nextStape = false;

        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        //this.onChangeUserCreated = this.onChangeUserCreated.bind(this);
        //this.onChangeUserMessage = this.onChangeUserMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pseudo: "",
            color: "",
            email: "",
            password: "",
            userCreated: "",
            message: "",
        };
    }
    onChangePseudo(e) {
        this.setState({
            pseudo: e.target.value,
        });
    }
    onChangeColor(e) {
        this.setState({
            color: e.target.value,
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
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
            color: this.state.color,
            email: this.state.email,
            password: this.state.password,
        };

        console.log(user);
        //let messsageError "";

        axios
            .post("http://localhost/users/register", user)
            .then((res) => {
                localStorage.setItem(
                    "tokenUserId",
                    JSON.stringify(res.data.id),
                );
                console.log(res.data);
            })
            .catch((erreur) => {
                console.warn(`Error${erreur.response.data.message}`);
            });

        //sinon redirection
        window.location = "/";
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className={"field box"}>
                    <p className={"control"}>
                        <label>{"Pseudo"}</label>
                        <input
                            className={"input"}
                            type={"text"}
                            placeholder={"Your Pseudo"}
                            value={this.state.pseudo}
                            onChange={this.onChangePseudo}
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
                            placeholder={"Password"}
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </p>
                </div>
                <div className={"field box"}>
                    <p className={"control"}>
                        <label>{"Email address"}</label>
                        <input
                            className={"input"}
                            type={"email"}
                            placeholder={"name@example.com"}
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </p>
                </div>
                <div className={"field box"}>
                    <p className={"control"}>
                        <label>{"Colors "}</label>
                        <div
                            className={"select"}
                            as={"select"}
                            type={"text"}
                            placeholder={"Your color"}
                            value={this.state.color}
                            onChange={this.onChangeColor}>
                            <select>
                                <option>{"color choice"}</option>
                                <option>{"red"}</option>
                                <option>{"yellow"}</option>
                                <option>{"green"}</option>
                                <option>{"dark"}</option>
                                <option>{"grey"}</option>
                                <option>{"brown"}</option>
                                <option>{"orange"}</option>
                                <option>{"pink"}</option>
                                <option>{"purple"}</option>
                                <option>{"white"}</option>
                            </select>
                        </div>
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
    }
}
