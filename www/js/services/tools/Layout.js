(function () {
    angular
        .module('goreservas')
        .factory('Layout', Service);
    Service.$inject = ['$state', '$ionicSideMenuDelegate'];
    function Service($state, $ionicSideMenuDelegate) {
        return {
            goTo: function(state) {
                $state.go(state);
            },
            sidemenuToggle: function(){
                $ionicSideMenuDelegate.toggleLeft();
            }
        }
    }
})();
