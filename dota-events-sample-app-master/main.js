window.addEventListener('load', function () {

  // this is a subset of the features that DotA events provides - however,
  // when writing an app that consumes events - it is best if you request
  // only those features that you want to handle.
  //
  // NOTE: in the future we'll have a wildcard option to allow retreiving all
  // features
  var textarea = document.getElementById('textareaMessage');

  var requestedFeatures = [

    'kill',
    'death',
    'hero_ability_used',
    'game_state_changed',
    'match_detected',
    'match_state_changed',
    'match_ended',
    'daytime_changed',
    'ward_purchase_cooldown_changed',
    'assist',
    'death',
    'cs',
    'roster',
    'match_info',
    'party',
    // 'hero_picked',
    // 'hero_leveled_up',
    // 'hero_respawned',
    // 'hero_boughtback',
    // 'hero_status_effect_changed',
    // 'hero_attributes_skilled',
    'hero_ability_skilled',
    'hero_ability_used',
    'hero_ability_changed'
    // 'hero_item_changed',
    // 'hero_item_used',
    // 'hero_item_consumed',
    // 'hero_item_charged'

    // these are also supported but spam the console as they happen a lot:
    // 'clock_time_changed',
    // 'xpm',
    // 'gpm',
    // 'gold',
    // 'hero_buyback_info_changed',
    // 'hero_health_mana_info',
    // 'hero_ability_cooldown_changed',
    // 'hero_item_cooldown_changed',
  ];

  var onErrorListener,onInfoUpdates2Listener,	onNewEventsListener;

  function registerEvents() {
  
    onErrorListener = function(info) {
      console.log("Error: " + JSON.stringify(info));
    }
    
    onInfoUpdates2Listener = function(info) {
      console.log("Info UPDATE: " + JSON.stringify(info));
    }
    
    onNewEventsListener = function(info) {
      console.log("EVENT FIRED: " + JSON.stringify(info));
    }
  
    // general events errors
    overwolf.games.events.onError.addListener(onErrorListener);
    
    // "static" data changed (total kills, username, steam-id)
    // This will also be triggered the first time we register
    // for events and will contain all the current information
    overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates2Listener);									
    // an event triggerd
    overwolf.games.events.onNewEvents.addListener(onNewEventsListener);
  }
  
  function unregisterEvents() {
      overwolf.games.events.onError.removeListener(onErrorListener);
    overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates2Listener);
      overwolf.games.events.onNewEvents.removeListener(onNewEventsListener);
  }

    function gameLaunched(gameInfoResult) {
        if (!gameInfoResult) {
            return false;
        }

        if (!gameInfoResult.gameInfo) {
            return false;
        }

        if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
            return false;
        }

        if (!gameInfoResult.gameInfo.isRunning) {
            return false;
        }

        // NOTE: we divide by 10 to get the game class id without it's sequence number
        if (Math.floor(gameInfoResult.gameInfo.id/10) != 7314) {
            return false;
        }

        console.log("LoL Launched");
        return true;

    }

    function gameRunning(gameInfo) {

        if (!gameInfo) {
            return false;
        }

        if (!gameInfo.isRunning) {
            return false;
        }

        // NOTE: we divide by 10 to get the game class id without it's sequence number
        if (Math.floor(gameInfo.id/10) != 7314) {
            return false;
        }

        console.log("LoL running");
        return true;

    }


    function setFeatures() {
        overwolf.games.events.setRequiredFeatures(requestedFeatures, function(info) {
            if (info.status == "error")
            {
                //console.log("Could not set required features: " + info.reason);
                //console.log("Trying in 2 seconds");
                window.setTimeout(setFeatures, 2000);
                return;
            }

            console.log("Set required features:");
            console.log(JSON.stringify(info));
        });
    }


// Start here
    overwolf.games.onGameInfoUpdated.addListener(function (res) {
        console.log("onGameInfoUpdated: " + JSON.stringify(res));
        if (gameLaunched(res)) {
            unregisterEvents();
            registerEvents();
            setTimeout(setFeatures, 1000);
        }
    });

    overwolf.games.getRunningGameInfo(function (res) {
        if (gameRunning(res)) {
            registerEvents();
            setTimeout(setFeatures, 1000);
        }
        console.log("getRunningGameInfo: " + JSON.stringify(res));
    });

});
