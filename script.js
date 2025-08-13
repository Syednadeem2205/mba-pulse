const WPM = 220;
const progress = document.getElementById('progress');
addEventListener('scroll',()=>{
  const h=document.documentElement; const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight);
  progress.style.width=(scrolled*100).toFixed(2)+'%';
});
document.getElementById('y').textContent = new Date().getFullYear();

async function loadData(){
  try{
    const res = await fetch('data.json', {cache:'no-store'});
    return await res.json();
  }catch(e){
    console.error('Failed to load data.json', e);
    return {items:[]};
  }
}
const minutesFromWords = words => Math.max(1, Math.round((+words||300)/WPM));

function render(data){
  const items = data.items || [];
  const byCat = cat => items.filter(i => (i.category||'').toLowerCase()===cat);

  // HERO
  const featured = byCat('featured')[0];
  const briefs = byCat('brief').slice(0,3);
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <article class="hero-card">
      <span class="badge">⏱ <b class="mins">${minutesFromWords(featured?.readtime||860)}</b> min read • Featured</span>
      <h1 class="title">${featured?.headline||'Featured Headline'}</h1>
      <p class="summary">${featured?.summary||''}</p>
      <div class="mba-takeaway">
        <strong>MBA Takeaway:</strong>
        <ul>
          ${featured?.takeaway1?`<li>${featured.takeaway1}</li>`:''}
          ${featured?.takeaway2?`<li>${featured.takeaway2}</li>`:''}
        </ul>
      </div>
      <div class="meta"><span>Category: ${featured?.tag||'Finance'}</span></div>
    </article>
    <aside class="hero-card">
      <div class="sec-head"><h2>Today’s Brief</h2><span class="badge">5‑Minute Mode</span></div>
      <ul style="list-style:none;padding:0;margin:0;display:grid;gap:12px">
        ${briefs.map(b=>`
          <li class="card" style="padding:14px">
            <div class="read">⏱ <b class="mins">${minutesFromWords(b.readtime||220)}</b></div>
            <h3>${b.headline}</h3>
            <p class="summary">${b.summary}</p>
            ${b.takeaway1?`<div class="mba-takeaway"><em>${b.takeaway1}</em></div>`:''}
          </li>`).join('')}
      </ul>
    </aside>`;

  // TOP STORIES
  const tops = byCat('top').slice(0,6);
  document.getElementById('top-stories').innerHTML = tops.map(t=>`
    <article class="card">
      <span class="read">⏱ <b class="mins">${minutesFromWords(t.readtime||300)}</b></span>
      <h3>${t.headline}</h3>
      <p class="summary">${t.summary}</p>
      ${t.takeaway1?`<div class="mba-takeaway"><strong>MBA Takeaway:</strong> <em>${t.takeaway1}</em></div>`:''}
    </article>`).join('');

  // SPOTLIGHT
  const spot = byCat('spotlight')[0];
  document.getElementById('spotlight').innerHTML = `
    <p class="summary">${spot?.summary||''}</p>
    ${spot?.takeaway1?`<div class="mba-takeaway"><strong>Concept in action:</strong> <em>${spot.takeaway1}</em></div>`:''}`;

  // MINI CASE
  const kase = byCat('case')[0];
  document.getElementById('mini-case').innerHTML = `
    <h3>${kase?.headline||'Mini Case'}</h3>
    <p class="summary">${kase?.summary||''}</p>
    ${kase?.takeaway1?`<div class="mba-takeaway"><strong>Lesson:</strong> <em>${kase.takeaway1}</em></div>`:''}`;

  // QUOTE & STAT
  const q = byCat('quote')[0];
  const s = byCat('stat')[0];
  document.getElementById('quote').innerHTML = `<blockquote>“${q?.headline||'Great strategy turns constraints into advantage.'}”</blockquote><div class="meta">— MBA Pulse</div>`;
  document.getElementById('stat').innerHTML = `<div class="big">${s?.headline||'—'}</div><div class="meta">${s?.summary||''}</div>`;
}

loadData().then(render);
