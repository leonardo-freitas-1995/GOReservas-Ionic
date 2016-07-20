(function () {
    angular
        .module('goreservas')
        .controller('ProfileCtrl', Controller);
    Controller.$inject = ['$scope', '$state', 'Toast', 'UserIdentity', 'UserResource'];
    function Controller($scope, $state, Toast, UserIdentity, UserResource) {
        $scope.updateUser = {
            name: UserIdentity.getCurrentUser().name,
            password: "",
            repeatPassword: ""
        };

        $scope.finishUpdate = function(){
            if ($scope.updateUser.password !== "" && $scope.updateUser.password.length < 6){
                Toast.error('A senha deve conter no mínimo 6 caracteres.');
                return false;
            }
            if ($scope.updateUser.password !== "" && $scope.updateUser.password !== $scope.updateUser.repeatPassword){
                Toast.error('As senhas informadas não coincidem.');
                return false;
            }

            $scope.updating = true;
            var newName = $scope.updateUser.name;
            UserResource.updateUser(UserIdentity.getCurrentUser().email, $scope.updateUser).then(function(){
                    var user = UserIdentity.getCurrentUser();
                    user.name = newName;
                    UserIdentity.setUser(user);
                    $state.go("dashboard");
                    Toast.info('Dados atualizados com sucesso!');
                },
                function(){
                    $scope.updating = false;
                    Toast.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
                });
        };
    }
})();
