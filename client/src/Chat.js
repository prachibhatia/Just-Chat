import React from 'react'
import Header from'./Header'
import Main from'./Main'
import socketClient  from "socket.io-client"
import {useEffect,useState} from'react'
import { useLocation} from "react-router-dom"
import queryString from 'query-string'

const Chat = () => {

    var location = useLocation();

    useEffect(()=>{
           var chatForm = document.getElementById('chat-form');
           var chatMessages = document.querySelector('.chat-messages')
           const roomName = document.getElementById('room-name')
           const userList = document.getElementById('users');
           const loggedUser = document.getElementById('loggedUser');

           const parsed = queryString.parse(location.search);

           const username = parsed.username;
           const room = parsed.room;

           loggedUser.innerText = "Hi "+username;

           var socket = socketClient();

           // Join chatroom
            socket.emit('joinRoom', { username, room });

            socket.on('roomUsers',({room,users})=>{
                roomName.innerText = room;
                userList.innerHTML = '';
                users.forEach((user) => {
                const li = document.createElement('li');
                li.innerText = user.username;
                 userList.appendChild(li);
              });
            })

           socket.on('message',message =>{
                  outputMessage(message);
                  chatMessages.scrollTop = chatMessages.scrollHeight;
            })


            //Message submit
       chatForm.addEventListener('submit',(e) =>{
            e.preventDefault();
            var msg = e.target.elements.msg.value;
            socket.emit('chatMessage',msg);
            e.target.elements.msg.value='';
            e.target.elements.msg.focus();
           })

           function outputMessage(message){
            const div = document.createElement('div');
            if(message.username === "Just Chat"){
                div.classList.add('otherchat');
            }
            else if(message.username === username){
            div.classList.add('other');
            }
            else{
            div.classList.add('message');
            }

            div.innerHTML=`<p class="meta">${message.username}&nbsp&nbsp<span>${message.time}</span></p>
            <p class="text">
                ${message.message}
            </p>`;
            document.querySelector('.chat-messages').appendChild(div);
            
         }
    })

    return (
        <div className="chat-container">
            <Header/>
            <Main/>
            <div className="chat-form-container">
            <form id="chat-form">
             <input id="msg" type="text" placeholder="Enter Message...." required autoComplete="off"/>
           <button className="btn-chat">Send</button>
           </form>
         </div>
        </div>
    )
}

export default Chat
