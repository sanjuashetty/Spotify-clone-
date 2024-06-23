console.log("Welcome to Spotify");

let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Vellake", filepath: "1.mp3", coverpath: "cover1.jpg"},
    {songName: "Hrudayake Hedarike", filepath: "2.mp3", coverpath: "cover2.jpg"},
    {songName: "Nee Nanna Olavu",filepath: "3.mp3", coverpath: "cover3.jpg"},
    {songName: "Taxivala",filepath: "4.mp3", coverpath: "cover4.jpg"},
    {songName: "Udiporade Gunde Neede ",filepath: "5.mp3", coverpath: "cover5.jpg"},
    {songName: "Nenne Tanaka",filepath: "6.mp3", coverpath: "cover6.jpg"},
    {songName: "Vella",filepath: "1.mp3", coverpath: "cover1.jpg"},
    {songName: "Vellak",filepath: "2.mp3", coverpath: "cover2.jpg"}
    // Add more songs as needed...
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

let currentSongIndex = null;

const playSong = (index) => {
    if (currentSongIndex !== null) {
        songItems[currentSongIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-pause-circle');
        songItems[currentSongIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-play-circle');
    }

    currentSongIndex = index;
    audioElement.src = songs[index].filepath;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[index].songName;

    songItems[index].getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
    songItems[index].getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
};

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        if (currentSongIndex === null) {
            playSong(0);
        } else {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            songItems[currentSongIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
            songItems[currentSongIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songItems[currentSongIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-pause-circle');
        songItems[currentSongIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-play-circle');
    }
});

audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

document.getElementById('next').addEventListener('click', () => {
    if (currentSongIndex !== null) {
        let nextIndex = (currentSongIndex + 1) % songs.length;
        playSong(nextIndex);
    }
});

document.getElementById('previous').addEventListener('click', () => {
    if (currentSongIndex !== null) {
        let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(prevIndex);
    }
});

songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        playSong(index);
    });
});
