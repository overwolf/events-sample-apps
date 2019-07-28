window.addEventListener('load', function () {

    var requestedFeatures = [
      'stats',
      'roster',
      'match',
      'me',
      'match_info'
    ];
    
    var textarea = document.getElementById('textareaMessage');

    function registerEvents() {
      // general events errors
      overwolf.games.events.onError.addListener(function(info) {
        console.log("Error: " + JSON.stringify(info));
        textarea.value += "Error: " + JSON.stringify(info) + '\n';
      });

      // "static" data changed (total kills, username, steam-id)
      // This will also be triggered the first time we register
      // for events and will contain all the current information
      overwolf.games.events.onInfoUpdates2.addListener(function(info) {
          console.log("Info UPDATE: " + JSON.stringify(info));
          textarea.value += "Info UPDATE: " + JSON.stringify(info) + '\n';
      });

      // an event triggerd
      overwolf.games.events.onNewEvents.addListener(function(info) {
          console.log("EVENT FIRED: " + JSON.stringify(info));
          textarea.value += "EVENT FIRED: " + JSON.stringify(info) + '\n';
      });
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
        if (Math.floor(gameInfoResult.gameInfo.id/10) != 10798) {
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
        if (Math.floor(gameInfo.id/10) != 10798) {
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
