import { useState, useEffect } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';

interface GalleryMedia {
    id: string;
    data: string;
    caption: string;
}

export default function Gallery() {
    const [images, setImages] = useState<GalleryMedia[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchGooglePhotos = async () => {
            try {
                const res = await fetch('/api/google-photos');
                if (res.ok) {
                    const data = await res.json();
                    setImages(data);
                } else {
                    console.error("Failed to load generic gallery");
                }
            } catch (err) {
                console.error("Error connecting to Google Photos link:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGooglePhotos();
    }, []);

    const hasUploads = images.length > 0;

    return (
        <section className="section gallery-section" id="gallery">
            <h2 className="section-title">Gallery</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Moments captured in time — our journey in pictures 📸
            </p>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <a 
                    href="https://photos.app.goo.gl/wH5EmznKKVQtVVim8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                    <ImagePlus size={20} />
                    Add Your Photos to our Google Album
                </a>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                    <Camera className="animate-pulse" size={48} style={{ margin: '0 auto 1rem auto' }} />
                    <p>Loading moments from Google Photos...</p>
                </div>
            ) : hasUploads ? (
                <div className="gallery-grid">
                    {images.map((img, index) => (
                        <div
                            className="gallery-item"
                            key={img.id}
                            onClick={() => setLightboxIndex(index)}
                        >
                            <div className="gallery-placeholder">
                                <img
                                    src={img.data}
                                    alt="Wedding memory from Google Photos"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                            </div>
                            <div className="gallery-overlay">
                                <span style={{ color: 'white', fontSize: '1.5rem' }}>🔍</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    Our album is empty so far. Click the upload button above to add the first memory!
                </p>
            )}

            {/* Native Lightbox */}
            {lightboxIndex !== null && (
                <div className="lightbox" onClick={() => setLightboxIndex(null)}>
                    <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
                        <X size={32} />
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={images[lightboxIndex].data}
                            alt="Full resolution"
                            style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

