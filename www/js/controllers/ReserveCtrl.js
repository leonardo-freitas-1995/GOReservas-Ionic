(function () {
    angular
        .module('goreservas')
        .controller('ReserveCtrl', Controller);
    Controller.$inject = ['$scope', 'ReserveResource', 'UserIdentity'];
    function Controller($scope, ReserveResource, UserIdentity) {

    }
})();
