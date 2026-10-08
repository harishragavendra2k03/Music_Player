const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlistElement = document.getElementById("playlist");


// ===============================
// SONG DATA
// ===============================

const songs = [
    {
        title: "See You Again",
        artist: "Wiz Khalifa",
        src: "audio/Wiz Khalifa - See You Again ft. Charlie Puth (Lyrics).mp3",
        image: "./image/see you again.webp"
    },

    {
        title: "Skyfall",
        artist: "Adele",
        src: "audio/Adele - Skyfall.mp3",
        image: "./image/skyfall.webp"
    },

    {
        title: "Without Me",
        artist: "Eminem",
        src: "audio/Without Me.mp3",
        image: "./image/without me.webp"
    },
    {
        title: "Young and Beautiful",
        artist: "Land Del Rey",
        src : "audio/Lana Del Rey - Young and Beautiful.mp3",
        image: "./image/young and beautiful.webp"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        src:"audio/Shape of You - Ed Sheeran.mp3",
        image: "./image/shape of you.webp"
    }
];


// Current song index

let currentSong = 0;


// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.src;

    albumImage.src = song.image;

    progress.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";

    updatePlaylist();
}


// ===============================
// PLAY SONG
// ===============================

function playSong() {

    audio.play();

    playButton.textContent = "⏸";

}


// ===============================
// PAUSE SONG
// ===============================

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


// ===============================
// PLAY / PAUSE
// ===============================

playButton.addEventListener("click", function () {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ===============================
// NEXT SONG
// ===============================

nextButton.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ===============================
// PREVIOUS SONG
// ===============================

prevButton.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ===============================
// UPDATE PROGRESS
// ===============================

audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// ===============================
// CHANGE PROGRESS
// ===============================

progress.addEventListener("input", function () {

    const newTime =
        (progress.value / 100) * audio.duration;

    audio.currentTime = newTime;

});


// ===============================
// GET DURATION
// ===============================

audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);

});


// ===============================
// FORMAT TIME
// ===============================

function formatTime(time) {

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

}


// ===============================
// VOLUME
// ===============================

volume.addEventListener("input", function () {

    audio.volume = volume.value;

});


// ===============================
// AUTOPLAY NEXT SONG
// ===============================

audio.addEventListener("ended", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ===============================
// CREATE PLAYLIST
// ===============================

function createPlaylist() {

    playlistElement.innerHTML = "";

    songs.forEach(function (song, index) {

        const li = document.createElement("li");

        li.textContent =
            `${song.title} - ${song.artist}`;

        li.addEventListener("click", function () {

            currentSong = index;

            loadSong(currentSong);

            playSong();

        });

        playlistElement.appendChild(li);

    });

}


// ===============================
// UPDATE PLAYLIST
// ===============================

function updatePlaylist() {

    const items =
        playlistElement.querySelectorAll("li");

    items.forEach(function (item, index) {

        if (index === currentSong) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


// ===============================
// INITIALIZE
// ===============================

createPlaylist();

loadSong(currentSong);