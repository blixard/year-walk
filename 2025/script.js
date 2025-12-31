const months = [
  { name: "January", fact: "The month where resolutions were still alive.", music: "assets/audio/january.mp3" },
  { name: "February", fact: "Valentine's Day passed. Memes stayed.", music: "https://www.youtube.com/watch?v=0Wqr_pa4UlU&list=RD0Wqr_pa4UlU&start_radio=1" },
  { name: "March", fact: "The year stopped feeling new.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "April", fact: "Internet humour peaked again.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "May", fact: "Suddenly, everyone wanted to travel.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "June", fact: "Glow-up season (mostly in reels).", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "July", fact: "Rain outside. Reels inside.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "August", fact: "Patriotism + long weekends.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "September", fact: "The 'I'll get serious now' month.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "October", fact: "Best lighting. Worst overthinking.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "November", fact: "Reels asked what you did all year.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "December", fact: "Deadlines arrived faster than memories.", music: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

let visited = new Set();
let currentMusic = null;

const grid = document.getElementById("monthGrid");
const audio = document.getElementById("bgAudio");
audio.volume = 0;


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
