(function () {
    angular
        .module('goreservas')
        .factory('Layout', Service);
    Service.$inject = ['$state', '$ionicSideMenuDelegate', 'UserIdentity'];
    function Service($state, $ionicSideMenuDelegate, UserIdentity) {
        console.log($state.href("reserve", {id: 4}))
        return {
            goTo: function(state, params) {
                $state.go(state, params);
            },
            getLink: function(state, params){
                return $state.href(state, params);
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
