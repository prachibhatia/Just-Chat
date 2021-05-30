import React from 'react'

const Header = () => {
    return (
        <div className="chat-header">
            <h1>Just Chat</h1>
            <p id="loggedUser"></p>
            <a href="http://localhost:3000/" className="btn-chat">Leave Room</a>
        </div>
    )
}

export default Header
