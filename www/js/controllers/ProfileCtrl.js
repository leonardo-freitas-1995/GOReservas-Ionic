(function () {
    angular
        .module('goreservas')
        .controller('ProfileCtrl', Controller);
    Controller.$inject = ['$scope', '$state', '$ionicPopup', 'UserIdentity', 'UserResource'];
    function Controller($scope, $state, $ionicPopup, UserIdentity, UserResource) {
        $scope.updateUser = {
            name: UserIdentity.getCurrentUser().name,
            password: "",
            repeatPassword: ""
        };

        $scope.finishUpdate = function(){
            if ($scope.updateUser.password !== "" && $scope.updateUser.password !== $scope.updateUser.repeatPassword){
                $scope.updateError = "As senhas informadas não coincidem.";
                $scope.showUpdateError = true;
                return false;
            }

            $scope.updating = true;
            var newName = $scope.updateUser.name;
            UserResource.updateUser(UserIdentity.getCurrentUser().email, $scope.updateUser).then(function(){
                    var user = UserIdentity;
                    user.name = newName;
                    UserIdentity.setUser(user);
                    $state.go("dashboard");
                    $scope.updating = false;
                    var alertPopup = $ionicPopup.show({
                        title: 'Dados atualizados com sucesso!',
                        buttons: [{ text: 'Ok' }]
                    });
                },
                function(reason){
                    $scope.updating = false;
                    $scope.updateError = "Não foi possível comunicar com o servidor. Tente novamente mais tarde.";
                    $scope.showUpdateError = true;
                    return false;
                });
        };
    }
})();
