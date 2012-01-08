var http = require('http');

function steamWebApi(apiKey) {
	if(apiKey === undefined) {
		throw 'No API key definded';
		return;
	}
	
	this.apiKey = apiKey;
	
	return this;
}
	
/**
	returns the latest of a game specified by its appID.
	
	(appId, options, callback) or (appId, callback)
*/
steamWebApi.prototype.getNewsForApp = function(appId, a, b) {
	return makeRequest('/ISteamNews/GetNewsForApp/v0002/?appid=' + appId,  b === undefined ? {} : a, b === undefined ? a : b);
};

/**
	returns global achievements overview of a specific game in percentages.

	(gameId, options, callback) or (gameId, callback)
*/
steamWebApi.prototype.getGlobalAchievementPercentagesForApp = function(gameId, a, b) {
	return makeRequest('/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=' + gameId,  b === undefined ? {} : a, b === undefined ? a : b);
};

/**
	returns basic profile information for a list of 64-bit Steam IDs.

	(steamIds, options, callback) or (steamIds, callback)
*/
steamWebApi.prototype.getPlayerSummaries = function(steamIds, a, b) {
	return makeRequest('/ISteamUser/GetPlayerSummaries/v0002/?key=' + this.apiKey + '&steamids=' + splat(steamIds).join(','),  b === undefined ? {} : a, b === undefined ? a : b);
};

/**
	returns the friend list of any Steam user, provided his Steam Community profile visibility is set to "Public".

	Option of relationship defaults to 'friend'
*/
steamWebApi.prototype.getFriendList = function(steamId, a, b) {
	var options = b === undefined ? {} : a;
	if(!options.relationship) {
		options.relationship = 'friend';
	}
	return makeRequest('/ISteamUser/GetFriendList/v0001/?key=' + this.apiKey + '&steamid=' + steamId,  options, b === undefined ? a : b);
};

/**
	Private function, used to make requests to Steam

	Takes the path, any options (becomes query params) & a callback

	Returns the HTTP request instance
*/
function makeRequest(path, opts, callback) {
	var 
		key,
		req,
		dataStr = '';
		
	if(callback === undefined) {
		throw 'No callback defined';
		return;
	}
	
	for(key in opts) {
		path += '&' + key + '=' + opts[key];
	}
	
	req = http.request({
		host: 'api.steampowered.com',
		port: 80,
		path: path,
		method: 'GET'
	}, function(res) {
		res.on('data', function(data) {
			dataStr += data;
		});
		
		res.on('end', function() {
			if(opts.format === undefined || opts.format.toLowerCase() == 'json') {
				try {
					callback(null, JSON.parse(dataStr));
				} catch(err) {
					callback(null, dataStr);
				}
			}
			else {
				callback(null, dataStr);
			}
		});

		res.on('close', function () {
			res.emit('end');
		});
	});
	
	req.end();

	req.on('error', function(err) {
		callback(err);
	});

	return req;
}

/**
	Ensures argument is an array
*/
function splat(arg) {
	return Array.isArray(arg) ? arg : [arg];
}
	
module.exports = steamWebApi;