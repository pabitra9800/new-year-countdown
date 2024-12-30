import React, { useEffect, useState } from "react";
import "../CSS/Countdown.css";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isNewYear, setIsNewYear] = useState(false);

  const countdownMusic = new Audio("/assets/new_year_countdown.mp3");
  const newYearMusic = new Audio("/assets/music1.mp3");

  useEffect(() => {
    const targetDate = new Date("January 1, 2025 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setIsNewYear(true);

        playNewYearMusic();
        stopCountdownMusic();
      } else {
        if (!countdownMusic.playing) {
          playCountdownMusic();
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      stopCountdownMusic();
      stopNewYearMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playCountdownMusic = () => {
    countdownMusic.loop = true;
    countdownMusic.play();
  };

  const stopCountdownMusic = () => {
    countdownMusic.pause();
    countdownMusic.currentTime = 0;
  };

  const playNewYearMusic = () => {
    newYearMusic.loop = true;
    newYearMusic.play();
  };

  const stopNewYearMusic = () => {
    newYearMusic.pause();
    newYearMusic.currentTime = 0;
  };

  return (
    <div className="countdown-container">
      {isNewYear ? (
        <div className="new-year-message">
          <h1>🎆 Happy New Year 2025! 🎆</h1>
          <p>Wishing you a joyful and prosperous year ahead!</p>
          <div className="confetti"></div>
        </div>
      ) : (
        <div className="timer">
          <h1>Countdown to 2025</h1>
          <div className="time-box">
            <div>
              <span>{timeLeft.days || "0"}</span>
              <p>Days</p>
            </div>
            <div>
              <span>{timeLeft.hours || "0"}</span>
              <p>Hours</p>
            </div>
            <div>
              <span>{timeLeft.minutes || "0"}</span>
              <p>Minutes</p>
            </div>
            <div>
              <span>{timeLeft.seconds || "0"}</span>
              <p>Seconds</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
