'use strict';

angular.module('mean.games').controller('ManageGamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games', 'UserGames', 'MeanUser',
    function($scope, $stateParams, $location, Global, Games, UserGames, MeanUser) {
        $scope.global = Global;
        $scope.players = [];

        $scope.hasAuthorization = function(game) {
            if (!game || !game.owner) return false;
            return $scope.global.isAdmin || game.owner._id === $scope.global.user._id;
        };

        $scope.goto = function(gameid){
            $location.path('/games/' + gameid);
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var game = new Games({
                    title: this.title,
                    players: $scope.players.map(function(o){ return { user: o._id }; })
                });
                game.$save(function(response) {
                    $location.path('games/' + response._id);
                });

                this.title = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            UserGames.get({ userid: $scope.global.user._id }, function(userGames) {
                $scope.userGames = userGames;
            });
        };

        $scope.beginCreate = function() {
            $scope.title = Global.user.name + '\'s Game';
            MeanUser.query(function(users) {
                $scope.users = users;
            });
        };
    }
]).filter('relative', function(){
    return function(date){
        return moment(date).fromNow();
    };
});