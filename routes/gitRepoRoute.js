const express = require('express')
const gitreporouter = express.Router();
const { pipeline } = require('stream')
const got = require('got');

  gitreporouter.get('/', function(req, res) {
    const dataStream =  got.stream({
        url: 'https://api.github.com/repos/jaredreyes039/cactusmodelinginc/contents',
    });
    pipeline(dataStream, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
  });
module.exports = gitreporouter;
//                         "Authorization":  "token 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"
