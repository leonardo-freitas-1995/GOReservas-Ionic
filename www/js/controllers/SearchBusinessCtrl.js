(function () {
    angular
        .module('goreservas')
        .controller('SearchBusinessCtrl', Controller);
    Controller.$inject = ['$scope', 'BusinessResource', 'UserIdentity', 'Toast'];
    function Controller($scope, BusinessResource, UserIdentity, Toast) {
        $scope.search = {
            term: "",
            filter: ["'restaurant'", "'entertainment'", "'other'"]
        };

        $scope.businessArray = [];
        $scope.lastSearch = "";
        $scope.loaded = false;

        $scope.makeSearch = function(){
            if (!$scope.search.filter.filter(function(val){return val != null;}).length){
                Toast.error("É preciso selecionar pelo menos um dos filtros para efetuar a busca.");
                return false;
            }
            $scope.lastSearch = $scope.search.term;
            $scope.loaded = false;
            BusinessResource.searchBusiness(UserIdentity.getCurrentUser().id, $scope.search.term,
                $scope.search.filter)
                .then(function(data){
                    $scope.businessArray = data;
                    $scope.loaded = true;
                });
            if (typeof cordova === 'object'){
                cordova.plugins.Keyboard.close();
            }
        };

        $scope.makeSearch();
    }
})();
