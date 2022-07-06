const fetch = require('node-fetch');

var latrel = require('../latestrel.json');
var latestReleaseUrl = latrel.latestRelease;

module.exports = {
  async getLatestRelease() {
    
    //https://github.com/netuno-org/platform/releases/tag/v7-20220402_1511
    let url = "https://api.github.com/repos/netuno-org/platform/releases/latest";
    let settings = {method: "GET"};
    await fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
        if (latestReleaseUrl != json.html_url) {
          latestReleaseUrl = json.html_url;
        }
      });
      return {
        url: latestReleaseUrl
      };
  }
}