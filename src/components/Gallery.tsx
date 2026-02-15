import { useState } from 'react';
import { X } from 'lucide-react';

const galleryItems = [
    { emoji: '🌸', label: 'Floral Dreams' },
    { emoji: '🪷', label: 'Lotus Blessings' },
    { emoji: '✨', label: 'Golden Moments' },
    { emoji: '💍', label: 'Ring Ceremony' },
    { emoji: '🌺', label: 'Marigold Magic' },
    { emoji: '🎊', label: 'Celebrations' },
    { emoji: '🪔', label: 'Divine Light' },
    { emoji: '💐', label: 'Bouquet' },
    { emoji: '🎶', label: 'Musical Night' },
];

export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <section className="section gallery-section" id="gallery">
            <h2 className="section-title">Gallery</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Moments captured in time — our journey in pictures 📸
            </p>

            <div className="gallery-grid">
                {galleryItems.map((item, index) => (
                    <div
                        className="gallery-item"
                        key={index}
                        onClick={() => setLightboxIndex(index)}
                    >
                        <div className="gallery-placeholder">
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{item.emoji}</div>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-light)',
                                    fontWeight: 300,
                                }}>
                                    {item.label}
                                </div>
                            </div>
                        </div>
                        <div className="gallery-overlay">
                            <span style={{ color: 'white', fontSize: '1.5rem' }}>🔍</span>
                        </div>
                    </div>
                ))}
            </div>

            <p style={{
                textAlign: 'center',
                marginTop: 'var(--space-2xl)',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                fontSize: '0.95rem',
            }}>
                ✨ Pre-wedding shoot photos coming soon! Stay tuned...
            </p>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className="lightbox" onClick={() => setLightboxIndex(null)}>
                    <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
                        <X />
                    </button>
                    <div style={{
                        textAlign: 'center',
                        color: 'white',
                        padding: '2rem',
                    }}>
                        <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>
                            {galleryItems[lightboxIndex].emoji}
                        </div>
                        <p style={{ fontSize: '1.3rem', fontWeight: 300 }}>
                            {galleryItems[lightboxIndex].label}
                        </p>
                        <p style={{
                            marginTop: '1rem',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '0.9rem',
                        }}>
                            Replace with actual photos
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
