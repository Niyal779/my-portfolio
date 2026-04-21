const sc = document.getElementById('sc');
const ctx = sc.getContext('2d');
let stars = [];

function rsz() {
  sc.width = innerWidth;
  sc.height = innerHeight;
}

function mkS() {
  stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * sc.width,
    y: Math.random() * sc.height,
    r: Math.random() * 1.2 + .2,
    a: Math.random() * .7 + .1,
    sp: Math.random() * .005 + .001,
    ph: Math.random() * Math.PI * 2
  }));
}

(function loop(t) {
  ctx.clearRect(0, 0, sc.width, sc.height);
  stars.forEach(s => {
    const al = s.a * (.4 + .6 * Math.sin(t * s.sp + s.ph));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,160,255,${al})`;
    ctx.fill();
  });
  requestAnimationFrame(loop);
})(0);

rsz();
mkS();
window.addEventListener('resize', () => { rsz(); mkS(); });

let cur = 'home';

function goTo(id) {
  document.getElementById('pg-' + cur).classList.remove('active');
  document.querySelectorAll('.npill').forEach(b => b.classList.toggle('active', b.dataset.p === id));
  cur = id;
  const pg = document.getElementById('pg-' + id);
  pg.classList.add('active');
  window.scrollTo(0, 0);
  localStorage.setItem('currentPage', id);

  if (id === 'skills') {
    setTimeout(() => document.querySelectorAll('.prog-fill').forEach(e => e.classList.add('go')), 280);
  }
  if (id === 'lang') {
    setTimeout(() => document.querySelectorAll('.lang-bar').forEach(e => e.classList.add('go')), 280);
  }

  setTimeout(() => {
    pg.querySelectorAll('.anim-item').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      el.style.transition = `opacity .42s ease ${i * .06}s, transform .42s ease ${i * .06}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }));
    });
  }, 60);
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileNav').classList.remove('open');
}

const words = ['Software Engineer', 'Web Developer', 'Full-Stack Learner', 'Problem Solver', 'CSE @ AIUB'];
let wi = 0, ci = 0, del = false;
const twEl = document.getElementById('tw');

function tick() {
  const w = words[wi];
  twEl.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
  if (!del && ci === w.length) { del = true; setTimeout(tick, 1900); return; }
  if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
  setTimeout(tick, del ? 55 : 90);
}
tick();

window.addEventListener('load', () => {
  const storedPage = localStorage.getItem('currentPage');
  if (storedPage && storedPage !== 'home') {
    goTo(storedPage);
  }
  const h = document.getElementById('mainH');
  h.style.transition = 'opacity .5s ease';
  setTimeout(() => h.style.opacity = '1', 100);
  document.querySelectorAll('#pg-home .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 200 + i * 120);
  });
});

function submitForm() {
  const n = document.getElementById('qname').value.trim();
  const e = document.getElementById('qemail').value.trim();
  if (!n || !e) { alert('Please enter your name and email.'); return; }
  document.getElementById('qsuccess').style.display = 'block';
  document.getElementById('qname').value = '';
  document.getElementById('qemail').value = '';
  document.getElementById('qsubject').value = '';
  document.getElementById('qmsg').value = '';
}
