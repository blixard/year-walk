
const months = [
  { 
    name: "January", 
    highlights:[
      "Kumbh Mela 2025 lit up Prayagraj with massive snans, Ganga aartis and smooth crowd management.",
      "CES 2025 showed off Samsung’s Vision AI TVs and made ‘AI in every screen’ a thing.",
      "Early ‘good news 2025’ lists talked about conservation and medical wins."
    ], 
    fact: "The month where resolutions were still alive.", 
    music: "assets/audio/jan.m4a" 
  },
  { 
    name: "February", 
    highlights:[
      "NASA’s SPHEREx mission launched to map hundreds of millions of galaxies.",
      "OTT platforms leaned hard into AI dubbing and hyper-personalised streaming.",
      "Early cricket and football action plus Asian sports events kept fans warmed up."
    ], 
    fact: "Valentine's Day passed. Memes stayed.", 
    music: "assets/audio/feb.m4a" 
  },
  { 
    name: "March", 
    highlights:[
      "Agentic AI and AI ‘co-workers’ became the buzzwords of tech.",
      "Thinkpieces started calling 2025 the year AI stopped being just chatbots.",
      "Heartwarming stories about social impact and innovation began trending."
    ], 
    fact: "The year stopped feeling new.", 
    music: "assets/audio/march.m4a" 
  },
  { 
    name: "April", 
    highlights:[
      "IPL 2025 evenings turned into a festival again across India.",
      "AI DJs and hyper-personal feeds made apps feel a little too smart.",
      "Positive climate and science updates showed up in ‘what went right’ posts."
    ], 
    fact: "Internet humour peaked again.", 
    music: "assets/audio/april.m4a" 
  },
  { 
    name: "May", 
    highlights:[
      "China’s Tianwen-2 asteroid mission joined the new space race.",
      "AI startups and mega-deals made 2025 look like peak AI-investment season.",
      "Forest regrowth and ocean-protection stories added to the year’s good news."
    ], 
    fact: "Suddenly, everyone wanted to travel.", 
    music: "assets/audio/may.m4a" 
  },
  { 
    name: "June", 
    highlights:[
      "The NATO summit in the Netherlands dominated security headlines.",
      "The UN Ocean Conference in Nice pushed for stronger marine protection.",
      "Medical AI for faster stroke diagnosis became a poster child for ‘AI for good’."
    ], 
    fact: "Glow-up season (mostly in reels).", 
    music: "assets/audio/june.m4a" 
  },
  { 
    name: "July", 
    highlights:[
      "The Women’s Cricket World Cup in India filled stadiums with families and schoolkids.",
      "Fan vlogs from Indian grounds raved about food, noise and atmosphere.",
      "Science wins around hereditary-disease prevention hit positive-news lists."
    ], 
    fact: "Rain outside. Reels inside.", 
    music: "assets/audio/july.m4a" 
  },
  { 
    name: "August", 
    highlights:[
      "India lifted the ICC Women’s World Cup 2025 trophy on home soil.",
      "A Russia–US summit in Alaska became one of the year’s big geopolitical images.",
      "The first World Humanoid Robot Games in Beijing went viral for robo-stunts."
    ], 
    fact: "Patriotism + long weekends.", 
    music: "assets/audio/august.m4a" 
  },
  { 
    name: "September", 
    highlights:[
      "UNGA’s 80th session in New York put AI, climate and conflicts on the same stage.",
      "Women’s sports were celebrated globally, with India’s win as a key highlight.",
      "Good-news lists talked about youth, democracy and community peace efforts."
    ], 
    fact: "The 'I'll get serious now' month.", 
    music: "assets/audio/sept.m4a" 
  },
  { 
    name: "October", 
    highlights:[
      "‘A to Z of tech 2025’ recaps explained everything from Agentic AI to Blackwell GPUs.",
      "Navratri and Durga Puja reels showed Garba, pandals and neon nights across India.",
      "New biodiversity and nature wins joined the year’s optimistic headlines."
    ], 
    fact: "Best lighting. Worst overthinking.", 
    music: "assets/audio/jan.m4a" 
  },
  { 
    name: "November", 
    highlights:[
      "COP30 in the Amazon rainforest became one of the most iconic climate summits.",
      "The G20 in South Africa spotlighted the Global South and African Union.",
      "Fresh HIV and asthma treatment progress gave medicine some real good news."
    ], 
    fact: "Reels asked what you did all year.", 
    music: "assets/audio/july.m4a" 
  },
  { 
    name: "December", 
    highlights:[
      "The UN World Space Forum wrapped up a packed year of launches and missions.",
      "‘What went right in 2025’ compilations collected the year’s best feel-good stories.",
      "Year-end tech recaps crowned 2025 as the year AI properly entered everyday life."
    ], 
    fact: "Deadlines arrived faster than memories.", 
    music: "assets/audio/dec.m4a" 
  }
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
  const factBox = document.getElementById("modalFact");
  factBox.innerHTML = `
    <ul>
      ${m.highlights.map(h => `<li>${h}</li>`).join("")}
    </ul>
  `;
  updateProgress();
  currentMusic = m.music;
  document.getElementById("modal").classList.add("show");
  playAudio(m.music);
  document.querySelectorAll(".month")[index].classList.add("visited");
}

function updateProgress() {
  const percent = (visited.size / months.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
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
    if (visited.size === 12) {
    setTimeout(() => switchScreen("final"), 600);
  }
  else{
    audio.pause();
  }
  
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

