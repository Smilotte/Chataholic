import React, {useEffect} from "react";

function Messages({history, userId, receiver}) {

    let messageEnd = React.createRef();

    useEffect(() => {
        if (messageEnd.current) {
            messageEnd.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messageEnd, history]);

    return (
        <div className='messages-container'>
            {history.map((h, i) => {
                if (h.senderId === Number(userId))
                    return (
                        <div key={i} className='sender'>
                            <span className='sender-text'>{h.content}</span>
                        </div>
                    )
                else
                    return (
                        <div key={i} className='receiver'>
                            {receiver}<br/>
                            <span className='receiver-text'>{h.content}</span>
                        </div>
                    )
            })}
            <div style={{float: "left", clear: "both"}}
                 ref={messageEnd}>
            </div>
        </div>)
}

export default Messages
