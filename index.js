var SlackBot = require('slackbots');

var token = process.env.BOT_API_KEY;

// create a bot
var bot = new SlackBot({
    token: token, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'dice'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        username: 'dice'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'Rolagem de dados está no ar! \nPara rolar um dado digite  "dice" e o dado que você quer que eu role, exemplo: "dice 3d6". \n Bom jogo! ', params);
    bot.postMessageToChannel('fichas', 'Rolagem de dados está no ar! \nPara rolar um dado digite  "dice" e o dado que você quer que eu role, exemplo: "dice 3d6". \n Bom jogo! ', params);
    bot.postMessageToChannel('mesa-de-jogo', 'Rolagem de dados está no ar! \nPara rolar um dado digite  "dice" e o dado que você quer que eu role, exemplo: "dice 3d6". \n Bom jogo! ', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('user_name', params.username, params);
});

bot.on('message', function(message){
  //console.log(message);
    if (isChatMessage(message) &&
          isChannelConversation(message) &&
          !isFromDiceBot(message) &&
          isMentioningDice(message)
      ) {
          rollDice(message);
      }
});

var isChatMessage = function (message) {
    //console.log('isChatMessage : '+ (message.type === 'message' && Boolean(message.text)));
    return message.type === 'message' && Boolean(message.text);
};

var isChannelConversation = function (message) {
    //console.log('isChannelConversation : '+ (typeof message.channel === 'string' && message.channel[0] === 'C'));
    return typeof message.channel === 'string' && message.channel[0] === 'C';
};

var isFromDiceBot = function (message) {
  //console.log('isFromDiceBot : '+ (message.username === 'dice'));
    //return message.user === bot.user.id;
    return message.username === bot.name;
};

var isMentioningDice = function (message) {
  //console.log('isMentioningDice : '+ (message.text.toLowerCase().indexOf('dice') > -1 || message.text.toLowerCase().indexOf(bot.name) > -1));
    return message.text.toLowerCase().indexOf('dice') > -1 ||
        message.text.toLowerCase().indexOf(bot.name) > -1;
};

var rollDice = function(originalMessage) {
  var channel = getChannelById(originalMessage.channel);
  var resultado = rolarDado(originalMessage.text);
  if(resultado){
    bot.postMessageToChannel(channel.name, resultado, {as_user: true});
  }
}

var getChannelById = function (channelId) {
    return bot.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

var rolarDado = function(message){
  var dado = message.replace(/ /g,'').replace(/(D|d)ice/g,'');
  var resultado = "Resultado ";
  var total = 0;
  if(/^\d+[d]\d+$/.test(dado)){
    var vezes = parseInt(dado.substring(0, dado.indexOf('d')));
    var faces = parseInt(dado.substring((dado.indexOf('d')+1),(dado.length)));
    resultado = resultado + dado + " = ";
    for(var i = 0; i<(vezes); i++){
      var valor = Math.floor((Math.random() * faces) + 1);
      if(i > 0){
       resultado = resultado + ", "
      }
      resultado = resultado + valor;
      total = total+valor;
    }
  }
  return (total ? resultado + "; Total: "+total : null);
};
