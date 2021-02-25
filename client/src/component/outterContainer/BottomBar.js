import React from 'react';
import {Link} from 'react-router-dom';
/**
 * The bottom bar component
 * @author kkc21
 * @version 22/01/2020
 */

class BottomBar extends React.Component {

    render()
    {
        return(

            <div className="app-bottom">
                <div id="navlist" >
                    <div id="friend" ><Link to="/app/friend"/></div>
                    <div id="pair" ><Link to="/app/pair"/></div>
                    <div id="profile" ><Link to="/app/profile"/></div>
                    <div id="setting"><Link to="/app/setting"/></div>
                </div>
            </div>
        )
    }
}
export default BottomBar;
