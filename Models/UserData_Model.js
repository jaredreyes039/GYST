const mongoose = require('mongoose');
const {Schema} = mongoose;




const UserData_Schema = new Schema({
    user: {
        type: "String"
    },
    user_image: {
        type: "String"
    },
    user_id: {
        type: "String"
    },
    session_id: {
        type: "String"
    },
    date: {
        type: "Date",
        default: new Date()
    },
    bio:{
        type: "String",
    },
    followers: {
        type: "Number"
    },
    following:{
        type: "Number"
    },
    public_repos:{
        type: "Number"
    },
    private_gists:{
        type: "Number"
    },
    owned_private_repos: {
        type: "Number",
    },
    disk_usage:{
        type: "Number"
    },
    repo_data:{
        type: "Mixed",
    }
})

const UserData = mongoose.model('UserData', UserData_Schema, 'test');
module.exports = UserData;