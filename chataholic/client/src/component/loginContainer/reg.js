import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

/**
 * The login page component
 * @author kkc21 ll375
 * @version 22/01/2019
 */
class Reg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pw: "",
            authenticate: false
        };
        this.check = this.check.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    check(e) {
        e.preventDefault();
        var a = this.state.username;
        var b = this.state.pw;

        if (!a || !b) {
            alert("Parameter cannot be empty");
            return;
        }

        axios.post('/api/login/regUser', { Username: a, Password: b })
            .then((data) => {
                if (data.data === 200) {
                    alert("User Registration Is Success");
                    this.props.history.push('/')
                } else {
                    alert(data.data);
                }
            }).catch(error => console.log(error));

    }

    changeHandler(e) {
        var key = e.target.name;
        var value = e.target.value;
        this.setState({ [key]: value });
    }

    render() {
        if (this.state.authenticate) {
            return <Redirect to={{
                pathname: "/app/friend",
                state: { login: true }
            }} />
        }
        else {
            return (
                <div className="app-login">
                    <div id ="logo"/>
                    {/* <img src='/logo_green.png' alt="..." /> */}
                    <form className="form" onSubmit={this.check}>
                        <div className="login">
                            <div className="title">User Registration</div>
                            <div className="inputLog">
                                <input type="text" placeholder="Plz enter your username" name="username"
                                       onChange={this.changeHandler} />
                            </div>
                            <div className="inputLog">
                                <input type="password" placeholder="Plz enter your password" name="pw"
                                       onChange={this.changeHandler} />
                            </div>
                            <div className="inputLog">
                                <button type="submit" value="Register" >Register</button>
                                <p className="message">Already have account?<a href="/#" onClick={() => { this.props.history.push('/') }}>Login</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }

    }


}
export default Reg;
