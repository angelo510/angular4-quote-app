'use strict';

/* Directives */

var lolApp = angular.module('lolApp.directives', []);

lolApp.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

lolApp.directive('summonerBasicInfo', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/summoner-basic-info.html'
  };
});

// Render a gameBox
lolApp.directive('recentGame', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/recent-game.html'
  };
});

lolApp.directive('itemName', function() {
  return {
  };
});

lolApp.directive('gameItems', function() {
  return {
    restrict: 'E',
    scope: {
      game: '=game'
    },
    templateUrl: 'partials/game-items.html'
  };
});

// Display the summoner's items.
// Does not include trinket.
lolApp.directive('gameItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/game-item.html'
  };
});

// Display the summoner's trinket.
lolApp.directive('gameTrinket', function() {
  return {
    restrict: 'E',
    template: '<div class="item6" style={{game.stats.item6|itemOrBlank}}><div class="itemBackImg"></div></div>'
  };
});

// Display the participants of a single match.
// TODO: Consider refactoring to use a 2-dimensional array instead of an array for each team.
lolApp.directive('gameParticipants', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/game-participants.html',
    replace: true, // We need to get things to display properly w/this set to false.
    scope: true, //{ game: '=game'},
    controller: function($scope) {
      $scope.team100 = [];
      $scope.team200 = [];

      // The data for the summoner whose history we are looking at.
      // Necessary because this player's data is not part of the player_set.
      var thisSummoner = {
        summoner: {
          summoner_id: $scope.summonerInfo.summoner_id,
          name: $scope.summonerInfo.name
        },
        champion: {
          champion_id: $scope.game.champion_id,
          key: $scope.game.champion_key
        },
        team_id: $scope.game.team_id
      };

      // First, add summoner whose history we're checking to the right team.
      if ($scope.game.team_id == 100) {
        $scope.team100.push(thisSummoner);
      } else {
        $scope.team200.push(thisSummoner);
      }

      // Then, add each member of player_set to the proper team.
      for ( var i = 0; i < $scope.game.player_set.length; i++ ) {
        var thisPlayer = $scope.game.player_set[i];

        if (thisPlayer.team_id == 100) {
          $scope.team100.push(thisPlayer);
        } else {
          $scope.team200.push(thisPlayer);
        }

        //console.log(thisPlayer);
      }

//      console.log('team 100: ');
//      for ( var j = 0; j < $scope.team100.length; j++ ) {
//        console.log($scope.team100[j]);
//      }
//      console.log('team 200: ');
//      for ( var j = 0; j < $scope.team200.length; j++ ) {
//        console.log($scope.team200[j]);
//      }
    }
  };
});

lolApp.directive('soloQueue', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/solo-queue.html',
    replace: false
  };
});

lolApp.directive('rankedTeams', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/ranked-teams.html',
    replace: true,
    controller: function ($scope) {
      $scope.teamList = [];

      // This makes sure we only work w/the resolved resource.
      $scope.teams.$promise.then(function(teams) {

        // Build a list of teams that are not provisional and have played at least 1 game this season.
        for ( var i = 0; i < teams.results.length; i++ ) {
          if (teams.results[i].status == 'RANKED') {
            if (teams.results[i].league_entries.length > 0) {
              $scope.teamList.push(teams.results[i]);
            }
          }
        }

        // Remove the team_stat_detail with less wins.
        // !! This is a temp fix to teams that play both 5s and 3s.
        for ( var j = 0; j < $scope.teamList.length; j++ ) {
          var thisTeam = $scope.teamList[j];

          // Technically, we remove the second entry if it's less than or equal.
          if ( thisTeam.team_stat_detail[0].wins >= thisTeam.team_stat_detail[1].wins ) {
            thisTeam.team_stat_detail.splice(1,1);
          } else {
            thisTeam.team_stat_detail.splice(0,1);
          }
        }


        console.log($scope.teamList);
      });
    }
  };
});

//lolApp.directive('teamEntry', function() {
//  return {
//    restrict: 'E',
//    templateUrl: 'partials/team-entry.html',
//    replace: true
//  };
//});