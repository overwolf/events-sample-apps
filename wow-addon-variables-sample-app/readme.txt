var_addon notes

* This info-update should be used by addon creators who wish to integrate their WoW addon with an Overwolf app.
* The event is not fired everytime but occurs only if the value of the variable has changed.
* Remember that variables defined in "SavedVariables" section saves its values between play session. In most cases, in order to use them correctly, you need to reinitialize them on "VARIABLES_LOADED" game event.
* Use case example:
   * WoW addon that monitors real-time damage, healing, etc. sends this data to an Overwolf application that displays a game summary screen with interesting stats, video highlights and more.
* How it works?
   * You can use the sample app addon <a href="https://github.com/overwolf/events-sample-apps/tree/master/wow-addon-variables-sample-app" target="_blank">here</a>
   * In the addon .toc file in section "SavedVariables" - In order to not overwrite other Addons, please define new variables named “owf_%addon_name%_%var_name%” where addon_name is your own addon name and var_name as you want.
   * The addon LUA file should update these variables with the relevant data the Overwolf app should consume.  
   * Each of these vars will update Overwolf with their current value during the game.
   * The Overwolf application reads these values in real time and displays the relevant information to the user, or performs certain actions (e.g. recording an interesting video highlight).
* Supported variable types are:
  * LUA_TSTRING
  * LUA_TNUMBER
  * LUA_TBOOLEAN
  * LUA_TNIL

Data Example:

```json
{"feature":"addons","category":"addons","key":"var_addon_1","value":"{\"owf_var2\":\"test 123\",\"owf_var5\":\"123 test\",\"owf_var6\":\"55\"}"}
```
-->
