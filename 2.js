console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let currentPlaying = null;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    {songName: "vellake",filepath: "1.mp3", coverpath: "cover1.jpg"},
    {songName: "Hrudayake Hedarike",filepath: "2.mp3", coverpath: "cover2.jpg"},
    {songName: "Nee Nanna Olavu",filepath: "3.mp3", coverpath: "cover3.jpg"},
    {songName: "Taxivala",filepath: "4.mp3", coverpath: "cover4.jpg"},
    {songName: "Udiporade Gunde Neede ",filepath: "5.mp3", coverpath: "cover5.jpg"},
    {songName: "Nenne Tanaka",filepath: "6.mp3", coverpath: "cover6.jpg"},
    {songName: "Vella",filepath: "1.mp3", coverpath: "cover1.jpg"},
    {songName: "Vellak",filepath: "2.mp3", coverpath: "cover2.jpg"}
]
songItems.forEach((element, i)=>{
    
element.getElementsByTagName("img")[0].src = songs[i].coverpath;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();

// Handle play/pause click
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        
    });
}
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
        currentPlaying = audioElement;  
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle'); 
        gif.style.opacity = 0;
        makeAllPlays(false);
        currentPlaying = null; 
        
    }
    songItemPlays.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.remove('fa-play-circle');
        if (currentPlaying) {
            element.classList.add('fa-pause-circle');
        } else {
            element.classList.add('fa-play-circle');
        }
    });
});

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{

//Update Seekbar
progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);

myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

    
  
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index)=>{
    element.addEventListener('click', (e)=>{
console.log(e.target);
if (currentPlaying && currentPlaying !== audioElement) {
    currentPlaying.pause();  // Pause the previously playing element
    makeAllPlays(false);  // Update play icons
}

makeAllPlays();
songIndex = parseInt(e.target.id);
e.target.classList.remove('fa-play-circle');
e.target.classList.add('fa-pause-circle');
masterSongName.innerText = songs[songIndex].songName;
if (!audioElement.paused) {
    audioElement.pause();
}

audioElement.src = songs[songIndex].filepath;
audioElement.currentTime = 0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle'); 
currentPlaying = audioElement;
songItemPlays.forEach((element, i) => {
    element.classList.remove('fa-pause-circle');
    element.classList.remove('fa-play-circle');
    if (i === songIndex && currentPlaying) {
        element.classList.add('fa-pause-circle');
    } else {
        element.classList.add('fa-play-circle');
    }
});
})
});


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex = 0;
    }
    else{
    songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle'); 
});
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
    songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle'); 
});