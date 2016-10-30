angular.module('MainCtrl', [])
    .controller('MainController', ['$scope', 'LoaaService', function ($scope, LoaaService) {

        LoaaService.getMissing().then(function (res) {
            $scope.missingPeople = res.data.missing;
        });
        $scope.tagline = 'To the moon and back!';

        // link map to html tag id
        $scope.map = { 
            center: { 
                latitude: 53.4808, longitude: -2.2426 
            }, 
            zoom: 5 
        };

        $scope.markers = [];

    }]);