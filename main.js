document.addEventListener("DOMContentLoaded", () => {
  // ====== Mobile menu
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  burger?.addEventListener("click", () => nav.classList.toggle("show"));

  // ====== Theme toggle (persist)
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.classList.add("light");
  themeBtn?.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  });

  // ====== Hero slider
  const slides = [...document.querySelectorAll(".hero-slide")];
  let idx = 0;
  const setActive = (n)=> {
    slides[idx].classList.remove("active");
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add("active");
  };
  document.getElementById("heroPrev")?.addEventListener("click", ()=>setActive(idx-1));
  document.getElementById("heroNext")?.addEventListener("click", ()=>setActive(idx+1));
  setInterval(()=>setActive(idx+1), 6000);

  // ====== Stars (progress gradient driven by data-stars in CSS) — nothing else needed

  // ====== Filters (search, genre, platform, sort)
  const search = document.getElementById("search");
  const genre = document.getElementById("genre");
  const platform = document.getElementById("platform");
  const sort = document.getElementById("sort");
  const grid = document.getElementById("gameGrid");
  const cards = () => [...grid.querySelectorAll(".gcard")];

  function applyFilters(){
    const q = (search?.value || "").trim().toLowerCase();
    const g = genre?.value || "";
    const p = platform?.value || "";

    cards().forEach(card=>{
      const name = card.dataset.name.toLowerCase();
      const okQ = !q || name.includes(q);
      const okG = !g || card.dataset.genre === g;
      const okP = !p || card.dataset.platform === p;
      card.style.display = (okQ && okG && okP) ? "" : "none";
    });

    // sort
    if(sort){
      const [key,dir] = sort.value.split("-");
      const arr = cards().filter(c=>c.style.display!=="none");
      arr.sort((a,b)=>{
        if(key==="name"){
          return dir==="asc"
            ? a.dataset.name.localeCompare(b.dataset.name)
            : b.dataset.name.localeCompare(a.dataset.name);
        }else{
          const ra = parseFloat(a.dataset.rating), rb = parseFloat(b.dataset.rating);
          return dir==="asc" ? ra - rb : rb - ra;
        }
      });
      arr.forEach(el=>grid.appendChild(el));
    }
  }
  [search,genre,platform,sort].forEach(el=>el?.addEventListener("input", applyFilters));

  // ====== Modal (game info)
  const modal = document.getElementById("modal");
  const mTitle = document.getElementById("mTitle");
  const mText = document.getElementById("mText");
  const mClose = document.getElementById("modalClose");
  const about = {
    "FIFA 23":"Реалістична фізика, ліцензії та карʼєра гравця/менеджера.",
    "Halo Infinite":"Відкриті простори, гак-кіш, арсенал та легендарний лор.",
    "Starfield":"Тисячі планет, кастомізація корабля, фракції та квести.",
    "Counter-Strike 2":"Тіковий неткод, підкати димів, оновлена графіка.",
    "The Witcher 3":"Блискучий сюжет, доповнення та нелінійні рішення.",
    "Cyberpunk 2077":"Редизайн систем, Phantom Liberty, рей-трейсинг.",
    "Elden Ring":"Світ Мідлу — боси, підземелля і свобода шляху.",
    "Fortnite":"Будівництво, колаби з брендами, креативний режим.",
    "Forza Horizon 5":"Аркадні перегони у Мексиці з сезонними евентами.",
    "Valorant":"Ульти, ролі, економіка раундів — командний кіберспорт.",
    "Minecraft":"Сурвайвал/креатив, редстоун, моди, сервери.",
    "Apex Legends":"Тактичні герої, рес, zip-лінії та рухливий ґеймплей."
  };
  document.body.addEventListener("click",(e)=>{
    const btn = e.target.closest(".more");
    if(!btn) return;
    const game = btn.dataset.game;
    mTitle.textContent = game;
    mText.textContent = about[game] || "Деталі скоро 😉";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
  });
  mClose?.addEventListener("click", ()=>{ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); });
  modal?.addEventListener("click", (e)=>{ if(e.target===modal) mClose.click(); });

  // ====== Gallery carousel
  const car = document.getElementById("galleryCarousel");
  if(car){
    const track = car.querySelector(".track");
    car.querySelector(".prev").addEventListener("click", ()=> track.scrollBy({left:-520, behavior:"smooth"}));
    car.querySelector(".next").addEventListener("click", ()=> track.scrollBy({left: 520, behavior:"smooth"}));
  }

  // ====== Accordion
  document.querySelectorAll(".ac-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const item = btn.parentElement;
      item.classList.toggle("open");
    });
  });

  // ====== Reveal on scroll
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add("show"); io.unobserve(en.target); }
    });
  }, {threshold:.18});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  // ====== Back to top
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", ()=>{
    toTop.style.display = window.scrollY > 400 ? "block" : "none";
  });
  toTop.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));

  // ====== Contact form
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", (e)=>{
    e.preventDefault();
    alert("✅ Повідомлення надіслано! Ми відповімо на email.");
    form.reset();
  });
});


