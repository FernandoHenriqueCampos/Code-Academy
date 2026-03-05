const songName = document.getElementById("song-name")
const artistName = document.getElementById("artist-name")
const song = document.getElementById("song")
const play = document.getElementById("play")
const cover = document.getElementById("cover")
const next = document.getElementById("next")
const previous = document.getElementById("previous")
const progressContainer = document.getElementById("progress-container")
const shuffle = document.getElementById("shuffle")
const repeat = document.getElementById("repeat")
const likeButton = document.getElementById("like")

let musicNumber= 0

const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [
    {
        songName: "Cry Out",
        artistName: "One ok Rock",
        song: "./assets/CryOut.mp3",
        cover: "./assets/xv35.png",
        liked: false
    },
    {
        songName: "Wind",
        artistName: "Akeboshi",
        song: "./assets/Wind.mp3",
        cover: "./assets/wind.jpg",
        liked: false
    },
    {
        songName: "In The End",
        artistName: "Linkin Park",
        song: "./assets/inTheEnd.mp3",
        cover: "./assets/linkinPark.jpg",
        liked: false
    }
]

let isShuffled = false
let sortedPlaylist = [...playlist]

function shuffleArray(preShuffledArray) {
    const size = preShuffledArray.length
    let currentIndex = size -1
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size)
        let aux = preShuffledArray[currentIndex]
        preShuffledArray[currentIndex] =preShuffledArray[randomIndex]
        preShuffledArray[randomIndex] = aux
        currentIndex -= 1
    }
    return preShuffledArray
}

function shuffleSong() {
    if (isShuffled === false) {
        isShuffled = true;
        sortedPlaylist = shuffleArray([...playlist]); 
        shuffle.style.color = "rgb(0, 255, 0)"; 
    } else {
        isShuffled = false;
        shuffle.style.color = "white";
    }
}
function initializePlayer(number) {
    if(number === undefined) {
        number = 0
    }
    loadMusic(number)
}

function loadMusic(number) {
    const currentArray = isShuffled ? sortedPlaylist : playlist;
    
    songName.innerText = currentArray[number].songName;
    artistName.innerText = currentArray[number].artistName;
    song.src = currentArray[number].song;
    cover.src = currentArray[number].cover;
    likeButtonRender(number)
}

initializePlayer()

let isRepeated = false

async function repeatSong() {
    if(isRepeated === false) {
        isRepeated = true
        repeat.style.color = "rgb(0, 255, 0)"
    }else if (isRepeated === true){
        isRepeated = false
        repeat.style.color = "white"
    }
}

let isPlaying = false

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill')
    play.querySelector('.bi').classList.add('bi-pause-circle-fill')
    song.play()
    isPlaying = true
}

function pauseSong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
    play.querySelector('.bi').classList.add('bi-play-circle-fill')
    song.pause()
    isPlaying = false
}

function endedSong() {
    if(isRepeated) {
        song.currentTime = 0
        song.play()
        return
    }
    nextSong()
}

function nextSong() {
    const currentArray = isShuffled ? sortedPlaylist : playlist;
    
    if (musicNumber >= currentArray.length - 1) {
        musicNumber = 0;
    } else {
        musicNumber++;
    }
    
    loadMusic(musicNumber);
    playSong();
}

function previousSong() {
    const currentArray = isShuffled ? sortedPlaylist : playlist;

    if (musicNumber <= 0) {
        musicNumber = currentArray.length - 1;
    } else {
        musicNumber--;
    }
    
    loadMusic(musicNumber);
    playSong();
}

function playPauseDecider() {
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
}

function jumpTo(event) {
    const width = progressContainer.clientWidth
    const clickPosition = event.offsetX
    const percentage = (clickPosition / width) * 100
    song.currentTime = (percentage / 100) * song.duration
}

function updateProgress() {
    const percentage = (song.currentTime / song.duration) * 100
    document.getElementById("current-progress").style.setProperty("--progress", `${percentage}%`)
}

function likeButtonRender(index) {
    const currentArray = isShuffled ? sortedPlaylist : playlist;    
    
    if (currentArray[index].liked === true) {
        likeButton.querySelector('.bi').className = 'bi bi-heart-fill';
        likeButton.style.color = "rgb(0, 255, 0)"; 
    } else {
        likeButton.querySelector('.bi').className = 'bi bi-heart';
        likeButton.style.color = "white";
    }
}

function likeButtonClicked() {
    const currentArray = isShuffled ? sortedPlaylist : playlist;

    currentArray[musicNumber].liked = !currentArray[musicNumber].liked;
    
    likeButtonRender(musicNumber);

    localStorage.setItem('playlist', JSON.stringify(playlist));
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function timerUpdate() {
    const currentTime = document.getElementById("current-time");
    const duration = document.getElementById("duration");
    
    currentTime.innerText = formatTime(song.currentTime);
    
    if (song.duration) {
        duration.innerText = formatTime(song.duration);
    }
}

song.addEventListener("loadedmetadata", timerUpdate);
song.addEventListener("ended", endedSong)
song.addEventListener("timeupdate", () => {
    updateProgress();
    timerUpdate();
});

play.addEventListener("click", playPauseDecider)

previous.addEventListener("click", previousSong)

next.addEventListener("click", nextSong)

progressContainer.addEventListener("click", jumpTo)

shuffle.addEventListener("click", shuffleSong)

repeat.addEventListener("click", repeatSong)

likeButton.addEventListener("click", likeButtonClicked);

