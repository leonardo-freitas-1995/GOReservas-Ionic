(function () {
    angular
        .module('goreservas')
        .factory('UserResource', Service);
    Service.$inject = ['$q', 'RemoteResource'];
    function Service($q, RemoteResource) {
        var Resource = RemoteResource.resource("/api/users/:email");
        return {
            authenticateUser: function(email, password){
                var authentication = new Resource({email: email, password: password});
                var dfd = $q.defer();
                authentication.$authenticate().then(
                    function(response){
                        if (response.success){
                            dfd.resolve(response.data);
                        }
                        else{
                            dfd.reject("authentication failed");
                        }
                    },
                    function(error){
                        dfd.reject(error.name);
                    }
                );
                return dfd.promise;
            },
            createUser: function(userData){
                var newUser = new Resource(userData);
                var dfd = $q.defer();
                newUser.$save().then(
                    function(response){
                        if (response.success){
                            dfd.resolve();
                        }
                        else{
                            dfd.reject(response.reason);
                        }
                    },
                    function(error){
                        dfd.reject(error.name);
                    }
                );
                return dfd.promise;
            },
            updateUser: function(email, userData){
                var userUpdate = new Resource(userData);
                var dfd = $q.defer();
                userUpdate.$save({email: email}).then(
                    function(response){
                        if (response.success){
                            dfd.resolve();
                        }
                        else{
                            dfd.reject(response.reason);
                        }
                    },
                    function(error){
                        dfd.reject(error.name);
                    }
                );
                return dfd.promise;
            }
        }
    }
})();
