angular.module('goreservas')
    .controller('SidenavCtrl', function($scope, $state, $ionicSideMenuDelegate, $ionicPopup, UserIdentity) {
        $scope.sidemenuClick = function(state){
            $state.go(state);
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.logout = function(){
            $ionicSideMenuDelegate.toggleLeft();
            var logoutPopup = $ionicPopup.show({
                template: '',
                title: 'Logout',
                subTitle: 'Deseja mesmo desconectar de sua conta?',
                buttons: [
                    { text: 'Cancelar' },
                    {
                        text: '<b>Sair</b>',
                        type: 'button-assertive',
                        onTap: function(e) {
                            UserIdentity.logout();
                            $state.go("welcome");
                        }
                    }
                ]
            });
        };
        
        $scope.isAuthenticated = function(){
            return UserIdentity.isAuthenticated();
        };
        
        $scope.getAuthenticatedInfo = function(info){
            return UserIdentity.getCurrentUser()[info];
        };
        
    });
