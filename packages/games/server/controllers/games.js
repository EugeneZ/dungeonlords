'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    UserGames = mongoose.model('UserGames'),
    User = mongoose.model('User'),
    _ = require('lodash');


/**
 * Find game by id
 */
exports.game = function(req, res, next, id) {
    Game.load(id, function(err,game) {
        if (err) return next(err);
        if (!game) return next(new Error('Failed to load game ' + id));
        req.game = game;
        next();
    });
};

/**
 * Create a game
 */
exports.create = function(req, res) {
    var colors = [
        { name: 'red',    hex: '#EE202C'},
        { name: 'blue',   hex: '#0026FF'},
        { name: 'yellow', hex: '#FFF100'},
        { name: 'green',  hex: '#00C921'}
    ];
    req.body.players.forEach(function(player, i){
        player.color = colors[i];
    });

    var game = new Game(req.body);
    game.owner = req.user;

    game.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the game' + err
            });
        }

        // We need to also add the game to users' game lists
        User.find({
            _id: { $in: req.body.players.map(function(player){
                return player.user;
            }) }
        }, 'name').exec(function(errPlayers, playerList){

            playerList = playerList.map(function(player){
                return { name: player.name };
            });

            game.players.forEach(function(player){
                if (player && player.user) {
                    UserGames.findOneAndUpdate({ user: player.user }, { $push: { games: { game: game, players: playerList } } }, { upsert: true}, function(err){
                        if (err){
                            console.log('Couldn\'t update player list');
                            // TODO: We saved the game but couldn't update the player game list
                        }
                    });
                }
            });

            res.json(game);

        });

    });
};

/**
 * Update a game
 */
exports.update = function(req, res) {
    var game = req.game;

    game = _.extend(game, req.body);

    game.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the game'
            });
        }
        res.json(game);

    });
};

/**
 * Delete a game
 */
exports.destroy = function(req, res) {
    var game = req.game;

    game.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the game'
            });
        }
        res.json(game);

    });
};

/**
 * Show a game
 */
exports.show = function(req, res) {
    res.json(req.game);
};

/**
 * List of Games
 */
exports.userGames = function(req, res) {
    UserGames.findOne({ user: req.user._id }).populate({path: 'games.game', options: { sort: { lastPlayed: -1 } }}).exec(function(err, userGames){
        if (err) {
            return res.json(500, {
                error: 'Cannot list the games'
            });
        }

        res.json(userGames);
    });
};
