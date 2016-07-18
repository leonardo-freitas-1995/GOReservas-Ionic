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
            if ($scope.updateUser.password !== "" && $scope.updateUser.password.length < 6){
                $ionicPopup.alert({
                    title: 'A senha deve conter no mínimo 6 caracteres.',
                    okType: "button-assertive"
                });
                return false;
            }
            if ($scope.updateUser.password !== "" && $scope.updateUser.password !== $scope.updateUser.repeatPassword){
                $ionicPopup.alert({
                    title: 'As senhas informadas não coincidem.',
                    okType: "button-assertive"
                });
                return false;
            }

            $scope.updating = true;
            var newName = $scope.updateUser.name;
            UserResource.updateUser(UserIdentity.getCurrentUser().email, $scope.updateUser).then(function(){
                    var user = UserIdentity;
                    user.name = newName;
                    UserIdentity.setUser(user);
                    $state.go("dashboard");
                    $ionicPopup.alert({
                        title: 'Dados atualizados com sucesso!'
                    });
                },
                function(reason){
                    $scope.updating = false;
                    $ionicPopup.alert({
                        title: 'Não foi possível comunicar com o servidor. Tente novamente mais tarde.',
                        okType: "button-assertive"
                    });
                });
        };
    }
})();
