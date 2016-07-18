(function () {
    angular
        .module('goreservas')
        .factory('UserIdentity', Service);
    Service.$inject = ['LocalStorage'];
    function Service(LocalStorage) {
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
    }
})();
