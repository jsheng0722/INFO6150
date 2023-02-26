class Time {
    constructor() {
        this.timer = null;
        this.time = 0;
        this.isRunning = false;
    }

    reset() {
        clearInterval(this.timer);
        this.timer = null;
        this.time = 0;
        this.isRunning = false;
        this.updateDisplay();
    }

    start() {
    if (!this.isRunning) {
        this.isRunning = true;
        this.timer = setInterval(() => {
        this.time += 1;
        this.updateDisplay();
        }, 1000);
    }
    }

    stop() {
        if(this.isRunning){
            clearInterval(this.timer);
            this.timer = null;
            this.isRunning=false;
        }
    }

    updateDisplay() {
        const hours = Math.floor(this.time / 3600);
        const minutes = Math.floor((this.time % 3600) / 60);
        const seconds = this.time % 60;
        const displayString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('time').innerText = displayString;
    }
}

const time = new Time();

const startBtn = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startBtn.addEventListener('click', () => {
    time.start();
    startBtn.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    time.stop();
    startBtn.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
});

resetButton.addEventListener('click', () => {
    time.reset();
    startBtn.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
});