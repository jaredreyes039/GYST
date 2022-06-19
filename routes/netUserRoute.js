const express = require('express')
const netuserrouter = express.Router();
const { pipeline } = require('stream')
const got = require('got');
const netkey = require('../config/keys').netBearer

  netuserrouter.get('/', function(req, res) {
    const dataStream =  got.stream({
        url: 'https://api.netlify.com/api/v1/users',
        headers: {
            'Accept': 'application/json', 
            "Authorization":  "Bearer " + `${netkey}`
        }
    });
    pipeline(dataStream, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        }
    });
  });
module.exports = netuserrouter;
//                         "Authorization":  "token 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"
