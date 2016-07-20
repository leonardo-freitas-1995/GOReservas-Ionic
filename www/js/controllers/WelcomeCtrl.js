(function () {
    angular
        .module('goreservas')
        .controller('WelcomeCtrl', Controller);
    Controller.$inject = ['$scope', '$ionicModal', '$ionicPopup', '$ionicSideMenuDelegate', '$state', 'Toast', 'UserResource', 'UserIdentity'];
    function Controller($scope, $ionicModal, $ionicPopup, $ionicSideMenuDelegate, $state, Toast, UserResource, UserIdentity) {
        $ionicSideMenuDelegate.canDragContent(false);
        
        $scope.login = function(){
            $scope.loginInfo = {
                email: "",
                password: ""
            };
            var loginPopup = $ionicPopup.show({
                template: '<div class="list">' +
                '<label class="item item-input">' +
                '<input type="text" placeholder="Email" ng-model="loginInfo.email">' +
                '</label>' +
                '<label class="item item-input">' +
                '<input type="password" placeholder="Senha" ng-model="loginInfo.password">' +
                '</label>' +
                '</div>',
                title: 'Login',
                subTitle: 'Informe suas credenciais do GOReservas',
                scope: $scope,
                buttons: [
                    { text: 'Cancelar' },
                    {
                        text: '<b>Entrar</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if ($scope.loginInfo.email === "" || $scope.loginInfo.password === ""){
                                Toast.error('Preencha todos os campos de login.');
                            }
                            else{
                                UserResource.authenticateUser($scope.loginInfo.email, $scope.loginInfo.password)
                                    .then(function(user){
                                            UserIdentity.setUser(user);
                                            loginPopup.close();
                                            $state.go("dashboard");
                                        },
                                        function(error){
                                            if (error === "authentication failed"){
                                                Toast.error('Email ou senha incorreta.');
                                            }
                                            else{
                                                Toast.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
                                            }
                                        });
                            }
                            e.preventDefault();
                        }
                    }
                ]
            });
        };

        $ionicModal.fromTemplateUrl('register-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.register = function(){
            $scope.makingRegister = false;
            $scope.newUser = {
                name: "",
                email: "",
                password: "",
                repeatPassword: ""
            };

            $scope.editing = false;
            $scope.modal.show();
        };

        $scope.cancelRegister = function(){
            $scope.modal.hide();
        };

        $scope.finishRegister = function(){
            for (var attr in $scope.newUser){
                if (!$scope.newUser[attr] || $scope.newUser[attr] === ""){
                    Toast.error('Preencha todos os campos corretamente.');
                    return false;
                }
            }
            if ($scope.newUser.password.length < 6){
                Toast.error('A senha deve conter no mínimo 6 caracteres.');
                return false;
            }
            if ($scope.newUser.password !== $scope.newUser.repeatPassword){
                Toast.error('As senhas informadas não coincidem.');
                return false;
            }
            $scope.makingRegister = true;
            UserResource.createUser($scope.newUser).then(function(){
                    Toast.success('Usuário criado com sucesso!');
                    $scope.makingRegister = false;
                    $scope.modal.hide();
                },
                function(reason){
                    $scope.makingRegister = false;
                    if (reason === "duplicated"){
                        Toast.error('O email informado já possui um cadastro.');
                        return false;
                    }
                    else{
                        Toast.error('Não foi possível comunicar com o servidor. Verifique sua conexão com a internet.');
                        return false;
                    }
                });
        };
    }
})();
