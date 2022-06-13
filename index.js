const tmi = require("tmi.js");

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "retrokittybot",
    password: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  channels: ["trytimepoker"],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith("!")) {
    console.log(tags);
    return;
  }
  const arg = message.slice(1).split(" ");
  const command = arg.shift().toLowerCase();

  if (command === "echo") {
    client.say(channel, `@${tags.username}, you said: "${arg.join(" ")}"`);
  } else if (command === "hello") {
    client.say(channel,`@${tags.username}, Welcome to the channel. Trytime is currently on a delay!`);
  } else if (command === "dice") {
    const result = Math.floor(Math.random() * 6) + 1;
    client.say(channel, `@${tags.username}, You rolled a ${result}.`);
  } else if (command === "timeout") {
    client.timeout(channel, arg[0], arg[1], arg[2]);
  } else if (command === "ban") {
    client.ban(channel, arg[0], arg[1]);
  } else if (command === "unban") {
    client.unban(channel, arg[0]);
  } else if (command === "vips") {
    client.vips(channel);
  } else if (command === "subcheck") {
    var value = true;
    if (tags["subscriber"] === value) {
      client.say(channel, `You are a subscriber! Thank You!`);
    } else client.say(channel, `You are NOT a sub.`);
    console.log(tags);
  }
});

client.on("message", (channel, tags, message, self) => {
  var value = true;
  if (tags["first-msg"] === value) {
    client.say(
      channel,
      `@${tags.username}, FIRST TIME CHATTER! Welcome to the stream! Be sure to check out the !discord`
    );
  }
});
