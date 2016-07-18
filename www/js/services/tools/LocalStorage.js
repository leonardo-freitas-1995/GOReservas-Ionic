(function () {
    angular
        .module('goreservas')
        .factory('LocalStorage', Service);
    Service.$inject = [];
    function Service() {
        return {
            put: function(key, value){
                window.localStorage[key] = JSON.stringify(value);
            },
            get: function(key){
                return JSON.parse(window.localStorage[key]);
            }
        }
    }
})();
