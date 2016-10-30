angular.module('LoaaService', [])
    .factory('LoaaService', ['$http', function ($http) {

        return {
            // call to get all nerds
            getMissing: function () {
                var data = {
                    "longitude": "-2.2426",
                    "latitude": "53.4808"
                };
                return $http.post('/api/missing', data);
            },

            getTop: function () {
                return $http.get('/api/missing/top');
            },
            getAllMissing: function () {
                var data = {
                    "longitude": "-2.2426",
                    "latitude": "53.4808"
                };
                return $http.post('/api/missing/all', data);
            }
        }
    }]);