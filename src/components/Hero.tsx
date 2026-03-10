import { useState } from 'react';
import { WEDDING_CONFIG } from '../config';

export default function Hero() {
    const [revealed, setRevealed] = useState(false);

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

                {!revealed ? (
                    <button
                        className="reveal-btn"
                        onClick={() => setRevealed(true)}
                    >
                        <span className="reveal-btn-icon">💍</span>
                        <span>Reveal Wedding Day</span>
                        <span className="reveal-btn-sparkle">✨</span>
                    </button>
                ) : (
                    <div className="reveal-container">
                        <div className="reveal-photo-wrapper">
                            <img
                                src={`${import.meta.env.BASE_URL}images/couple-together.jpg`}
                                alt={`${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}`}
                                className="reveal-photo"
                            />
                        </div>
                        <div className="reveal-date-card">
                            <p className="reveal-label">Save the Date</p>
                            <h2 className="reveal-date">{dateStr}</h2>
                            <a
                                href={WEDDING_CONFIG.venue.mapsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reveal-venue"
                            >
                                📍 {WEDDING_CONFIG.venue.name}, {WEDDING_CONFIG.venue.address}
                            </a>
                        </div>
                    </div>
                )}

                <p className="hero-tagline">
                    "Two souls, one heart, a love that will never part" 💕
                </p>
            </div>
        </section>
    );
}
