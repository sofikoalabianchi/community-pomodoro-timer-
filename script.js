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
    if (type === "study") {
        if (studyPaused) {
            studyPaused = false;
            studyInterval = setInterval(() => {
                studyDuration--;
                document.getElementById("studyTime").textContent = formatTime(studyDuration);
                if (studyDuration <= 0) {
                    clearInterval(studyInterval);
                    alert("Study time over! Take a break.");
                }
            }, 1000);
        } else {
            studyDuration = document.getElementById("studyDuration").value * 60;
            document.getElementById("studyTime").textContent = formatTime(studyDuration);
            studyInterval = setInterval(() => {
                studyDuration--;
                document.getElementById("studyTime").textContent = formatTime(studyDuration);
                if (studyDuration <= 0) {
                    clearInterval(studyInterval);
                    alert("Study time over! Take a break.");
                }
            }, 1000);
        }
    } else if (type === "break") {
        if (breakPaused) {
            breakPaused = false;
            breakInterval = setInterval(() => {
                breakDuration--;
                document.getElementById("breakTime").textContent = formatTime(breakDuration);
                if (breakDuration <= 0) {
                    clearInterval(breakInterval);
                    alert("Break time over! Back to work.");
                }
            }, 1000);
        } else {
            breakDuration = document.getElementById("breakDuration").value * 60;
            document.getElementById("breakTime").textContent = formatTime(breakDuration);
            breakInterval = setInterval(() => {
                breakDuration--;
                document.getElementById("breakTime").textContent = formatTime(breakDuration);
                if (breakDuration <= 0) {
                    clearInterval(breakInterval);
                    alert("Break time over! Back to work.");
                }
            }, 1000);
        }
    }
}

function pauseTimer(type) {
    if (type === "study") {
        studyPaused = true;
        clearInterval(studyInterval);
    } else if (type === "break") {
        breakPaused = true;
        clearInterval(breakInterval);
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