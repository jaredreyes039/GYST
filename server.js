const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path')

const UserData = require('./Models/UserData_Model')

const cookieParser = require('cookie-parser')
const uuid = require('uuid')

// For env file

require('dotenv').config()

// Express Init

const app = express();

// Routers

const { default: axios } = require('axios');


// Middleware

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());

let gitToken = [];
let USRCDE = uuid.v4()

app.get('/auth-req', (req,res)=>{
    res.redirect('https://github.com/login/oauth/authorize?client_id=ecb7c28dbb054b477bb7&scope=user%20repo');
});
app.get('/auth-req-callback', (req,res)=>{
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
    res.cookie("USRCDE", USRCDE)

    axios
    .post(
        `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&scope=user%20repo`, body
        )
    .then((res)=> parseQuery(res.data))
    .then((data)=>{
        res.redirect('/app')
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
                            const getUser = await UserData.findOne({user: resUser.data.login})
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
                                UserData.findOneAndUpdate({user: resUser.data.login},{
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
                                }, {new: true}).then((result)=>{result.save()})
                            }
                        })
            })
            
                    .catch((err)=>console.log(err))
            })
            .catch((err)=>console.log(err))
    })
})


// DB Connect

const db = process.env.REACT_APP_MONGO_KEY

mongoose.connect(db)
    .then(()=>{
        console.log('MongoDB Connected...')
    })
    .catch(err=>
        console.log("Mongo Connection Not Established. Please, try again later!")
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

// PrivPub, Disk, Gist, Social

app.use('/user/:session', userRouter)


// Server Est

const port = process.env.PORT || 5000;
app.listen(port,  ()=>{
    console.log(`Connected to Server on Port ${port}`);
})

