'use strict';

angular.module('mean.games').factory('UserGames', ['$resource',
    function($resource) {
        return $resource('users/:userid/games', {
            userid: '@userid'
        });
    }
]);
