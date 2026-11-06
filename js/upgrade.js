/* Upgrade layer: renders services, demos, logos, creative work, enquiry form and social links from config.js + data.js */
(() => {
const q = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
const E = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const WA = "https://wa.me/" + CONFIG.whatsapp;
qa("[data-wa]").forEach(a => a.href = WA);

/* dialog (case studies + lightbox) */
const dlg = q("#dlg"), db = q("#dbody");
const openD = h => { db.innerHTML = h; dlg.showModal ? dlg.showModal() : dlg.setAttribute("open", ""); };
q("#dclose").onclick = () => dlg.close();
dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest('a[href="#work"]')) dlg.close(); });

/* services */
q("#sg").innerHTML = SERVICES.map((s, i) => `<article class="sv"><div class="si"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${s.icon}"/></svg></div><h3>${E(s.title)}</h3><p>${E(s.desc)}</p><ul class="sd" id="sd${i}">${s.details.map(d => `<li>${E(d)}</li>`).join("")}</ul><div class="sa"><button type="button" class="btn sm" data-sv aria-expanded="false" aria-controls="sd${i}">View Details</button><a class="btn pr sm" href="#work" data-enq="${E(s.title)}">Enquire</a></div></article>`).join("");
q("#sg").addEventListener("click", e => {
  const b = e.target.closest("[data-sv]");
  if (b) { const o = b.closest(".sv").classList.toggle("open"); b.setAttribute("aria-expanded", o); b.textContent = o ? "Hide Details" : "View Details"; }
});
q("#svs").innerHTML = SERVICES.map(s => `<label><input type="checkbox" name="svc" value="${E(s.title)}"><span>${E(s.title)}</span></label>`).join("");
document.addEventListener("click", e => {
  const a = e.target.closest("[data-enq]"); if (!a) return;
  const i = qa('#svs input').find(x => x.value === a.dataset.enq); if (i) i.checked = true;
});

/* generic filterable gallery */
function gallery(root, items, cats, card, detail) {
  const r = q(root); let f = "All";
  const vis = cats.filter(c => items.some(x => x.cat === c));
  r.innerHTML = `${vis.length > 1 ? `<div class="chips" role="group" aria-label="Filter">${["All", ...vis].map(c => `<button type="button" aria-pressed="${c === "All"}">${E(c)}</button>`).join("")}</div>` : ""}<div class="g3"></div>`;
  const g = q(".g3", r);
  const draw = () => { g.innerHTML = items.map((x, i) => [x, i]).filter(([x]) => f === "All" || x.cat === f).map(([x, i]) => card(x, i)).join("") || '<p class="sub">Nothing in this category yet.</p>'; };
  r.addEventListener("click", e => {
    const c = e.target.closest(".chips button");
    if (c) { f = c.textContent; qa(".chips button", r).forEach(b => b.setAttribute("aria-pressed", b === c)); draw(); return; }
    const o = e.target.closest("[data-open]"); if (o) openD(detail(items[+o.dataset.open]));
  });
  draw();
}
const tags = a => (a || []).map(t => `<span>${E(t)}</span>`).join("");

/* website demos */
gallery("#demos-grid", DEMOS, DEMO_CATS, (d, i) => `<article class="card"><div class="cth">${d.img ? `<img loading="lazy" width="960" height="600" src="${E(d.img)}" alt="Screenshot of the ${E(d.title)} website">` : `<b>${E(d.title[0])}</b>`}<span class="bd ${d.demo ? "demo" : d.live ? "live" : "concept"}">${d.demo ? "Live demo" : d.live ? "Live project" : "Concept"}</span></div><div class="cb"><small>${E(d.cat)}</small><h3>${E(d.title)}</h3><p>${E(d.desc)}</p><div class="tg">${tags(d.tech)}</div><div class="ca">${d.live && d.url ? `<a class="btn pr sm" href="${E(d.url)}" target="_blank" rel="noopener">Live Demo</a>` : `<button class="btn sm" disabled>Demo not live</button>`}<button type="button" class="btn sm" data-open="${i}">View Details</button></div></div></article>`,
  d => `<div class="cs"><span class="bd2 ${d.demo ? "demo" : d.live ? "live" : "concept"}">${d.demo ? "Live demo, sample content, not client work" : d.live ? "Real project" : "Concept project, not client work"}</span><h3 id="dtitle">${E(d.title)}</h3><p>${E(d.cat)}</p>${d.img ? `<img src="${E(d.img)}" alt="Screenshot of the ${E(d.title)} website">` : ""}${[["Project overview", d.overview || d.desc], ["Business problem", d.problem], ["Design approach", d.approach], ["Final output", d.output]].filter(x => x[1]).map(x => `<h4>${x[0]}</h4><p>${E(x[1])}</p>`).join("")}<h4>Technologies</h4><div class="tg">${tags(d.tech)}</div>${d.results ? `<h4>Results</h4><p>${E(d.results)}</p>` : ""}<div class="ca">${d.live && d.url ? `<a class="btn pr sm" href="${E(d.url)}" target="_blank" rel="noopener">Live Demo</a>` : ""}<a class="btn sm" href="#work">Start a similar project</a></div></div>`);

/* logos */
const LC = { "Minimal Logos": "min", "Modern Logos": "mod", "Business Branding": "biz", "Creative Logos": "cre", "Typography Logos": "typ" };
const logoPrev = l => `<span class="l-${LC[l.cat] || "mod"}">${E(l.name)}</span>${l.img ? `<img loading="lazy" src="${E(l.img)}" alt="${E(l.name)} logo design" onerror="this.remove()">` : ""}`;
gallery("#logos-grid", LOGOS, LOGO_CATS, (l, i) => `<article class="card"><div class="lp">${logoPrev(l)}</div><div class="cb"><small>${E(l.cat)}${l.ph ? " · Logo file pending" : ""}</small><h3>${E(l.name)}</h3><p>${E(l.concept)}</p><div class="ca"><button type="button" class="btn sm" data-open="${i}">View Design</button></div></div></article>`,
  l => `<div class="cs"><h3 id="dtitle">${E(l.name)}</h3><p>${E(l.cat)}</p><div class="lp" style="aspect-ratio:3/2;border-radius:14px;margin:12px 0">${logoPrev(l)}</div><h4>Concept</h4><p>${E(l.concept)}</p></div>`);

/* creative work */
const media = (c, big) => c.video ? `<video ${big ? "controls" : "muted"} playsinline preload="${big ? "metadata" : "none"}" src="${E(c.video)}" ${c.img ? `poster="${E(c.img)}"` : ""}></video>` : c.img ? `<img loading="lazy" src="${E(c.img)}" alt="${E(c.title)}">` : "";
if (CREATIVES.length) gallery("#creative-grid", CREATIVES, CREATIVE_CATS, (c, i) => `<article class="card"><div class="cth">${media(c) || `<em>Placeholder. Add your work in js/data.js</em>`}</div><div class="cb"><small>${E(c.cat)}</small><h3>${E(c.title)}</h3><div class="ca"><button type="button" class="btn sm" data-open="${i}">View</button></div></div></article>`,
  c => `<div class="cs"><h3 id="dtitle">${E(c.title)}</h3><p>${E(c.cat)}</p>${media(c, 1) || '<p>No file added yet. Add an image or video path for this entry in js/data.js.</p>'}${c.link ? `<div class="ca"><a class="btn pr sm" href="${E(c.link)}" target="_blank" rel="noopener">View on Instagram</a></div>` : ""}</div>`);

/* instagram highlights */
q("#creative-hl").innerHTML = CONFIG.instagram.map(i => `<article class="card hlc"><div class="cb"><div class="si"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17 7h.01"/></svg></div><small>Instagram</small><h3>@${E(i.handle)}</h3><p>${E(i.label)}</p><div class="ca"><a class="btn pr sm" href="${E(i.url)}" target="_blank" rel="noopener">Open on Instagram</a></div></div></article>`).join("");

/* social links (contact + footer) */
const social = () => `${CONFIG.instagram.map(i => `<a href="${E(i.url)}" target="_blank" rel="noopener"><span>Instagram @${E(i.handle)}<small>${E(i.label)}</small></span></a>`).join("")}<a href="${E(CONFIG.github)}" target="_blank" rel="noopener"><span>GitHub<small>Coding projects and repositories</small></span></a><a href="${WA}" target="_blank" rel="noopener"><span>WhatsApp<small>+${E(CONFIG.whatsapp)}</small></span></a><a href="mailto:${E(CONFIG.email)}"><span>Email<small>${E(CONFIG.email)}</small></span></a>`;
qa("[data-social]").forEach(n => n.innerHTML = social());

/* enquiry form -> WhatsApp */
const f = q("#wf"), st = q("#fst");
const setErr = (k, m) => { q("#e-" + k).textContent = m || ""; };
f.addEventListener("submit", e => {
  e.preventDefault();
  const v = n => f.elements[n].value.trim(), svc = qa('input[name=svc]:checked', f).map(x => x.value);
  let ph = v("phone").replace(/[\s\-().]/g, "").replace(/^(\+?91|0)/, "");
  const ok = { name: v("name").length >= 2, phone: /^[6-9]\d{9}$/.test(ph), svc: svc.length > 0, msg: v("msg").length >= 10, email: !v("email") || /^\S+@\S+\.\S+$/.test(v("email")) };
  setErr("name", ok.name ? "" : "Enter your full name."); setErr("phone", ok.phone ? "" : "Enter a valid 10-digit Indian mobile number.");
  setErr("svc", ok.svc ? "" : "Select at least one service."); setErr("msg", ok.msg ? "" : "Tell me a little about the project (10+ characters)."); setErr("email", ok.email ? "" : "Enter a valid email or leave it empty.");
  if (!Object.values(ok).every(Boolean)) { st.textContent = "Please fix the highlighted fields."; const bad = f.querySelector(".err:not(:empty)"); if (bad) bad.previousElementSibling?.focus?.(); return; }
  const t = ["Hi Mohit, I'd like to work with you.", "", `*Name:* ${v("name")}`, `*Business/Brand:* ${v("biz") || "-"}`, `*WhatsApp:* +91${ph}`, `*Email:* ${v("email") || "-"}`, `*Services:* ${svc.join(", ")}`, `*Budget:* ${v("budget")}`, "", "*Project details:*", v("msg")].join("\n");
  const url = WA + "?text=" + encodeURIComponent(t);
  window.open(url, "_blank", "noopener");
  st.innerHTML = `WhatsApp should open with your message filled in. Press send there. If nothing opened, <a href="${E(url)}" target="_blank" rel="noopener">open WhatsApp</a>.`;
});
})();
