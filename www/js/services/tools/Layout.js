angular.module('goreservas')
    .factory('Layout', function($state, $ionicSideMenuDelegate) {
        return {
            goTo: function(state) {
                $state.go(state);
            },
            sidemenuToggle: function(){
                $ionicSideMenuDelegate.toggleLeft();
            }
        }
    });
