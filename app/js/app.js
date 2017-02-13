'use strict';


// Declare app level module which depends on filters, and services
var lolApp = angular.module('lolApp', [
  'ngRoute',
  'ngResource',
  'ngCookies',
  'angularSpinner',
  'lolApp.filters',
  'lolApp.services',
  'lolApp.directives',
  'lolApp.controllers'
]).
config(['$routeProvider', '$resourceProvider', '$httpProvider',
    function($routeProvider, $resourceProvider, $httpProvider) {
      $routeProvider.when('/',
        {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
      $routeProvider.when('/champions',
        {templateUrl: 'partials/champions.html', controller: 'ChampionCtrl'});
      $routeProvider.when('/items',
        {templateUrl: 'partials/items.html', controller: 'ItemCtrl'});
      $routeProvider.when('/summoner',
        {templateUrl: 'partials/summoner-lookup.html', controller: 'SummonerLookupCtrl'});
      $routeProvider.when('/summoner/:region/:name',
        {templateUrl: 'partials/summoner-detail.html', controller: 'SummonerDetailCtrl'});
      $routeProvider.when('/test',
        {templateUrl: 'partials/test.html', controller: 'HomeCtrl'});
      $routeProvider.otherwise({redirectTo: '/'});

      // This header must be sent for AJAX calls for Django's is_ajax() to recognize them.
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

      // Django, by default, doesn't like JSON, so change content-type to what it likes
      //$httpProvider.defaults.headers.post = {'content-type': 'application/x-www-form-urlencoded'};
}]);

// Only ONE of the below backendURL constants should be uncommented.

// Uncomment for local testing.
lolApp.constant('backendUrl', 'http://127.0.0.1:8001');

// Uncomment for internal testing.
//lolApp.constant('backendUrl', 'http://192.168.1.101:8001');

// Uncomment for public access.
//lolApp.constant('backendURL', 'http://sigil.no-ip.org:8081');