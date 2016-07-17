angular.module('goreservas')
    .factory('UserResource', function($q, RemoteResource) {
        var Resource = RemoteResource.resource("/api/users/:id");
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
            }
        }
    });
