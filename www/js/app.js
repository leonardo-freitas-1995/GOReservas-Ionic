(function() {
    angular.module('goreservas', ['ionic', 'ionic-toast', 'ngResource']);

    angular
        .module('goreservas')
        .run(AppRun);

    AppRun.$inject = ['$ionicPlatform', '$state', '$rootScope', 'Layout'];
    function AppRun($ionicPlatform, $state, $rootScope, Layout) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        $rootScope.layout = Layout;

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === "already authenticated"){
                $state.go("dashboard");
            }
            else{
                $state.go("welcome");
            }
        });
    }
})();
