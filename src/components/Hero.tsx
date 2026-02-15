import CountdownTimer from './CountdownTimer';
import { WEDDING_CONFIG } from '../config';

export default function Hero() {
    const dateStr = WEDDING_CONFIG.weddingDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <section className="hero" id="home">
            {/* Floating decorative elements */}
            <span className="hero-decoration">🪷</span>
            <span className="hero-decoration">✨</span>
            <span className="hero-decoration">🌸</span>
            <span className="hero-decoration">🪔</span>

            <div className="hero-content">
                <p className="hero-pre-text">We're Getting Married</p>

                {/* Couple Photos & Names */}
                <div className="couple-row">
                    <img
                        src={`${import.meta.env.BASE_URL}images/groom.jpg`}
                        alt={WEDDING_CONFIG.groom}
                        className="couple-photo"
                    />
                    <span className="couple-name">{WEDDING_CONFIG.groom}</span>
                    <span className="couple-amp">&</span>
                    <span className="couple-name">{WEDDING_CONFIG.bride}</span>
                    <img
                        src={`${import.meta.env.BASE_URL}images/bride.jpg`}
                        alt={WEDDING_CONFIG.bride}
                        className="couple-photo"
                    />
                </div>

                <p className="hero-date">{dateStr}</p>

                <CountdownTimer targetDate={WEDDING_CONFIG.weddingDate} />

                <p className="hero-tagline">
                    "Two souls, one heart, a love that will never part" 💕
                </p>
            </div>
        </section>
    );
}
