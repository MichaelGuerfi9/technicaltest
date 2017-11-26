const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    teamId: {
        type: String,
        required: true
    },
},
{collection: 'players'});

const playerModel = mongoose.model('Player', collaborateurSchema)

module.exports = playerModel