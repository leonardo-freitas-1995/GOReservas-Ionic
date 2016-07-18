(function () {
    angular
        .module('goreservas')
        .controller('ReservesCtrl', Controller);
    Controller.$inject = ['$scope', 'ReserveResource', 'UserIdentity'];
    function Controller($scope, ReserveResource, UserIdentity) {
        $scope.reserves = [];

        function refreshData(){
            ReserveResource.getReserves(UserIdentity.getCurrentUser().id)
                .then(function(data){
                        $scope.reserves = data;
                        $scope.$broadcast('scroll.refreshComplete');
                    },
                    function(){$scope.$broadcast('scroll.refreshComplete');});
        }

        $scope.refresh = function(){
            refreshData();
        };

        refreshData();
    }
})();
