'use strict';

angular.module('mean.users').factory('MeanUser', [ '$resource',

  function($resource) {
    return $resource('users/:userid');
  }
]);
