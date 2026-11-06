(()=>{
const ig=(typeof CONFIG!=="undefined"&&CONFIG.instagram&&CONFIG.instagram[0])||{handle:"mohit_vibezz",url:"https://instagram.com/mohit_vibezz"};
document.getElementById("reels-cta").href=ig.url;document.getElementById("reels-h").textContent="@"+ig.handle;
})();
