// ano no footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// drawer
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("closeDrawer");
const overlay = document.getElementById("drawerOverlay");

function openDrawer(){
  drawer?.classList.add("open");
  overlay?.classList.add("show");
  burger?.setAttribute("aria-expanded","true");
  drawer?.setAttribute("aria-hidden","false");
}
function hideDrawer(){
  drawer?.classList.remove("open");
  overlay?.classList.remove("show");
  burger?.setAttribute("aria-expanded","false");
  drawer?.setAttribute("aria-hidden","true");
}

burger?.addEventListener("click", openDrawer);
closeDrawer?.addEventListener("click", hideDrawer);
overlay?.addEventListener("click", hideDrawer);
drawer?.querySelectorAll("a").forEach(a => a.addEventListener("click", hideDrawer));

// nav active (desktop)
const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
const sections = ["sobre","servicos","projetos","processo","contato"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const ioNav = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  const id = visible.target.id;

  navLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("is-active", href === `#${id}`);
  });
}, { root: null, threshold: [0.35, 0.55, 0.7] });

sections.forEach(s => ioNav.observe(s));

// reveal on scroll
const reveals = Array.from(document.querySelectorAll(".reveal"));
const ioReveal = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.18 });

reveals.forEach(r => ioReveal.observe(r));

// testimonials slider (simples)
const slider = document.getElementById("testiSlider");
const cards = slider ? Array.from(slider.querySelectorAll(".testi-card")) : [];
const prev = document.getElementById("prevTesti");
const next = document.getElementById("nextTesti");

let idx = cards.findIndex(c => c.classList.contains("is-active"));
if (idx < 0) idx = 0;

function show(i){
  if (!cards.length) return;
  cards.forEach(c => c.classList.remove("is-active"));
  idx = (i + cards.length) % cards.length;
  cards[idx].classList.add("is-active");
}

prev?.addEventListener("click", () => show(idx - 1));
next?.addEventListener("click", () => show(idx + 1));

// form demo
document.getElementById("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Mensagem enviada (demo). Posso integrar isso com back-end/WhatsApp depois.");
});
