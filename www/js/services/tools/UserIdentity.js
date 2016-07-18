angular.module('goreservas')
    .factory('UserIdentity', function(LocalStorage) {
        return {
            setUser: function(user){
                LocalStorage.put("session", user);
            },
            logout: function(){
                LocalStorage.put("session", null);
            },
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
