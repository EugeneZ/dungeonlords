'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games',
    function($scope, $stateParams, $location, Global, Games) {
        $scope.global = Global;

        $scope.hasAuthorization = function(game) {
            if (!game || !game.owner) return false;
            return $scope.global.isAdmin || game.owner._id === $scope.global.user._id;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var game = new Games({
                    title: this.title,
                    content: this.content
                });
                game.$save(function(response) {
                    $location.path('games/' + response._id);
                });

                this.title = '';
                this.content = '';
            } else {
                $scope.submitted = true;
            }
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

        $scope.find = function() {
            Games.query(function(games) {
                $scope.games = games;
            });
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
