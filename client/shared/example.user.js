// ==UserScript==
// @name        Your script
// @match       https://cheat-base.vercel.app/main*
// @match       https://cheat-base.vercel.app/public-deploy*
// @grant       none
// @run-at      document-start
// ==/UserScript==

addEventListener('cheat-base-ready', cheatBase => {
    console.log(cheatBase);
});
