const { client } = require('./node_modules/tmi.js');
const tmi = require('./node_modules/tmi.js');
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch}) => fetch(...args));
const axios = require ('axios');

// TODO: Switch all commands to axios and remove fetch

function loadCommands() {

//login to twitch
        const client = new tmi.Client({
            options: { debug: true, messagesLogLevel: 'info'}, 
            connection: { secure: true, reconnect: true,}, 
            identity: {
            username: 'TWITCH-USERNAME', 
            password: 'oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',},
            channels: ['xxxxxxxxxx', 'xxxxxxxxx'],
});

        client.connect();

//provides a console.log of twitch tags for each message, delete to stop
        client.on("message", (channel, userstate, message, self) => {
            console.log(userstate);
});

        client.on("message", (channel, tags, message, self) => {
            if (self || !message.startsWith("!")) {
            return;
}});

    // Start of simple commands
    client.on('message', (channel, tags, message, self) => {

        const arg = message.slice(1).split(' ');
        const command = arg.shift().toLowerCase();

    // echo command
        if (command === 'echo') {
            client.say(channel, `@${tags.username}, you said: '${arg.join(' ')}'`);

    // hello streamer#1 command
        } else if (command === 'hello' && tags['room-id'] === 'xxxxxxxxxxx') {
            client.say(channel, `@${tags.username}, Welcome to the channel. Streamer#1 is currently on a delay!`);

    // hello streamer#2 command
        } else if (command === 'hello' && tags['room-id'] === 'xxxxxxxxx') {
            client.say(channel, `@${tags.username}, Welcome to the channel.`);
    
    // dice game command
        } else if (command === 'dice') {
            const result = Math.floor(Math.random() * 6) + 1;
            client.say(channel, `@${tags.username}, You rolled a ${result}.`);
        }
    });

    // Start of moderation commands
    client.on('message', (channel, tags, message, self) => {

        const arg = message.slice(1).split(' ');
        const command = arg.shift().toLowerCase();

        // timeout command      
              if (command === 'timeout') {
                  client.timeout(channel, arg[0], arg[1], arg[2]);
                  client.say(channel, `You have timed out @${arg[0]} for ${arg[1]} seconds because ${arg[2]}. SSSSssshhhhhhh!`);
  
          // ban command
              } else if (command === 'ban') {
                  client.ban(channel, arg[0], arg[1]);
                  client.say(channel, `You have banned @${arg[0]} for ${arg[1]}. See you never.`);
          // unban command
              } else if (command === 'unban') {
                  client.unban(channel, arg[0]);
                  client.say(channel, `You have unbanned @${arg[0]}. Welcome back.`);
  
          // subcheck command
              } else if (command === 'subcheck') {
                  var value = true;
                  if (tags['subscriber'] === value) {
                      client.say(channel, `@${tags.username}, You are a subscriber! Thank you!`);
                  } else client.say(channel, `@${tags.username}, You are NOT a sub.`);
              }
          });

          // Start of more complex commands

          //first time chatter command
          client.on("message", (channel, tags, message, self) => {
            var value = true;
            if (tags["first-msg"] === value) {
              client.say(
                channel,
                `@${tags.username}, FIRST TIME CHATTER! Welcome to the stream! Be sure to check out the !discord`);
            }
          });
          
          // returning chatter command - not tested 
          client.on("message", (channel, tags, message, self) => {
            var value = true;
            if (tags["returning-chatter"] === value) {
              client.say(channel,`@${tags.username}, Welcome back to the channel!`);
            }
          });
          
          // custom reward command
          client.on("message", (channel, tags, message, self) => {
            if (tags["custom-reward-id"] === "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
              fetch(
                "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,racist,sexist,explicit")
                .then((res) => res.json())
                .then((data) => {
                  if (data.hasOwnProperty("joke")) {
                    client.say(channel, data["joke"]);
                  } else if (data.hasOwnProperty("setup")) {
                    client.say(channel, data["setup"] + " - " + data["delivery"]);
                  } else void 0;
                });
            }
          });
          
          // advice command
          client.on("message", (channel, tags, message, self) => {
            const arg = message.slice(1).split(" ");
            const command = arg.shift().toLowerCase();
          
            if (command === "advice") {
              fetch("https://api.adviceslip.com/advice")
                .then((res) => res.json())
                .then((data) => {
                  client.say(channel, data.slip["advice"]);
                });
            }
          });
          
          // 8 ball command
          client.on("message", (channel, tags, message, self) => {
            const arg = message.slice(1).split(" ");
            const command = arg.shift().toLowerCase();
          
            const question = encodeURIComponent(arg);
          
            if (command === "8ball") {
              fetch(`https://8ball.delegator.com/magic/JSON/${question}`)
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  client.say(channel, data.magic["answer"]);
                });
            }
          });

        // The Office Quotes command
          client.on("message", (channel, tags, message, self) => {
            const arg = message.slice(1).split(" ");
            const command = arg.shift().toLowerCase();
            
            
            if (command === "office") {
            
              const options = {
                method: "post",
                url: "https://officeapi.dev/api/quotes/random"
              }
            axios(options)
            //.then((Response) => Response.text())
            .then((Response) => {
             var character = Response.data.data.character.firstname + " " + Response.data.data.character.lastname;
              client.say(channel, `${Response.data.data.content} - ${character}`);})
              .catch((err) => {
            console.log(err);
            })}
            });

            //Urban Dictionary command

            client.on("message", (channel, tags, message, self) => {
                const arg = message.slice(1).split(" ");
                const command = arg.shift().toLowerCase();
              
                if (command === "dictionary") {
                  const options = {
                    method: "GET",
                    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
                    params:{ "term": `${arg[0]}`,},
                    headers: {
                      "content-type": "application/json",
                      'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                      "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",},
                  };
                  axios(options)
                    .then((res) => {
                      client.say(channel, res.data.list[0].definition.replace(/[\[\]']+/g, ' '));
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              });

// Start of Language commands

client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
// English to Slovenian
    if (command === "slov") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"sl"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
// English to Japanese
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "japan") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"ja"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });


// English to Russian
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "russian") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"ru"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });


// English to Korean 
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "korean") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"ko"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // English to Portuguese
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "port") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"pt"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
  // English to Spanish
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "spanish") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"es"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
  // Spanish to English
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "english") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"es","target":"en"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
  //English to Thai
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "thai") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"th"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  
// English to Swedish
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "swedish") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"sv"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  
  // English to Finnish
  client.on("message", (channel, tags, message, self) => {
    const arg = message.slice(1).split(" ");
    const command = arg.shift().toLowerCase();
  
    if (command === "finnish") {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
        data: `{"q": "${arg}" ,"source":"en","target":"fi"}`,
      };
      axios(options)
        .then((res) => {
          console.log(res.data.data.translations.translatedText);
          client.say(channel, res.data.data.translations.translatedText.replace(/,/gi, " "));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  

}


exports.loadCommands = loadCommands;