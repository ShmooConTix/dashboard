"use client";

import React from "react";

const ticketRounds = [
  1730476800, // nov. 1
  1733072400, // dec. 1
  1734282000, // dec. 15
];

const Countdown: React.FC = () => {
  const filteredDates = ticketRounds
    .filter((t) => t * 1000 > Date.now())
    .map((t) => t * 1000);
  const closestDate = Math.min(...filteredDates);

  const calculateTimeRemaining = React.useCallback(() => {
    const now = Date.now();
    const difference = closestDate - now;

    if (difference < 0 || closestDate == Infinity || closestDate == 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }, [closestDate]);

  const [timeRemaining, setTimeRemaining] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    setTimeRemaining(calculateTimeRemaining());
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  return (
    <div className="text-2xl font-bold text-center">
          {timeRemaining.days * 24 + timeRemaining.hours}h,{" "}
          {timeRemaining.minutes}m, {timeRemaining.seconds}s
    </div>
  );
};

export default Countdown;
