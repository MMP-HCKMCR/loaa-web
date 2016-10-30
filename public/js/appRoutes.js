angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .when('/heatmap', {
                templateUrl: 'views/heatmap.html',
                controller: 'HeatmapController'
            });
    }]);