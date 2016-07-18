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
            });

        $urlRouterProvider.otherwise('/welcome');

    }
})();
