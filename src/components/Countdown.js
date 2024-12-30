import React, { useEffect, useState } from "react";
import "../CSS/Countdown.css";

const Countdown = () => {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [isNewYear, setIsNewYear] = useState(false);

  const countdownMusic = new Audio("/assets/new_year_countdown.mp3");
  const newYearMusic = new Audio("/assets/music1.mp3");

  useEffect(() => {
    if (!isGiftOpened) return;

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

    playCountdownMusic();

    return () => {
      clearInterval(timer);
      stopCountdownMusic();
      stopNewYearMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGiftOpened]);

  const playCountdownMusic = () => {
    countdownMusic.loop = true;
    countdownMusic.play().catch((error) => {
      console.error("Error playing countdown music:", error);
    });
  };

  const stopCountdownMusic = () => {
    countdownMusic.pause();
    countdownMusic.currentTime = 0;
  };

  const playNewYearMusic = () => {
    newYearMusic.loop = true;
    newYearMusic.play().catch((error) => {
      console.error("Error playing new year music:", error);
    });
  };

  const stopNewYearMusic = () => {
    newYearMusic.pause();
    newYearMusic.currentTime = 0;
  };

  const handleOpenGift = () => {
    setIsGiftOpened(true);
  };

  return (
    <div className="countdown-container">
      {!isGiftOpened ? (
        <div className="gift-box-container">
          <h1>🎁 Click on the Gift Box 🎉</h1>
          <div className="gift-box" onClick={handleOpenGift}>
            <img
              src="/assets/gift_box.gif"
              alt="Gift Box"
              className="gift-box-image"
            />
          </div>
        </div>
      ) : isNewYear ? (
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
