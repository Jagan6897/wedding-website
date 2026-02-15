import { MapPin, Navigation } from 'lucide-react';
import { WEDDING_CONFIG } from '../config';

export default function Venue() {
    const { venue } = WEDDING_CONFIG;

    return (
        <section className="section venue-section" id="venue">
            <h2 className="section-title">Venue</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Where we'll tie the sacred knot 🪢 — we can't wait to celebrate with you!
            </p>

            <div className="venue-card">
                <h3 className="venue-name">{venue.name}</h3>
                <div className="venue-address">
                    <MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    {venue.address}
                </div>
                {venue.mapsLink && (
                    <a
                        href={venue.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-directions-btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '1rem',
                            padding: '0.75rem 1.5rem',
                            background: 'var(--primary)',
                            color: 'var(--ivory)',
                            borderRadius: '2rem',
                            textDecoration: 'none',
                            fontWeight: 600,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                    >
                        <Navigation size={16} /> Get Directions
                    </a>
                )}

                <div className="venue-map">
                    <iframe
                        src={venue.mapEmbedUrl}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Wedding Venue Location"
                    />
                </div>
            </div>
        </section>
    );
}
