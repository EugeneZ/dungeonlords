'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games', 'MeanUser',
    function($scope, $stateParams, $location, Global, Games, MeanUser) {
        $scope.global = Global;
        $scope.active = $scope.global.user._id;

        $scope.hasAuthorization = function(game) {
            if (!game || !game.owner) return false;
            return $scope.global.isAdmin || game.owner._id === $scope.global.user._id;
        };

        $scope.activeBoard = function(player) {
            return player.user._id === $scope.active;
        };

        $scope.board = function(player) {
            $scope.active = player.user._id;
        };

        $scope.remove = function(game) {
            if (game) {
                game.$remove();

                for (var i in $scope.games) {
                    if ($scope.games[i] === game) {
                        $scope.games.splice(i, 1);
                    }
                }
            } else {
                $scope.game.$remove(function(response) {
                    $location.path('games');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var game = $scope.game;
                if (!game.updated) {
                    game.updated = [];
                }
                game.updated.push(new Date().getTime());

                game.$update(function() {
                    $location.path('games/' + game._id);
                });
            } else {
                $scope.submitted = true;
            }
        };


        $scope.findOne = function() {
            Games.get({
                gameid: $stateParams.gameid
            }, function(game) {
                $scope.game = game;
            });
        };

    }
]);