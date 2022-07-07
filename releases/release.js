const fetch = require('node-fetch');
const fs = require('fs').promises;

var latrel = require('../latestrel.json');
var latestReleaseUrl = latrel.latestRelease;

module.exports = {
  async getLatestRelease(client) {
    
    //https://github.com/netuno-org/platform/releases/tag/v7-20220402_1511
    let url = "https://api.github.com/repos/netuno-org/platform/releases/latest";
    let settings = {method: "GET"};
    await fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
        if (latestReleaseUrl != json.html_url) {
          latestReleaseUrl = json.html_url;
      
          const channel = client.channels.cache.get('992132358381781133');
          channel.send("Baixe aqui: "+latestReleaseUrl);

          latrel.latestRelease = latestReleaseUrl;

          fs.writeFile("./latestrel.json", JSON.stringify(latrel), 'utf8', err => {
            if (err) throw err;
            console.log('File has been saved!');
          });
        }
      }
    );
  }
}