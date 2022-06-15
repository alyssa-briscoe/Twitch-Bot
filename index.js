const tmi = require("tmi.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const JokeAPI = require('sv443-joke-api');


//async function apiCall(){
//var response = await fetch('https://v2.jokeapi.dev/joke/Any');
//var results = await response.json();
//console.log(results);} 


const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "retrokittybot",
    password: "XXXXXXXXXXXXXXXXXXXXXXXX",
  },
  channels: ["trytimepoker"],
});

client.connect();

client.on("message", (channel, tags, message, self) =>{
console.log(tags);
});


client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith("!")) {
    return;
  }
  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  switch (command) {
    case "echo":
      client.say(channel, `@${tags.username}, you said: "${arg.join(" ")}"`);
      break;
    case "hello":
      client.say(
        channel,
        `@${tags.username}, Welcome to the channel. Trytime is currently on a delay!`
      );
      break;
    case "dice":
      const result = Math.floor(Math.random() * 6) + 1;
      client.say(channel, `@${tags.username}, You rolled a ${result}.`);
      break;
    case "timeout":
      client.timeout(channel, arg[0], arg[1], arg[2]);
      break;
    case "ban":
      client.ban(channel, arg[0], arg[1]);
      break;
    case "unban":
      client.unban(channel, arg[0]);
      break;
    case "vips":
      client.vips(channel);
      break;
    case "subcheck":
      var value = true;
      if (tags["subscriber"] === value) {
        client.say(channel, `You are a subscriber! Thank You!`);
      } else {
        client.say(channel, `You are NOT a sub.`);
      }
      break;
    default:
      client.say(channel, "Unknown command");
      break;
  }
});


client.on("message", (channel, tags, message, self) => {
	var value = true;
	if(tags['first-msg'] === value){
	client.say(channel, `@${tags.username}, FIRST TIME CHATTER! Welcome to the stream! Be sure to check out the !discord`);
}});


client.on("message", (channel, tags, message, self) => {
  if(tags["custom-reward-id"] === "078bd6e0-6339-49e2-8306-406225e0122d"){
  JokeAPI.getJokes()
  .then((res) => res.json())
  .then((data) => {
    if(data.hasOwnProperty('joke')){
      client.say(channel, data["joke"]);
    } else if(data.hasOwnProperty('setup')){
      client.say(channel, data["setup"] + " - " + data["delivery"]);
    } else void 0;
  }
)}});
