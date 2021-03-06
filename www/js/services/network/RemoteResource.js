(function () {
    angular
        .module('goreservas')
        .factory('RemoteResource', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var REMOTE_HOST = "http://localhost:8100";
        return {
            resource: function(url){
                return $resource(
                    REMOTE_HOST + url,
                    {},
                    {
                        update: {method: 'PUT', isArray: false},
                        authenticate: {method: 'PUT', isArray: false}
                    }
                );
            }
        }
    }
})();
