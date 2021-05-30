import React from 'react'
import Button from './Button'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Content = () => {

    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [room, setRoom] = useState('Alpha');

    const history = useHistory();

    const signin = (e) =>{

      e.preventDefault();
      
      if(username===""|| password===""){
        alert("Enter username and password");
       }
    else{
      const res = fetch("/api/user/login",{
          method:"POST",
          headers:{
               "Content-Type" : "application/json"
          },
          body:JSON.stringify({
              "username":username,
              "password":password
          })
      }).then(res => res.json())
      .then(resp=>{
        if(resp.msg === "You are logged in"){
              history.push({
                pathname: '/Chat',
                search: `?username=${username}&room=${room}`
            });
        }
        else{
            alert("Invalid Credentials ! Please Try Again");
            setUsername("");
            setpassword("");
        }
      })
    }
    }

    const signup = () =>{
      history.push('/NewUser');
  }

    return (
      <div>
        <div className="container">
      <h1 style={{marginLeft:120}}>Just Chat</h1>
      <h2 style={{marginLeft:150}}>Log in</h2>
      <form>
        <div className="form-control">
           <label>Username</label>
           <input type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
        </div>
        <div className="form-control">
           <label>Password</label>
           <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        </div>
        <div className="form-control">
           <label>Room</label>
           <select onChange={(e)=>setRoom(e.target.value)} value={room}>
               <option>Alpha</option>
               <option>Beta</option>
               <option>Gamma</option>
           </select>
        </div>
        <br></br>
        <Button color="black" value="Join Chat" onclick={signin}/>
      </form>
    </div>
    <div className="containerone">
      <h1 style={{marginTop:120,marginLeft:110}}> New User ?</h1>
      <h2 style={{marginLeft:90}}>Register Yourself !</h2>
    <button className="btn-signup" style={{marginTop:50,marginLeft:140}} onClick={signup}>Sign up</button>
    </div>
    </div>
    )
}

export default Content
