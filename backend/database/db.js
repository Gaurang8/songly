

const mongoose = require('mongoose');


const playlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        default: []
    },
    totalsong: {
        type: Number,
        default: 0
    },
    privacy: {
        type: String,
        enum: ['public', 'private'], // Example privacy values, you can adjust as needed
        default: 'public'
    },
    Description: {
        type: String
    }
});

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        // require: true,
        unique: true
    },
    password:{
        type:String,
        // require:true
    },
    token:{
        type:String
    },
    favorites:{
        type: [playlistSchema],
        default: [{name: "Liked Song", songs: [], totalsong: 0, privacy: "public", Description: "this is description"}]
    },
    playlists:{
        type: [playlistSchema],
        default: []
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;