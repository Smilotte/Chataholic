import React from 'react';
import TopBar from './component/outterContainer/TopBar.js';
import BottomBar from './component/outterContainer/BottomBar.js';
import Pairing from './component/innerContainer/Pairing.js';
import Profile from './component/innerContainer/Profile.js';
import FriendList from './component/chatroomContainer/FriendList.js';
import FriendProfile from './component/chatroomContainer/FriendProfile.js';
// import FriendSetting from "./component/chatroomContainer/FriendSetting.js";
import Setting from "./component/innerContainer/Setting.js";
import ChatRoom from "./component/chatroomContainer/ChatRoom.js";
import Testing from './component/innerContainer/Testing';
import {Redirect, Route, Switch} from 'react-router-dom';
import io from "./socket";
import './App.css';
import FriendList from "./component/chatroomContainer/FriendList";
import Pairing from "./component/innerContainer/Pairing";
import FriendProfile from "./component/chatroomContainer/FriendProfile";
import Profile from "./component/innerContainer/Profile";
import Testing from "./component/innerContainer/testing";
import Setting from "./component/innerContainer/Setting";
import ChatRoom from "./component/chatroomContainer/ChatRoom";

/**
 * The main interface of the app
 * Struture: TopBar-InnerContainer-BottomBar
 * @author kkc21 xz72
 * @version 04/03/2020
 */
class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            login: localStorage.getItem("login") || false,
            openMenu: false,
            UserId: localStorage.getItem("UserId"),
            socket: io()
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    //Clear the local storage and set login to false
    setLogout = _ => {
        localStorage.clear();
        setTimeout(
            function() {
                this.setState({login:false});}.bind(this),300
        );
    }

    //Drop the menu by clicking the menu button
    showMenu(e) {
        e.preventDefault();
        localStorage.setItem("openMenu", true);
        this.setState({ openMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    //Close the menu by clicking elsewhere
    closeMenu() {
        localStorage.setItem("openMenu", false);
        this.setState({ openMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    /**
     * Shows the inner component depends on the path
     * Passing some function via the props
     **/
    innerElement(){
        const routing = (
            <Switch>
                <Route path="/app/friend">
                    <FriendList
                        deleteRoom={this.state.socket.leave}
                        id ={this.state.UserId}
                        logf={this.setLogout}/>
                </Route>
                <Route path="/app/pair"
                       render={(props) =>
                           <Pairing
                               {...props}
                               id ={this.state.UserId}
                               setChatrooms={this.state.socket.setChatrooms}
                               logf={this.setLogout}/>}
                />
                <Route path="/app/photo/:id" render={(props) => <FriendProfile {...props}/>}/>
                <Route path="/app/profile"><Profile id ={this.state.UserId} logf={this.setLogout}/></Route>
                <Route path="/app/test" render={(props) => <Testing {...props} id ={this.state.UserId}/>}/>
                <Route path="/app/setting"><Setting logf={this.setLogout}/></Route>
                {/* <Route path="/app/fdsetting" render={(props) => <FriendSetting {...props} logf={this.setLogout}/>}/>  */}
                <Route path="/app/room/:id/:nickName"
                       render={(props) =>
                           <ChatRoom
                               {...props}
                               id ={this.state.UserId}
                               onReceive={this.state.socket.onReceive}
                               unReceive={this.state.socket.unReceive}
                               getHistory={this.state.socket.getHistory}
                               setHistory={this.state.socket.setHistory}
                               unSetHistory={this.state.socket.unSetHistory}
                               sendMes={this.state.socket.message}
                               clear={this.state.socket.clearChat}
                               logf={this.setLogout}
                           />
                       }/>
            </Switch>
        );
        return (
            <Switch>
                <Route path="/app/friend">
                    <FriendList
                        deleteRoom={this.state.socket.leave}
                        id={this.state.UserId}
                        logf={this.setLogout}/>
                </Route>
                <Route path="/app/pair"
                       render={(props) =>
                           <Pairing
                               {...props}
                               id={this.state.UserId}
                               setChatrooms={this.state.socket.setChatrooms}
                               logf={this.setLogout}/>}
                />
                <Route path="/app/photo/:id" render={(props) => <FriendProfile {...props}/>}/>
                <Route path="/app/profile"><Profile id={this.state.UserId} logf={this.setLogout}/></Route>
                <Route path="/app/test" render={(props) => <Testing {...props} id={this.state.UserId}/>}/>
                <Route path="/app/setting"><Setting logf={this.setLogout}/></Route>
                {/* <Route path="/app/fdsetting" render={(props) => <FriendSetting {...props} logf={this.setLogout}/>}/>  */}
                <Route path="/app/room/:id/:nickName"
                       render={(props) =>
                           <ChatRoom
                               {...props}
                               id={this.state.UserId}
                               onReceive={this.state.socket.onReceive}
                               unReceive={this.state.socket.unReceive}
                               getHistory={this.state.socket.getHistory}
                               setHistory={this.state.socket.setHistory}
                               unSetHistory={this.state.socket.unSetHistory}
                               sendMes={this.state.socket.message}
                               clear={this.state.socket.clearChat}
                               logf={this.setLogout}
                           />
                       }/>
            </Switch>
        );
    }

    componentWillUnmount(){
        this.state.socket.disconnect();
    }

    componentDidMount(){
        this.state.socket.initial(this.state.UserId);
    }

    render()
    {
        if(this.state.login)
        {
            return (
                <div className="App">
                    <TopBar className="Top"/>
                    <div className="InnerContainer">
                        <div id="menubutton" onClick={this.showMenu}/>
                        {this.innerElement()}
                    </div>
                    <BottomBar className="bottom"/>
                </div>
            );
        }
        else{
            return(
                <Redirect exact to="/" />
            )
        }
    }
}

export default App;
