(function () {
    angular
        .module('goreservas')
        .controller('ReservesCtrl', Controller);
    Controller.$inject = ['$scope', 'ReserveResource', 'UserIdentity', 'Toast'];
    function Controller($scope, ReserveResource, UserIdentity, Toast) {
        $scope.reserves = [];
        
        $scope.loading = false;
        $scope.error = false;

        function refreshData(){
            $scope.loading = true;
            ReserveResource.getReserves(UserIdentity.getCurrentUser().id)
                .then(function(data){
                        $scope.reserves = data;
                        $scope.loading = false;
                        $scope.$broadcast('scroll.refreshComplete');
                    },
                    function(){
                        $scope.loading = false;
                        $scope.error = true;
                        Toast.error("Ocorreu um erro ao conectar com o servidor. Verifique sua conexão com internet.");
                        $scope.$broadcast('scroll.refreshComplete');
                    });
        }

        $scope.refresh = function(){
            refreshData();
        };

        refreshData();
    }
})();
