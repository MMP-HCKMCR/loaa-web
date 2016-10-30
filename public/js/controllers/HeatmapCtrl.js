angular.module('HeatmapCtrl', [])
    .controller('HeatmapController', ['$scope', 'LoaaService', function ($scope, LoaaService) {

        // link map to html tag id
        // $scope.map = {
        //     center: {
        //         latitude: 53.4808, longitude: -2.2426
        //     },
        //     zoom: 8
        // };

        function HeatLayer(heatmapLayer) {
            // Adding 500 Data Points
            var map, pointarray, heatmap;
            $scope.pointCount = heatLayer.length;
            var pointArray = new google.maps.MVCArray(heatLayer);
            heatmapLayer.setData(pointArray);
        };

        var heatLayer = [];

        var addLatLng = function (lat, lng) {
            heatLayer.push(new google.maps.LatLng(lat, lng));
        };

        var extractCoord = function (listOfMissingPeople) {
            var lat;
            var lng;
            for (var i = 0; i < listOfMissingPeople.length; i++) {
                var person = listOfMissingPeople[i];
                lat = person.latitude;
                lng = person.longitude;
                if (lat && lng) {
                    addLatLng(lat, lng);
                }
                lat = null;
                lng = null;
                var listLastSeen = person.lastSeen;
                for (var j = 0; j < listLastSeen.length; j++) {
                    var ls = listLastSeen[j];
                    lat = ls.latitude;
                    lng = ls.longitude;
                    if (lat && lng) {
                        addLatLng(lat, lng);
                    }
                    lat = null;
                    lng = null;
                }
            }
        };

        var onSuccess = function (res) {
            var missingPeople = res.data.missing;
            $scope.countMissing = missingPeople.length;
            extractCoord(missingPeople);
        };

        var onError = function (err) {
            console.log("Call to get missing all failed");
            console.log(err);
        };

        LoaaService.getAllMissing()
            .then(onSuccess, onError);

        $scope.map = {
            center: {
                latitude: 53.4808,
                longitude: -2.2426
            },
            zoom: 12,
            heatLayerCallback: function (layer) {
                //set the heat layers backend data
                var heatLayer = new HeatLayer(layer);
            },
            showHeat: true
        };
    }]);