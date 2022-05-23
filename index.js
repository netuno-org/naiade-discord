const Discord = require('discord.js');
const config = require('./config.json');
const fetch = require('node-fetch');

let latestReleaseUrl = "123";

const client = new Discord.Client( {intents: ["GUILDS", "GUILD_MESSAGES"] });
client.login(config.BOT_TOKEN);


client.on('ready', () => {
  getLatestRelease(latestReleaseUrl);
})

const prefix = "!";

client.on("messageCreate", async function(message) { 
    
  if( message.author.bot) return;
  if(!message.content.startsWith(prefix) ) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

}); 

async function getLatestRelease(latestReleaseUrl) {
  let url = "https://api.github.com/repos/netuno-org/platform/releases/latest";
    let settings = { method: "Get" };
    await fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
          if(latestReleaseUrl == json.html_url){
            console.log('no changes '+latestReleaseUrl);
            setTimeout(getLatestRelease, 300000, latestReleaseUrl);
            return;
          }
          else{
            console.log('changes '+latestReleaseUrl);
            const channel = client.channels.cache.get('976575772678574160');
            channel.send("Baixe aqui: "+json.html_url);
            latestReleaseUrl = json.html_url;
            setTimeout(getLatestRelease, 300000,latestReleaseUrl);
            return
          }
      }); 
}