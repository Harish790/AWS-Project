const frame = document.getElementById('reelFrame');
const progressRow = document.getElementById('progressRow');
const confettiLayer = document.getElementById('confettiLayer');
const replayBtn = document.getElementById('replayBtn');
const slides = Array.from(document.querySelectorAll('.slide'));
const emojiSet = ['💚', '🎉', '🤝', '🎊', '🤍', '✨'];

const SLIDE_DURATION = 3500; // ms per auto-advancing slide
let current = 0;
let autoTimer = null;

// Build one progress segment per slide
slides.forEach(() => {
  const seg = document.createElement('div');
  seg.className = 'seg';
  seg.innerHTML = '<div class="fill"></div>';
  progressRow.appendChild(seg);
});
const segs = Array.from(progressRow.children);

function setClock() {
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  const time = `${h}:${m}`;
  document.getElementById('clock').textContent = time;
  document.getElementById('bigClock').textContent = time;
  document.getElementById('bigDate').textContent = now.toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}
setClock();
setInterval(setClock, 30000);

function launchConfetti() {
  confettiLayer.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    piece.style.left = Math.random() * 100 + '%';
    piece.style.animationDuration = 2.5 + Math.random() * 2 + 's';
    piece.style.animationDelay = Math.random() * 0.6 + 's';
    confettiLayer.appendChild(piece);
  }
}

function showSlide(index, { animateProgress = true } = {}) {
  clearTimeout(autoTimer);
  current = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((s, i) => s.classList.toggle('active', i === current));

  segs.forEach((seg, i) => {
    seg.classList.toggle('done', i < current);
    const fill = seg.querySelector('.fill');
    if (i < current) {
      fill.style.transition = 'none';
      fill.style.width = '100%';
    } else if (i === current) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      if (animateProgress) {
        requestAnimationFrame(() => {
          fill.style.transition = `width ${SLIDE_DURATION}ms linear`;
          fill.style.width = '100%';
        });
      }
    } else {
      fill.style.transition = 'none';
      fill.style.width = '0%';
    }
  });

  if (current === slides.length - 1) {
    launchConfetti();
  }

  if (animateProgress && current < slides.length - 1) {
    autoTimer = setTimeout(() => showSlide(current + 1), SLIDE_DURATION);
  }
}

function nextSlide() {
  if (current < slides.length - 1) showSlide(current + 1);
}

function prevSlide() {
  if (current > 0) showSlide(current - 1);
}

document.getElementById('tapRight').addEventListener('click', nextSlide);
document.getElementById('tapLeft').addEventListener('click', prevSlide);

replayBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  confettiLayer.innerHTML = '';
  showSlide(0);
});

showSlide(0);