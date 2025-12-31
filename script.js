const months = [
  { name: "January", fact: "The month where resolutions were still alive.", music: "assets/audio/jan.m4a" },
  { name: "February", fact: "Valentine's Day passed. Memes stayed.", music: "assets/audio/feb.m4a" },
  { name: "March", fact: "The year stopped feeling new.", music: "assets/audio/march.m4a" },
  { name: "April", fact: "Internet humour peaked again.", music: "assets/audio/april.m4a" },
  { name: "May", fact: "Suddenly, everyone wanted to travel.", music: "assets/audio/may.m4a" },
  { name: "June", fact: "Glow-up season (mostly in reels).", music: "assets/audio/june.m4a" },
  { name: "July", fact: "Rain outside. Reels inside.", music: "assets/audio/july.m4a" },
  { name: "August", fact: "Patriotism + long weekends.", music: "assets/audio/august.m4a" },
  { name: "September", fact: "The 'I'll get serious now' month.", music: "assets/audio/sept.m4a" },
  { name: "October", fact: "Best lighting. Worst overthinking.", music: "assets/audio/jan.m4a" },
  { name: "November", fact: "Reels asked what you did all year.", music: "assets/audio/july.m4a" },
  { name: "December", fact: "Deadlines arrived faster than memories.", music: "assets/audio/dec.m4a" }
];

let visited = new Set();
let currentMusic = null;

const grid = document.getElementById("monthGrid");
const audio = document.getElementById("bgAudio");
audio.volume = 0;

let dragStart = null;
const MIN_DRAG_DISTANCE = 40; // pixels
const aimLine = document.getElementById("aimLine");
const monthElements = document.querySelectorAll(".month");



months.forEach((m, i) => {
  const div = document.createElement("div");
  div.className = "month";
  div.innerText = m.name;
  div.onclick = () => openMonth(i);
  grid.appendChild(div);
});

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function enterYear() {
  switchScreen("months");
}

function openMonth(index) {
  const m = months[index];
  visited.add(index);
  document.getElementById("modalMonth").innerText = m.name;
  document.getElementById("modalFact").innerText = m.fact;
  currentMusic = m.music;
  document.getElementById("modal").classList.add("show");
  playAudio(m.music);

  if (visited.size === 12) {
    setTimeout(() => switchScreen("final"), 600);
  }
}

function playAudio(src) {
  audio.pause();
  audio.src = src;
  audio.currentTime = 0;
  audio.volume = 0;
  audio.play();

  let vol = 0;
  const fade = setInterval(() => {
    vol += 0.05;
    if (vol >= 0.6) {
      vol = 0.6;
      clearInterval(fade);
    }
    audio.volume = vol;
  }, 100);
}


function closeModal() {
  document.getElementById("modal").classList.remove("show");
  audio.pause();
}


function playMusic() {
  window.open(currentMusic, "_blank");
}

function openDoor() {
  switchScreen("message");
}


function getPoint(e) {
  // Touch end uses changedTouches
  if (e.changedTouches && e.changedTouches.length) {
    return {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
  }

  // Touch start / move
  if (e.touches && e.touches.length) {
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }

  // Mouse events
  if (typeof e.clientX === "number") {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  return null;
}


function startAim(e) {
  // Ignore right-clicks
  if (e.button !== undefined && e.button !== 0) return;

  if (e.type === "touchstart") {
    dragStart = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  } else {
    dragStart = {
      x: e.clientX,
      y: e.clientY
    };
  }

  aimLine.style.opacity = "1";
}


function moveAim(e) {
  if (!dragStart) return;

  const p = getPoint(e);
  const dx = p.x - dragStart.x;
  const dy = p.y - dragStart.y;

  const distance = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  aimLine.style.width = distance + "px";
  aimLine.style.transform =
    `translate(${dragStart.x}px, ${dragStart.y}px) rotate(${angle}deg)`;

  clearPreview();

  let bestMatch = null;
  let smallestDiff = Infinity;

  document.querySelectorAll(".month").forEach((el, index) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const cardAngle = Math.atan2(cy - dragStart.y, cx - dragStart.x);
    let diff = Math.abs(cardAngle - angle);
    if (diff > Math.PI) diff = (Math.PI * 2) - diff;

    if (diff < smallestDiff) {
      smallestDiff = diff;
      bestMatch = index;
    }
  });

  if (bestMatch !== null) {
    document.querySelectorAll(".month")[bestMatch]
      .classList.add("hit");
    previewIndex = bestMatch;
  }

}


function endAim(e) {
  clearPreview();

  if (!dragStart) return;

  const p = getPoint(e);
  const dx = p.x - dragStart.x;
  const dy = p.y - dragStart.y;

  const distance = Math.hypot(dx, dy);
  if (distance < MIN_DRAG_DISTANCE) {
    dragStart = null;
    return; // ignore tiny drags / clicks
  }


  aimLine.style.opacity = "0";
  aimLine.style.width = "0";

  const angle = Math.atan2(dy, dx);

  let bestMatch = null;
  let smallestAngleDiff = Infinity;

  monthElements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const cardAngle = Math.atan2(cy - dragStart.y, cx - dragStart.x);
    let diff = Math.abs(cardAngle - angle);
    if (diff > Math.PI) diff = (Math.PI * 2) - diff;


    if (diff < smallestAngleDiff) {
      smallestAngleDiff = diff;
      bestMatch = index;
    }
  });

  if (bestMatch !== null) {
    openMonth(bestMatch);
  }

  dragStart = null;
}

let previewIndex = null;

function clearPreview() {
  if (previewIndex !== null) {
    document.querySelectorAll(".month")[previewIndex]
      .classList.remove("hit");
    previewIndex = null;
  }
}


document.addEventListener("mousedown", startAim);
document.addEventListener("mousemove", moveAim);
document.addEventListener("mouseup", endAim);

document.addEventListener("touchstart", startAim, { passive: true });
document.addEventListener("touchmove", moveAim, { passive: true });
document.addEventListener("touchend", endAim);

