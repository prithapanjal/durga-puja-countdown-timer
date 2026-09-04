const mahalayaSong = document.getElementById("mahalaya-song");
const dayCount = document.getElementById("day-count");
const hours = document.getElementById("hours"); const minutes = document.getElementById("minutes"); const seconds = document.getElementById("seconds");
const message = document.getElementById("message");
const lastMessage = document.getElementById("last-message");
const audioToggle = document.getElementById("audio-toggle");
const pujaDate = new Date(2026, 9, 10, 0, 0, 0).getTime();



const festivalDays = [
    "❀ শুভ মহালয়া ❀ \n \"মায়ের আগমনী বার্তা\"",
    "✦ শুভ প্রতিপদ ✦\n \"পুজোর শুরু হোক আনন্দে\"",
    "✦ শুভ দ্বিতীয়া ✦\n \"আনন্দে ভরে উঠুক মন \"",
    "✦ শুভ তৃতীয়া ✦\n \"মায়ের আশীর্বাদ থাকুক সাথে\"",
    "✦ শুভ চতুর্থী ✦\n \"পুজোর আনন্দে মাতুক হৃদয়\"",
    "✦ শুভ পঞ্চমী ✦\n \"মা আসছেন, আর মাত্র কয়েকটা দিন\"",
    "✦ শুভ ষষ্ঠী ✦\n \"মায়ের বোধনে শুরু হোক পুজো\"",
    "✦ শুভ সপ্তমী ✦\n \"মায়ের আশীর্বাদে ভরে উঠুক জীবন\"",
    "✦ শুভ অষ্টমী ✦\n \"মায়ের চরণে জানাই প্রণাম\"",
    "✦ শুভ নবমী ✦\n \"আনন্দ আর ভালোবাসায় কাটুক নবমী\"",
    "꧁শুভ দশমী꧂\n \"শুভ বিজয়া — আসছে বছর আবার হবে\""
  ];

let countdownTimer;

const updateCountdown = () => {
  //Testing app
  // const testDate = new Date(2026, 8 ,4);
  // const now = testDate.getTime() + (Date.now() - new Date().setHours(0, 0 , 0, 0));
  
  //Final app
  const now = Date.now();
  const difference = pujaDate - now;

  //Before Mahalaya

  if (difference > 0) {

  const days = Math.floor(difference / (1000 * 60 * 60*24 ));
  const totalHours = Math.floor(difference  / (1000 * 60 * 60));
  const totalMinutes = Math.floor(difference  / (1000 * 60));
  const totalSeconds = Math.floor(difference  / 1000);

  dayCount.textContent = `${days} DAYS `;
  hours.textContent = totalHours; 
  minutes.textContent = totalMinutes; 
  seconds.textContent = totalSeconds;
 
    return;
  } 

  //After Mahalaya
  
   const daysPassed = Math.floor((now - pujaDate) / (1000 * 60 * 60 * 24));

  if (daysPassed >= 0 && daysPassed < festivalDays.length ) {
    dayCount.textContent = `${daysPassed} DAYS`
    lastMessage.textContent = festivalDays[daysPassed];
    
    

    const timeIntoCurrentDay = (now - pujaDate) % (1000 * 60 * 60 * 24);
    const timeRemainingInDay = (1000 * 60 * 60 * 24) - timeIntoCurrentDay;

    const remainingHours = Math.floor((timeRemainingInDay % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeRemainingInDay % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((timeRemainingInDay % (1000 * 60)) / 1000);

    hours.textContent = String(remainingHours).padStart(2, "0"); 
    minutes.textContent = String(remainingMinutes).padStart(2, "0"); 
    seconds.textContent = String(remainingSeconds).padStart(2, "0"); 
    return;

  } 
    // AFTER Puja ENDS
    dayCount.textContent = "SUBHO BIJAYA";
    lastMessage.textContent = "";
    hours.textContent = "00"; 
    minutes.textContent = "00"; 
    seconds.textContent = "00";
    if (countdownTimer) clearInterval(countdownTimer);
  
};

//Audio Play and  Pause 

updateCountdown();

countdownTimer = setInterval(updateCountdown, 1000);

audioToggle.addEventListener("click", () => {
  if (mahalayaSong.paused) {
    mahalayaSong.volume = 0.90;
    mahalayaSong.play()
      .then(() => {
        audioToggle.textContent = "⏸";
      })
      .catch((error) => {
        console.error("Mahalaya song could not play:", error);
      });
  } else {
    mahalayaSong.pause();
    audioToggle.textContent = "▶";
  }
});

mahalayaSong.addEventListener("ended", () => {
  audioToggle.textContent = "PLAY MAHALAYA";
});

// Navigation 
document.getElementById("minimize-btn").addEventListener("click", () => {
  window.electronAPI.minimize();
});

document.getElementById("close-btn").addEventListener("click", () => {
  window.electronAPI.close();
});