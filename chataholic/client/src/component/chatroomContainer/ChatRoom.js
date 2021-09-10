import React from 'react';
import Messages from "./Messages";
// import {Link} from 'react-router-dom';
/**
 * FriendBox component
 * @author kkc21 xz72
 * @version 04/03/2020
 */

class ChatRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            roomId :this.props.match.params.id,
            fdname: this.props.match.params.nickName,
            chatHistory: [],
            sendMes: "",
            userId: this.props.id
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.updateHistory = this.updateHistory.bind(this);
        this.getData = this.getData.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
    }

    //Set the chathistory and remove the chathistory listener
    getData = mes => {
        console.log(mes);
        this.setState({ chatHistory: mes });
        this.props.unSetHistory();

    };

    updateHistory = mes =>{
        var newH = this.state.chatHistory.concat(mes);
        console.log(newH);
        this.setState({chatHistory: newH});
    }

    clearHistory = _ =>{
        this.props.clear(this.state.roomId);
        this.setState({chatHistory: []})
    }



    componentDidMount() {
        //Add the listener for the get_chathistory
        this.props.setHistory(this.getData);
        //Get the chathistory after add the message listener
        this.props.getHistory(this.state.roomId);
        //Add the listener for the new message
        this.props.onReceive(this.updateHistory);
    }

    /**
     * Removing the listener before unmounting the component in order to
     * avoid addition of multiple listener at the time revisit
     */
    componentWillUnmount(){
        this.props.unReceive();

    }

    sendMessage(e){
        e.preventDefault();
        if(this.state.sendMes !== ""){
            var data = {rid: this.state.roomId, senderId: this.state.userId, content:this.state.sendMes};
            this.setState({sendMes: ""});
            this.props.sendMes(data);
        }
    }

    render(){
        return(
            <div className="chatRoom">
                {
                    localStorage.getItem("openMenu")==="true"?
                        (
                            <div id="dropdown">
                                {/* <Link to={"/app/fdsetting"}><button>Setting</button></Link> */}
                                <button onClick={this.clearHistory}>Clear history</button>
                                <button onClick={this.props.logf}>Logout</button>
                            </div>
                        )
                        : (null)
                }
                <div id="return" onClick={() => this.props.history.goBack()}></div>
                <div className="fdname">{this.state.fdname}</div>
                <Messages className='chat' history={this.state.chatHistory} userId={this.state.userId} receiver={this.state.fdname}/>
                <form id="sendBox" onSubmit={this.sendMessage}>
                    <input type="text" id="messageInput" value={this.state.sendMes} onChange={e=> this.setState({sendMes: e.target.value})}/>
                    <button type="submit" id="send">Send</button>
                </form>
            </div>
        )
    }
}
export default ChatRoom;
