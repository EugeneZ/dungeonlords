'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserGamesSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    games: [{
        game: {
            type: Schema.ObjectId,
            ref: 'Game'
        }
        // Leaving room for 'watched' games or whatever
    }]
});

mongoose.model('UserGames', UserGamesSchema);