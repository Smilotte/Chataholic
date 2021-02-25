import React from 'react';
/**
 * Inner container component
 * @author xz72 kkc21
 * @version 10/03/2020
 */

class Setting extends React.Component {

    render(){
        return(
            <div className="app-Setting">
                {
                    localStorage.getItem("openMenu")==="true"?
                        (
                            <div id="dropdown">
                                <button  onClick={this.props.logf}>Logout</button>
                            </div>
                        )
                        : (null)
                }

                <div id="accountInfo">Account Info</div>
                <div id="border"/>

                <div id="privacy">Privacy</div>
                <div id="general">General</div>
                <div id="help">Help and Feedback</div>
                <div id="about">About</div>
            </div>
        )
    }
}
export default Setting;
