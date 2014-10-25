'use strict';

angular.module('mean.games').directive('roster', function(){
    return {
        require: 'ngModel',
        link: function(scope, elms, attrs, ctrl) {
            scope.rosterErrors = [];
            ctrl.$validators.roster = function(modelValue, viewValue){
                var index = parseInt(ctrl.$name.replace('player', ''));
                var value = (viewValue && viewValue._id) ? viewValue._id : null;

                return !(index < 3 && !value);
            };
        }
    };
});