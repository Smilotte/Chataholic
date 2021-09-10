import React from 'react';
import {Link} from 'react-router-dom';
/**
 * FriendBox component
 * @author xz72
 * @version 19/01/2020
 */

class FriendBox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            UserId: this.props.id,
            RoomId: this.props.room,
            name: this.props.name
        }
    }

    render(){
        return(

            <div className="app-friend">
                <Link to={"/app/photo/"+ this.state.UserId}><div id="photo"/></Link>
                <Link to={"/app/room/"+ this.state.RoomId+"/"+ this.state.name}>
                    <div id="box">
                        <div id="name" >{this.state.name}</div>
                        {/* <div id="state">online</div> */}
                    </div>
                </Link>
            </div>
        )
    }
}
export default FriendBox;
