const $=s=>document.querySelector(s),esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
$("#yr").textContent=new Date().getFullYear();
const mb=$("#mb"),lk=$("#lk");mb.onclick=()=>mb.setAttribute("aria-expanded",lk.classList.toggle("open"));lk.onclick=e=>{if(e.target.tagName=="A"){lk.classList.remove("open");mb.setAttribute("aria-expanded","false")}};
// skills
const SK=[["HTML","HT","#e44d26"],["CSS","CS","#2965f1"],["Vanilla JS","JS","#d4a800"],["TypeScript","TS","#3178c6"],["JSX","JSX","#149eca"],["Three.js","3JS","#111827"],["Google SEO","SEO","#34a853"],["Responsive UI","RS","#5b3df5"],["Git","Gi","#f05032"],["GitHub","GH","#24292f"],["Vercel","Vc","#000"]];
$("#sk").innerHTML=SK.map(s=>`<div><b style="background:${s[2]}">${s[1]}</b>${s[0]}</div>`).join("");
// projects: featured (checked live sites) + GitHub API
const G=["linear-gradient(135deg,#a3153c,#4d0a1f)","linear-gradient(135deg,#2a2a33,#0f0c1d)","linear-gradient(135deg,#8b6cff,#5b3df5)","linear-gradient(135deg,#0ea5a4,#1d4ed8)","linear-gradient(135deg,#f59e0b,#ef4444)"];
const FT=[
{n:"Dear Moments",id:"dear-moments",u:"https://dear-moments.in/",l:"Digital Product",d:"Digital memory pages for proposals, weddings, birthdays and anniversaries."},
{n:"MB Cafe",id:"mb-cafe",u:"https://mb-cafe-ten.vercel.app/",l:"Food & Hospitality",d:"Open-roof coffee and fast food cafe site with menu and table booking."},
{n:"Thevan Garden Diaries",id:"theaven-garden-cafe",u:"https://theaven-garden-cafe.vercel.app/",l:"Food & Hospitality",d:"Garden cafe site in Jaipur with story, menu, gallery and WhatsApp table booking."},
{n:"Samarth College",id:"samarth-college",u:"https://samarth-college.vercel.app/",l:"Education",d:"College website with courses, admissions and enquiry."},
{n:"Portfolio Website",id:"portfolio-site",u:"https://my-portfolio-six-weld-25.vercel.app/",l:"Portfolio",d:"Single-page portfolio layout for creative developers."},
{n:"Arrow Flow Template",id:"arrow-flow",u:"https://arrow-flow-pi.vercel.app/",l:"Templates",d:"Playable game template built with plain JavaScript."}
].map((p,i)=>({...p,f:1,g:G[i%5]}));
let ALL=[...FT],flt="All",q="",lim=9;
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"");
function card(p){return `<article class="pc"><a class="th" style="background:${p.g}" href="${esc(p.u||p.h||'#')}" target="_blank" rel="noopener" aria-label="${esc(p.n)}">${esc(p.n[0]||"•")}${p.id?`<img src="assets/screens/${esc(p.id)}.jpg" alt="" loading="lazy" onerror="this.remove()">`:""}</a><h3>${esc(p.n)}${p.f?'<span style="color:var(--pur);font-size:.7rem">★ Featured</span>':""}</h3><p>${esc(p.d||"No description yet.")}</p><div class="tg">${p.l?`<span>${esc(p.l)}</span>`:""}</div><div class="ac">${p.u?`<a class="btn dk" href="${esc(p.u)}" target="_blank" rel="noopener">Live Demo</a>`:""}${p.h?`<a class="btn" href="${esc(p.h)}" target="_blank" rel="noopener">GitHub</a>`:""}${!p.u&&!p.h?'<span class="btn" style="opacity:.55;cursor:default">Link coming soon</span>':""}</div></article>`}
function render(){const fs=["All","Featured",...new Set(ALL.filter(p=>!p.f&&p.l).map(p=>p.l))].slice(0,9);
$("#fl").innerHTML=fs.map(x=>`<button class="${x==flt?'on':''}" data-f="${esc(x)}">${esc(x)}</button>`).join("");
const L=ALL.filter(p=>(flt=="All"||(flt=="Featured"?p.f:p.l==flt))&&(p.n+" "+(p.d||"")).toLowerCase().includes(q));
$("#gr").innerHTML=L.slice(0,lim).map(card).join("")||'<p class="sub">No projects match.</p>';$("#more").hidden=L.length<=lim;$("#gr").querySelectorAll(".pc").forEach((c,i)=>c.style.setProperty("--i",i%9))}
$("#fl").onclick=e=>{if(e.target.dataset.f){flt=e.target.dataset.f;lim=9;render()}};
$("#q").oninput=e=>{q=e.target.value.trim().toLowerCase();render()};
$("#more").onclick=()=>{lim+=9;render()};render();
const LC={JavaScript:"#f1e05a",HTML:"#e34c26",CSS:"#9b6bff",TypeScript:"#3178c6",Python:"#3572a5",PHP:"#8892bf",Java:"#b07219","C++":"#f34b7d",Shell:"#89e051"};
Promise.all([fetch("https://api.github.com/users/MK072010").then(r=>r.json()),fetch("https://api.github.com/users/MK072010/repos?per_page=100&sort=updated").then(r=>r.json())]).then(([u,rs])=>{
if(!Array.isArray(rs))throw 0;if(u.public_repos){$("#sr").textContent=u.public_repos;$("#sf").textContent=u.followers}
const own=rs.filter(r=>!r.fork),lc={};
own.forEach(r=>{if(r.language)lc[r.language]=(lc[r.language]||0)+1;
 const m=ALL.find(p=>p.f&&(norm(p.id)==norm(r.name)||norm(p.n)==norm(r.name)));
 if(m){m.h=r.html_url;return}
 });
render();
const t=Object.entries(lc).sort((a,b)=>b[1]-a[1]).slice(0,5),sum=t.reduce((a,b)=>a+b[1],0)||1;
$("#lg").innerHTML=t.map(([k,v])=>`<i style="width:${v/sum*100}%;background:${LC[k]||"#8b6cff"}"></i>`).join("");
$("#ll").innerHTML=t.map(([k,v])=>`<span><i style="background:${LC[k]||"#8b6cff"}"></i>${esc(k)} ${Math.round(v/sum*100)}%</span>`).join("")||"No language data yet."
}).catch(()=>{$("#ll").innerHTML='Live stats load when online. <a href="https://github.com/MK072010" target="_blank" rel="noopener" style="text-decoration:underline">See GitHub</a>'});
// contact → WhatsApp
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll(".sec .w>*,.st").forEach(el=>{el.classList.add("rv");io.observe(el)})}
const mi=$("#mqi");mi.innerHTML+=mi.innerHTML;

// dark mode
const root=document.documentElement,tm=$("#tm");function setT(t){root.dataset.theme=t;tm.textContent=t=="dark"?"☀️":"🌙";try{localStorage.setItem("th",t)}catch(e){}}
setT(root.dataset.theme||"light");tm.onclick=()=>setT(root.dataset.theme=="dark"?"light":"dark");
// scroll progress
const pb=$("#pb");addEventListener("scroll",()=>{pb.style.transform=`scaleX(${scrollY/(document.body.scrollHeight-innerHeight||1)})`},{passive:true});
// 3D tilt: hero photo + project cards (mouse only)
const ph=$(".ph"),fr=$(".ph .fr");ph.addEventListener("pointermove",e=>{if(e.pointerType!="mouse")return;const b=ph.getBoundingClientRect();fr.style.setProperty("--ry",((e.clientX-b.left)/b.width-.5)*14+"deg");fr.style.setProperty("--rx",(.5-(e.clientY-b.top)/b.height)*14+"deg")});ph.addEventListener("pointerleave",()=>{fr.style.setProperty("--ry","0deg");fr.style.setProperty("--rx","0deg")});
const gr=$("#gr");gr.addEventListener("pointermove",e=>{if(e.pointerType!="mouse")return;const c=e.target.closest(".pc");if(!c)return;const b=c.getBoundingClientRect();c.style.setProperty("--ry",((e.clientX-b.left)/b.width-.5)*8+"deg");c.style.setProperty("--rx",(.5-(e.clientY-b.top)/b.height)*8+"deg")});gr.addEventListener("pointerout",e=>{const c=e.target.closest(".pc");if(c){c.style.setProperty("--ry","0deg");c.style.setProperty("--rx","0deg")}});
// interactive three.js hero (skipped if the CDN is unavailable)
addEventListener("load",()=>{if(!window.THREE)return;const cv=$("#c3"),R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);C.position.z=7;const g=new THREE.Group();S.add(g);
const M=(c,o)=>new THREE.MeshBasicMaterial({color:c,wireframe:true,transparent:true,opacity:o});
const a=new THREE.Mesh(new THREE.IcosahedronGeometry(2.3,1),M(0x8b6cff,.5)),b=new THREE.Mesh(new THREE.TorusKnotGeometry(.7,.22,90,10),M(0xff7ac8,.7)),c=new THREE.Mesh(new THREE.OctahedronGeometry(.6),M(0x5b3df5,.8));
b.position.set(2.4,-1.7,.6);c.position.set(-2.5,1.8,.4);g.add(a,b,c);
const PG=new THREE.BufferGeometry(),pa=new Float32Array(480);for(let i=0;i<480;i++)pa[i]=(Math.random()-.5)*11;PG.setAttribute("position",new THREE.BufferAttribute(pa,3));const pts=new THREE.Points(PG,new THREE.PointsMaterial({color:0x8b6cff,size:.05,transparent:true,opacity:.8}));g.add(pts);
let tx=0,ty=0;const rs=()=>{const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()};rs();addEventListener("resize",rs);
addEventListener("pointermove",e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
(function f(){if(!document.hidden){if(!still){a.rotation.y+=.004;a.rotation.x+=.002;b.rotation.x+=.012;b.rotation.y+=.01;c.rotation.y+=.015}pts.rotation.y-=.0015;g.rotation.z=scrollY*.0006;g.rotation.y+=(tx*1.1-g.rotation.y)*.05;g.rotation.x+=(ty*.8-g.rotation.x)*.05;R.render(S,C)}requestAnimationFrame(f)})()});

// terminal
const to=$("#to"),ti=$("#ti");function pr(t,c){const d=document.createElement("div");if(c)d.className=c;d.textContent=t;to.append(d);to.scrollTop=to.scrollHeight}
const CM={help:()=>"Commands: "+Object.keys(CM).join(", "),whoami:()=>"Mohit Prajapat — Digital Creator & Web Developer",about:()=>"I build fast, phone-first websites and web apps for businesses, colleges and brands.",skills:()=>SK.map(x=>x[0]).join(" · "),projects:()=>ALL.length+" projects loaded. Featured: "+FT.map(p=>p.n).join(", "),ls:()=>FT.map(p=>p.id+"/").join("  "),
github:()=>{open("https://github.com/MK072010","_blank","noopener");return"Opening github.com/MK072010 …"},contact:()=>"Email: mohitprajapat0024@gmail.com\nPhone: +91 96948 01604\nInstagram: @mohit_vibezz and @tech_wala_mohit",
hire:()=>{open("https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent("Hi Mohit, I found you via your portfolio terminal."),"_blank","noopener");return"Opening WhatsApp …"},
theme:()=>{tm.click();return"Theme: "+root.dataset.theme},clear:()=>{to.textContent="";return""}};
pr("Welcome! Type help to begin.","cm");
$("#tcm").innerHTML=Object.keys(CM).map(k=>`<button class="btn sm" type="button">${k}</button>`).join("");
$("#tcm").onclick=e=>{if(e.target.tagName=="BUTTON"){ti.value=e.target.textContent;$("#tf").requestSubmit()}};
$("#tf").onsubmit=e=>{e.preventDefault();const v=ti.value.trim().toLowerCase();ti.value="";if(!v)return;pr("❯ "+v,"cm");const f=CM[v];if(!f)return pr("command not found: "+v+" — try help");const r=f();if(r)pr(r)};
// v4: typewriter role, count-up stats, card spotlight
(function(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
const el=$("#tw"),W=["Digital Creator","Web Developer","Creative Designer","Digital Growth Partner"];let i=0,j=W[0].length,del=-1;
setTimeout(function t(){const w=W[i];j+=del;el.textContent=w.slice(0,j);let d=del>0?70:35;if(del>0&&j==w.length){del=-1;d=1800}else if(del<0&&j==0){del=1;i=(i+1)%W.length;d=300}setTimeout(t,d)},1800);
document.querySelectorAll(".st b").forEach(b=>{const m=b.textContent.match(/^(\d+)(.*)$/);if(!m)return;const n=+m[1],sf=m[2],t0=performance.now();(function f(t){const p=Math.min((t-t0)/1200,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)))+sf;if(p<1)requestAnimationFrame(f)})(t0)})})();
gr.addEventListener("pointermove",e=>{const c=e.target.closest(".pc");if(!c)return;const b=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-b.left+"px");c.style.setProperty("--my",e.clientY-b.top+"px")});
const T=".svc>div,.sk>div";document.addEventListener("pointermove",e=>{if(e.pointerType!="mouse")return;const c=e.target.closest(T);if(!c)return;const b=c.getBoundingClientRect();c.style.setProperty("--ry",((e.clientX-b.left)/b.width-.5)*14+"deg");c.style.setProperty("--rx",(.5-(e.clientY-b.top)/b.height)*14+"deg")});document.addEventListener("pointerout",e=>{const c=e.target.closest(T);if(c){c.style.setProperty("--ry","0deg");c.style.setProperty("--rx","0deg")}});
