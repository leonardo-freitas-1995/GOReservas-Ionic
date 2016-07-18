angular.module('goreservas', ['ionic', 'ionic-toast', 'ngResource'])

    .run(function($ionicPlatform, $state, $rootScope, $ionicSideMenuDelegate) {
        $ionicPlatform.ready(function() {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            $rootScope.sidemenuClick = function(state){
                $state.go(state);
                $ionicSideMenuDelegate.toggleLeft();
            };

            $rootScope.goTo = function(state){
                $state.go(state);
            };

            $rootScope.sidemenuToggle = function(){
                $ionicSideMenuDelegate.toggleLeft();
            };
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                cache: false,
                templateUrl: 'templates/main/welcome.html',
                controller: 'WelcomeCtrl'
            });

        $urlRouterProvider.otherwise('/welcome');

    });
