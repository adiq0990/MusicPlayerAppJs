let progress = document.querySelector('.progress')
let song = document.querySelector('.song')
let ctrlIcon = document.querySelector('.ctrlIcon')
const playBtn = document.querySelector('.play-btn')
const title = document.querySelector('.title')
const author = document.querySelector('.author')
const source = document.querySelector('.source')
const prevSongBtn = document.querySelector('.prev-song')
const nextSongBtn = document.querySelector('.next-song')
const songImg = document.querySelector('.song-img')
const volume = document.querySelector('.volume')

const songs = [
  {
    title: 'Go!',
    author: 'NEFFEX',
    file: 'Go! - NEFFEX',
    img: '468-thumbnail'
  },
  {
    title: 'No Turning Back (Clean)',
    author: 'NEFFEX',
    file: 'No Turning Back (Clean) - NEFFEX',
    img: 'rap-album-cover-original'
  },
  {
    title: 'Manifest It',
    author: 'NEFFEX',
    file: 'Manifest It - NEFFEX',
    img: 'pop-album-cover-original'
  }
]

let currentSongIndex = 0;

displaySong();

playBtn.addEventListener('click', () => {
  playPause();
});

nextSongBtn.addEventListener('click', () => {
  nextSong();
});

prevSongBtn.addEventListener('click', () => {
  prevSong();
});

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime
  },500)
}

progress.onchange = function(){
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add('fa-pause')
  ctrlIcon.classList.remove('fa-play')
}

volume.oninput = function() {
  song.volume = this.value;
}

function playPause(){
  if (ctrlIcon.classList.contains('fa-pause')) {
    song.pause();
    ctrlIcon.classList.remove('fa-pause')
    ctrlIcon.classList.add('fa-play')
  } else {
    song.play();
    ctrlIcon.classList.add('fa-pause')
    ctrlIcon.classList.remove('fa-play')
  }
};

function displaySong() {
  title.innerHTML = songs[currentSongIndex].title
  author.innerHTML = songs[currentSongIndex].author
  songImg.src = `Media/${songs[currentSongIndex].img}.png`
  song.src = `Media/${songs[currentSongIndex].file}.mp3`
  loadSong();
}

function nextSong() {
  currentSongIndex++
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0
  }
  nextPrevPlay();
  displaySong();
  song.play();
}

function prevSong() {
  currentSongIndex--
  if (currentSongIndex === -1) {
    currentSongIndex = songs.length - 1
  }
  nextPrevPlay();
  displaySong();
  song.play();
};

function nextPrevPlay(){
  if (ctrlIcon.classList.contains('fa-play')) {
    song.play();
    ctrlIcon.classList.remove('fa-play')
    ctrlIcon.classList.add('fa-pause')
  }
};

function loadSong(){
  song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
  }
}