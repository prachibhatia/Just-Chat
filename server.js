const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users')

const app = express();

const server = http.createServer(app);
const io = socketio(server);

//Connect to db
mongoose.connect('mongodb://localhost/justchat',{useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

//Check connection
db.once('open',function(){
    console.log("Connected to db");
})

// check db errors
db.on('error',function(err){
    console.log(err);
})

//api route
app.use('/api/user',require('./routes/apis/user'));

//Body-parser middleware
app.use(bodyParser.json());

//Runs when a client connects
io.on('connection',socket =>{

    socket.on('joinRoom',({username,room}) => {

        const user = userJoin(socket.id,username,room);
        //console.log(user);

        socket.join(user.room);
        
        //socket.emit('message',formatMessage('Just Chat','Welcome to Just Chat'));

        //Broadcasts when a user connect
        socket.broadcast.to(user.room).emit('message', formatMessage('Just Chat',`${user.username} has joined the Room`));

        io.to(user.room).emit('roomUsers',{
            room : user.room,
            users:getRoomUsers(user.room)
        })
    });


    socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    })

    //Run when a client disconnects
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);
        if(user){
        io.to(user.room).emit('message',formatMessage('Just Chat',`${user.username} has left the Room`));
        io.to(user.room).emit('roomUsers',{
            room : user.room,
            users:getRoomUsers(user.room)
        });
        }
     });

});

//Start Server
server.listen(5000, function(){
    console.log("server started on port 5000")
})
