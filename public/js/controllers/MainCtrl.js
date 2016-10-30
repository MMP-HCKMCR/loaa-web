angular.module('MainCtrl', [])
    .controller('MainController', ['$scope', 'LoaaService', function ($scope, LoaaService) {
        let greenIcon = "http://maps.google.com/mapfiles/ms/icons/green.png";
        let redIcon = "http://maps.google.com/mapfiles/ms/icons/red.png";
        let blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue.png";

        // PRIVATE FUNC
        var loadMarkers = function(personId) {
            var person = $.grep($scope.missingPeople, function(e){ return e.id == personId; })[0]; 
            var lastSeenArr = person.lastSeen;
            var markers = [];
            var markerCounter = 0;
            $scope.markers = [];
            for (ls in lastSeenArr) {
                var icon;
                if(markerCounter == 0) {
                    icon = greenIcon;
                }else if(markerCounter == lastSeenArr.length-1) {
                    icon = redIcon;
                }else {
                    icon = blueIcon;
                }
                //markers.push({
                $scope.markers.push({
                    id: markerCounter,
                    coords: {
                        latitude: lastSeenArr[ls].latitude,
                        longitude: lastSeenArr[ls].longitude
                    },
                    options: {
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        icon: icon
                    }
                });
                markerCounter++;
            }
        }

        // link map to html tag id
        $scope.map = {
            center: {
                latitude: 53.4808, longitude: -2.2426
            },
            zoom: 8
        };

        LoaaService.getMissing().then(function (res) {
            $scope.missingPeople = res.data.missing;
            loadMarkers($scope.missingPeople[0].id);
            //$scope.markers = markers;
        });
        $scope.tagline = 'To the moon and back!';

        $scope.log = function(str) {
            console.log(str);
        };

        $scope.updateMarkers = function (id) {
            loadMarkers(id);
        };

        
    }]);