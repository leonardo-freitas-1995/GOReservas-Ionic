angular.module('goreservas')
    .factory('LocalStorage', function() {
        return {
            put: function(key, value){
                window.localStorage[key] = JSON.stringify(value);
            },
            get: function(key){
                return JSON.parse(window.localStorage[key]);
            }
        }
    });
