'use strict';

/* Filters */

var lolApp = angular.module('lolApp.filters', ['ngSanitize']);

lolApp.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);

lolApp.filter('gameDuration', function() {
  return function(time_played) {
    var mm = time_played / 60;

    return mm.toFixed(0);
  };
});

lolApp.filter('winOrLoss', function() {
  return function(win, type) {
    if (type=='str') {
      if (win) {
        return 'Victory';
      } else {
        return 'Defeat';
      }
    }

    if (type=='class') {
      if (win) {
        return 'win';
      } else {
        return 'loss';
      }
    }
  };
});

// Takes a subType game constant and returns it with human formatting.
lolApp.filter('subType', function() {
  return function(str) {
    switch (str) {
      case 'NONE':
        return 'None';
        break;
      case 'NORMAL':
        return 'Normal';
        break;
      case 'BOT':
        return 'Bot';
        break;
      case 'RANKED_SOLO_5x5':
        return 'Ranked Solo 5v5';
        break;
      case 'RANKED_PREMADE_3x3':
        return 'Ranked Premade 3v3';
        break;
      case 'RANKED_PREMADE_5x5':
        return 'Ranked Premade 5v5';
        break;
      case 'ODIN_UNRANKED':
        return 'Dominion Unranked';
        break;
      case 'RANKED_TEAM_3x3':
        return 'Ranked Team 3v3';
        break;
      case 'RANKED_TEAM_5x5':
        return 'Ranked Team 5v5';
        break;
      case 'NORMAL_3x3':
        return 'Normal 3v3';
        break;
      case 'BOT_3x3':
        return 'Bot 3v3';
        break;
      case 'CAP_5x5':
        return 'Team Builder 5v5';
        break;
      case 'ARAM_UNRANKED_5x5':
        return 'ARAM 5v5';
        break;
      case 'ONEFORALL_5x5':
        return 'One For All 5v5';
        break;
      case 'FIRSTBLOOD_1x1':
        return 'First Blood 1v1';
        break;
      case 'FIRSTBLOOD_2x2':
        return 'First Blood 2v2';
        break;
      case 'SR_6x6':
        return 'Hexakill';
        break;
      case 'URF':
        return 'Ultra Rapid Fire';
        break;
      case 'URF_BOT':
        return 'Ultra Rapid Fire Bot';
        break;
      case 'NIGHTMARE_BOT':
        return 'Nightmare Bot';
        break;
      default:
        return 'Unknown';
    }
  };
});

// Takes a champion ID and returns a champion name as used by DataDragon
lolApp.filter('championNameDD', function() {
  return function(id) {
    switch (id) {
      case 1:
        return 'Annie';
      case 2:
        return 'Olaf';
      case 3:
        return 'Galio';
      case 4:
        return 'TwistedFate';
      case 5:
        return 'XinZhao';
      case 6:
        return 'Urgot';
      case 7:
        return 'LeBlanc';
      case 8:
        return 'Vladimir';
      case 9:
        return 'Fiddlesticks';
      case 10:
        return 'Kayle';
      case 11:
        return 'MasterYi';
      case 12:
        return 'Alistar';
      case 13:
        return 'Ryze';
      case 14:
        return 'Sion';
      case 15:
        return 'Sivir';
      case 16:
        return 'Soraka';
      case 17:
        return 'Teemo';
      case 18:
        return 'Tristana';
      case 19:
        return 'Warwick';
      case 20:
        return 'Nunu';
      case 21:
        return 'MissFortune';
      case 22:
        return 'Ashe';
      case 23:
        return 'Tryndamere';
      case 24:
        return 'Jax';
      case 25:
        return 'Morgana';
      case 26:
        return 'Zilean';
      case 27:
        return 'Singed';
      case 28:
        return 'Evelynn';
      case 29:
        return 'Twitch';
      case 30:
        return 'Karthus';
      case 31:
        return 'Chogath';
      case 32:
        return 'Amumu';
      case 33:
        return 'Rammus';
      case 34:
        return 'Anivia';
      case 35:
        return 'Shaco';
      case 36:
        return 'DrMundo';
      case 37:
        return 'Sona';
      case 38:
        return 'Kassadin';
      case 39:
        return 'Irelia';
      case 40:
        return 'Janna';
      case 41:
        return 'Gangplank';
      case 42:
        return 'Corki';
      case 43:
        return 'Karma';
      case 44:
        return 'Taric';
      case 45:
        return 'Veigar';
      case 48:
        return 'Trundle';
      case 50:
        return 'Swain';
      case 51:
        return 'Caitlyn';
      case 53:
        return 'Blitzcrank';
      case 54:
        return 'Malphite';
      case 55:
        return 'Katarina';
      case 56:
        return 'Nocturne';
      case 57:
        return 'Maokai';
      case 58:
        return 'Renekton';
      case 59:
        return 'JarvanIV';
      case 60:
        return 'Elise';
      case 61:
        return 'Orianna';
      case 62:
        return 'Wukong';
      case 63:
        return 'Brand';
      case 64:
        return 'LeeSin';
      case 67:
        return 'Vayne';
      case 68:
        return 'Rumble';
      case 69:
        return 'Cassiopeia';
      case 72:
        return 'Skarner';
      case 74:
        return 'Heimerdinger';
      case 75:
        return 'Nasus';
      case 76:
        return 'Nidalee';
      case 77:
        return 'Udyr';
      case 78:
        return 'Poppy';
      case 79:
        return 'Gragas';
      case 80:
        return 'Pantheon';
      case 81:
        return 'Ezreal';
      case 82:
        return 'Mordekaiser';
      case 83:
        return 'Yorick';
      case 84:
        return 'Akali';
      case 85:
        return 'Kennen';
      case 86:
        return 'Garen';
      case 89:
        return 'Leona';
      case 90:
        return 'Malzahar';
      case 91:
        return 'Talon';
      case 92:
        return 'Riven';
      case 96:
        return 'KogMaw';
      case 98:
        return 'Shen';
      case 99:
        return 'Lux';
      case 101:
        return 'Xerath';
      case 102:
        return 'Shyvana';
      case 103:
        return 'Ahri';
      case 104:
        return 'Graves';
      case 105:
        return 'Fizz';
      case 106:
        return 'Volibear';
      case 107:
        return 'Rengar';
      case 110:
        return 'Varus';
      case 111:
        return 'Nautilus';
      case 112:
        return 'Viktor';
      case 113:
        return 'Sejuani';
      case 114:
        return 'Fiora';
      case 115:
        return 'Ziggs';
      case 117:
        return 'Lulu';
      case 119:
        return 'Draven';
      case 120:
        return 'Hecarim';
      case 121:
        return 'Khazix';
      case 122:
        return 'Darius';
      case 126:
        return 'Jayce';
      case 127:
        return 'Lissandra';
      case 131:
        return 'Diana';
      case 133:
        return 'Quinn';
      case 134:
        return 'Syndra';
      case 143:
        return 'Zyra';
      case 154:
        return 'Zac';
      case 157:
        return 'Yasuo';
      case 161:
        return 'Velkoz';
      case 201:
        return 'Braum';
      case 222:
        return 'Jinx';
      case 236:
        return 'Lucian';
      case 238:
        return 'Zed';
      case 254:
        return 'Vi';
      case 266:
        return 'Aatrox';
      case 267:
        return 'Nami';
      case 412:
        return 'Thresh';
    }
  };
});

lolApp.filter('kdaRatio', function() {
  return function(k, d, a) {
    return ((k + a) / d).toFixed(2);
  };
});

// Takes a value and returns 0 if it is null, otherwise returns value.
lolApp.filter('nullToZero', function() {
  return function(val) {
    if (val==null) {
      return '0';
    } else {
      return val;
    }
  };
});

lolApp.filter('itemOrBlank', function() {
  return function(id) {
    if (id==null) {
      return '';
    } else {
      return 'background-image: url(http://ddragon.leagueoflegends.com/cdn/4.12.2/img/item/' + id + '.png);';
    }
  };
});

lolApp.filter('numeral', function() {
  return function(roman) {
    switch(roman) {
      case 'I':
        return '1';
      case 'II':
        return '2';
      case 'III':
        return '3';
      case 'IV':
        return '4';
      case 'V':
        return '5';
    }
  };
});