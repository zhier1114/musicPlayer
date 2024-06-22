// -------------------- 建立音樂播放器 ------------------------
const music = new Audio();

let songInfo = [];
let newShuffleSongInfo = [];
let musicCurrentTime = 0;
let songNumber = 0;
let arrayType = "normal";

// ---------------------- 設置播放函數 --------------------------
function playMusic(id) {
  id = parseInt(id, 10);
  let song, playArray;
  if (arrayType === "shuffle") {
    playArray = newShuffleSongInfo;
  } else if (arrayType === "normal") {
    playArray = songInfo;
  } else {
    console.error("Invalid array type provided");
    return;
  }

  song = playArray.find((song) => song.id === id);

  if (song) {
    music.pause();
    music.src = `${playArray[id].songSrc}`;
    music.currentTime = musicCurrentTime;
    music.play();
  } else {
    console.error("Song not found");
  }
}

// -------------------------- 設置songInfo洗亂函數 --------------------------

const songInfoShuffle = () => {
  for (let i = 0; i < songInfo.length; i++) {
    let j = Math.floor(Math.random() * songInfo.length);
    let temp = songInfo[i];
    songInfo[i] = songInfo[j];
    songInfo[j] = temp;
  }
  return songInfo;
};
// -------------------------- 建立播放列表函數 --------------------------
const createNewPlayList = function () {
  let nextPlayContainers = document.querySelectorAll(".nextPlayContainer");
  nextPlayContainers.forEach((container, songNumbers) => {
    if (songNumbers < songInfo.length) {
      let buttonHtml = `
      <button class="nextPlay" data-song-id ="${songNumbers}">
      <img class="nextPlayImg" src="${songInfo[songNumbers].poster}">
      <span class="nextPlaySong">${songInfo[songNumbers].songName}</span>
      <span class="nextPlayArtist">${songInfo[songNumbers].songArtist}</span>
      <i class="bi bi-play-circle"></i>
      </button>
      `;
      container.innerHTML = buttonHtml;

      const button = container.querySelector(".nextPlay");
      button.addEventListener("click", () => {
        const songId = parseInt(button.getAttribute("data-song-id"));
        const song = songInfo[songId];
        musicCurrentTime = 0;
        setInterval(() => {
          updateCurrentBar();
        }, 100);
        arrayType = "normal";
        songNumber = songId;
        playMusic(songId);
        console.log(
          `songId: ${songId} Playing ${song.songName} by ${song.songArtist}`
        );
        playButton.classList.remove("bi-play-circle-fill");
        playButton.classList.add("bi-pause-circle-fill");
        nowPlayingImgJS.src = songInfo[songId].poster;
        playSongImg.src = songInfo[songId].poster;
        playSongName.innerHTML = songInfo[songId].songName;
        playSongArtist.innerHTML = songInfo[songId].songArtist;
      });
    }
  });
};

// -------------------------- 建立隨機主頁清單列表函數 --------------------------
const createMainItem = function () {
  let mainItemContainers = document.querySelectorAll(".main-card");
  mainItemContainers.forEach((container, songIndex) => {
    if (songIndex < songInfo.length) {
      let buttonHtml = `
      <button class="mainItemPlay" data-song-id = "${songIndex}">
      <img src="${songInfo[songIndex].poster}" >
      <i class="bi bi-play-circle"></i>
      <div>
          <span id="mainItemSongName">${songInfo[songIndex].songName}</span>
          <span id="mainItemSongArtist">${songInfo[songIndex].songArtist}</span>
      </div>
      </button>
      `;
      container.innerHTML = buttonHtml;

      const button = container.querySelector(".mainItemPlay");
      button.addEventListener("click", () => {
        const songId = parseInt(button.getAttribute("data-song-id"));
        musicCurrentTime = 0;
        setInterval(() => {
          updateCurrentBar();
        }, 100);
        songNumber = songId;
        arrayType = "normal";
        playMusic(songId);
        playButton.classList.remove("bi-play-circle-fill");
        playButton.classList.add("bi-pause-circle-fill");
        nowPlayingImgJS.src = songInfo[songId].poster;
        playSongImg.src = songInfo[songId].poster;
        playSongName.innerHTML = songInfo[songId].songName;
        playSongArtist.innerHTML = songInfo[songId].songArtist;
        const firstPlayingSong = document.getElementById("nextPlayContainer1");
        firstPlayingSong.innerHTML = `
        <button class="nextPlay" data-song-id ="${[songId]}">
        <img class="nextPlayImg" src="${songInfo[songId].poster}">
        <span class="nextPlaySong">${songInfo[songId].songName}</span>
        <span class="nextPlayArtist">${songInfo[songId].songArtist}</span>
        <i class="bi bi-play-circle"></i>
        </button>
        `;
        firstPlayingSong.addEventListener("click", () => {
          const songId = parseInt(button.getAttribute("data-song-id"));
          const song = songInfo[songId];
          musicCurrentTime = 0;
          setInterval(() => {
            updateCurrentBar();
          }, 100);
          arrayType = "normal";
          songNumber = songId;
          playMusic(songId);
          playButton.classList.remove("bi-play-circle-fill");
          playButton.classList.add("bi-pause-circle-fill");
          nowPlayingImgJS.src = songInfo[songId].poster;
          playSongImg.src = songInfo[songId].poster;
          playSongName.innerHTML = songInfo[songId].songName;
          playSongArtist.innerHTML = songInfo[songId].songArtist;
          console.log(`Playing ${song.songName} by ${song.songArtist}`);
        });
      });
    }
  });
};

// -------------------------- 建立探索頁面歌曲列表函數 --------------------------
const createDiscoverItem = function () {
  let discoverItemContainers = document.querySelectorAll(".discover-card");
  discoverItemContainers.forEach((container, songIndex) => {
    if (songIndex < songInfo.length) {
      let buttonHtml = `
      <button class="discoverItemPlay" data-song-id = "${songIndex}">
      <img src="${songInfo[songIndex].poster}" >
      <i class="bi bi-play-circle"></i>
      <div>
          <span id="discoverItemSongName">${songInfo[songIndex].songName}</span>
          <span id="discoverItemSongArtist">${songInfo[songIndex].songArtist}</span>
      </div>
      </button>
      `;

      container.innerHTML = buttonHtml;

      const button = container.querySelector(".discoverItemPlay");
      button.addEventListener("click", () => {
        const songId = parseInt(button.getAttribute("data-song-id"));
        musicCurrentTime = 0;
        setInterval(() => {
          updateCurrentBar();
        }, 100);
        arrayType = "normal";
        songNumber = songId;
        playMusic(songId);
        playButton.classList.remove("bi-play-circle-fill");
        playButton.classList.add("bi-pause-circle-fill");
        nowPlayingImgJS.src = songInfo[songId].poster;
        playSongImg.src = songInfo[songId].poster;
        playSongName.innerHTML = songInfo[songId].songName;
        playSongArtist.innerHTML = songInfo[songId].songArtist;
        const firstPlayingSong = document.getElementById("nextPlayContainer1");
        firstPlayingSong.innerHTML = `
        <button class="nextPlay" data-song-id ="${[songId]}">
        <img class="nextPlayImg" src="${songInfo[songId].poster}">
        <span class="nextPlaySong">${songInfo[songId].songName}</span>
        <span class="nextPlayArtist">${songInfo[songId].songArtist}</span>
        <i class="bi bi-play-circle"></i>
        </button>
        `;
        firstPlayingSong.addEventListener("click", () => {
          const songId = parseInt(button.getAttribute("data-song-id"));
          const song = songInfo[songId];
          musicCurrentTime = 0;
          setInterval(() => {
            updateCurrentBar();
          }, 100);
          arrayType = "normal";
          songNumber = songId;
          playMusic(songId);
          playButton.classList.remove("bi-play-circle-fill");
          playButton.classList.add("bi-pause-circle-fill");
          nowPlayingImgJS.src = songInfo[songId].poster;
          playSongImg.src = songInfo[songId].poster;
          playSongName.innerHTML = songInfo[songId].songName;
          playSongArtist.innerHTML = songInfo[songId].songArtist;
          console.log(`Playing ${song.songName} by ${song.songArtist}`);
        });
      });
    }
  });
};

// -------------------------- 建立探索頁面藝人列表函數 --------------------------
const createDiscoverArtistItem = function () {
  const artistCount = songInfo.map((song) => song.songArtist);
  const uniqueArtist = artistCount.filter((artist, index) => {
    return artistCount.indexOf(artist) === index;
  });
  const artistData = uniqueArtist.map((artist) => {
    const artistImg = songInfo.find(
      (song) => song.songArtist === artist
    ).songArtistImg;
    return {
      artist: artist,
      artistImgSrc: artistImg,
    };
  });
  let discoverItemCard = document.querySelector("#cardSection7");
  discoverItemCard.innerHTML = "";
  for (let i = 0; i < artistData.length; i++) {
    discoverItemCard.innerHTML += `
    <div class="discover-artist-card card-body">
    <button class="discoverItemArtist" data-discover-artist="${artistData[i].artist}">
        <img src="${artistData[i].artistImgSrc}">
        <div>
            <span id="discoverItemArtist">${artistData[i].artist}</span>
        </div>
    </button>
</div>
    `;
  }

  const discoverArtistButton = document.querySelectorAll(".discoverItemArtist");
  discoverArtistButton.forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("playListInfoContainer").style.display = "none";
      document.getElementById("mainItem").style.display = "none";
      document.getElementById("discoverItem").style.display = "none";
      document.getElementById("songStyleContainer").style.display = "none";
      document.getElementById("artistInfoContainer").style.display = "flex";
      document
        .getElementById("nowPlayingList")
        .classList.remove("nowPlayingListVisible");
      document
        .getElementById("nowPlayingList")
        .classList.add("nowPlayingListHidden");
      let artist = button.getAttribute("data-discover-artist");
      let songInfoSpec = songInfo
        .map((song, index) => (song.songArtist === artist ? index : -1))
        .filter((index) => index !== -1);
      let artistInfo = document.getElementById("artistInfo");
      if (!artistInfo) {
        artistInfo = document.createElement("div");
        artistInfo.id = "artistInfo";
        document.getElementById("artistInfoContainer").appendChild(artistInfo);
      }
      artistInfo.innerHTML = `
        <h2 id="artistName"><button id="goBack"><i class="bi bi-arrow-left-short"></i></button>&nbsp;${artist}</h2>
        <div id="artistCard">
          ${songInfoSpec
            .map(
              (index) => `
              <div class="artistCard card-body" data-index="${index}">
                <img src="${songInfo[index].poster}" alt="${songInfo[index].songName}">
                <i class="bi bi-play-circle"></i>
                <a class="stretched-link" href="#">
                  <div class="artistSongName">${songInfo[index].songName}</div>
                  <div class="artistName2">${songInfo[index].songArtist}</div>
                </a>
              </div>
            `
            )
            .join("")}
            </div>
            `;

      document.getElementById("goBack").addEventListener("click", () => {
        document.getElementById("discoverItem").style.display = "block";
        document.getElementById("artistInfoContainer").style.display = "none";
      });

      Array.from(document.getElementsByClassName("artistCard")).forEach(
        (element) => {
          element.addEventListener("click", () => {
            const songId = element.getAttribute("data-index");
            musicCurrentTime = 0;
            setInterval(() => {
              updateCurrentBar();
            }, 100);
            arrayType = "normal";
            songNumber = songId;
            playMusic(songId);
            const playingImg = songInfo[songId].poster;
            document.querySelector("#nowPlayingImg > img").src = playingImg;
            document.querySelector("#playSongImg").src = playingImg;
            const playingSongTitle = songInfo[songId].songName;
            document.querySelector("#playSongName").innerHTML =
              playingSongTitle;
            const playingArtist = songInfo[songId].songArtist;
            document.querySelector("#playSongArtist").innerHTML = playingArtist;
            playButton.classList.remove("bi-play-circle-fill");
            playButton.classList.add("bi-pause-circle-fill");

            const firstPlayingSong =
              document.getElementById("nextPlayContainer1");
            firstPlayingSong.innerHTML = `
                    <button class="nextPlay" data-song-id ="${[songId]}">
                    <img class="nextPlayImg" src="${songInfo[songId].poster}">
                    <span class="nextPlaySong">${
                      songInfo[songId].songName
                    }</span>
                    <span class="nextPlayArtist">${
                      songInfo[songId].songArtist
                    }</span>
                    <i class="bi bi-play-circle"></i>
                    </button>
                    `;
          });
        }
      );
    });
  });
};

// ---------------------- 載入外部音樂資訊 --------------------------
fetch("./song_info.json")
  .then((response) => response.json())
  .then((data) => {
    songInfo = data;

    // -------------------- 載入網頁資訊 ------------------------

    Array.from(document.getElementsByClassName("nextPlay")).forEach(
      (element, i) => {
        element.getElementsByClassName("nextPlayImg")[0].src =
          songInfo[i].poster;
        element.getElementsByClassName("nextPlaySong")[0].innerHTML =
          songInfo[i].songName;
        element.getElementsByClassName("nextPlayArtist")[0].innerHTML =
          songInfo[i].songArtist;
      }
    );
    const playingImg = songInfo[0].poster;
    document.querySelector("#nowPlayingImg > img").src = playingImg;
    document.querySelector("#playSongImg").src = playingImg;
    const playingSongTitle = songInfo[0].songName;
    document.querySelector("#playSongName").innerHTML = playingSongTitle;
    const playingArtist = songInfo[0].songArtist;
    document.querySelector("#playSongArtist").innerHTML = playingArtist;

    songInfoShuffle();
    createNewPlayList();
    createMainItem();
    createDiscoverItem();
    createDiscoverArtistItem();
    createSideArtistItem();
    nowPlayingImgJS.src = songInfo[0].poster;
    playSongImg.src = songInfo[0].poster;
    playSongName.innerHTML = songInfo[0].songName;
    playSongArtist.innerHTML = songInfo[0].songArtist;

    // -------------------- side隨機加入資訊 ------------------------
    const sidePlayListImgRandom = document.querySelectorAll(".sidePlayListImg");

    sidePlayListImgRandom.forEach((imgElement) => {
      const i = Math.floor(Math.random() * songInfo.length);
      const randomPoster = songInfo[i].poster;
      imgElement.src = randomPoster;
    });
  });

// -------------------- MusicBar播放按鈕 ------------------------

playButton.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    console.log(arrayType);
    console.log(songNumber);
    music.currentTime = musicCurrentTime;
    playMusic(songNumber);
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
    setInterval(() => {
      updateCurrentBar();
    }, 100);
  } else {
    music.pause(songNumber);
    console.log(songNumber);
    musicCurrentTime = music.currentTime;
    playButton.classList.remove("bi-pause-circle-fill");
    playButton.classList.add("bi-play-circle-fill");
  }
});

// -------------------- MusicBar進度條時間顯示 ------------------------
music.addEventListener("timeupdate", () => {
  let minutes = Math.floor(music.currentTime / 60);
  let seconds = Math.floor(music.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  currentStart.innerHTML = `${minutes}:${seconds}`;

  let minutes2 = Math.floor(music.duration / 60);
  let seconds2 = Math.floor(music.duration % 60);
  if (seconds2 < 10) {
    seconds2 = "0" + seconds2;
  }
  currentEnd.innerHTML = `${minutes2}:${seconds2}`;
});

// -------------------- MusicBar下一首／上一首 ------------------------
skipBackward.addEventListener("click", () => {
  songNumber -= 1;
  currentBar.value = 0;
  musicCurrentTime = 0;
  setInterval(() => {
    updateCurrentBar();
  }, 100);
  playMusic(songNumber, arrayType);
  if (arrayType === "normal") {
    const playingImg = songInfo[songNumber].poster;
    document.querySelector("#nowPlayingImg > img").src = playingImg;
    document.querySelector("#playSongImg").src = playingImg;
    const playingSongTitle = songInfo[songNumber].songName;
    document.querySelector("#playSongName").innerHTML = playingSongTitle;
    const playingArtist = songInfo[songNumber].songArtist;
    document.querySelector("#playSongArtist").innerHTML = playingArtist;
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
  } else {
    const playingImg = newShuffleSongInfo[songNumber].poster;
    document.querySelector("#nowPlayingImg > img").src = playingImg;
    document.querySelector("#playSongImg").src = playingImg;
    const playingSongTitle = newShuffleSongInfo[songNumber].songName;
    document.querySelector("#playSongName").innerHTML = playingSongTitle;
    const playingArtist = newShuffleSongInfo[songNumber].songArtist;
    document.querySelector("#playSongArtist").innerHTML = playingArtist;
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
  }
});
skipForward.addEventListener("click", () => {
  songNumber += 1;
  musicCurrentTime = 0;
  currentBar.value = 0;
  setInterval(() => {
    updateCurrentBar();
  }, 100);
  playMusic(songNumber, arrayType);
  if (arrayType === "normal") {
    const playingImg = songInfo[songNumber].poster;
    document.querySelector("#nowPlayingImg > img").src = playingImg;
    document.querySelector("#playSongImg").src = playingImg;
    const playingSongTitle = songInfo[songNumber].songName;
    document.querySelector("#playSongName").innerHTML = playingSongTitle;
    const playingArtist = songInfo[songNumber].songArtist;
    document.querySelector("#playSongArtist").innerHTML = playingArtist;
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
  } else {
    const playingImg = newShuffleSongInfo[songNumber].poster;
    document.querySelector("#nowPlayingImg > img").src = playingImg;
    document.querySelector("#playSongImg").src = playingImg;
    const playingSongTitle = newShuffleSongInfo[songNumber].songName;
    document.querySelector("#playSongName").innerHTML = playingSongTitle;
    const playingArtist = newShuffleSongInfo[songNumber].songArtist;
    document.querySelector("#playSongArtist").innerHTML = playingArtist;
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
  }
});

// -------------------- MusicBar循環播放按鈕 ------------------------
let songRepeat = false;
document.getElementById("repeatButton").addEventListener("click", () => {
  songRepeat = !songRepeat;
  music.loop = songRepeat;

  if (songRepeat) {
    repeatButton.classList.remove("bi-repeat");
    repeatButton.classList.add("bi-repeat-1");
    music.removeEventListener("ended", nextSong);
  } else {
    repeatButton.classList.remove("bi-repeat-1");
    repeatButton.classList.add("bi-repeat");
    music.addEventListener("ended", nextSong);
  }
});

// -------------------- 自動接續下一首音樂 ------------------------
const nextSong = () => {
  musicCurrentTime = 0;
  setInterval(() => {
    updateCurrentBar();
  }, 100);
  songNumber++;
  playMusic(songNumber, arrayType);
  if (arrayType === "normal") {
    const playingImg = songInfo[songNumber].poster;
    document.querySelector("#nowPlayingImg > img").src = playingImg;
    document.querySelector("#playSongImg").src = playingImg;
    const playingSongTitle = songInfo[songNumber].songName;
    document.querySelector("#playSongName").innerHTML = playingSongTitle;
    const playingArtist = songInfo[songNumber].songArtist;
    document.querySelector("#playSongArtist").innerHTML = playingArtist;
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
  } else {
    const playingImg = newShuffleSongInfo[songNumber].poster;
    document.querySelector("#nowPlayingImg > img").src = playingImg;
    document.querySelector("#playSongImg").src = playingImg;
    const playingSongTitle = newShuffleSongInfo[songNumber].songName;
    document.querySelector("#playSongName").innerHTML = playingSongTitle;
    const playingArtist = newShuffleSongInfo[songNumber].songArtist;
    document.querySelector("#playSongArtist").innerHTML = playingArtist;
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
  }
};

music.addEventListener("ended", nextSong);

// -------------------- MusicBar隨機播放按鈕 ------------------------

const shuffleArray = (array) => {
  let newArray = [...array]; // 使用展開語法複製陣列
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 洗牌
  }
  return newArray;
};

const shufflePlayList = (index) => {
  let nextPlayContainers = document.querySelectorAll(".nextPlayContainer");
  nextPlayContainers.forEach((container, songNumbers) => {
    if (songNumbers < index.length) {
      let buttonHtml = `
      <button class="nextPlay" data-song-id ="${songNumbers}">
      <img class="nextPlayImg" src="${index[songNumbers].poster}">
      <span class="nextPlaySong">${index[songNumbers].songName}</span>
      <span class="nextPlayArtist">${index[songNumbers].songArtist}</span>
      <i class="bi bi-play-circle"></i>
      </button>
      `;
      console.log(arrayType);
      container.innerHTML = buttonHtml;
      const button = container.querySelectorAll(".nextPlay");
      button.forEach((button) => {
        button.addEventListener("click", () => {
          const songId = parseInt(button.getAttribute("data-song-id"));
          const song = index[songId];
          musicCurrentTime = 0;
          setInterval(() => {
            updateCurrentBar();
          }, 100);
          arrayType = "shuffle";
          songNumber = songId;
          playMusic(songId);
          console.log(`Playing ${song.songName} by ${song.songArtist}`);
          playButton.classList.remove("bi-play-circle-fill");
          playButton.classList.add("bi-pause-circle-fill");
          nowPlayingImgJS.src = index[songId].poster;
          playSongImg.src = index[songId].poster;
          playSongName.innerHTML = index[songId].songName;
          playSongArtist.innerHTML = index[songId].songArtist;
        });
      });
    }
  });
};
document.getElementById("shuffleButton").addEventListener("click", () => {
  newShuffleSongInfo = shuffleArray(songInfo);
  arrayType = "shuffle";
  shufflePlayList(newShuffleSongInfo);
  return newShuffleSongInfo;
});

// -------------------- 音樂播放進度條樣式 ------------------------

function updateBackground(value) {
  currentBar.style.background = `linear-gradient(to right, #9569ca ${value}%, #d3d3d3 ${value}%)`;
}
function updateCurrentBar() {
  let currentBarValue = parseFloat(music.currentTime / music.duration) * 100;
  currentBar.value = currentBarValue;
  updateBackground(currentBarValue);
}

// -------------------- 音樂播放進度條控制 ------------------------
const currentBar = document.getElementById("currentBar");
currentBar.value = 0;
updateBackground(currentBar.value); // 初始化背景
currentBar.addEventListener("input", () => {
  music.currentTime = (currentBar.value * music.duration) / 100;
  updateBackground(currentBar.value);
  musicCurrentTime = music.currentTime;
});

// -------------------- 音量控制條樣式／控制 ------------------------
const currentVol = document.getElementById("currentVol");

function updateCurrentVolBackground() {
  const value = ((currentVol.value - currentVol.min) / currentVol.max) * 100;
  currentVol.style.background = `linear-gradient(to right, #9569ca ${value}%, #d3d3d3 ${value}%)`;
}

currentVol.addEventListener("input", updateCurrentVolBackground);
updateCurrentVolBackground(); // 初始化背景

music.volume = currentVol.value / 100;
document.addEventListener("DOMContentLoaded", () => {
  volumeButton.classList.add("bi-volume-down");
});
currentVol.addEventListener("input", () => {
  music.volume = currentVol.value / 100;
  if (currentVol.value <= 0) {
    volumeButton.classList.remove("bi-volume-down");
    volumeButton.classList.remove("bi-volume-up");
    volumeButton.classList.add("bi-volume-mute");
  }
  if (currentVol.value > 0) {
    volumeButton.classList.remove("bi-volume-mute");
    volumeButton.classList.remove("bi-volume-up");
    volumeButton.classList.add("bi-volume-down");
  }
  if (currentVol.value > 50) {
    volumeButton.classList.remove("bi-volume-mute");
    volumeButton.classList.remove("bi-volume-down");
    volumeButton.classList.add("bi-volume-up");
  }
});

let tmpVolume = null;
volumeButton.addEventListener("click", () => {
  if (currentVol.value > 0) {
    tmpVolume = music.volume;
    music.volume = 0;
    currentVol.value = 0;
    updateCurrentVolBackground(); // 初始化背景
    volumeButton.classList.remove("bi-volume-down");
    volumeButton.classList.remove("bi-volume-up");
    volumeButton.classList.add("bi-volume-mute");
  } else {
    music.volume = tmpVolume;
    currentVol.value = music.volume * 100;
    currentVol.addEventListener("input", updateCurrentVolBackground);
    updateCurrentVolBackground(); // 初始化背景
    if (music.volume > 0.5) {
      volumeButton.classList.remove("bi-volume-mute");
      volumeButton.classList.remove("bi-volume-down");
      volumeButton.classList.add("bi-volume-up");
    } else {
      volumeButton.classList.remove("bi-volume-mute");
      volumeButton.classList.remove("bi-volume-up");
      volumeButton.classList.add("bi-volume-down");
    }
  }
});

// -------------------- 播放列表縮放點擊 ------------------------
myLibraryButton.onclick = function () {
  nowPlayingList.classList.toggle("nowPlayingListHidden");
  nowPlayingList.classList.toggle("nowPlayingListVisible");
};

thumbMyLibraryButton.onclick = function () {
  nowPlayingList.classList.toggle("nowPlayingListHidden");
  nowPlayingList.classList.toggle("nowPlayingListVisible");
};

// -------------------- 首頁頁面按鈕點擊 ------------------------
homeButton.onclick = function () {
  mainItem.style = "display: block;";
  discoverItem.style = "display: none;";
  playListInfoContainer.style = "display: none;";
  artistInfoContainer.style = "display: none;";
  songStyleContainer.style = "display: none;";
  nowPlayingList.classList.remove("nowPlayingListVisible");
  nowPlayingList.classList.add("nowPlayingListHidden");
};

thumbHomeButton.onclick = function () {
  mainItem.style = "display: block;";
  discoverItem.style = "display: none;";
  playListInfoContainer.style = "display: none;";
  artistInfoContainer.style = "display: none;";
  songStyleContainer.style = "display: none;";
  nowPlayingList.classList.remove("nowPlayingListVisible");
  nowPlayingList.classList.add("nowPlayingListHidden");
};

// -------------------- 探索頁面按鈕點擊 ------------------------
discoverButton.onclick = function () {
  mainItem.style = "display: none;";
  discoverItem.style = "display: block;";
  playListInfoContainer.style = "display: none;";
  artistInfoContainer.style = "display: none;";
  songStyleContainer.style = "display: none;";
  nowPlayingList.classList.remove("nowPlayingListVisible");
  nowPlayingList.classList.add("nowPlayingListHidden");
};

thumbDiscoverButton.onclick = function () {
  mainItem.style = "display: none;";
  discoverItem.style = "display: block;";
  playListInfoContainer.style = "display: none;";
  artistInfoContainer.style = "display: none;";
  songStyleContainer.style = "display: none;";
  nowPlayingList.classList.remove("nowPlayingListVisible");
  nowPlayingList.classList.add("nowPlayingListHidden");
};

// ------------------------ side頁面切換按鈕 --------------------------

document.getElementById("openSidePlayList").addEventListener("click", () => {
  document.getElementById("sidePlayList").style = "display: block";
  document.getElementById("sideArtistList").style = "display: none";
});
document.getElementById("openSideArtistList").addEventListener("click", () => {
  document.getElementById("sidePlayList").style.display = "none";
  document.getElementById("sideArtistList").style.display = "block";
});

// --------------------- 新增播放清單 ----------------------------
document
  .getElementById("createPlayListButton")
  .addEventListener("click", () => {
    document.getElementById("createNewPlayListContainer").style.display =
      "flex";
    document.getElementById("createNewPlayListInputText1").value = "";
    document.getElementById("createNewPlayListInputText2").value = "我";
  });
document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("createNewPlayListContainer").style.display = "none";
});
document.getElementById("confirm").addEventListener("click", () => {
  if (document.getElementById("createNewPlayListInputText1").value != "") {
    document.getElementById("createNewPlayListContainer").style.display =
      "none";
    let newPlayListButton = document.createElement("button");
    newPlayListButton.classList.add("playList");
    newPlayListButton.innerHTML = `
  <img class="sidePlayListImg" src="https://dummyimage.com/52x52/000/000">
  <span>${document.getElementById("createNewPlayListInputText1").value}</span>
  <span>${document.getElementById("createNewPlayListInputText2").value}</span>`;
    document.getElementById("sidePlayList").appendChild(newPlayListButton);
  } else {
    alert("請輸入清單名稱");
  }
});

// --------------------- 播放清單主頁面功能 ------------------------
const playList = document.getElementsByClassName("playList");
Array.from(playList).forEach((element) => {
  element.addEventListener("click", () => {
    document.getElementById("playListInfoContainer").style.display = "flex";
    document.getElementById("mainItem").style.display = "none";
    document.getElementById("discoverItem").style.display = "none";
    document.getElementById("artistInfoContainer").style.display = "none";
    document.getElementById("songStyleContainer").style.display = "none";
    document
      .getElementById("nowPlayingList")
      .classList.remove("nowPlayingListVisible");
    document
      .getElementById("nowPlayingList")
      .classList.add("nowPlayingListHidden");

    let playList = element.getAttribute("data-playList");
    let songInfoSpec = songInfo
      .map((song, index) => (song.playList === playList ? index : -1))
      .filter((index) => index !== -1);

    let clickedIndex = songInfoSpec.indexOf(
      parseInt(element.getAttribute("data-index"))
    );
    clickedSongInfo = songInfoSpec.slice(clickedIndex).map((i) => songInfo[i]);

    let playListInfo = document.getElementById("playListInfo");
    if (!playListInfo) {
      playListInfo = document.createElement("div");
      playListInfo.id = "playListInfo";
      document
        .getElementById("playListInfoContainer")
        .appendChild(playListInfo);
    }
    playListInfo.innerHTML = `
      <h2 id="playListName">${playList}</h2>
      <div id="playListCard">
        ${songInfoSpec
          .map(
            (index) => `
            <div class="playListCard card-body" data-index="${index}">
              <img src="${songInfo[index].poster}" alt="${songInfo[index].songName}">
              <i class="bi bi-play-circle"></i>
              <a class="stretched-link" href="#">
                <div class="playListSongName">${songInfo[index].songName}</div>
                <div class="playListName2">${songInfo[index].songArtist}</div>
              </a>
            </div>
          `
          )
          .join("")}
          </div>
          `;
    Array.from(document.getElementsByClassName("playListCard")).forEach(
      (element) => {
        element.addEventListener("click", () => {
          songId = element.getAttribute("data-index");
          musicCurrentTime = 0;
          setInterval(() => {
            updateCurrentBar();
          }, 100);
          arrayType = "normal";
          songNumber = songId;
          playMusic(songNumber);

          const playingImg = songInfo[songId].poster;
          document.querySelector("#nowPlayingImg > img").src = playingImg;
          document.querySelector("#playSongImg").src = playingImg;
          const playingSongTitle = songInfo[songId].songName;
          document.querySelector("#playSongName").innerHTML = playingSongTitle;
          const playingArtist = songInfo[songId].songArtist;
          document.querySelector("#playSongArtist").innerHTML = playingArtist;
          playButton.classList.remove("bi-play-circle-fill");
          playButton.classList.add("bi-pause-circle-fill");

          document.getElementById("nextPlayContainer1").innerHTML = `
          <button class="nextPlay" data-song-id ="${songId}">
          <img class="nextPlayImg" src="${songInfo[songId].poster}">
          <span class="nextPlaySong">${songInfo[songId].songName}</span>
          <span class="nextPlayArtist">${songInfo[songId].songArtist}</span>
          <i class="bi bi-play-circle"></i>
          </button>
            `;
        });
      }
    );
  });
});

// --------------------- side藝人頁面動態載入 ------------------------
const createSideArtistItem = function () {
  const artistData = songInfo.reduce((acc, song) => {
    if (!acc[song.songArtist]) {
      acc[song.songArtist] = {
        songCount: 0,
        artistImgSrc: song.songArtistImg,
        songs: [],
      };
    }
    acc[song.songArtist].songCount += 1;
    acc[song.songArtist].songs.push(song.songName);
    return acc;
  }, {});

  const uniqueArtistData = Object.entries(artistData).map(([artist, data]) => ({
    artist: artist,
    artistImgSrc: data.artistImgSrc,
    songCount: data.songCount,
    songs: data.songs.join(", "),
  }));

  let sideArtistList = document.querySelector("#sideArtistList");
  for (let i = 0; i < uniqueArtistData.length; i++) {
    sideArtistList.innerHTML += `
        <button class="artistList" data-artist="${uniqueArtistData[i].artist}">
        <img class="sideArtistImg" src="${uniqueArtistData[i].artistImgSrc}">
        <span>${uniqueArtistData[i].artist}</span>
        <span>${uniqueArtistData[i].songCount} 首歌曲</span>
    </button>
    `;
  }

  // --------------------- side藝人主頁面 ------------------------
  const sideArtistListButton = document.querySelectorAll(".artistList");
  sideArtistListButton.forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("playListInfoContainer").style.display = "none";
      document.getElementById("mainItem").style.display = "none";
      document.getElementById("discoverItem").style.display = "none";
      document.getElementById("songStyleContainer").style.display = "none";
      document.getElementById("artistInfoContainer").style.display = "flex";
      document
        .getElementById("nowPlayingList")
        .classList.remove("nowPlayingListVisible");
      document
        .getElementById("nowPlayingList")
        .classList.add("nowPlayingListHidden");
      let artist = button.getAttribute("data-artist");
      let songInfoSpec = songInfo
        .map((song, index) => (song.songArtist === artist ? index : -1))
        .filter((index) => index !== -1);
      let artistInfo = document.getElementById("artistInfo");
      if (!artistInfo) {
        artistInfo = document.createElement("div");
        artistInfo.id = "artistInfo";
        document.getElementById("artistInfoContainer").appendChild(artistInfo);
      }
      artistInfo.innerHTML = `
        <h2 id="artistName"><button id="goBack"><i class="bi bi-arrow-left-short"></i></button>&nbsp;${artist}</h2>
        <div id="artistCard">
          ${songInfoSpec
            .map(
              (index) => `
              <div class="artistCard card-body" data-index="${index}">
                <img src="${songInfo[index].poster}" alt="${songInfo[index].songName}">
                <i class="bi bi-play-circle"></i>
                <a class="stretched-link" href="#">
                  <div class="artistSongName">${songInfo[index].songName}</div>
                  <div class="artistName2">${songInfo[index].songArtist}</div>
                </a>
              </div>
            `
            )
            .join("")}
            </div>
            `;

      document.getElementById("goBack").addEventListener("click", () => {
        document.getElementById("discoverItem").style.display = "block";
        document.getElementById("artistInfoContainer").style.display = "none";
      });

      Array.from(document.getElementsByClassName("artistCard")).forEach(
        (element) => {
          element.addEventListener("click", () => {
            const songId = element.getAttribute("data-index");
            musicCurrentTime = 0;
            setInterval(() => {
              updateCurrentBar();
            }, 100);
            arrayType = "normal";
            songNumber = songId;
            playMusic(songId);
            const playingImg = songInfo[songId].poster;
            document.querySelector("#nowPlayingImg > img").src = playingImg;
            document.querySelector("#playSongImg").src = playingImg;
            const playingSongTitle = songInfo[songId].songName;
            document.querySelector("#playSongName").innerHTML =
              playingSongTitle;
            const playingArtist = songInfo[songId].songArtist;
            document.querySelector("#playSongArtist").innerHTML = playingArtist;
            playButton.classList.remove("bi-play-circle-fill");
            playButton.classList.add("bi-pause-circle-fill");

            const firstPlayingSong =
              document.getElementById("nextPlayContainer1");
            firstPlayingSong.innerHTML = `
                    <button class="nextPlay" data-song-id ="${[songId]}">
                    <img class="nextPlayImg" src="${songInfo[songId].poster}">
                    <span class="nextPlaySong">${
                      songInfo[songId].songName
                    }</span>
                    <span class="nextPlayArtist">${
                      songInfo[songId].songArtist
                    }</span>
                    <i class="bi bi-play-circle"></i>
                    </button>
                    `;
          });
        }
      );
    });
  });
};

// --------------------- 音樂類型主頁面功能 ------------------------
const mainTypeButton = document.getElementsByClassName("mainTypeButton");
Array.from(mainTypeButton).forEach((element) => {
  element.addEventListener("click", () => {
    document.getElementById("mainItem").style.display = "none";
    document.getElementById("discoverItem").style.display = "none";
    document.getElementById("playListInfoContainer").style.display = "none";
    document.getElementById("artistInfoContainer").style.display = "none";
    document.getElementById("songStyleContainer").style.display = "flex";
    document
      .getElementById("nowPlayingList")
      .classList.remove("nowPlayingListVisible");
    document
      .getElementById("nowPlayingList")
      .classList.add("nowPlayingListHidden");
    let songStyleData = element.getAttribute("data-songStyle");
    let songInfoSpec = songInfo
      .map((song, index) => (song.style === songStyleData ? index : -1))
      .filter((index) => index !== -1);

    let clickedIndex = songInfoSpec.indexOf(
      parseInt(element.getAttribute("data-index"))
    );
    clickedSongInfo = songInfoSpec.slice(clickedIndex).map((i) => songInfo[i]);

    let songStyle = document.getElementById("songStyle");
    if (!songStyle) {
      songStyle = document.createElement("div");
      songStyle.id = "songStyle";
      document.getElementById("songStyleContainer").appendChild(songStyle);
    }
    songStyle.innerHTML = `
    <h2 id="songStyleName">${songStyleData}</h2>
    <div id="songStyleCard">
      ${songInfoSpec
        .map(
          (index) => `
          <div class="songStyleCard card-body" data-index="${index}">
            <img src="${songInfo[index].poster}" alt="${songInfo[index].songName}">
            <i class="bi bi-play-circle"></i>
            <a class="stretched-link" href="#">
              <div class="artistSongName">${songInfo[index].songName}</div>
              <div class="artistName2">${songInfo[index].songArtist}</div>
            </a>
          </div>
        `
        )
        .join("")}
        </div>
        `;
    Array.from(document.getElementsByClassName("songStyleCard")).forEach(
      (element) => {
        element.addEventListener("click", () => {
          songId = element.getAttribute("data-index");
          musicCurrentTime = 0;
          setInterval(() => {
            updateCurrentBar();
          }, 100);
          arrayType = "normal";
          songNumber = songId;
          playMusic(songNumber);

          const playingImg = songInfo[songId].poster;
          document.querySelector("#nowPlayingImg > img").src = playingImg;
          document.querySelector("#playSongImg").src = playingImg;
          const playingSongTitle = songInfo[songId].songName;
          document.querySelector("#playSongName").innerHTML = playingSongTitle;
          const playingArtist = songInfo[songId].songArtist;
          document.querySelector("#playSongArtist").innerHTML = playingArtist;
          playButton.classList.remove("bi-play-circle-fill");
          playButton.classList.add("bi-pause-circle-fill");

          document.getElementById("nextPlayContainer1").innerHTML = `
          <button class="nextPlay" data-song-id ="${songId}">
          <img class="nextPlayImg" src="${songInfo[songId].poster}">
          <span class="nextPlaySong">${songInfo[songId].songName}</span>
          <span class="nextPlayArtist">${songInfo[songId].songArtist}</span>
          <i class="bi bi-play-circle"></i>
          </button>
          `;
        });
      }
    );
  });
});

// -------------------- 列表左右切換按鈕 ------------------------
const leftArrows = document.querySelectorAll(".leftArrow");
const rightArrows = document.querySelectorAll(".rightArrow");
leftArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const sectionNumber = arrow.getAttribute("data-section");
    const cardSection = document.getElementById(`cardSection${sectionNumber}`);
    cardSection.scrollLeft -= 500;
  });
});
rightArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const sectionNumber = arrow.getAttribute("data-section");
    const cardSection = document.getElementById(`cardSection${sectionNumber}`);
    cardSection.scrollLeft += 500;
  });
});
