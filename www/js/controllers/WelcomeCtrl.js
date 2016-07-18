(function () {
    angular
        .module('goreservas')
        .controller('WelcomeCtrl', Controller);
    Controller.$inject = ['$scope', '$ionicModal', '$ionicPopup', '$state', 'ionicToast', 'UserResource', 'UserIdentity'];
    function Controller($scope, $ionicModal, $ionicPopup, $state, ionicToast, UserResource, UserIdentity) {
        angular.element(document.querySelector('.ionic_toast')).removeClass("display-none");

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
                                ionicToast.show("Preencha todos os campos de login", "top", false, 3000);
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
                                                ionicToast.show("Email ou senha incorreta.", "top", false, 5000);
                                            }
                                            else{
                                                ionicToast.show("Não foi possível conectar com o servidor.", "top", false, 5000);
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
            $scope.showRegisterError = false;
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

        $scope.hideError = function(){
            $scope.showRegisterError = false;
        };

        $scope.finishRegister = function(){
            $scope.showRegisterError = false;
            for (var attr in $scope.newUser){
                if (!$scope.newUser[attr] || $scope.newUser[attr] === ""){
                    $scope.registerError = "Preencha todos os campos corretamente.";
                    $scope.showRegisterError = true;
                    return false;
                }
            }
            if ($scope.newUser.password.length < 6){
                $scope.registerError = "A senha deve conter no mínimo 6 caracteres.";
                $scope.showRegisterError = true;
                return false;
            }
            if ($scope.newUser.password !== $scope.newUser.repeatPassword){
                $scope.registerError = "As senhas informadas não coincidem.";
                $scope.showRegisterError = true;
                return false;
            }
            $scope.makingRegister = true;
            UserResource.createUser($scope.newUser).then(function(){
                    ionicToast.show("Usuário criado com sucesso!", "top", false, 5000);
                    $scope.makingRegister = false;
                    $scope.modal.hide();
                },
                function(reason){
                    $scope.makingRegister = false;
                    if (reason === "duplicated"){
                        $scope.registerError = "O email informado já possui um cadastro.";
                        $scope.showRegisterError = true;
                        return false;
                    }
                    else{
                        $scope.registerError = "Não foi possível comunicar com o servidor. Tente novamente mais tarde.";
                        $scope.showRegisterError = true;
                        return false;
                    }
                });
        };

        $scope.$on("$destroy", function() {
            angular.element(document.querySelector('.ionic_toast')).addClass("display-none");
        });
    }
})();
