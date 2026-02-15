import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DEFAULT_CONFIG } from '../config';

interface DBImage {
    id: string;
    category: string;
    caption: string;
    data: string; // Base64
}

export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [dbImages, setDbImages] = useState<DBImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/images');
                if (res.ok) {
                    const data = await res.json();
                    // Filter for gallery category if we add others later
                    const galleryImages = data.filter((img: DBImage) => img.category === 'gallery');
                    setDbImages(galleryImages);
                }
            } catch (error) {
                console.error('Failed to load gallery images');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const hasUploads = dbImages.length > 0;
    const displayItems = hasUploads ? dbImages : DEFAULT_CONFIG.venue.galleryPlaceholders;

    return (
        <section className="section gallery-section" id="gallery">
            <h2 className="section-title">Gallery</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Moments captured in time — our journey in pictures 📸
            </p>

            {isLoading ? (
                <p style={{ textAlign: 'center', margin: '2rem' }}>Loading memories...</p>
            ) : (
                <div className="gallery-grid">
                    {displayItems.map((item: any, index: number) => (
                        <div
                            className="gallery-item"
                            key={index}
                            onClick={() => setLightboxIndex(index)}
                        >
                            <div className="gallery-placeholder">
                                {hasUploads ? (
                                    <img
                                        src={(item as DBImage).data}
                                        alt={(item as DBImage).caption}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                                            {(item as { emoji: string }).emoji}
                                        </div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--color-text-light)',
                                            fontWeight: 300,
                                        }}>
                                            {(item as { label: string }).label}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="gallery-overlay">
                                <span style={{ color: 'white', fontSize: '1.5rem' }}>🔍</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!hasUploads && (
                <p style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-2xl)',
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                }}>
                    ✨ Pre-wedding shoot photos coming soon! (Upload them via Admin Panel)
                </p>
            )}

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className="lightbox" onClick={() => setLightboxIndex(null)}>
                    <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
                        <X />
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        {hasUploads ? (
                            <>
                                <img
                                    src={(displayItems[lightboxIndex] as DBImage).data}
                                    alt={(displayItems[lightboxIndex] as DBImage).caption}
                                    style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '8px' }}
                                />
                                <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>
                                    {(displayItems[lightboxIndex] as DBImage).caption}
                                </p>
                            </>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                color: 'white',
                                padding: '2rem',
                            }}>
                                <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>
                                    {(displayItems[lightboxIndex] as any).emoji}
                                </div>
                                <p style={{ fontSize: '1.3rem', fontWeight: 300 }}>
                                    {(displayItems[lightboxIndex] as any).label}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
