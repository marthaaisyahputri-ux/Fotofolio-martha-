/* ===== EDIT DI SINI SAJA ===== */
const PROFIL={
  nama:"Martha Aisyah Putri",
  bio:"Siswi SMKN 1 Bangkinang.",
  kelas:"", sekolah:"SMKN 1 Bangkinang",
  fotoUtama:"foto/foto-2.jpg",
  tentang:"Aku Martha Aisyah Putri, siswi SMKN 1 Bangkinang. Perjalanan sekolahku dimulai dari SD 007 Kompleks, lalu SMPN 2 Bangkinang Kota.",
  detail:[ // kolom kosong tidak ditampilkan
    {label:"Nama lengkap",isi:"Martha Aisyah Putri"},{label:"Sekolah",isi:"SMKN 1 Bangkinang"},
    {label:"Kelas",isi:""},{label:"Jurusan",isi:""},{label:"Tempat, tanggal lahir",isi:""},
    {label:"Hobi",isi:"Edit video velocity"},{label:"Cita-cita",isi:""}]
};
const SEKOLAH=[
  {jenjang:"SD",nama:"SD 007 Kompleks",tempat:"",tahun:""},
  {jenjang:"SMP",nama:"SMPN 2 Bangkinang Kota",tempat:"",tahun:""},
  {jenjang:"SMK",nama:"SMKN 1 Bangkinang",tempat:"",tahun:"",sekarang:true}];
// Tambah foto: taruh file di folder foto/ lalu tambah baris di sini.
const GALERI=[{src:"foto/foto-2.jpg",judul:"Potret"},{src:"foto/foto-1.jpg",judul:"Potret 2"}];
/* ============================== */
const $=s=>document.querySelector(s),P=PROFIL;
const NAV=[["beranda","Beranda"],["tentang","Tentang"],["sekolah","Sekolah"],["galeri","Galeri"]];
document.title=`Fotofolio ${P.nama}`;
const pf=`<div class="pf"><img class="avatar" src="${P.fotoUtama}" alt="Foto ${P.nama}"><span class="em e1" aria-hidden="true">🎀</span><span class="em e2" aria-hidden="true">✨</span><span class="em e3" aria-hidden="true">🌷</span><span class="em e4" aria-hidden="true">🧸</span></div>`;
const head=(t,p)=>`<header class="page-head"><h2>${t}</h2><p>${p}</p></header>`;
const detail=P.detail.filter(d=>d.isi).map(d=>`<div><dt>${d.label}</dt><dd>${d.isi}</dd></div>`).join("");
$("#app").innerHTML=`
<nav class="nav"><div class="wrap"><a class="logo" href="#beranda">${P.nama}</a><ul class="menu">${NAV.map(([i,n])=>`<li><a href="#${i}">${n}</a></li>`).join("")}</ul></div></nav>
<section id="beranda" class="wrap hero"><div><p class="eyebrow">Fotofolio</p><h1>Halo, aku ${P.nama.split(" ")[0]}.</h1><p class="lead">${P.bio}</p><div class="btns"><a class="btn" href="#tentang">Kenalan</a><a class="btn ghost" href="#galeri">Lihat galeri</a></div></div>${pf}</section>
<section id="tentang" class="wrap sec">${head("Tentang","Sedikit cerita tentang aku.")}<div class="about">${pf}<div><p class="big">${P.tentang}</p><dl class="dl">${detail}</dl></div></div></section>
<section id="sekolah" class="wrap sec">${head("Perjalanan sekolah","Dari SD sampai sekarang.")}<ol class="tl">${SEKOLAH.map(s=>`<li class="rv ${s.sekarang?"now":""}"><div class="card"><span class="tag">${s.jenjang}</span>${s.sekarang?'<span class="now-badge">sekarang</span>':""}<h3>${s.nama}</h3>${[s.tempat,s.tahun].filter(Boolean).length?`<p>${[s.tempat,s.tahun].filter(Boolean).join(" · ")}</p>`:""}</div></li>`).join("")}</ol></section>
<section id="galeri" class="wrap sec">${head("Galeri","Klik foto untuk memperbesar.")}<div class="grid">${GALERI.map((g,i)=>`<button data-i="${i}" aria-label="Perbesar ${g.judul}"><img src="${g.src}" alt="${g.judul}" loading="lazy"></button>`).join("")}</div></section>
<footer class="foot"><b>${P.nama}</b>Fotofolio · ${P.sekolah}</footer>
<div class="lb" id="lb"><div><img alt=""><p></p></div></div>`;
const lb=$("#lb");
document.querySelectorAll(".grid button").forEach(b=>b.onclick=()=>{const g=GALERI[b.dataset.i];lb.querySelector("img").src=g.src;lb.querySelector("p").textContent=g.judul;lb.classList.add("on")});
lb.onclick=()=>lb.classList.remove("on");
addEventListener("keydown",e=>e.key==="Escape"&&lb.classList.remove("on"));
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")),{threshold:.15});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
// Satu halaman tampil per menu (tanpa scroll antar bagian)
const links=[...document.querySelectorAll(".menu a")],pages=[...document.querySelectorAll("section[id]")];
function route(){
  let v=location.hash.slice(1);if(!pages.some(p=>p.id===v))v="beranda";
  pages.forEach(p=>p.hidden=p.id!==v);
  links.forEach(a=>a.getAttribute("href")==="#"+v?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
  lb.classList.remove("on");scrollTo(0,0);
}
addEventListener("hashchange",route);route();
