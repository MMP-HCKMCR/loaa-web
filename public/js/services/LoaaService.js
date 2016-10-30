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

            getTop: function (){
                return $http.get('/api/missing/top');
            }

            // // these will work when more API routes are defined on the Node side of things
            // // call to POST and create a new nerd
            // create : function(nerdData) {
            //     return $http.post('/api/nerds', nerdData);
            // },

            // // call to DELETE a nerd
            // delete : function(id) {
            //     return $http.delete('/api/nerds/' + id);
            // }
        }

    }]);