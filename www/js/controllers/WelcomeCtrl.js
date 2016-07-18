(function () {
    angular
        .module('goreservas')
        .controller('WelcomeCtrl', Controller);
    Controller.$inject = ['$scope', '$ionicModal', '$ionicPopup', '$state', 'UserResource', 'UserIdentity'];
    function Controller($scope, $ionicModal, $ionicPopup, $state, UserResource, UserIdentity) {

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
                                $ionicPopup.alert({
                                    title: 'Preencha todos os campos de login.',
                                    okType: "button-assertive"
                                });
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
                                                $ionicPopup.alert({
                                                    title: 'Email ou senha incorreta.',
                                                    okType: "button-assertive"
                                                });
                                            }
                                            else{
                                                $ionicPopup.alert({
                                                    title: 'Não foi possível conectar com o servidor.',
                                                    okType: "button-assertive"
                                                });
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
                    $ionicPopup.alert({
                        title: 'Preencha todos os campos corretamente.',
                        okType: "button-assertive"
                    });
                    return false;
                }
            }
            if ($scope.newUser.password.length < 6){
                $ionicPopup.alert({
                    title: 'A senha deve conter no mínimo 6 caracteres.',
                    okType: "button-assertive"
                });
                return false;
            }
            if ($scope.newUser.password !== $scope.newUser.repeatPassword){
                $ionicPopup.alert({
                    title: 'As senhas informadas não coincidem.',
                    okType: "button-assertive"
                });
                return false;
            }
            $scope.makingRegister = true;
            UserResource.createUser($scope.newUser).then(function(){
                    $ionicPopup.alert({
                        title: 'Usuário criado com sucesso!',
                        okType: 'button-balanced'
                    });
                    $scope.makingRegister = false;
                    $scope.modal.hide();
                },
                function(reason){
                    $scope.makingRegister = false;
                    if (reason === "duplicated"){
                        $ionicPopup.alert({
                            title: 'O email informado já possui um cadastro.',
                            okType: "button-assertive"
                        });
                        return false;
                    }
                    else{
                        $ionicPopup.alert({
                            title: 'Não foi possível comunicar com o servidor. Tente novamente mais tarde.',
                            okType: "button-assertive"
                        });
                        return false;
                    }
                });
        };
    }
})();
