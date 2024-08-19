let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let forwardBtn = document.querySelector('.fa-forward');
let backwardBtn = document.querySelector('.fa-backward');
let songItems = Array.from(document.getElementsByClassName('timestamp'));
let currentSongName = document.getElementById('currentSongName');  // New element to show song name

let songs = [
    {songName: "SHAPE OF YOU", filePath: "song1.mp3", coverPath: "cover1.jpg"},
    {songName: "DESPACITO", filePath: "song2.mp3", coverPath: "cover2.jpg"},
    {songName: "AKHIYAN GULAB", filePath: "song3.mp3", coverPath: "cover3.jpg"},
    {songName: "GANGNAM STYLE", filePath: "song6.m4a", coverPath: "cover4.jpg"},
    {songName: "C'EST LA VIE", filePath: "song5.mp3", coverPath: "cover5.jpg"},
    {songName: "SOORAJ DOOBA HAI", filePath: "song4.m4a", coverPath: "cover6.jpg"}
];

// THIS WILL UPDATE ALL SONG ICONS
const updateSongItemsIcons = () => {
    songItems.forEach((item, index) => {
        const icon = item.querySelector('i');
        if (index === songIndex && !audioElement.paused) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
};

// ThIS WILL PLAY A SONG
const playSong = (index) => {
    if (index < 0 || index >= songs.length) return; 
    audioElement.src = songs[index].filePath;
    audioElement.play();
    songIndex = index;
    
    // Update the bottom bar with the current song name
    currentSongName.textContent = songs[index].songName;
    
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    updateSongItemsIcons();
};

// THIS WILL CHANGE THE ICON OF THE BOTTOM BAR
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
    updateSongItemsIcons();
});

// TO UPDATE THE SONG LINE
audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Click event for song items
songItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (songIndex !== index) {
            playSong(index);
        } else if (audioElement.paused) {
            audioElement.play();
            item.querySelector('i').classList.remove('fa-play');
            item.querySelector('i').classList.add('fa-pause');
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            item.querySelector('i').classList.remove('fa-pause');
            item.querySelector('i').classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        }
    });
});

// PLAY NEXT SONG
forwardBtn.addEventListener('click', () => {
    const nextIndex = (songIndex + 1) % songs.length;
    playSong(nextIndex);
});

// PLAY PREVIOUS SONG
backwardBtn.addEventListener('click', () => {
    const prevIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
});
