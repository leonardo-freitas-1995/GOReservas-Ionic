(function () {
    angular
        .module('goreservas')
        .controller('ReserveCtrl', Controller);
    Controller.$inject = ['$scope', '$sce', '$state', '$ionicPopup', 'ReserveResource', 'UserIdentity', 'Toast'];
    function Controller($scope, $sce, $state, $ionicPopup, ReserveResource, UserIdentity, Toast) {

        $scope.reserve = null;
        $scope.rating = 0;
        $scope.loaded = false;

        $scope.makeMapsLink = function(business){
            return $sce.trustAsResourceUrl("https://maps.google.com/maps?q=" + business.latitude + "," + business.longitude + "&hl=es;z=14&output=embed");
        };

        $scope.isBeforeReserve = function(date){
            var dateA = new Date(date);
            var dateB = new Date();
            return (dateB.getTime() < dateA.getTime());
        };

        $scope.rateReserve = function(){
            ReserveResource.rateReserve($scope.reserve.id, $scope.reserve.business.id, $scope.rating).then(function(){
                    Toast.success("Reserva avaliada com sucesso");
                    $scope.reserve.rated = true;
                },
                function(){
                    Toast.error("Não foi possível completar esta ação");
                });
        };

        $scope.cancelReserve = function(){
            var logoutPopup = $ionicPopup.show({
                template: '',
                title: 'Cancelar',
                subTitle: 'Deseja mesmo cancelar esta reserva?',
                buttons: [
                    { text: 'Não' },
                    {
                        text: '<b>Sim</b>',
                        type: 'button-assertive',
                        onTap: function(e) {
                            ReserveResource.cancelReserve($scope.reserve.id, new Date($scope.reserve.date).getTime()).then(function(response){
                                    Toast.success("Reserva cancelada com sucesso.");
                                    $state.go("dashboard")
                                },
                                function(reason){
                                    if (reason === "ahead of time"){
                                        Toast.error("Não é possível cancelar uma reserva que já passou de sua data.");
                                    }
                                    else{
                                        Toast.error("Não foi possível completar esta ação");
                                    }
                                });
                        }
                    }
                ]
            });
        };

        $scope.changeRating = function(rating){
            $scope.rating = rating;
        };

        $scope.refresh = function(){
            refreshReserve();
        };

        function refreshReserve(){
            var id = $state.params.id;
            if (id && id !== ""){
                ReserveResource.getOneReserve(UserIdentity.getCurrentUser().id, id).then(function(data){
                        $scope.reserve = data;
                        if ($scope.reserve.rated)
                            $scope.rating = $scope.reserve.rating;
                        $scope.loaded = true;
                        $scope.$broadcast('scroll.refreshComplete');
                    },
                    function(){
                        $scope.loaded = true;
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }
            else{
                $scope.loaded = true;
                $scope.$broadcast('scroll.refreshComplete');
            }
        }

        refreshReserve();
    }
})();
