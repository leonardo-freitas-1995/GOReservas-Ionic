(function () {
    angular
        .module('goreservas')
        .directive("ratingStar", Directive);
    Directive.$inject = [];
    function Directive(){
        return {
            scope: {
                ratingStar: "="
            },
            template: '<i class="ion-ios-star energized" ng-class="{\'ion-ios-star-outline\': ratingStar.model < ratingStar.rating && ratingStar.model <= ratingStar.rating - 1, \'ion-ios-star-half\': ratingStar.model < ratingStar.rating && ratingStar.model > ratingStar.rating - 1}"></i>'
        };
    }
})();
