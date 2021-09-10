import React from 'react';
import axios from 'axios';

/**
 * The pairing page component
 * @author kkc21 ll375
 * @version 10/03/2020
 */
class Pairing extends React.Component {

    constructor(props){
        super(props);
        this.state={
            online: 0,
            member:[],
            errMsg: '',
            finding: false,
            friendId: 0,
            imgSrc: '/addfriend.png'
        }
        this.pair = this.pair.bind(this);
    }

    //Send a request to get a random user and direct to the chatroom
    async pair() {
        this.setState({ errMsg: "", finding: true })
        let response = await axios.get('/api/pairing/dopair', { params: { id: this.props.id} });
        this.setState({ finding: false });
        console.log(response)
        if (response.data.id) {
            var fId = response.data.id;
            this.setState({ friendId: response.data.id, imgSrc: '/check.png'});
            console.log(fId);
            axios.post('/api/pairing/addFriend',{UserId: this.props.id, FriendId: fId})
                .then((data) => {
                    console.log(data);
                    var roomId = data.data.room;
                    this.props.setChatrooms(roomId);
                    console.log(data.data.fdname);
                    setTimeout(()=> this.props.history.push(`/app/room/${roomId}/${data.data.fdname}`), 3000);
                })
                .catch(error => console.log(error));
        }
        else {
            this.setState({ errMsg: response.data.msg })
        }
    }

    render(){
        return(
            <div className="app-pair">
                {
                    localStorage.getItem("openMenu")==="true"?
                        (
                            <div id="dropdown" >
                                <button onClick={this.props.logf}>Logout</button>
                            </div>
                        )
                        : (null)
                }
                <div id="online">
                    <div id="addFriendLogo" style={ {backgroundImage: `url(${this.state.imgSrc})`}}></div>
                    {/* <img id="addFriendLogo" src={this.state.imgSrc} alt="..." /> */}
                </div>
                <button id="discover"  onClick={this.pair}>Discover</button>
                <div className="notice" >
                    {
                        this.state.errMsg !== '' ?
                            (
                                <div className='isa_error'  >{this.state.errMsg}</div>
                            )
                            : this.state.finding ?
                            (
                                <div className='isa_info' >Looking for a friend...</div>
                            )
                            : (null)
                    }
                    {
                        this.state.friendId ?
                            (
                                <div className='isa_success' >A match was found ID: {this.state.friendId}</div>
                            ): (null)
                    }
                </div>
            </div>
        )
    }
}
export default Pairing;
