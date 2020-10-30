const Discord = require("discord.js");
const gunbullid = require("./gunbullid.js");
const client = new Discord.Client();
const token = require("./token.js");

let negativeWords = ["no","nope","nah","nuh uh","I did not", "I didn't"];
function hasNegativeWord(msg, negativeWords) {
    for(let i = 0; i < negativeWords.length; i++) {
        if(msg.content.toLowerCase().includes(negativeWords[i])) {
            return true
        }
    }
    return false;
}

let positiveWords = ["yes", "yep", "yas", "I did", "I certainly did", "you bet", "of course I did", "yea", "yeah"];
function hasPositiveWord(msg, positiveWords) {
    for(let i = 0; i < positiveWords.length; i++) {
        if(msg.content.toLowerCase().includes(positiveWords[i])) {
            return true
        }
    }
    return false;
}

let lastBaconMsgTime = 0;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot === true) return;
    if (msg.content.toLowerCase().includes("bacon")) {
            msg.channel.send("<@" + msg.author.id + "> did you say... bacon???")
            lastBaconMsgTime = Date.now();
    }
        if(lastBaconMsgTime + (60*1000) > Date.now() && hasPositiveWord(msg, positiveWords)){
            client.users.cache.find(user => user.id === gunbullid).send("<@" + msg.author.id + "> said bacon!!!")
            msg.channel.send("<@" + gunbullid + "> has been alerted to this utterance of the word 'bacon'.");
        }
        else if(lastBaconMsgTime + (60*1000) > Date.now() && hasNegativeWord(msg, negativeWords)){
            msg.channel.send("I could've sworn you said bacon <@" + msg.author.id + "> ...");
        }
});

client.login(token);
