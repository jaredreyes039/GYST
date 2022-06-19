const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();

// Routers

const gitRouter = require('./routes/gitRoute')
const gitrepoRouter = require('./routes/gitRepoRoute')
const netaccountsrouter = require('./routes/netAccountsRoute')
const netsiterouter = require('./routes/netSiteRoute')
const netuserrouter = require('./routes/netUserRoute')
const gituserrouter = require('./routes/gitUserRoute')

//BP Midware

app.use(bodyParser.json());
app.use(cors());

app.use('/gitdata', gitRouter)
app.use('/repodata', gitrepoRouter)
app.use('/sitedata', netsiterouter)
app.use('/siteuserdata', netuserrouter)
app.use('/siteaccountdata', netaccountsrouter)
app.use('/gitdatauser', gituserrouter)


// DB Config

const db = require('./config/keys').mongoURI;

// DB Connect

mongoose.connect(db)
    .then(()=>{
        console.log('MongoDB Connected...')
    })
    .catch(err=>
        console.log(err)
    );
    

    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(("client/build")))
        app.get('*', (req, res)=>{
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        })
    }

// Server Init

    const port = process.env.PORT || 5000;
    app.listen(port,  ()=>{
        console.log(`Connected to Server on Port ${port}`);
    })

// Connection Successful!!!! :3
