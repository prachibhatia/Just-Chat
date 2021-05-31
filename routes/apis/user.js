const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt')


// create application/json parser
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const User = require('../../models/User')

//api to check user info at the time of log in{Sign in}
router.post('/login',jsonParser,async (req,res)=>{

    const { username, password } = req.body;

        const user = await User.find({username:username});
        if(user)
        {
        const validpwd = await bcrypt.compare(password,user[0].password);
        if(validpwd){
        res.json({msg:'You are logged in'});
        }
        else{
        res.json({msg:'Wrong password ! Try again'})
        }
    }
    else{
        res.json({ msg:'No such user exists'})
    }
})

//api to register a new user {Sign Up}
router.post('/register', jsonParser,async (req , res) => {

    let user = new User();

    const { username, password } = req.body;

    user.username = username;
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(password, salt);

    user.save().then(users=>res.json(users));
})


module.exports = router;