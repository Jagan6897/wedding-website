import { Instagram, Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../config';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-hashtag">{WEDDING_CONFIG.hashtag}</div>

            <p style={{
                color: 'rgba(255,255,255,0.6)',
                marginBottom: 'var(--space-xl)',
                fontWeight: 300,
            }}>
                Share your photos and memories with our wedding hashtag!
            </p>

            <div className="social-links">
                <a
                    href="#"
                    className="social-link"
                    title="Instagram"
                    aria-label="Follow us on Instagram"
                >
                    <Instagram size={20} />
                </a>
                <a
                    href="#"
                    className="social-link"
                    title="YouTube"
                    aria-label="Watch on YouTube"
                >
                    📺
                </a>
            </div>

            <div className="mandala-divider" />

            <p className="footer-text">
                Made with <span className="footer-heart"><Heart size={14} fill="currentColor" /></span> by {WEDDING_CONFIG.groom} & {WEDDING_CONFIG.bride}
            </p>
            <p className="footer-text" style={{ marginTop: '0.5rem' }}>
                © 2026 — All rights reserved
            </p>
        </footer>
    );
}
