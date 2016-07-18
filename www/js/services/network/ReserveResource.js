(function () {
    angular
        .module('goreservas')
        .factory('ReserveResource', Service);
    Service.$inject = ['$q', 'RemoteResource'];
    function Service($q, RemoteResource) {
        var Resource = RemoteResource.resource("/api/reserve/:id/:business/:date/:client");
        return {
            createReserve: function (reserveData) {
                var newReserve = new Resource(reserveData);
                var dfd = $q.defer();
                newReserve.$save().then(
                    function(response){
                        if (response.success){
                            dfd.resolve(response.confirmed);
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
            rateReserve: function (id, business, rating) {
                var reserve = new Resource({rating: rating});
                var dfd = $q.defer();
                reserve.$save({id: id, business: business}).then(
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
            getReserves: function(id){
                var reserve = new Resource();
                var dfd = $q.defer();
                reserve.$get({id: id}).then(
                    function(response){
                        if (response.success){
                            dfd.resolve(response.data);
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
            getLastReserves: function(id){
                var reserve = new Resource();

                var dfd = $q.defer();
                reserve.$update({id: id}).then(
                    function(response){
                        if (response.success){
                            dfd.resolve(response.data);
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
            getOneReserve: function(client, id){
                var reserve = new Resource();

                var dfd = $q.defer();
                reserve.$get({client: client, id: id}).then(
                    function(response){
                        if (response.success){
                            dfd.resolve(response.data);
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
            cancelReserve: function(id, date){
                var reserve = new Resource();

                var dfd = $q.defer();
                reserve.$delete({id: id, date: date}).then(
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
