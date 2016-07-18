(function () {
    angular
        .module('goreservas')
        .factory('BusinessResource', Service);
    Service.$inject = ['$q', 'RemoteResource'];
    function Service($q, RemoteResource) {
        var Resource = RemoteResource.resource("/api/business/:id/:client/:search/:filter");
        return {
            getBusiness: function(id){
                var business = new Resource();
                var dfd = $q.defer();
                business.$get({id: id}).then(
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
            getBestBusiness: function(){
                var business = new Resource();
                var dfd = $q.defer();
                business.$get().then(
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
            searchBusiness: function(client, search, filter){
                if (search === "")
                    search = "%all%";
                var business = new Resource();
                var dfd = $q.defer();
                business.$get({client: client, search: search, filter: filter}).then(
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
            }
        }
    }
})();
