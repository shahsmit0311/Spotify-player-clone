
//inistalizing variables
let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songListPlay = Array.from(document.getElementsByClassName("songListPlay"));

let songs=[
    {songName:"Pehle Bhi Main", filePath:"./songs/1.mp3", coverPath:"covers/1.jpg", timeDuration:"4:08 "},
    {songName:"Satranga", filePath:"./songs/2.mp3", coverPath:"covers/2.jpg", timeDuration:"4:32 "},
    {songName:"Ilahi", filePath:"./songs/3.mp3", coverPath:"covers/3.jpg", timeDuration:"3:23 "},
    {songName:"Khairiyat", filePath:"./songs/4.mp3", coverPath:"covers/4.jpg", timeDuration:"3:58 "},
    {songName:"Kabira", filePath:"./songs/5.mp3", coverPath:"covers/5.jpg", timeDuration:"4:11 "},
    {songName:"Hawa Banke", filePath:"./songs/6.mp3", coverPath:"covers/6.jpg", timeDuration:"2:52 "},
    {songName:"Na Ja", filePath:"./songs/7.mp3", coverPath:"covers/7.jpg", timeDuration:"4:10 "},
]

songItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].timeDuration;
})


//Play/Pause
masterPlay.addEventListener("click",()=>{

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play"); 
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause"); 
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity=0;
    }
})

//listen to events
audioElement.addEventListener("timeupdate",()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        songIndex=parseInt(e.target.id);
        var source=audioElement.src;
        source=source.slice(source.length-5,source.length-4);
        console.log(source);
        console.log(songIndex);
        if(audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.currentTime=0;
            audioElement.src="songs/"+(songIndex+1)+".mp3";
            masterSongName.innerHTML=songs[songIndex].songName;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove("fa-circle-play"); 
            masterPlay.classList.add("fa-circle-pause");
        }
        else if((songIndex+1)==source && audioElement.played){
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            audioElement.pause();
            gif.style.opacity=0;
            masterPlay.classList.remove("fa-circle-pause"); 
            masterPlay.classList.add("fa-circle-play");
        }
        else if(audioElement.played){
            makeAllPlays();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.currentTime=0;
            audioElement.src="songs/"+(songIndex+1)+".mp3";
            masterSongName.innerHTML=songs[songIndex].songName;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove("fa-circle-play"); 
            masterPlay.classList.add("fa-circle-pause");
        }
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex++;
    }
    audioElement.currentTime=0;
    audioElement.src="songs/"+(songIndex+1)+".mp3";
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-circle-play"); 
    masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=6;
    }
    else{
        songIndex--;
    }
    audioElement.currentTime=0;
    audioElement.src="songs/"+(songIndex+1)+".mp3";
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-circle-play"); 
    masterPlay.classList.add("fa-circle-pause");
})
