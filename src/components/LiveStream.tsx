import { Lock, Video } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { WEDDING_CONFIG } from '../config';

export default function LiveStream() {
    const now = new Date();
    const isUnlocked = now >= WEDDING_CONFIG.liveStreamDate;
    const hasLink = WEDDING_CONFIG.liveStreamUrl.trim().length > 0;

    return (
        <section className="section livestream-section" id="livestream">
            <h2 className="section-title">Live Stream</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Can't make it in person? Watch the wedding live from anywhere in the world 🌍
            </p>

            <div className="livestream-card">
                {isUnlocked && hasLink ? (
                    <div className="livestream-unlocked">
                        <div className="live-badge">
                            <span className="live-dot" />
                            LIVE NOW
                        </div>
                        <h3>We're Live! 🎉</h3>
                        <p style={{ color: 'var(--color-text-light)', margin: '1rem 0' }}>
                            Watch {WEDDING_CONFIG.groom} & {WEDDING_CONFIG.bride}'s wedding ceremony live
                        </p>

                        <div className="livestream-player-placeholder">
                            <Video size={48} />
                            <p>Live stream is active!</p>
                        </div>

                        <a
                            href={WEDDING_CONFIG.liveStreamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="livestream-link-btn"
                        >
                            <Video size={20} />
                            Watch Live Stream
                        </a>
                    </div>
                ) : isUnlocked && !hasLink ? (
                    <div className="livestream-unlocked">
                        <h3>🎬 Live stream link will be shared soon!</h3>
                        <p style={{ color: 'var(--color-text-light)', marginTop: '1rem' }}>
                            The wedding day is here! The live stream link will be updated shortly.
                            Please check back soon or contact the family for the link.
                        </p>
                    </div>
                ) : (
                    <div className="livestream-locked">
                        <div className="livestream-lock-icon">
                            <Lock size={64} />
                        </div>
                        <h3>Coming Soon</h3>
                        <p>
                            The live stream will be available on the wedding day — <strong>{WEDDING_CONFIG.liveStreamDate.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}</strong>
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                            The link will appear here automatically. Bookmark this page! 🔖
                        </p>

                        <CountdownTimer targetDate={WEDDING_CONFIG.liveStreamDate} darkMode={false} />
                    </div>
                )}
            </div>
        </section>
    );
}
