(function() {
    angular
        .module('goreservas')
        .config(RouteConfig);
    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RouteConfig($stateProvider, $urlRouterProvider) {

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
            })
            .state('profile', {
                url: '/profile',
                cache: false,
                templateUrl: 'templates/profile/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    user: routeRoleCheck("user")
                }
            })
            .state('reserves', {
                url: '/reserves',
                cache: false,
                templateUrl: 'templates/reserve/reserves.html',
                controller: 'ReservesCtrl',
                resolve: {
                    user: routeRoleCheck("user")
                }
            })
            .state('reserve', {
                url: '/reserve?id',
                cache: false,
                templateUrl: 'templates/reserve/reserve.html',
                controller: 'ReserveCtrl',
                resolve: {
                    user: routeRoleCheck("user")
                }
            })
            .state('search-business', {
                url: '/search-business',
                cache: false,
                templateUrl: 'templates/business/search.html',
                controller: 'SearchBusinessCtrl',
                resolve: {
                    user: routeRoleCheck("user")
                }
            })
            .state('business', {
                url: '/business?id',
                cache: false,
                templateUrl: 'templates/business/business.html',
                controller: 'BusinessCtrl',
                resolve: {
                    user: routeRoleCheck("user")
                }
            });


        $urlRouterProvider.otherwise('/welcome');

    }
})();
