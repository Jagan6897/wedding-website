import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetDate: Date;
    darkMode?: boolean;
}

export default function CountdownTimer({ targetDate, darkMode = true }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft.total <= 0) {
        return (
            <div className="countdown-celebration">
                🎊 Today is the Day! 🎊
            </div>
        );
    }

    return (
        <div className={`countdown ${darkMode ? '' : 'livestream-countdown'}`}>
            <div className="countdown-item">
                <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-item">
                <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-item">
                <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-item">
                <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="countdown-label">Seconds</div>
            </div>
        </div>
    );
}

function getTimeLeft(targetDate: Date) {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const total = target - now;

    return {
        total,
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / (1000 * 60)) % 60),
        seconds: Math.floor((total / 1000) % 60),
    };
}
