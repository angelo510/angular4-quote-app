'use strict';

/* Controllers */

var lolApp = angular.module('lolApp.controllers', []);

//lolApp
//  .controller('MyCtrl1', ['$scope', function($scope) {
//
//  }])
//  .controller('MyCtrl2', ['$scope', function($scope) {
//
//  }]);

lolApp.controller('HomeCtrl', ['$scope', function($scope) {

}]);

lolApp.controller('ChampionCtrl', ['$scope', 'championService', function($scope, championService) {
  $scope.nameFilter = null;
  $scope.championList = [];

  championService.getChampions().success(function (response) {
    $scope.championList = response;
  })
}]);

lolApp.controller('SummonerListCtrl', ['$scope', 'summonerService', function($scope, summonerService) {
  $scope.summoners = summonerService.get({region: 'euw'});
  $scope.orderProp = 'name';
}]);

lolApp.controller('SummonerDetailCtrl',
  ['$scope', '$routeParams', '$http', 'summonerService', 'matchHistoryService', 'teamService', 'soloQueueService', 'backendUrl',
    function($scope, $routeParams, $http, summonerService, matchHistoryService, teamService, soloQueueService, backendUrl) {
      $scope.loading = false;   // This lets us toggle things in the view. (i.e. ng-show)

      // TODO: The $http call should probably be in a service.
      $scope.updateSummonerFromURL = function() {
        $scope.loading = true;
        var responsePromise = $http({
          method: 'POST',
          url: 'http://127.0.0.1:8001/summoner/ajax_query_start',
          data: {region: $routeParams.region, name: $routeParams.name},
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          // This transforms the JSON data into a format that Django natively expects.
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          }
        });

        // When we request a refresh, we get a taskID back.
        // We then periodically poll for this task's state until we get "SUCCESS".
        responsePromise.success(function(data, status) {
          console.log('success on updateSummonerFromURL...');
          console.log('data: ' + data);
          console.log('status: ' + status);

          // This is the task ID we query repeatedly to find out when the update is done.
          $scope.taskID = data;

          // In case of browser weirdness.
          if (timerID) {
            clearInterval(timerID);
          }

          // Here we setup the periodic checking of task state.
          var timerID = setInterval(function() {
            var taskResponsePromise = $http({
              method: 'POST',
              url: 'http://127.0.0.1:8001/api/task_state',
              data: {task_id: $scope.taskID},
              headers: {'content-type': 'application/x-www-form-urlencoded'},
              transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
              }
            });

            // Each time we get a valid response on the task state.
            // We should only ever see PENDING or SUCCESS.
            taskResponsePromise.success(function(data, status) {
              console.log('success on taskResponsePromise...');
              // Django returns the string in double quotes specifically.
              if(data=='"SUCCESS"') {
                console.log(data);
                console.log(status);
                clearInterval(timerID);
                $scope.loading = false;   // Update our model so the view can change.
                $scope.refreshSummonerInfo();
                $scope.refreshGames();
                $scope.refreshTeams();

                if ( summoner_id != -1 ) {
                  $scope.refreshSoloQueue();
                }
              }
            });

            taskResponsePromise.error(function(data, status) {
              console.log('error on taskResponsePromise...');
              console.log(data);
              console.log(status);
            });
          }, 300);    // We run the above every 300 ms.

        });

        responsePromise.error(function(data, status) {
          console.log('error on updateSummonerFromURL...');
          console.log('data: ' + data);
          console.log('status: ' + status);
        });

      };

      // Basic Summoner Info

      var summoner_id = -1;

      $scope.summonerInfo = summonerService.get({region: $routeParams.region, name: $routeParams.name}, function(info) {
//        console.log('info.summoner_id: ' + info.summoner_id)
        summoner_id = info.summoner_id;
//        console.log('summoner_id: ' + summoner_id);

        // We query soloQueue data in here b/c we need to resolve summonerInfo.summoner_id to make the call.
        // This maybe should be redone to accept $routeParams.name instead.
        $scope.soloQueue = soloQueueService.get({region: $routeParams.region, id: info.summoner_id});
//        console.log($scope.soloQueue);
      });

      $scope.refreshSoloQueue = function() {
        $scope.soloQueue = soloQueueService.get({region: $routeParams.region, id: summoner_id});
      };

      $scope.refreshSummonerInfo = function() {
        $scope.summonerInfo = summonerService.get({region: $routeParams.region, name: $routeParams.name});
      };

      // Match History

      $scope.games = matchHistoryService.get({region: $routeParams.region, name: $routeParams.name});

      $scope.refreshGames = function() {
        $scope.games = matchHistoryService.get({region: $routeParams.region, name: $routeParams.name});
      };

      // Team(s)

      var std_name = $routeParams.name.toLowerCase();
      std_name = std_name.replace(' ', '');

      $scope.teams = teamService.get({region: $routeParams.region, name: std_name});

      $scope.refreshTeams = function() {
        $scope.teams = teamService.get({region: $routeParams.region, name: std_name});
      };

//      $scope.refreshTeams = function() {
//        $scope.teams = teamService.get({region: $routeParams.region, name: std_name});
//      };

      // Solo Queue League Info

//      console.log(typeof summonerInfo);
//      console.log(summonerInfo.summoner_id);

//      var summoner_info = summonerService.get({region: $routeParams.region, name: $routeParams.name}, function(summoner_info) {
//        var summoner_id = summoner_info.summoner_id;
//      });

      //console.log(summoner_id);

//      $scope.refreshSoloQueue = function() {
//        $scope.soloQueue = soloQueueService.get({region: $routeParams.region, id: $scope.summonerInfo.summoner_id});
//      };

//      console.log($scope.summonerInfo.summoner_id);
//      console.log($scope.summonerInfo);
//      console.log($scope.teams);
}]);

lolApp.controller('SummonerLookupCtrl', ['$scope', '$timeout', '$location', '$cookieStore',
  function($scope, $timeout, $location, $cookieStore) {
//    var timeout;
//
//    $scope.$watch('name', function(newName) {
//      if (newName) {
//        // If there is a timeout already in progress
//        if (timeout) $timeout.cancel(timeout);
//
//        timeout = $timeout(function() {
//          $scope.summonerInfo = summonerService.get({region: $scope.region, name: newName})
//        }, 350);
//      }
//    });

    $scope.preferredRegion = $cookieStore.get('preferredRegion') || 'na';

    $scope.regionOptions = [
      {
        name: 'NA',
        value: 'na'
      },
      {
        name: 'EUW',
        value: 'euw'
      },
      {
        name: 'EUNE',
        value: 'eune'
      },
      {
        name: 'BR',
        value: 'br'
      },
      {
        name: 'LAN',
        value: 'lan'
      },
      {
        name: 'LAS',
        value: 'las'
      },
      {
        name: 'KR',
        value: 'kr'
      },
      {
        name: 'OCE',
        value: 'oce'
      },
      {
        name: 'RU',
        value: 'ru'
      },
      {
        name: 'TR',
        value: 'tr'
      },
    ];

    $scope.toSummonerDetail = function(region, name) {
      $location.path('/summoner/' + region + '/' + name);
      $cookieStore.put('preferredRegion', region);
    };

//    $scope.$watch('name', function(newName) {
//      $scope.summonerInfo = summonerService.get({region: $scope.region, name: newName});
//    });

//    $scope.summonerInfo = summonerService.get({region: 'na', name: 'ronfar'});
}]);

lolApp.controller('MatchHistoryCtrl', ['$scope', '$routeParams', 'matchHistoryService',
  function($scope, $routeParams, matchHistoryService) {
    $scope.games = matchHistoryService.get({region: $routeParams.region, name: $routeParams.name});

    $scope.update = function() {
      $scope.games = matchHistoryService.get({region: $routeParams.region, name: $routeParams.name});
    };
}]);

lolApp.controller('ItemCtrl', ['$scope',
  function($scope) {
    return;
}]);