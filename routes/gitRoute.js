const express = require('express')
const gitrouter = express.Router();
const gitreporouter = express.Router();
const { pipeline } = require('stream')
const got = require('got');

gitrouter.get('/', function(req, res) {
    const dataStream =  got.stream({
        url: 'https://api.github.com/users/jaredreyes039/repos',
        headers: {
            'Accept': 'application/json', 
            "Authorization":  "token" + `${process.env.REACT_APP_GIT_TOKEN}`
        }
    });
    pipeline(dataStream, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
  });

module.exports = gitrouter;
//                         "Authorization":  "token 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"
