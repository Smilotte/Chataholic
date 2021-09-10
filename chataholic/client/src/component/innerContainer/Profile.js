import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

/**
 * The profile page component
 * @author kkc21
 * @version 10/03/2020
 */
class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            edit : false,
            UserId: this.props.id
        }
        this.amend = this.amend.bind(this);
    }

    componentDidMount(){
        this.getProfile();
    }

    //Send a GET request to get the profile data
    getProfile(){
        axios.get('/api/profile',{params: {UserId: this.state.UserId} })
            .then((data) => {
                this.setState(data.data[0]);
            })
            .catch(error => console.log(error));
    }

    //Send a POST request to change the profile data
    amend(e)
    {
        e.preventDefault();
        var p = this.state;
        const arr = [p.UserId,p.Nickn,p.Sex,p.Dob,p.Hobby,p.Sport,p.Fav];
        console.log(arr);
        axios.post('/api/profile/amend',{params: arr})
            .then((data) => {
                console.log("amend suceesful");
                this.setState({edit: false});
            })
            .catch(error => console.log(error));
    }


    //Set edit to true
    startEdit = _ => this.setState({edit:true});

    render(){
        return(
            <div className="app-profile">


                {
                    this.state.edit?
                        (
                            <form className="editprofile" onSubmit={this.amend}>
                                <div id="cover"/>
                                <div id="return" onClick={()=>this.setState({edit:false})} />
                                <label>
                                    Nickname <br/>
                                    <input type="text" value={this.state.Nickn} onChange={e => this.setState({Nickn :e.target.value })}></input>
                                </label>
                                <br/>
                                <label>
                                    Sex <br/>
                                    <select value={this.state.value} onChange={e => this.setState({Sex :e.target.value })}>
                                        <option value="F">F</option>
                                        <option value="M">M</option>
                                    </select>
                                </label>
                                <br/>
                                <label>
                                    Dob <br/>
                                    <input type="text" value={this.state.Dob} onChange={e => this.setState({Dob :e.target.value })}></input>
                                </label>
                                <br/>
                                <label>
                                    Hobby <br/>
                                    <input type="text" value={this.state.Hobby} onChange={e => this.setState({Hobby :e.target.value })}></input>
                                </label>
                                <br/>
                                <label>
                                    Sport <br/>
                                    <input type="text" value={this.state.Sport} onChange={e => this.setState({Sport :e.target.value })}></input>
                                </label>
                                <br/>
                                <label>
                                    Favourite thing <br/>
                                    <input type="text" value={this.state.Fav} onChange={e => this.setState({Fav :e.target.value })}></input>
                                </label>
                                <br/>
                                <button type="submit">Submit</button>
                            </form>

                        )
                        :(
                            <div>

                                {
                                    localStorage.getItem("openMenu")==="true"?
                                        (
                                            <label id="dropdown">
                                                <button  onClick={this.startEdit}>Edit Profile</button>
                                                <Link to={"/app/test"}><button>New test</button></Link>
                                                <button  onClick={this.props.logf}>Logout</button>
                                            </label>
                                        )
                                        : (null)
                                }
                                <div id="friendPhoto"/>
                                <div className="detail">
                                    <div><p>Nickname</p>{this.state.Nickn}</div>
                                    <div><p>Sex</p>{this.state.Sex}</div>
                                    <div><p>Dob</p>{this.state.Dob}</div>
                                    <div><p>Personality</p>{this.state.Personality}</div>
                                    <div><p>Hobby</p>{this.state.Hobby}</div>
                                    <div><p>Sport</p>{this.state.Sport}</div>
                                    <div><p>Favourite thing</p>{this.state.Fav}</div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}
export default Profile;
