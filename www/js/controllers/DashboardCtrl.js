(function () {
    angular
        .module('goreservas')
        .controller('DashboardCtrl', Controller);
    Controller.$inject = ['$scope', 'BusinessResource', 'ReserveResource', 'UserIdentity'];
    function Controller($scope, BusinessResource, ReserveResource, UserIdentity) {
        $scope.bestBusiness = [];
        $scope.lastReserves = [];

        var refreshing = 0;

        function refreshData(){
            refreshing = 0;
            BusinessResource.getBestBusiness()
                .then(function(data){
                    $scope.bestBusiness = data;
                        finishRefresh();
                },
                function(){finishRefresh();});
            ReserveResource.getLastReserves(UserIdentity.getCurrentUser().id)
                .then(function(data){
                    $scope.lastReserves = data;
                    finishRefresh();
                },
                function(){finishRefresh();});
        }

        function finishRefresh(){
            refreshing++;
            if (refreshing === 2){
                $scope.$broadcast('scroll.refreshComplete')
            }
        }

        $scope.refresh = function(){
            refreshData();
        };

        refreshData();
    }
})();
