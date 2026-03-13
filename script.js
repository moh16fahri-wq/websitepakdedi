// ========== SMKN 1 GONDANG — EMERALD AURORA SCRIPT ==========

// ===== STATE =====
let galleryImages = [], lbIndex = 0, avatarSrc = null;
let ppdbStep = 1, ppdbPhotoSrc = null;
const docUploaded = {};
const progDetailData = {
  TKJ:  { icon:'💻', tag:'Teknologi', title:'Teknik Komputer & Jaringan', desc:'Program unggulan yang mempersiapkan siswa menjadi profesional IT.', skills:['Mikrotik & Cisco Networking','Linux Server Administration','Cyber Security & Ethical Hacking','Cloud Computing & Virtualization'], career:['IT Support Specialist','Network Engineer','System Administrator','Cyber Security Analyst'], cert:['CCNA (Cisco)','MTCNA (Mikrotik)','BNSP TKJ'] },
  TSM:  { icon:'🏍️', tag:'Otomotif', title:'Teknik Sepeda Motor', desc:'Teknisi motor injeksi modern berstandar dealer resmi nasional.', skills:['Engine Tune Up & Overhoul','Sistem EFI & Injeksi','Kelistrikan & Diagnosa Motor','Manajemen Bengkel Modern'], career:['Mekanik Profesional','Service Advisor','Teknisi Dealer','Wirausaha Bengkel'], cert:['Sertifikat Honda AHASS','Sertifikat Yamaha','BNSP Otomotif'] },
  TKR:  { icon:'🚗', tag:'Otomotif', title:'Teknik Kendaraan Ringan', desc:'Spesialis perawatan kendaraan roda empat dengan teknologi terkini.', skills:['Engine & Transmisi','Sistem AC & Kelistrikan Mobil','Chasis & Pemindah Tenaga','Diagnosa OBD2 & Scanner'], career:['Mekanik Kendaraan','Teknisi Dealer Mobil','Inspector Kendaraan','Wirausaha Bengkel Mobil'], cert:['Sertifikat Toyota','Sertifikat Daihatsu','BNSP TKR'] },
  APHP: { icon:'🍞', tag:'Agribisnis', title:'Agribisnis Pengolahan Pangan', desc:'Inovator pangan dari hasil pertanian menjadi produk bernilai tinggi.', skills:['Teknologi Pengolahan Pangan','Quality Control & GMP','Packaging, Labeling & Branding','Food Safety HACCP'], career:['Teknolog Pangan','Quality Inspector','Manajer Produksi','Wirausaha Pangan'], cert:['Sertifikat HACCP','BNSP Pangan','Sertifikat Halal'] },
  ATU:  { icon:'🐔', tag:'Agribisnis', title:'Agribisnis Ternak Unggas', desc:'Profesional peternakan unggas komersial berstandar industri.', skills:['Budidaya Ayam Broiler & Layer','Kesehatan & Vaksinasi Ternak','Nutrisi & Manajemen Pakan','Manajemen Kandang Modern'], career:['Manajer Farm','Field Technical Service','Supervisor Peternakan','Wirausaha Ternak'], cert:['Sertifikat Kompetensi Peternak','BNSP Agribisnis'] },
  ATPH: { icon:'🌾', tag:'Agribisnis', title:'Agribisnis Tanaman Pangan', desc:'Petani modern dengan sistem budidaya inovatif dan agribisnis digital.', skills:['Budidaya Padi, Jagung & Palawija','Hidroponik & Aquaponik','Pengendalian Hama Terpadu','Pemasaran Digital Produk Pertanian'], career:['Petani Modern','Konsultan Pertanian','Penyuluh Lapangan','Wirausaha Agribisnis'], cert:['Sertifikat Pertanian Organik','BNSP Agribisnis Tanaman'] },
  MP:   { icon:'🚜', tag:'Agribisnis', title:'Mekanisasi Pertanian', desc:'Mencetak teknisi andal dalam pengoperasian, perawatan, dan perbaikan alat mesin pertanian (Alsintan) modern.', skills:['Pengoperasian Traktor & Alsintan','Perawatan Mesin Pertanian','Kelistrikan Otomotif Pertanian','Teknologi Tepat Guna'], career:['Teknisi Alsintan','Operator Mesin Berat Pertanian','Wirausaha Bengkel Alsintan','Penyuluh Mekanisasi'], cert:['Sertifikat Operator Traktor','BNSP Mekanisasi Pertanian'] }
};

// Testimonials
let testiData = (() => {
  try { return JSON.parse(localStorage.getItem('testiSMKN')) || defaultTesti(); }
  catch(e) { return defaultTesti(); }
})();

function defaultTesti() {
  return [
    { nama:'Budi Santoso', kat:'Alumni TKJ 2020', pesan:'Setelah lulus dari SMKN 1 Gondang jurusan TKJ, saya langsung diterima di perusahaan IT ternama. Ilmu yang didapat sangat aplikatif.', av:null },
    { nama:'Siti Aminah', kat:'Alumni Akuntansi 2019', pesan:'Guru-guru sangat kompeten dan peduli masa depan siswa. Kini saya bekerja di perusahaan multinasional sebagai staff accounting.', av:null },
    { nama:'Ahmad Rizki', kat:'Alumni Multimedia 2021', pesan:'Fasilitas lab yang lengkap membantu saya berkembang pesat. Sekarang aktif freelance designer dengan klien dari berbagai kota.', av:null }
  ];
}

// ===== LOCALSTORAGE SAVE / LOAD =====
function saveSiteImage(key, data) {
  try { localStorage.setItem('siteImg_'+key, data); }
  catch(e) { showToast('Gagal auto-save foto (Penyimpanan browser penuh).'); }
}

function loadSiteImages() {
  const L = localStorage;
  
  if(L.getItem('siteImg_logo')) {
    document.getElementById('logoTxt').style.display='none';
    const img = document.getElementById('logoImg');
    img.src = L.getItem('siteImg_logo'); img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;border-radius:12px;';
  }
  if(L.getItem('siteImg_heroBg')) {
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = `url('${L.getItem('siteImg_heroBg')}')`;
    hero.style.backgroundSize='cover'; hero.style.backgroundPosition='center';
    hero.querySelector('.aurora').style.opacity='0.5';
  }
  if(L.getItem('siteImg_heroImg')) {
    const img = document.getElementById('heroImg');
    img.src = L.getItem('siteImg_heroImg'); img.style.cssText='width:100%;max-height:480px;object-fit:cover;display:block;';
  }
  if(L.getItem('siteImg_aboutImg')) {
    const img = document.getElementById('aboutImg'); 
    img.src = L.getItem('siteImg_aboutImg'); img.style.maxHeight='420px'; img.style.objectFit='cover';
  }
  
  ['tkj','tsm','tkr','aphp','atu','atph','mp'].forEach(id => {
    if(L.getItem('siteImg_prog_'+id)) {
      const emoji = document.getElementById('progEmoji_'+id);
      const img = document.getElementById('progIcon_'+id);
      if(emoji) emoji.style.display='none';
      img.src = L.getItem('siteImg_prog_'+id); img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;border-radius:14px;';
    }
  });

  ['lab','workshop','perpus','olahraga','kantin','musholla'].forEach(id => {
    if(L.getItem('siteImg_fac_'+id)) {
      const bg = document.getElementById('facBg_'+id);
      bg.style.backgroundImage=`url('${L.getItem('siteImg_fac_'+id)}')`; bg.classList.add('loaded');
      bg.closest('.fac-tile').classList.add('has-photo');
    }
  });

  if(L.getItem('siteImg_gallery')) {
    try { galleryImages = JSON.parse(L.getItem('siteImg_gallery')); } catch(e){}
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadSiteImages(); // Load saved images first
  initCursor();
  initScrollEvents();
  initCounterAnim();
  initIntersection();
  renderTesti();
  renderGallery();
});

// ===== CURSOR =====
function initCursor() {
  const cur = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  let mx=0, my=0, cx=0, cy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  (function moveCursor(){
    cx += (mx-cx)*0.12; cy += (my-cy)*0.12;
    cur.style.left=cx+'px'; cur.style.top=cy+'px';
    requestAnimationFrame(moveCursor);
  })();
  document.querySelectorAll('a,button,label,[onclick]').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.style.transform='translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave',()=>cur.style.transform='translate(-50%,-50%) scale(1)');
  });
}

// ===== SCROLL =====
function initScrollEvents() {
  const nb = document.getElementById('navbar');
  const sb = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    nb.style.background = y>60 ? 'rgba(3,13,7,.97)' : 'rgba(3,13,7,.92)';
    if(y>400) sb.classList.add('visible'); else sb.classList.remove('visible');
  });
}

function nav(id) {
  const el = document.getElementById(id);
  if(!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 76, behavior:'smooth' });
  document.getElementById('navMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

function scrollToTop() { window.scrollTo({ top:0, behavior:'smooth' }); }

function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

// ===== COUNTER ANIMATION =====
function initCounterAnim() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        const el = e.target;
        const target = +el.dataset.target;
        let current = 0;
        const inc = Math.ceil(target/50);
        const t = setInterval(() => {
          current = Math.min(current+inc, target);
          el.textContent = current.toLocaleString();
          if(current >= target) clearInterval(t);
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold:0.5 });
  document.querySelectorAll('.kpi-n').forEach(el => observer.observe(el));
}

// ===== INTERSECTION OBSERVER =====
function initIntersection() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold:0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

// ===== ABOUT TABS =====
function vmSwitch(btn, id) {
  document.querySelectorAll('.vmtab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.vmcontent').forEach(c=>c.classList.add('hidden'));
  btn.classList.add('active');
  const t = document.getElementById('vm-'+id);
  if(t) t.classList.remove('hidden');
}

// ===== UPLOAD HELPERS (WITH AUTO-COMPRESS) =====
function readFile(file, cb) {
  const r = new FileReader();
  r.onload = e => {
    // Compress image if it is an image file (to save localStorage space)
    if(file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let w = img.width, h = img.height;
        const MAX = 1000; // Resize max dimension to 1000px
        if(w > MAX || h > MAX) {
          if(w > h) { h *= MAX / w; w = MAX; }
          else { w *= MAX / h; h = MAX; }
        }
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        cb(canvas.toDataURL('image/jpeg', 0.8)); // 80% quality
      };
      img.src = e.target.result;
    } else {
      cb(e.target.result); // For PDF/Docs
    }
  };
  r.readAsDataURL(file);
}

function triggerLogoUpload()    { document.getElementById('logoUploadInput').click(); }
function triggerHeroBgUpload()  { document.getElementById('heroBgInput').click(); }
function triggerHeroImgUpload() { document.getElementById('heroImgInput').click(); }
function triggerAboutImgUpload(){ document.getElementById('aboutImgInput').click(); }
function triggerProgIcon(id)    { document.getElementById('progIconInput_'+id).click(); }
function triggerFac(id)         { document.getElementById('facilityInput_'+id).click(); }
function triggerAvatar()        { document.getElementById('avatarInput').click(); }
function triggerPpdbPhoto()     { document.getElementById('ppdbPhotoInput').click(); }
function triggerDoc(id)         { document.getElementById('docInput_'+id).click(); }

function handleLogoUpload(e) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => {
    document.getElementById('logoTxt').style.display='none';
    const img = document.getElementById('logoImg');
    img.src=src; img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;border-radius:12px;';
    saveSiteImage('logo', src);
  });
}
function handleHeroBgUpload(e) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => {
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = `url('${src}')`;
    hero.style.backgroundSize='cover'; hero.style.backgroundPosition='center';
    hero.querySelector('.aurora').style.opacity='0.5';
    saveSiteImage('heroBg', src);
  });
}
function handleHeroImgUpload(e) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => {
    const img = document.getElementById('heroImg');
    img.src=src; img.style.cssText='width:100%;max-height:480px;object-fit:cover;display:block;';
    saveSiteImage('heroImg', src);
  });
}
function handleAboutImgUpload(e) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => { 
    const img=document.getElementById('aboutImg'); img.src=src; img.style.maxHeight='420px'; img.style.objectFit='cover'; 
    saveSiteImage('aboutImg', src);
  });
}
function handleProgIcon(e, id) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => {
    const emoji = document.getElementById('progEmoji_'+id);
    const img = document.getElementById('progIcon_'+id);
    if(emoji) emoji.style.display='none';
    img.src=src; img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;border-radius:14px;';
    saveSiteImage('prog_'+id, src);
  });
}
function handleFac(e, id) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => {
    const bg = document.getElementById('facBg_'+id);
    bg.style.backgroundImage=`url('${src}')`; bg.classList.add('loaded');
    bg.closest('.fac-tile').classList.add('has-photo');
    saveSiteImage('fac_'+id, src);
  });
}
function handleAvatar(e) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => {
    avatarSrc = src;
    const av = document.getElementById('avatarPreview');
    av.innerHTML = `<img src="${src}" alt="Avatar">`;
  });
}

// ===== GALLERY =====
function handleGallery(e) {
  const files = Array.from(e.target.files); if(!files.length) return;
  let done=0;
  files.forEach((f,i) => {
    readFile(f, src => {
      galleryImages.push({ src, caption: f.name.replace(/\.[^.]+$/,''), id: Date.now()+i });
      if(++done === files.length) {
        saveSiteImage('gallery', JSON.stringify(galleryImages));
        renderGallery();
      }
    });
  });
  e.target.value='';
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  if(!galleryImages.length) {
    grid.innerHTML=`<div class="gal-empty"><span>🖼️</span><p style="color:var(--muted)">Galeri masih kosong. Klik "Upload Foto" untuk menambahkan.</p></div>`;
    return;
  }
  grid.innerHTML = galleryImages.map((img,i) => `
    <div class="gal-item" style="animation:fadeIn .4s ease ${i*.04}s both">
      <img src="${img.src}" alt="${img.caption}" loading="lazy" onclick="openLightbox(${i})">
      <div class="gal-ov"><span>📸 ${img.caption}</span></div>
      <button class="gal-del-btn" onclick="delGallery(event,${img.id})">✕</button>
    </div>`).join('');
}

function delGallery(e, id) {
  e.stopPropagation();
  if(!confirm('Hapus foto ini?')) return;
  galleryImages = galleryImages.filter(i=>i.id!==id);
  saveSiteImage('gallery', JSON.stringify(galleryImages));
  renderGallery();
}

// ===== LIGHTBOX =====
function openLightbox(idx) {
  lbIndex=idx;
  const img = galleryImages[idx];
  document.getElementById('lbImg').src=img.src;
  document.getElementById('lbCaption').textContent=`${img.caption} (${idx+1}/${galleryImages.length})`;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
function lbNav(d) {
  lbIndex=(lbIndex+d+galleryImages.length)%galleryImages.length;
  openLightbox(lbIndex);
}
document.addEventListener('keydown', e => {
  if(!document.getElementById('lightbox').classList.contains('open')) return;
  if(e.key==='Escape') closeLightbox();
  if(e.key==='ArrowLeft') lbNav(-1);
  if(e.key==='ArrowRight') lbNav(1);
});

// ===== TESTIMONIALS =====
function renderTesti() {
  const grid = document.getElementById('testimonialGrid');
  if(!grid) return;
  const latest = [...testiData].reverse().slice(0,3);
  grid.innerHTML = latest.map((t,i) => {
    const av = t.av ? `<img src="${t.av}" alt="${t.nama}">` : `<span>${t.nama[0].toUpperCase()}</span>`;
    return `<div class="testi-card" style="animation:fadeIn .5s ease ${i*.1}s both">
      <div class="testi-head">
        <div class="testi-av">${av}</div>
        <div><div class="testi-name">${t.nama}</div><div class="testi-role">${t.kat}</div></div>
      </div>
      <p class="testi-txt">"${t.pesan}"</p>
      <div class="testi-stars">★★★★★</div>
    </div>`;
  }).join('');
}

// ===== CONTACT FORM =====
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('cname').value;
  const msg  = document.getElementById('cmessage').value;
  testiData.push({ nama:name, kat:'Pengunjung / Calon Siswa', pesan:msg, av:avatarSrc||null });
  try { localStorage.setItem('testiSMKN', JSON.stringify(testiData.map(t=>({...t,av:null})))); } catch(err){}
  renderTesti();
  showToast(`Terima kasih, ${name}! Pesan Anda telah diterima.`);
  e.target.reset();
  avatarSrc=null;
  document.getElementById('avatarPreview').innerHTML='👤';
  setTimeout(()=>document.getElementById('testimonials').scrollIntoView({behavior:'smooth'}),400);
}

// ===== PROGRAM DETAIL MODAL =====
function showProgDetail(code) {
  const d = progDetailData[code]; if(!d) return;
  const m = document.createElement('div');
  m.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:1.5rem;backdrop-filter:blur(6px);';
  m.innerHTML=`
  <div style="background:var(--dark2,#061210);border:1px solid rgba(16,185,129,.2);border-radius:24px;max-width:580px;width:100%;padding:2.5rem;position:relative;max-height:90vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,.7);">
    <button onclick="this.closest('div[style]').remove()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,.07);border:none;color:rgba(255,255,255,.5);width:36px;height:36px;border-radius:50%;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
    <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);color:#34d399;padding:.28rem .85rem;border-radius:50px;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1rem;">${d.tag}</span>
    <div style="font-size:2.5rem;margin-bottom:.75rem;">${d.icon}</div>
    <h2 style="font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#fff;margin-bottom:.75rem;line-height:1.2;">${d.title}</h2>
    <p style="color:rgba(255,255,255,.5);font-size:.88rem;line-height:1.7;margin-bottom:1.75rem;">${d.desc}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-bottom:1.5rem;">
      <div style="background:rgba(255,255,255,.04);border-radius:14px;padding:1.2rem;">
        <div style="color:#10b981;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem;">✅ Kompetensi</div>
        <ul style="list-style:none;padding:0;">${d.skills.map(s=>`<li style="color:rgba(255,255,255,.6);font-size:.82rem;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05);">• ${s}</li>`).join('')}</ul>
      </div>
      <div style="background:rgba(255,255,255,.04);border-radius:14px;padding:1.2rem;">
        <div style="color:#10b981;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem;">💼 Karir</div>
        <ul style="list-style:none;padding:0;">${d.career.map(c=>`<li style="color:rgba(255,255,255,.6);font-size:.82rem;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05);">• ${c}</li>`).join('')}</ul>
      </div>
    </div>
    <div style="background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.15);border-radius:14px;padding:1.2rem;margin-bottom:1.5rem;">
      <div style="color:#34d399;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem;">🏆 Sertifikasi</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">${d.cert.map(c=>`<span style="background:rgba(16,185,129,.1);color:#6ee7b7;font-size:.75rem;padding:4px 12px;border-radius:50px;border:1px solid rgba(16,185,129,.2);">${c}</span>`).join('')}</div>
    </div>
    <button onclick="this.closest('div[style]').remove();openPPDB();" style="width:100%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;padding:.9rem;border-radius:50px;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(16,185,129,.3);">Daftar Jurusan Ini →</button>
  </div>`;
  document.body.appendChild(m);
  m.addEventListener('click', e => { if(e.target===m) m.remove(); });
}

// ===== PPDB MODAL =====
function openPPDB() {
  ppdbStep=1;
  updatePPDBStep();
  document.getElementById('ppdbModal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closePPDB(e) {
  if(e && e.target !== document.getElementById('ppdbModal')) return;
  document.getElementById('ppdbModal').classList.remove('open');
  document.body.style.overflow='';
}

function updatePPDBStep() {
  for(let i=1;i<=5;i++) {
    const el = document.getElementById('ppdbStep'+i);
    if(el) el.classList.toggle('hidden', i!==ppdbStep);
  }
  document.querySelectorAll('.ppdb-step').forEach((s,idx) => { s.classList.remove('active','done'); });
  document.querySelectorAll('.ppdb-step[data-step]').forEach(s => {
    const n = +s.dataset.step;
    if(n < ppdbStep) s.classList.add('done');
    else if(n === ppdbStep) s.classList.add('active');
  });
  document.querySelectorAll('.step-conn').forEach((c,i) => {
    c.classList.toggle('done', (i+1) < ppdbStep);
  });
  const prev = document.getElementById('ppdbPrev');
  const next = document.getElementById('ppdbNext');
  const sub  = document.getElementById('ppdbSubmit');
  prev.style.display = ppdbStep>1 ? 'inline-flex' : 'none';
  next.style.display = ppdbStep<5 ? 'inline-flex' : 'none';
  sub.style.display  = ppdbStep===5 ? 'inline-flex' : 'none';
  document.getElementById('ppdbIndicator').textContent = `Langkah ${ppdbStep} dari 5`;
  if(ppdbStep===5) buildSummary();
}

function ppdbNext() {
  if(ppdbStep===1 && !validateStep1()) return;
  if(ppdbStep===3 && !document.querySelector('input[name="pilihan1"]:checked')) {
    showToast('Pilih minimal satu jurusan!'); return;
  }
  if(ppdbStep<5) { ppdbStep++; updatePPDBStep(); scrollPPDBTop(); }
}
function ppdbPrev() {
  if(ppdbStep>1) { ppdbStep--; updatePPDBStep(); scrollPPDBTop(); }
}
function scrollPPDBTop() {
  const modal = document.querySelector('.ppdb-modal');
  if(modal) modal.scrollTop=0;
}

function validateStep1() {
  const required = ['p1_nama','p1_nik','p1_nisn','p1_tmptlahir','p1_tgllahir','p1_jk','p1_agama','p1_alamat','p1_hp','p1_asal','p1_lulusan'];
  for(const id of required) {
    const el = document.getElementById(id);
    if(el && !el.value.trim()) {
      el.focus(); el.style.borderColor='#ef4444';
      showToast('Mohon lengkapi semua field yang wajib diisi!');
      setTimeout(()=>el.style.borderColor='',2000);
      return false;
    }
  }
  return true;
}

function buildSummary() {
  const p1_nama  = val('p1_nama');
  const p1_nik   = val('p1_nik');
  const p1_nisn  = val('p1_nisn');
  const p1_lahir = `${val('p1_tmptlahir')}, ${val('p1_tgllahir')}`;
  const p1_jk    = val('p1_jk');
  const p1_asal  = val('p1_asal');
  const p1_lulus = val('p1_lulusan');
  const p2_ayah  = val('p2_nama_ayah');
  const p2_ibu   = val('p2_nama_ibu');
  const pil1El   = document.querySelector('input[name="pilihan1"]:checked');
  const pil1     = pil1El ? pil1El.value : '-';
  const pil2     = val('p3_pilihan2');
  const rencana  = val('p3_rencana');
  const docsUploaded = Object.keys(docUploaded).filter(k=>docUploaded[k]).join(', ') || 'Belum ada';

  document.getElementById('confirmSummary').innerHTML=`
    <div class="cs-section-title">DATA DIRI</div>
    <div class="cs-row"><span class="cs-lbl">Nama Lengkap</span><span class="cs-val">${p1_nama||'-'}</span></div>
    <div class="cs-row"><span class="cs-lbl">NIK</span><span class="cs-val">${p1_nik||'-'}</span></div>
    <div class="cs-row"><span class="cs-lbl">NISN</span><span class="cs-val">${p1_nisn||'-'}</span></div>
    <div class="cs-row"><span class="cs-lbl">Tempat, Tgl Lahir</span><span class="cs-val">${p1_lahir}</span></div>
    <div class="cs-row"><span class="cs-lbl">Jenis Kelamin</span><span class="cs-val">${p1_jk||'-'}</span></div>
    <div class="cs-row"><span class="cs-lbl">Asal Sekolah</span><span class="cs-val">${p1_asal||'-'}</span></div>
    <div class="cs-row"><span class="cs-lbl">Tahun Lulus</span><span class="cs-val">${p1_lulus||'-'}</span></div>
    <div class="cs-section-title">DATA ORANG TUA</div>
    <div class="cs-row"><span class="cs-lbl">Nama Ayah</span><span class="cs-val">${p2_ayah||'-'}</span></div>
    <div class="cs-row"><span class="cs-lbl">Nama Ibu</span><span class="cs-val">${p2_ibu||'-'}</span></div>
    <div class="cs-section-title">PILIHAN JURUSAN</div>
    <div class="cs-row"><span class="cs-lbl">Pilihan Pertama</span><span class="cs-val">${pil1}</span></div>
    <div class="cs-row"><span class="cs-lbl">Pilihan Kedua</span><span class="cs-val">${pil2||'-'}</span></div>
    <div class="cs-row"><span class="cs-lbl">Rencana Setelah Lulus</span><span class="cs-val">${rencana||'-'}</span></div>
    <div class="cs-section-title">DOKUMEN</div>
    <div class="cs-row"><span class="cs-lbl">Dokumen diupload</span><span class="cs-val">${docsUploaded}</span></div>
  `;
}

function val(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

function ppdbSubmit() {
  if(!document.getElementById('chkPernyataan').checked || !document.getElementById('chkTatatertib').checked) {
    showToast('Mohon centang pernyataan & tata tertib terlebih dahulu!'); return;
  }
  const noReg = 'SMKN1G-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random()*9000)+1000);
  const modal = document.querySelector('.ppdb-modal');
  const footer = document.querySelector('.ppdb-footer');
  modal.querySelector('.ppdb-header').style.display='none';
  footer.style.display='none';
  for(let i=1;i<=5;i++) { const el=document.getElementById('ppdbStep'+i); if(el) el.classList.add('hidden'); }
  
  const successDiv = document.createElement('div');
  successDiv.className='ppdb-success';
  successDiv.innerHTML=`
    <span class="success-icon">🎉</span>
    <h2 class="success-title">Pendaftaran Berhasil!</h2>
    <p class="success-desc">Terima kasih, <strong style="color:var(--em-lt)">${val('p1_nama')}</strong>!</p>
    <p class="success-desc">Pendaftaran PPDB Anda telah kami terima.</p>
    <div class="success-no">${noReg}</div>
    <p class="success-desc" style="font-size:.82rem;margin-top:.5rem;">Simpan nomor pendaftaran ini. Informasi seleksi akan diumumkan melalui website dan WhatsApp.</p>
    <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap;">
      <button class="btn-emerald" onclick="closePPDB()">Tutup</button>
      <button class="btn-outline-w" onclick="window.print()">🖨️ Cetak Bukti</button>
    </div>
  `;
  modal.insertBefore(successDiv, footer);
  showToast('✓ Pendaftaran berhasil dikirim!');
}

// ===== DOCUMENT UPLOAD (PPDB) =====
function handleDoc(e, id) {
  const f = e.target.files[0]; if(!f) return;
  docUploaded[id] = f.name;
  const item = e.target.closest('.doc-item');
  item.classList.add('uploaded');
  document.getElementById('docIcon_'+id).textContent='✅';
  document.getElementById('docStatus_'+id).textContent='✓ '+f.name.substring(0,20)+(f.name.length>20?'...':'');
}

// ===== PPDB PHOTO =====
function handlePpdbPhoto(e) {
  const f = e.target.files[0]; if(!f) return;
  readFile(f, src => {
    ppdbPhotoSrc=src;
    const prev = document.getElementById('ppdbPhotoPreview');
    prev.innerHTML=`<img src="${src}" alt="Foto">`;
  });
}

// ===== ORTU TABS =====
function ortuSwitch(btn, id) {
  document.querySelectorAll('.ortu-tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.ortu-content').forEach(c=>c.classList.add('hidden'));
  btn.classList.add('active');
  const t = document.getElementById('ortu-'+id);
  if(t) t.classList.remove('hidden');
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText=`position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(16px);background:var(--dark3,#091a14);border:1px solid rgba(16,185,129,.3);color:#fff;padding:.8rem 1.5rem;border-radius:50px;font-size:.88rem;font-weight:500;z-index:999999;opacity:0;transition:all .35s;box-shadow:0 8px 30px rgba(0,0,0,.4);white-space:nowrap;font-family:'Plus Jakarta Sans',sans-serif;`;
  t.textContent='✦ '+msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>{ t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)'; });
  setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(16px)'; setTimeout(()=>t.remove(),400); },3500);
}