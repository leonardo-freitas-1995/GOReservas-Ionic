(function () {
    angular
        .module('goreservas')
        .controller('DashboardCtrl', Controller);
    Controller.$inject = ['$scope', 'BusinessResource', 'ReserveResource', 'UserIdentity'];
    function Controller($scope, BusinessResource, ReserveResource, UserIdentity) {
        $scope.bestBusiness = [];
        $scope.lastReserves = [];

        (function(){
            BusinessResource.getBestBusiness()
            .then(function(data){
                $scope.bestBusiness = data;
            });
            ReserveResource.getLastReserves(UserIdentity.getCurrentUser().id)
            .then(function(data){
                $scope.lastReserves = data;
            });
        })()
    }
})();
