const audio = document.getElementById("audio");
const title = document.querySelector(".song-title");
const artist = document.querySelector(".artist-name");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const songs = [
  { name: "oqibat.mp3", title: "Oqibat", artist: "Janze" },
  { name: "seychas.mp3", title: "Сейчас", artist: "Монатик" },
  { name: "song3.mp3", title: "Track 3", artist: "Unknown Artist" }
];

let songIndex = 0;
let isPlaying = false;

// === Загрузка трека ===
function loadSong(index) {
  const song = songs[index];
  audio.src = "music/" + song.name;
  title.textContent = song.title;
  artist.textContent = song.artist;
  playBtn.innerHTML = "▶️"; 
  isPlaying = false;
}

// === Воспроизведение / пауза ===
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = "▶️";
  } else {
    audio.play();
    playBtn.innerHTML = "⏸️";
  }
  isPlaying = !isPlaying;
}

// === Навигация по трекам ===
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.innerHTML = "⏸️";
  isPlaying = true;
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.innerHTML = "⏸️";
  isPlaying = true;
}

// === События ===
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// === Обновление времени ===
audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// === Автопереключение ===
audio.addEventListener("ended", nextSong);

// === Форматирование времени ===
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Загружаем первый трек
loadSong(songIndex);
