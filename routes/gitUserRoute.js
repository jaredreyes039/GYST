// const express = require('express')
// const gituserrouter = express.Router();
// const { pipeline } = require('stream')
// const got = require('got');
// const gitbearer = require('../config/keys').gitToken

// console.log(gitbearer)
// gituserrouter.get('/', function(req, res) {
//     const dataStream =  got.stream({
//         url: 'https://api.github.com/user',
//         headers: {
//             'Accept': 'application/json', 
//             "Authorization":  "token" + `${gitbearer}`
//         }
//     });
//     pipeline(dataStream, res, (err) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(500);
//         }
//     });
//   });

// module.exports = gituserrouter;