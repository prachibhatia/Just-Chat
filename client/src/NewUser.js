import React from 'react'
import Button from './Button'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const NewUser = () => {

    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');

    const history = useHistory();

    const signin = async (e) =>{

        e.preventDefault();
        if(username===""|| password===""){
            alert("Enter both username and password");
        }
        else{
        const res = await fetch("/api/user/register",{
            method:"POST",
            headers:{
                 "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "username":username,
                "password":password
            })
        })
        const data = await res.json();
        alert("You are successfully registered . Please login now ")
        history.push('/');
    }
    }

    return (
        <div>
            <div className="container-register">
      <h1 style={{marginLeft:130}}>Register</h1>
      <br></br>
      <form method="POST">
        <div className="form-control">
           <label>Username</label>
           <input type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
        </div>
        <div className="form-control">
           <label>Password</label>
           <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        </div>
        <br></br>
        <Button color="black" value="Register" onclick={signin}/>
      </form>
    </div>
        </div>
    )
}

export default NewUser
