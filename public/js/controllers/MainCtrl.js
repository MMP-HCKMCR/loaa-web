angular.module('MainCtrl', [])
    .controller('MainController', ['$scope', 'LoaaService', function ($scope, LoaaService) {
        let greenIcon = "http://maps.google.com/mapfiles/ms/icons/green.png";
        let redIcon = "http://maps.google.com/mapfiles/ms/icons/red.png";
        let blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue.png";
        
        // link map to html tag id
        $scope.map = {
            center: {
                latitude: 53.4808, longitude: -2.2426
            },
            zoom: 12
        };

        LoaaService.getMissing().then(function (res) {
            $scope.missingPeople = res.data.missing;
            var firstPerson = $scope.missingPeople[0];
            console.log(firstPerson.forenames);
            var markers = [];
            var markerCounter = 0;
            for (ls in firstPerson.lastSeen) {
                var icon;
                if(markerCounter == 0) {
                    icon = greenIcon;
                }else if(markerCounter == firstPerson.lastSeen.length) {
                    icon = redIcon;
                }else {
                    icon = blueIcon;
                }
                markers.push({
                    id: markerCounter,
                    coords: {
                        latitude: firstPerson.lastSeen[ls].latitude,
                        longitude: firstPerson.lastSeen[ls].longitude
                    },
                    options: {
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        icon: icon
                    }
                });
                markerCounter++;
            }
            console.log(markers);
            $scope.markers = markers;
        });
        $scope.tagline = 'To the moon and back!';
    }]);