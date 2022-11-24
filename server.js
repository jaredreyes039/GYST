const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto')
const path = require('path')
const UserData = require('./Models/UserData_Model')
const cookieParser = require('cookie-parser')
const uuid = require('uuid')
const { default: axios } = require('axios');

// NEC. for env vars

require('dotenv').config()

// Express Init

const app = express();


// Middleware

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());


// Tokens

let gitToken = [];
let USRCDE = uuid.v4()


// ENCRYP/DECRYP Functionality

// For Cookie
const cipher = crypto.createCipher('aes256', process.env.REACT_APP_ENC_SECRET)
let encrypted = cipher.update(USRCDE, 'utf8', 'base64')
encrypted = encrypted + cipher.final('base64')
USRCDE = encrypted

// For DB
const decipher = crypto.createDecipher('aes256', process.env.REACT_APP_ENC_SECRET)
let decrypted = decipher.update(encrypted, 'base64', 'utf8')
decrypted = decrypted + decipher.final('utf8')


// OAuth: GHAPI
app.get('/auth-req', (req,res)=>{
    res.redirect('https://github.com/login/oauth/authorize?client_id=ecb7c28dbb054b477bb7&scope=user%20repo');
});

// Callback URL (See GH for details)
app.get('/auth-req-callback', (req,res)=>{
    const code = req.query.code;
    const client_id = `${process.env.REACT_APP_CLIENT_ID}`;
    const client_secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
    const body = {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
    }
    
    function parseOAuth(queryString) {
        var query = {};
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }
    
    // Send ENCRYP CODE for Fetching & Updating Data
    // FE -> BE -> DECRYP -> API -> BE -> FE
    res.cookie("USRCDE", USRCDE)

    axios
    .post(
        `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&scope=user%20repo`, body
        )
    .then((res)=> parseOAuth(res.data))
    .then((data)=>{
        // Main Dashboard
        res.redirect('/app')

        // Weird, but currently necessary
        gitToken.push(data.access_token)
    })
    .finally( ()=>{
        // Get GH Data for Display & Caching
        const axiosData = []

        axiosData.push(axios
            .get(
                `https://api.github.com/user`, {headers:
                {
                    "Authorization":"token " + `${gitToken[0]}`,
                }
            }
            ).then((res)=>res.data)
        )

        axiosData.push(
            axios
                .get('https://api.github.com/issues', {headers:
                {
                    "Authorization":"token " + `${gitToken[0]}`,
                }
        }).then((res)=>res.data)
        )

        axiosData.push(
            axios
                .get('https://api.github.com/user/repos', {headers:
                {
                    "Authorization":"token " + `${gitToken[0]}`,
                }
            }).then((res)=>res.data)
        )

        
        Promise.all(axiosData)
        .then((data)=>{
            axios
            .get(`https://api.github.com/users/${data[0].login}/projects`, {headers:
            {
                "Authorization":"token " + `${gitToken[0]}`,
            }}).then(async (proj)=>{
                const getUser = await UserData.findOne({user: data[0].login})
                if(!getUser){
                    const User = new UserData(
                        {
                            user: data[0].login,
                            user_image: data[0].avatar_url,
                            session_id: decrypted,
                            bio: data[0].bio,
                            followers: data[0].followers,
                            following: data[0].following,
                            public_repos: data[0].public_repos,
                            private_gists: data[0].private_gists,
                            owned_private_repos: data[0].owned_private_repos,
                            disk_usage: data[0].disk_usage,
                            repo_data: data[2],
                            issue_data: data[1],
                            project_data: proj.data,
                            token: gitToken[0]
                        }
                    );
                    User.save(function(err){
                        if (err) return 'Error: Failed to Create User Profile'
                    })
                }
                else{
                    await UserData.findOneAndUpdate({user: data[0].login},{
                            user: data[0].login,
                            user_image: data[0].avatar_url,
                            session_id: decrypted,
                            bio: data[0].bio,
                            followers: data[0].followers,
                            following: data[0].following,
                            public_repos: data[0].public_repos,
                            private_gists: data[0].private_gists,
                            owned_private_repos: data[0].owned_private_repos,
                            disk_usage: data[0].disk_usage,
                            repo_data: data[2],
                            issue_data: data[1],
                            project_data: proj.data,
                            token: gitToken[0]
                    }, {new: true}).then((result)=>{result.save()})
                }
            })
        })
        .catch((err)=>console.log(err))
    }
)})


// MongoDB Init
const db = process.env.REACT_APP_MONGO_KEY
mongoose.connect(db)
    .then(()=>{
        console.log('MongoDB Connected...')
    })
    .catch(err=>
        console.log("Mongo Connection Not Established. Please, try again later!")
    );
    

// UserRouter (/user/:session)
// DYNAMIC FUNCTIONALITY CONTAINED HERE
let userRouter = express.Router({ mergeParams : true })
userRouter.get('/', (req,res)=>{
        const decipherRes =  crypto.createDecipher('aes256', process.env.REACT_APP_ENC_SECRET)
        let decrypted =  decipherRes.update(req.params.session, 'base64', 'utf8')
        decrypted =  decrypted + decipherRes.final('utf8')

        try {
            if(gitToken[0]){
                // Due to time constraints, this will get cleaned later
                // Just a replica of above init login db fetch
                // Again, for DYNAMIC FUNCTIONALITY, be carefuL!
                const axiosData = []

                axiosData.push(axios
                    .get(
                        `https://api.github.com/user`, {headers:
                        {
                            "Authorization":"token " + `${gitToken[0]}`,
                        }
                    }
                    ).then((res)=>res.data)
                )

                axiosData.push(
                    axios
                        .get('https://api.github.com/issues', {headers:
                        {
                            "Authorization":"token " + `${gitToken[0]}`,
                        }
                }).then((res)=>res.data)
                )

                axiosData.push(
                    axios
                        .get('https://api.github.com/user/repos', {headers:
                        {
                            "Authorization":"token " + `${gitToken[0]}`,
                        }
                    }).then((res)=>res.data)
                )
        
        
                Promise.all(axiosData)
                .then((data)=>{
                    axios
                    .get(`https://api.github.com/users/${data[0].login}/projects`, {headers:
                    {
                        "Authorization":"token " + `${gitToken[0]}`,
                    }}).then((proj)=>{
                        UserData.findOneAndUpdate(
                            {token: gitToken[0]},
                            {
                                user: data[0].login,
                                user_image: data[0].avatar_url,
                                bio: data[0].bio,
                                followers: data[0].followers,
                                following: data[0].following,
                                public_repos: data[0].public_repos,
                                private_gists: data[0].private_gists,
                                owned_private_repos: data[0].owned_private_repos,
                                disk_usage: data[0].disk_usage,
                                repo_data: data[2],
                                issue_data: data[1],
                                project_data: proj.data,
                            }, {new: true}
                        ).then((result)=>result.save()).catch((err)=>console.log(err))
                    })}).catch((err)=>console.log(err))
            }
        }
        catch {
            console.log('error')
        }
        UserData.find((err,docs)=>{
            if (!err){
                let result = docs.at(-1)
                res.json(result)
            }
            else {
                console.log("Problemo")
            }
        },{session_id: decrypted})
})

// UserRouter Init
app.use('/user/:session', userRouter)


// Heroku Postbuild
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(("client/build")))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


// Server Init
const port = process.env.PORT || 5000;
app.listen(port,  ()=>{
    console.log(`Connected to GYST Server on Port ${port}`);
})

