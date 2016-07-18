(function () {
    angular
        .module('goreservas')
        .controller('DashboardCtrl', Controller);
    Controller.$inject = ['$scope', 'BusinessResource', 'ReserveResource', 'UserIdentity'];
    function Controller($scope, BusinessResource, ReserveResource, UserIdentity) {
        $scope.bestBusiness = [];
        $scope.lastReserves = [];

        function refreshData(){
            BusinessResource.getBestBusiness()
                .then(function(data){
                    $scope.bestBusiness = data;
                    $scope.$broadcast('scroll.refreshComplete')
                },
                function(){$scope.$broadcast('scroll.refreshComplete')});
            ReserveResource.getLastReserves(UserIdentity.getCurrentUser().id)
                .then(function(data){
                    $scope.lastReserves = data;
                    $scope.$broadcast('scroll.refreshComplete')
                },
                function(){$scope.$broadcast('scroll.refreshComplete')});
        }

        $scope.refresh = function(){
            refreshData();
        };

        refreshData();
    }
})();
