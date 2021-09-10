import React from 'react';
/**
 * FriendBox component
 * @author xz72
 * @version 28/12/2019
 */

class FriendSetting extends React.Component {

    render(){
        return(
            <div className="app-friendSetting">
                <div id="return" onClick={() => this.props.history.goBack()}/>
                <div id="clearChatHistory">Clear Chat History</div>
                <div id="searchChatHistory">Search Chat History</div>
                <div id="border"/>

                <div id="stickyOnTop">Sticky on Top<input id="sticky" type="checkbox"/></div>
                <div id="muteNotifications">Mute Notifications<input id="mute" type="checkbox"/></div>
                <div id="Block">Block<input id="block" type="checkbox"/></div>
                <button id="report">Report</button>
            </div>
        )
    }
}
export default FriendSetting;
