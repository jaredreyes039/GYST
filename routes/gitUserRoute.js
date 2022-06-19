const express = require('express')
const gituserrouter = express.Router();
const { pipeline } = require('stream')
const got = require('got');
const gitbearer = require('../config/keys').gitBearer

gituserrouter.get('/', function(req, res) {
    const dataStream =  got.stream({
        url: 'https://api.github.com/users/jaredreyes039',
        headers: {
            'Accept': 'application/json', 
            "Authorization": "bearer " + `${gitbearer}`
        }
    });
    pipeline(dataStream, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
  });

module.exports = gituserrouter;
