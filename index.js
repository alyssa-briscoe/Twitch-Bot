const tmi = require("tmi.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios');

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "retrokittybot",
    password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

  if (command === "echo") {
    client.say(channel, `@${tags.username}, you said: "${arg.join(" ")}"`);
  } else if (command === "hello") {
    client.say(
      channel,
      `@${tags.username}, Welcome to the channel. Trytime is currently on a delay!`
    );
  } else if (command === "dice") {
    const result = Math.floor(Math.random() * 6) + 1;
    client.say(channel, `@${tags.username}, You rolled a ${result}.`);
  } else if (command === "timeout") {
    client.timeout(channel, arg[0], arg[1], arg[2]);
  } else if (command === "ban") {
    client.ban(channel, arg[0], arg[1]);
  } else if (command === "unban") {
    client.unban(channel, arg[0]);
  } else if (command === "language"){
    client.say(channel, "https://imgur.com/CCyxug9.png");
  }else if (command === "vips") {
    client.vips(channel);
  } else if (command === "subcheck") {
	var value = true;
	if(tags['subscriber'] === value){
	client.say(channel, `You are a subscriber! Thank You!`);
} else client.say(channel, `You are NOT a sub.`);
  }
});


client.on("message", (channel, tags, message, self) => {
	var value = true;
	if(tags['first-msg'] === value){
	client.say(channel, `@${tags.username}, FIRST TIME CHATTER! Welcome to the stream! Be sure to check out the !discord`);
}});


client.on("message", (channel, tags, message, self) => {
  if(tags["custom-reward-id"] === "078bd6e0-6339-49e2-8306-406225e0122d"){

  fetch('https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,racist,sexist,explicit')
  .then((res) => res.json())
  .then((data) => {
    if(data.hasOwnProperty('joke')){
      client.say(channel, data["joke"]);
    } else if(data.hasOwnProperty('setup')){
      client.say(channel, data["setup"] + " - " + data["delivery"]);
    } else void 0;
  }
)}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "advice"){

  fetch('https://api.adviceslip.com/advice')
  .then((res) => res.json())
  .then((data) => {
    client.say(channel, data.slip["advice"]);
  }
)}});


client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  const question = encodeURIComponent(arg);

  if(command === "8ball"){

  fetch(`https://8ball.delegator.com/magic/JSON/${question}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    client.say(channel, data.magic["answer"]);
  }
)}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "slov"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"sl"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "japan"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"ja"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "russian"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"ru"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "korean"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"ko"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "port"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"pt"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "spanish"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"es"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "english"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"es","target":"en"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "thai"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"th"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "swedish"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"sv"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});

client.on("message", (channel, tags, message, self) => {

  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if(command === "finnish"){

    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: `{"q": "${arg}" ,"source":"en","target":"fi"}`
    };
  axios(options)
  .then((res) => {
    console.log(res.data.data.translations.translatedText);
    client.say(channel, res.data.data.translations.translatedText);
}).catch((err) => {
  console.log(err);
})
}});