// When writing an app that consumes events - it is best if you request
// only those features that you want to handle.
//
// NOTE: in the future we'll have a wildcard option to allow retrieving all
// features
var g_interestedInFeatures = [
  "game_flow",
  "summoner_info",
  "champ_select",
  "lcu_info",
  "lobby_info",
  "end_game",
  "game_info"
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
  overwolf.games.launchers.events.onInfoUpdates.addListener(onInfoUpdates2Listener);									
  // an event triggerd
  overwolf.games.events.onNewEvents.addListener(onNewEventsListener);
}

function unregisterEvents() {
    overwolf.games.events.onError.removeListener(onErrorListener);
  overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates2Listener);
    overwolf.games.events.onNewEvents.removeListener(onNewEventsListener);
}


function launcherRunning(launcherInfo) {
  if (!launcherInfo) {
    return false;
  }

  if (!launcherInfo.launchers[0]) {
    return false;
  }

  // NOTE: we divide by 10 to get the launcher class id without it's sequence number
  if (Math.floor(launcherInfo.launchers[0].id / 10) != 10902) {
    return false;
  }

  console.log("League of Legends launcher running");
  return true;
}

function setFeatures() {
  overwolf.games.launchers.events.setRequiredFeatures(
    10902,
    g_interestedInFeatures,
    function(info) {
      if (info.status == "error") {
        //console.log("Could not set required features: " + info.reason);
        //console.log("Trying in 2 seconds");
        window.setTimeout(setFeatures, 2000);
        return;
      }

      console.log("Set required features:");
      console.log(JSON.stringify(info));
    }
  );
}

// Start here
overwolf.games.launchers.onLaunched.addListener(function() {
  registerEvents();
  setTimeout(setFeatures, 1000);
  console.log("onLaunched fired");
});

overwolf.games.launchers.getRunningLaunchersInfo(function(res) {
  if (launcherRunning(res)) {
    unregisterEvents();
    registerEvents();
    setTimeout(setFeatures, 1000);
  }
  console.log("getRunningLaunchersInfo: " + JSON.stringify(res));
});

overwolf.games.launchers.onTerminated.addListener(function(res) {
  console.log("onTerminated fired");
  setTimeout(window.close, 1000);
});
