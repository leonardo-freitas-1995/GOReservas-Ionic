(function () {
    angular
        .module('goreservas')
        .controller('BusinessCtrl', Controller);
    Controller.$inject = ['$scope', 'BusinessResource', 'UserIdentity'];
    function Controller($scope, BusinessResource, UserIdentity) {

    }
})();
