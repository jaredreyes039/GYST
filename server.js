const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const { pipeline } = require('stream')
const got = require('got');
const UserData = require('./Models/UserData_Model')
const cookieParser = require('cookie-parser')
const { MongoClient } = require("mongodb");
const uuid = require('uuid')


// Routers

// const gitRouter = require('./routes/gitRoute.js')
// const gituserrouter = require('./routes/gitUserRoute')
const { default: axios } = require('axios');
const { resolve } = require('path');
const { error } = require('console');

// Middleware

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());


// app.use('/gitdata', gitRouter)
// app.use('/gitdatauser', gituserrouter)
let gitToken = [];

app.get('/auth-req', (req,res)=>{
    res.redirect('https://github.com/login/oauth/authorize?client_id=ecb7c28dbb054b477bb7&scope=user%20repo');
});
app.get('/auth-req-callback', async (req,res)=>{
    let USRCDE = uuid.v4()
    const code = req.query.code;
    const client_id = "ecb7c28dbb054b477bb7";
    const client_secret = "79f47986df6ad49f76b8613698fb0bf58da07cf7";
    const body = {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
    }
    function parseQuery(queryString) {
        var query = {};
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }

    await axios
    .post(
        `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&scope=user%20repo`, body
        )
    .then((res)=> parseQuery(res.data))
    .then((data)=>{
        res.redirect('http://localhost:3000/app')
        gitToken.push(data.access_token)
    })
    .finally(()=>{
        axios
            .get(
                `https://api.github.com/user`, {headers:
                {
                    "Authorization":"token " + `${gitToken[0]}`,
                }
            }
            )
            .then(resUser => {
                axios
                    .get('https://api.github.com/issues', {headers:
                    {
                        "Authorization":"token " + `${gitToken[0]}`,
                    }
                })
                .then(resIssue =>{
                    axios
                        .get('https://api.github.com/user/repos', {headers:
                        {
                            "Authorization":"token " + `${gitToken[0]}`,
                        }
                    })
                        .then(async (res2)=>{
                            const getUser = await UserData.findOne({session_id: USRCDE})
                            if(!getUser){
                                const User = new UserData(
                                    {
                                        user: resUser.data.login,
                                        user_image: resUser.data.avatar_url,
                                        session_id: USRCDE,
                                        bio: resUser.data.bio,
                                        followers: resUser.data.followers,
                                        following: resUser.data.following,
                                        public_repos: resUser.data.public_repos,
                                        private_gists: resUser.data.private_gists,
                                        owned_private_repos: resUser.data.owned_private_repos,
                                        disk_usage: resUser.data.disk_usage,
                                        repo_data: res2.data,
                                        issue_data: resIssue.data
                                    }
                                );
                                User.save(function(err){
                                    if (err) return 'Error: Failed to Create User Profile'
                                })
                            }
                            else{
                                getUser.update({
                                        user: resUser.data.login,
                                        user_image: resUser.data.avatar_url,
                                        session_id: USRCDE,
                                        bio: resUser.data.bio,
                                        followers: resUser.data.followers,
                                        following: resUser.data.following,
                                        public_repos: resUser.data.public_repos,
                                        private_gists: resUser.data.private_gists,
                                        owned_private_repos: resUser.data.owned_private_repos,
                                        disk_usage: resUser.data.disk_usage,
                                        repo_data: res2.data,
                                        issue_data: resIssue.data
                                })
                            }
                        })
            })
            
                    .catch((err)=>console.log(err))
            })
            .catch((err)=>console.log(err))
    })
})


// DB Config




const db = require('./config/keys').mongoURI;
// DB Connect


mongoose.connect(db)
    .then(()=>{
        console.log('MongoDB Connected...')
    })
    .catch(err=>
        console.log("Mongo Connection Not Established. Please, try again in a moment!")
    );
    

    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(("client/build")))
        app.get('*', (req, res)=>{
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        })
    }

// Server Init
let userRouter = express.Router({ mergeParams : true })
userRouter.get('/', (req,res)=>{
    async function getData(){
        const data = await UserData.find({session_id:req.params.session}).then((err, result)=>{
            if (err) return err;
            return result;
        })
        let selection = await data.at(-1)
        res.send(selection)
    }
    getData()
})
app.use('/user/:session', userRouter)

    const port = process.env.PORT || 5000;
    app.listen(port,  ()=>{
        console.log(`Connected to Server on Port ${port}`);
    })

// Connection Successful!!!! :3
