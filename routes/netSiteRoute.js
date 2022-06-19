const express = require('express')
const netsiterouter = express.Router();
const { pipeline } = require('stream')
const got = require('got');
const netkey = require('../config/keys').netBearer

  netsiterouter.get('/', function(req, res) {
    const dataStream =  got.stream({
        url: 'https://api.netlify.com/api/v1/sites',
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
module.exports = netsiterouter;
//                         "Authorization":  "token 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"
