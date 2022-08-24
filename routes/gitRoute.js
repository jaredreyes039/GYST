const express = require('express')
const gitrouter = express.Router();
const gitreporouter = express.Router();
const { pipeline } = require('stream')
const got = require('got');
const gitbearer = require('../config/keys').gitToken


gitrouter.get('/', function(req, res) {
    const dataStream =  got.stream({
        url: 'https://api.github.com/user',
        headers: {
            'Accept': 'application/json', 
            "Authorization":  "token" + `${gitbearer}`
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
