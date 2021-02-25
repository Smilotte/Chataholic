import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

/**
 * The login page component
 * @author kkc21 ll375
 * @version 10/03/2019
 */
class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            pw: "",
            authenticate: false
        };
        this.check = this.check.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    //eventhandler for authentication
    check(e)
    {
        e.preventDefault();
        var a = this.state.username;
        var b = this.state.pw;
        axios.get('/api/login/authenticate',{params: {Username: a, Password:b} })
        .then((data) => {
            if (data.data.length === 1) {
                var id=parseInt(data.data[0].UserId,10);

                localStorage.setItem("UserId", id);
                localStorage.setItem("login", true);
                this.setState({authenticate: true});
            }
            else alert("Invalid username or password");
        })
        .catch(error => console.log(error));

        // localStorage.setItem("UserId", 1);
        // localStorage.setItem("login", true);
        // this.setState({authenticate: true});

    }

    changeHandler(e){
        var key = e.target.name;
        var value = e.target.value;
        this.setState({[key] :value});
    }

    render(){
        if(this.state.authenticate){
            return <Redirect to={{
                pathname: "/app/friend",
                state: { login: true }
            }}/>
        }
        else{
            return(

                <div className="app-login">
                    <div id ="logo"/>
                    {/* <img src='/logo_green.png' alt="..." /> */}
                    <form className="form" onSubmit={this.check}>
                        <div className="login">
                            <div className="title">Login</div>
                            <div className="inputLog">
                                <input type="text" placeholder="Plz enter your username" name="username"
                                       onChange={this.changeHandler} />
                            </div>
                            <div className="inputLog">
                                <input type="password" placeholder="Plz enter your password" name="pw"
                                       onChange={this.changeHandler} />
                            </div>
                            <div className="inputLog">
                                <button type="submit" value="Submit" >Login</button>
                                <p className="message">Not registered?
                                    <a href="/#" onClick={(e) => {e.preventDefault(); this.props.history.push('/reg')}}>Create an account</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }

    }


}
export default Login;
