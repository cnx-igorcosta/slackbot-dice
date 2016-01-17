# slackbot-dice
Slackbot to roll dice when any user says "dice" and the type of dice "1d6". The slackbot-dice will generate a value of this dice.

Slackbot wrapper for slack.com

https://github.com/shokai/node-slackbot
https://www.npmjs.org/package/slackbot
#Install

% npm install slackbot-dice
#Get Token

add slackbot integration and get token

https://YOUR-TEAM.slack.com/services/new/slackbot
#Usage

var Slackbot = require('slackbot')

var slackbot = new Slackbot('YOUR-TEAM', 'YOUR-TOKEN');

slackbot.send("#general", "hello!!", function(err, res, body) {
  if(err) return;
  console.log(body);
});
#Sample

use sample.js

% SLACK_TEAM=teamname SLACK_TOKEN=a1b2cdef345 node sample.js "hello world"
#Develop

% npm install

% npm test
 or
% npm run watch
