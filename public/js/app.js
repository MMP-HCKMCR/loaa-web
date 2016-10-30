angular.module('loaaApp', ['ngRoute', 'appRoutes', 'MainCtrl','HeatmapCtrl', 'LoaaService', 'uiGmapgoogle-maps'])
.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            key: 'AIzaSyAVDlL7qpYutB6e5bNxvUs8W3dx4unPBAI',
            v: '3.24', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    }]);