const Discord = require('discord.js');
const config = require('./config.json');
const releases = require('./releases/release.js')

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
client.login(config.BOT_TOKEN);


client.on('ready', () => {
  setInterval(async function () {
    await releases.getLatestRelease(client)
  }, 10000);
})

const prefix = "!";

client.on("messageCreate", async function(message) { 
    
  if ( message.author.bot) { 
    return;
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

}); 

async function checkRelease() {
  try {
    var release = await releases.getLatestRelease();
  } catch(err) {
      console.error(err);
  }
  if(release != ""){
    const channel = client.channels.cache.get('992132358381781133');
    channel.send("Baixe aqui: "+release.url);
  }
}

