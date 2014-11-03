'use strict';

var games = require('../controllers/games');

// Game authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.owner.isAdmin && req.game.owner.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Games, app, auth) {

    app.route('/games')
        .get(games.userGames)
        .post(auth.requiresLogin, games.create);
    app.route('/games/:gameid')
        .get(games.show)
        .put(auth.requiresLogin, hasAuthorization, games.update)
        .delete(auth.requiresLogin, hasAuthorization, games.destroy);
    app.route('/users/:userid/games')
        .get(auth.requiresLogin, hasAuthorization, games.userGames);

    app.param('gameid', games.game);
    app.param('userid', games.userGames);

};
