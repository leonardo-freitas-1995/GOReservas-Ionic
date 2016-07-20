(function() {
    angular.module('goreservas', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'ngResource']);

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

            $ionicPlatform.registerBackButtonAction(function(e){

                if($state.is('welcome') || $state.is('dashboard')){
                    ionic.Platform.exitApp();
                    e.preventDefault();
                }
                else{
                    Layout.goBack();
                    e.preventDefault();
                }

            }, 101);
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

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            var stateRecord = {
                name: from.name,
                param: fromParams
            };
            if (from.name === "")
                stateRecord.name = "dashboard";

            Layout.recordState(to.name, stateRecord);

            if (to.name !== "welcome"){
                $ionicSideMenuDelegate.canDragContent(true);
            }
        });
    }
})();
