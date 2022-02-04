const fs = require('fs');
const https = require('https');
const {Client, Intents, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const cron = require('node-cron');

let waitTime = 120;

client.on('ready', () => {
  console.log(`Bot starto`);
  client.channels.cache.get('897225401343041596').send('update complete')
  cron.schedule('* * * * *', function() {
    waitTime--;
    if (waitTime < 0){
      bump();
      console.log("bumped")
      waitTime = 120
    }
    console.log(waitTime)
  });
});

client.on('messageCreate', msg =>{
  if (msg.author.bot){console.log(msg.content); return;}

  const args = msg.content.split(" ");
  if (args[0] == "$syncBumping"){
    if (!msg.member.roles.cache.some(role => role.name == '》┃Owner') && !msg.member.roles.cache.some(role => role.name == '》┃Godot Dev')){
      msg.reply("u can't use this command")
      return;
    } else if (args.length != 2){
      msg.reply("$syncBumping {time**(in minutes)**}")
    } else if (parseInt(args[1]).length) {
      msg.reply("time must be a number")
    } else {
      waitTime = parseInt(args[1]);
      msg.reply(`Wait time set to: ${parseInt(args[1])} minutes`)
    }
  }

  if (args[0] == "$h"){
    msg.reply("$syncBumping, $timeToBump")
  }

  if (args[0] == "$timeToBump"){
    msg.reply(waitTime + " minutes")
  }
});

client.login('OTM4MzMwMTU2MTk4NjkwODQ3.YfouDg.O80e2KZ6ezmgjuCgA7FybP62PAY');

function bump(){
    var postData = JSON.stringify({
      'content': '!d bump'
    });

  var options = {
    hostname: 'discord.com',
    port: 443,
    path: '/api/v9/channels/897225401343041596/messages',
    method: 'POST',
    headers: {
         'Content-Type': 'application/json',
         'Content-Length': postData.length,
         "authorization": 'OTM3MzEyMzUwOTU0OTkxNjE2.YfZ6_g.kqg_VNXzuz_LKq_jyi3wLkRXkv4' //OTM3MzEyMzUwOTU0OTkxNjE2.YfZ6_g.kqg_VNXzuz_LKq_jyi3wLkRXkv4
       }
  };

  var req = https.request(options, (res) => {console.log("bumped")});
  req.on('error', (e) => {
    console.error(e);
    bump();
    return;
  });

  req.write(postData);
  req.end();
}
