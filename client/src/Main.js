import React from 'react'

const Main = () => {
    return (
        <div className="chat-main">
            <div className="chat-messages">
          </div>
          <div className="chat-sidebar">
            <h3>Room :</h3>
            <h2 id="room-name"></h2>
            <h3>Online Users:</h3>
            <ul id="users">
            </ul>
         </div>
        </div>
    )
}

export default Main
