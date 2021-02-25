import React from 'react';
import FriendBox from './FriendBox.js';
import axios from "axios";
/**
 * FriendBox component
 * @author xz72 kkc21
 * @version 04/03/2020
 */

class FriendList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserId: this.props.id,
            users: [],
            edit: false,
            popup: false,
            deleteId: ""
        }
        this.stateEdit = this.stateEdit.bind(this);
        this.delete = this.delete.bind(this);
        this.popfunc = this.popfunc.bind(this);
    }

    componentDidMount() {
        if(this.state.users.length === 0){this.getUsers()}
    }

    getUsers = _ => {
        axios.get('/api/friendList',{params: {UserId: this.state.UserId}})
            .then((data) => {
                console.log(data.data);
                var arr = [];
                for(var x of data.data){
                    arr.push(x);
                }
                this.setState({users: arr});
            })
            .catch(error => console.log(error));
    }

    stateEdit(){
        if(this.state.edit){
            this.setState({edit: false});
        }
        else{
            this.setState({edit: true});
        }
    }

    delete(){
        console.log(this.state.deleteId);
        this.props.deleteRoom(this.state.deleteId);
        axios.post('/api/friendList/delete',{RoomId: this.state.deleteId})
            .then((data) => {
                console.log(data.data);
                var x = this.state.users.filter(r => r.RoomId !== this.state.deleteId );
                this.setState({users:x, edit:false,popup:false});
            })
            .catch(error => console.log(error));

    }

    popfunc(id, p){
        if(p){
            this.setState({deleteId: id, popup: p})
        }
        else{
            this.setState({deleteId: id, popup: p})
        }
    }

    render() {
        return (
            <div className="app-friendList">
                {
                    localStorage.getItem("openMenu")==="true"?
                        (
                            <div id="dropdown" >
                                <button onClick={this.stateEdit}>Edit Friend</button>
                                <button onClick={this.props.logf}>Logout</button>
                            </div>
                        )
                        : (null)
                }
                {
                    this.state.popup?
                        (
                            <div className="pop">
                                <div className="innerpop">
                                    Are you sure you want to delete this chat?<br/>
                                    <button onClick={this.delete}>Delete</button>
                                    <button onClick={()=>this.popfunc( "", false)}>Cancel</button>
                                </div>
                            </div>
                        )
                        :(null)
                }
                {
                    this.state.edit?
                        (
                            <div className="editList">
                                <div id="cancelEdit" onClick={this.stateEdit}> Cancel</div>
                                {
                                    this.state.users.map( (u,i) =>
                                        <div className="app-friend" key={i}>
                                            <div id="photo"/>
                                            <div id="box">
                                                <div id="name" >{u.Username}<b/></div>
                                                {/* <div id="state">online</div> */}
                                            </div>
                                            <div className="bin" onClick={() =>this.popfunc(u.RoomId, true)} />
                                        </div>
                                    )
                                }
                            </div>
                        )
                        : (this.state.users.map( (u) => <FriendBox key={u.RoomId} room={u.RoomId} id={u.UserId} name={u.Username}/>))
                }


            </div>
        )
    }
}

export default FriendList;
