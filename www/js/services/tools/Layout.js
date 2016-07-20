(function () {
    angular
        .module('goreservas')
        .factory('Layout', Service);
    Service.$inject = ['$state', '$ionicSideMenuDelegate', 'UserIdentity'];
    function Service($state, $ionicSideMenuDelegate, UserIdentity) {
        return {
            stateHistory: {},
            backed: false,
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
            },
            recordState: function(state, history){
                if (!this.backed){
                    this.stateHistory[state] = history;
                }
                this.backed = false;
            },
            goBack: function(){
                this.backed = true;
                var history = this.stateHistory[$state.current.name];
                $state.go(history.name, history.param);

            },
            isPrimary: function(){
                return $state.is("dashboard");
            }
        }
    }
})();
