Steam Web API 0.1.0
============

## What's the Steam Web API

This is a Node implementation of an [API](https://developer.valvesoftware.com/wiki/Steam_Web_API) provided by [Valve](http://www.valvesoftware.com/). More information [here](http://steamcommunity.com/dev).

## Dependencies

This module uses http.

## Starting with the API

You'll need to get an API key [here](http://steamcommunity.com/dev/registerkey). Once you have that, you can create an instance of the module.

```javascript
var SteamAPI = require('steam-web-api');
var steamClient = new SteamAPI('yourkey');
```

All of the following requests default to a format of 'json.' Other options are 'xml' and 'vdf' (Valve Data Format).

## Getting news for an app

```javascript
steamClient.getNewsForApp(440, function(err, res) { });

// alternative format, & a count of 5
steamClient.getNewsForApp(440, { count: 5 }, function(err, res) { });
```

## Getting the global achievements overview of a game, in percentages

```javascript
steamClient.getGlobalAchievementPercentagesForApp(440, function(err, res) { });
```

## Getting some basic info for a group of steam Ids

```javascript
// for a single Id
steamClient.getPlayerSummaries(76561197960435530, function(err, res) { });

// for multiple ids
steamClient.getPlayerSummaries([76561197960435530, 76561197970887648], function(err, res) { });
```

## Retrieving a list of friends for a user

```javascript
steamClient.getFriendList(76561197970887648, function(err, res) { });
```