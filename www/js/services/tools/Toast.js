(function () {
    angular
        .module('goreservas')
        .factory('Toast', Service);
    Service.$inject = ['$ionicPopup'];
    function Service($ionicPopup) {
        return {
            success: function(msg){
                $ionicPopup.alert({
                    title: msg,
                    okType: 'button-balanced'
                });
            },
            error: function(msg){
                $ionicPopup.alert({
                    title: msg,
                    okType: "button-assertive"
                });
            },
            info: function(msg){
                $ionicPopup.alert({
                    title: msg
                });
            }
        }
    }
})();
