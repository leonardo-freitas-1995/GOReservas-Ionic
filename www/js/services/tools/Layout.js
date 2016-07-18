(function () {
    angular
        .module('goreservas')
        .factory('Layout', Service);
    Service.$inject = ['$state', '$ionicSideMenuDelegate', 'UserIdentity'];
    function Service($state, $ionicSideMenuDelegate, UserIdentity) {
        return {
            goTo: function(state) {
                $state.go(state);
            },
            sidemenuToggle: function(){
                $ionicSideMenuDelegate.toggleLeft();
            },
            isAuthenticated: function(){
                return UserIdentity.isAuthenticated();
            }
        }
    }
})();
