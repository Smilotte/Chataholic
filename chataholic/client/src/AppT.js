import React from 'react';
import socketIOClient from "socket.io-client";

/**
 * The main interface of the app
 * Struture: TopBar-InnerContainer-BottomBar
 * @author kkc21 xz72
 * @version 22/01/2020
 */

var socket;
class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      roomId:"",
      chatHistory: [],
      endpoint: 'http://localhost:5000',
      sendMes: ""
    };
    socket = socketIOClient(this.state.endpoint);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    // this.getNewMessage = this.getNewMessage.bind(this);

  }

  getData = mes => {
    this.setState({ chatHistory: mes });

  };

  updateHistory = mes =>{
    var newH = this.state.chatHistory.concat({message:mes});
    console.log(newH);
    this.setState({chatHistory: newH});
  }

  componentDidMount() {
    socket.emit("initial_data");
    socket.on("get_data", this.getData);
    socket.on("get_newmessage", this.updateHistory);
  }

  // Removing the listener before unmounting the component in order to avoid addition of multiple listener at the time revisit*/
  componentWillUnmount(){
    socket.off("get_data");
    socket.off("get_newmessage");
  }

  sendMessage(e){
    e.preventDefault();
      console.log(this.state.sendMes);
      socket.emit("new_message", (this.state.sendMes));
  }

  getMessage(m,i){
    return <div key={i}>{m.message}</div>
  }

  render()
  {
    return (
        <div className="App">


            <div id="message">Message:{this.state.chatHistory.map(this.getMessage)}</div>
            <form onSubmit={this.sendMessage}>
                <input type="text" onChange={e=> this.setState({sendMes: e.target.value})}></input>
                <button type="submit">send</button>
            </form>

        </div>          
      );
  }
  

}

export default App;

