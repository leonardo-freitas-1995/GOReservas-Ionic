(function () {
    angular
        .module('goreservas')
        .controller('BusinessCtrl', Controller);
    Controller.$inject = ['$scope', '$ionicModal', '$sce', '$state', 'ionicDatePicker', 'ionicTimePicker', 'ReserveResource', 'BusinessResource', 'Toast', 'UserIdentity'];
    function Controller($scope, $ionicModal, $sce, $state, ionicDatePicker, ionicTimePicker, ReserveResource, BusinessResource, Toast, UserIdentity) {

        $scope.business = null;
        $scope.loaded = false;
        $scope.newReserve = {
            totalValue: 0,
            day: new Date(),
            hour: new Date()
        };

        $ionicModal.fromTemplateUrl('reserve-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.makeMapsLink = function(business){
            return $sce.trustAsResourceUrl("https://maps.google.com/maps?q=" + business.latitude + "," + business.longitude + "&hl=es;z=14&output=embed");
        };

        $scope.createReserve = function(){
            $scope.newReserve = {
                totalValue: 0,
                day: new Date(),
                hour: new Date()
            };
            $scope.modal.show();
        };

        $scope.cancelReserve = function(){
            $scope.modal.hide();
        };

        var datepicker = {
            callback: function (val) {
                $scope.newReserve.day = new Date(val);
            },
            inputDate: $scope.newReserve.day,
            mondayFirst: false,
            closeOnSelect: false,
            setLabel: "Escolher",
            closeLabel: "Cancelar",
            templateType: 'popup'
        };

        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(datepicker);
        };

        var timepicker = {
            callback: function (val) {
                var hours = val / 3600;
                var minutes = (val % 3600) / 60;
                $scope.newReserve.hour.setHours(hours);
                $scope.newReserve.hour.setMinutes(minutes);
            },
            inputTime: $scope.newReserve.hour.getHours() * 3600 + $scope.newReserve.hour.getMinutes() * 60,
            format: 24,
            step: 1,
            setLabel: "Escolher",
            closeLabel: "Cancelar",
        };

        $scope.openTimePicker = function(){
            timepicker.inputTime = $scope.newReserve.hour.getHours() * 3600 + $scope.newReserve.hour.getMinutes() * 60;
            ionicTimePicker.openTimePicker(timepicker);
        };

        $scope.getTotalReserve = function(){
            var total = 0;
            if ($scope.business){
                total += $scope.business.pricePerReserve;
                if ($scope.newReserve.quantity){
                    total += $scope.business.pricePerPerson * $scope.newReserve.quantity;
                }
            }
            return total;
        };

        $scope.finishReserve = function(){
            if (!$scope.newReserve.day ||
                !$scope.newReserve.hour ||
                !$scope.newReserve.quantity ||
                $scope.newReserve.quantity === "" ||
                $scope.newReserve.quantity < $scope.business.minPerReserve ||
                $scope.newReserve.quantity > $scope.business.maxPerReserve){
                Toast.error("Preencha os campos corretamente");
                return false;
            }
            var day = $scope.newReserve.day;
            var hour = $scope.newReserve.hour;
            $scope.newReserve.date =
                    day.getFullYear() + "-" +
                    addZero(day.getMonth() + 1) + "-" +
                    addZero(day.getDate()) +
                    " " +
                    addZero(hour.getHours()) + ":" +
                    addZero(hour.getMinutes()) + ":00";
            $scope.newReserve.totalValue = $scope.getTotalReserve();
            $scope.newReserve.business = parseInt($state.params.id);
            $scope.newReserve.client = UserIdentity.getCurrentUser().id;
            ReserveResource.createReserve($scope.newReserve).then(function(confirmed){
                    if (confirmed){
                        Toast.success("Sua reserva foi criada e confirmada com sucesso.");
                    }
                    else{
                        Toast.success("Sua reserva foi criada, e está pendente sujeita a confirmação.");
                    }
                    $scope.modal.hide();
                },
                function(reason){
                    if (reason === "ahead of time"){
                        Toast.error("É preciso fazer reservas com uma hora de atecedência.");
                    }
                    else{
                        Toast.error("Ocorreu um erro ao conectar com o servidor. Verifique sua conexão com internet.");
                    }
                });
        };

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        $scope.refresh = function(){
            refreshBusiness();
        };

        function refreshBusiness(){
            var id = $state.params.id;
            if (id && id !== ""){
                BusinessResource.getBusiness(id).then(function(data){
                        $scope.business = data;
                        $scope.loaded = true;
                        $scope.$broadcast('scroll.refreshComplete');
                    },
                    function(){
                        $scope.loaded = true;
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }
            else{
                $scope.loaded = true;
                $scope.$broadcast('scroll.refreshComplete');
            }
        }

        refreshBusiness();

        if (typeof google === 'object' && typeof google.maps === 'object') {
            initializeMap();
        }
        else{
            google.maps.event.addDomListener(window, 'load', initializeMap);
        }

        function initializeMap(){
            $scope.$watchGroup([function(){return $scope.business}, function(){return document.getElementById("map")}], function(newValue, oldValue){
                if ($scope.business && document.getElementById("map")){
                    var latLng = new google.maps.LatLng($scope.business.latitude, $scope.business.longitude);
                    var mapOptions = {
                        center: latLng,
                        zoom: 15
                    };
                    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: $scope.map,
                        title: $scope.business.name
                    });
                }
            }, true);
        }
    }
})();
