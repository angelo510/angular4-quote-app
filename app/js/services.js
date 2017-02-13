'use strict';

/* Services */

var lolApp = angular.module('lolApp.services', ['ngResource']);

// Demonstrate how to register services
// In this case it is a simple value service.
lolApp.value('version', '0.1');


lolApp.factory('championService', ['$http', 'backendUrl', function($http, backendUrl) {
  var championAPI = {};

  championAPI.getChampions = function() {
    return $http({
      method: 'GET',
      url: backendUrl + '/api/champions'
    });
  };

  return championAPI;
}]);

lolApp.factory('summonerService', ['$resource', 'backendUrl', function($resource, backendUrl) {
  return $resource(backendUrl + '/api/summoners/:region/:name',
    {region: '@region', name: '@name'}
  );
}]);

lolApp.factory('matchHistoryService', ['$resource', 'backendUrl', function($resource, backendUrl) {
  return $resource(backendUrl + '/api/games/:region/:name',
    {region: '@region', name: '@name'}
  );
}]);

lolApp.factory('teamService', ['$resource', 'backendUrl', function($resource, backendUrl) {
  return $resource(backendUrl + '/api/teams/:region/by-member/:name',
      {region: '@region', name: '@name'},
      {get: {method: 'GET', isArray: false}}
  );
}]);

lolApp.factory('soloQueueService', ['$resource', 'backendUrl', function($resource, backendUrl) {
  return $resource(backendUrl + '/api/league-entries/:region/:id',
      {region: '@region', id: '@id'},
      {get: {method: 'GET', isArray: false}}
  );
}]);

//lolApp.factory('summonerUpdateService', ['$http', function($http) {
//  return $http({
//    method: 'POST',
//    url: 'http://127.0.0.1:8001/summoner/ajax_query_start',
//    data: {region: $routeParams.region, name: $routeParams.name},
//    headers: {'content-type': 'application/x-www-form-urlencoded'},
//    transformRequest: function(obj) {
//      var str = [];
//      for(var p in obj)
//        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//      return str.join("&");
//    }
//  });
//}]);