import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let studyTimer, breakTimer;
let studyDuration = 25 * 60; // in seconds
let breakDuration = 5 * 60; // in seconds
let studyInterval, breakInterval;
let studyPaused = false, breakPaused = false;

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    return `${minutes}:${remainingSeconds}`;
}

function startTimer(type) {
    let timerRef = ref(db, `timers/${type}`);

    if (type === "study") {
        studyInterval = setInterval(() => {
            studyDuration--;
            document.getElementById("studyTime").textContent = formatTime(studyDuration);

            // Update Firebase
            set(timerRef, studyDuration);

            if (studyDuration <= 0) {
                clearInterval(studyInterval);
                alert("Study time over! Take a break.");
            }
        }, 1000);
    } else if (type === "break") {
        breakInterval = setInterval(() => {
            breakDuration--;
            document.getElementById("breakTime").textContent = formatTime(breakDuration);

            // Update Firebase
            set(timerRef, breakDuration);

            if (breakDuration <= 0) {
                clearInterval(breakInterval);
                alert("Break time over! Back to work.");
            }
        }, 1000);
    }
}

function pauseTimer(type) {
    let timerRef = ref(db, `timers/${type}`);

    if (type === "study") {
        clearInterval(studyInterval);
        // Sync paused time to Firebase
        set(timerRef, studyDuration);
    } else if (type === "break") {
        clearInterval(breakInterval);
        // Sync paused time to Firebase
        set(timerRef, breakDuration);
    }
}

function setImage(type, url) {
    if (type === "study") {
        document.getElementById("studyImage").style.backgroundImage = `url(${url})`;
    } else if (type === "break") {
        document.getElementById("breakImage").style.backgroundImage = `url(${url})`;
    }
}

// Example of setting images (replace with your own URLs)
setImage("study", "https://i.pinimg.com/474x/7a/26/9c/7a269ca844b2d6246d6d3f64fc4ab22c.jpg");
setImage ("break", "https://i.pinimg.com/474x/99/05/17/9905173bd449cf7a9ff6a14fcbb7e828.jpg")
const firebaseConfig = {
    apiKey: "AIzaSyA9VA_9Nsy9BIYFKpDXRXSeB8gzn8OUxiM",
    authDomain: "community-pomodoro-timer.firebaseapp.com",
    databaseURL: "https://community-pomodoro-timer-default-rtdb.firebaseio.com",
    projectId: "community-pomodoro-timer",
    storageBucket: "community-pomodoro-timer.firebasestorage.app",
    messagingSenderId: "624604952966",
    appId: "1:624604952966:web:67dadb446f290daff0d407"
  };
  onValue(ref(db, "timers/study"), (snapshot) => {
    if (snapshot.exists()) {
        studyDuration = snapshot.val();
        document.getElementById("studyTime").textContent = formatTime(studyDuration);
    }
});

onValue(ref(db, "timers/break"), (snapshot) => {
    if (snapshot.exists()) {
        breakDuration = snapshot.val();
        document.getElementById("breakTime").textContent = formatTime(breakDuration);
    }
});
