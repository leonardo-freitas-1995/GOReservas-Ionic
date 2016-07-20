(function () {
    angular
        .module('goreservas')
        .controller('DashboardCtrl', Controller);
    Controller.$inject = ['$scope', 'BusinessResource', 'ReserveResource', 'UserIdentity', 'Toast'];
    function Controller($scope, BusinessResource, ReserveResource, UserIdentity, Toast) {
        $scope.bestBusiness = [];
        $scope.lastReserves = [];

        var refreshing = 0;

        $scope.loading = false;
        $scope.error = false;

        function refreshData(){
            refreshing = 0;
            $scope.loading = true;
            BusinessResource.getBestBusiness()
                .then(function(data){
                    $scope.bestBusiness = data;
                        finishRefresh();
                },
                function(){finishRefresh(true);});
            ReserveResource.getLastReserves(UserIdentity.getCurrentUser().id)
                .then(function(data){
                    $scope.lastReserves = data;
                    finishRefresh();
                },
                function(){finishRefresh(true);});
        }

        var cachedError = false;

        function finishRefresh(error){
            refreshing++;
            if (refreshing === 2){
                $scope.loading = false;
                $scope.$broadcast('scroll.refreshComplete')
                if (error || cachedError){
                    Toast.error("Ocorreu um erro ao conectar com o servidor. Verifique sua conexão com internet.");
                    cachedError = false;
                    $scope.error = true;
                }
            }
            else if (error){
                cachedError = true;
            }
        }

        $scope.refresh = function(){
            refreshData();
        };

        refreshData();
    }
})();
