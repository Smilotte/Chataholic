import React from 'react';
import axios from "axios";
/**
 * FriendBox component
 * @author kkc21 xz72
 * @version 10/03/2019
 */

class FriendProfile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            UserId: this.props.match.params.id
        }
        console.log(this.props);
    }

    componentDidMount(){
        this.getProfile();
    }

    getProfile(){
        axios.get('/api/profile',{params: {UserId: this.state.UserId} })
            .then((data) => {
                this.setState(data.data[0]);
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div className="app-friendProfile">
                <div id="cover"/>
                <div id="return" onClick={() => this.props.history.goBack()} />
                <div id="friendPhoto"/>
                <div className="frienddetail">
                    <div><p>Nickname</p>{this.state.Nickn}</div>
                    <div><p>Sex</p>{this.state.Sex}</div>
                    <div><p>Dob</p>{this.state.Dob}</div>
                    <div><p>Hobby</p>{this.state.Hobby}</div>
                    <div><p>Sport</p>{this.state.Sport}</div>
                    <div><p>Favourite thing</p>{this.state.Fav}</div>
                </div>
            </div>
        )
    }
}
export default FriendProfile;
