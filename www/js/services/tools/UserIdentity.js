angular.module('goreservas')
    .factory('UserIdentity', function(LocalStorage) {
        return {
            getCurrentUser: function(){
                try{
                    return LocalStorage.get("session");
                }
                catch (e){
                    return null;
                }
            },
            isAuthenticated: function(){
                return this.getCurrentUser() != null;
            }
        }
    });
