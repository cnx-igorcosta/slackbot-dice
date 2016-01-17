var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    //token: 'xoxb-18668002486-Mg3WsknoDVfawURAHxzxzSIG', // Add a bot https://my.slack.com/services/new/bot and put the token
    token: 'xoxb-18674222631-oO1qMAYaz31JvkGdpoyXvJjk', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'dice'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        username: 'dice'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    //bot.postMessageToChannel('general', 'Rolagem de dados está no ar! \nPara rolar um dado digite  "dice" e o dado que você quer que eu role, exemplo: 3d6. \n Bom jogo! ', params);
    bot.postMessageToChannel('general', 'teste dice', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('user_name', params.username, params);
});

bot.on('message', function(message){
  console.log(message);
    if (isChatMessage(message) &&
          isChannelConversation(message) &&
          !isFromDiceBot(message) &&
          isMentioningDice(message)
      ) {
          rollDice(message);
      }
});

var isChatMessage = function (message) {
    console.log('isChatMessage : '+ (message.type === 'message' && Boolean(message.text)));
    return message.type === 'message' && Boolean(message.text);
};

var isChannelConversation = function (message) {
    console.log('isChannelConversation : '+ (typeof message.channel === 'string' && message.channel[0] === 'C'));
    return typeof message.channel === 'string' && message.channel[0] === 'C';
};

var isFromDiceBot = function (message) {
  console.log('isFromDiceBot : '+ (message.username === 'dice'));
    //return message.user === bot.user.id;
    return message.username === bot.name;
};

var isMentioningDice = function (message) {
  console.log('isMentioningDice : '+ (message.text.toLowerCase().indexOf('dice') > -1 || message.text.toLowerCase().indexOf(bot.name) > -1));
    return message.text.toLowerCase().indexOf('dice') > -1 ||
        message.text.toLowerCase().indexOf(bot.name) > -1;
};

var rollDice = function(originalMessage) {
  var channel = getChannelById(originalMessage.channel);
    bot.postMessageToChannel(channel.name, 'Rolou dado', {as_user: true});
}

var getChannelById = function (channelId) {
    return bot.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};
