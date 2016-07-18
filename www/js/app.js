angular.module('goreservas', ['ionic', 'ionic-toast', 'ngResource'])

    .run(function($ionicPlatform, $state, $rootScope, $ionicSideMenuDelegate, UserIdentity) {
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

            $rootScope.logout = function(){
                UserIdentity.logout();
                $ionicSideMenuDelegate.toggleLeft();
                $state.go("welcome");
            };

            $rootScope.identity = UserIdentity;
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === "already authenticated"){
                $state.go("dashboard");
            }
            else{
                $state.go("welcome");
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        function routeRoleCheck(role){

            AuthService.$inject = ['$q', 'UserIdentity'];
            function AuthService($q, UserIdentity){
                var routeCheck = {
                    user: function(){
                        if (UserIdentity.isAuthenticated()) {
                            return true;
                        }
                        return $q.reject('not authenticated');
                    },
                    notuser: function(){
                        if (!UserIdentity.isAuthenticated()) {
                            return true;
                        }
                        return $q.reject('already authenticated');
                    }
                };

                return routeCheck[role]();
            }
            return AuthService;
        }

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                cache: false,
                templateUrl: 'templates/main/welcome.html',
                controller: 'WelcomeCtrl',
                resolve: {
                    notuser: routeRoleCheck("notuser")
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                cache: false,
                templateUrl: 'templates/main/dashboard.html',
                controller: 'DashboardCtrl',
                resolve: {
                    user: routeRoleCheck("user")
                }
            });

        $urlRouterProvider.otherwise('/welcome');

    });
