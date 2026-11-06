/* Upgrade v2: hide empty / placeholder blocks so visitors never see unfinished parts */
(()=>{
const q=s=>document.querySelector(s);
// logos section: hide while only placeholder logos exist
if(typeof LOGOS!=="undefined"&&LOGOS.every(l=>l.ph)){
  q("#logos")?.classList.add("hide");
  document.querySelectorAll('a[href="#logos"]').forEach(a=>a.classList.add("hide"));
}
// github: hide empty headings if stats fail to load (offline / blocked)
setTimeout(()=>{
  const sf=q("#sf"); if(sf&&sf.textContent.trim()==="—") sf.closest("div")?.classList.add("hide");
  const cg=q(".cg"); if(!cg||cg.hidden) document.querySelectorAll(".gh h4").forEach(h=>{ if(h.textContent.includes("Contribution")) h.classList.add("hide")});
},2500);
})();
