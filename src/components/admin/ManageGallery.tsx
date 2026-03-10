import { useState, useEffect } from 'react';
import { Image, Trash2, Upload, Cloud, HardDrive } from 'lucide-react';

interface GalleryImage {
    id: string;
    category: string;
    caption: string;
    data: string;
    created_at: string;
    source: 'local' | 'db';
}

const LOCAL_STORAGE_KEY = 'wedding_gallery_images';

function getLocalImages(): GalleryImage[] {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveLocalImages(images: GalleryImage[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images));
}

export default function ManageGallery() {
    const [localImages, setLocalImages] = useState<GalleryImage[]>([]);
    const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [syncStatus, setSyncStatus] = useState('');
    const [apiAvailable, setApiAvailable] = useState(false);

    useEffect(() => {
        // Load localStorage images immediately
        setLocalImages(getLocalImages());

        // Try to fetch from DB API
        fetchDbImages();
    }, []);

    const fetchDbImages = async () => {
        try {
            const res = await fetch('/api/images');
            if (res.ok) {
                const data = await res.json();
                setDbImages(data.map((img: any) => ({ ...img, source: 'db' as const })));
                setApiAvailable(true);
            }
        } catch {
            console.log('API not available, using localStorage only');
            setApiAvailable(false);
        } finally {
            setIsLoading(false);
        }
    };

    const allImages = [
        ...localImages,
        ...dbImages.filter(dbImg => !localImages.some(lImg => lImg.id === dbImg.id)),
    ];

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadError('');

        for (const file of Array.from(files)) {
            if (file.size > 2 * 1024 * 1024) {
                setUploadError(`${file.name}: Too large (Max 2MB)`);
                continue;
            }

            await new Promise<void>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string;
                    const newImage: GalleryImage = {
                        id: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
                        category: 'gallery',
                        caption: file.name,
                        data: base64,
                        created_at: new Date().toISOString(),
                        source: 'local',
                    };

                    // Save to localStorage immediately
                    const updated = [newImage, ...getLocalImages()];
                    saveLocalImages(updated);
                    setLocalImages(updated);

                    // Try to sync to DB in background
                    syncToDb(newImage);
                    resolve();
                };
                reader.readAsDataURL(file);
            });
        }

        setIsUploading(false);
        // Reset file input
        e.target.value = '';
    };

    const syncToDb = async (image: GalleryImage) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    category: image.category,
                    data: image.data,
                    caption: image.caption,
                }),
            });

            if (res.ok) {
                setApiAvailable(true);
                setSyncStatus(`✅ ${image.caption} synced to cloud`);
                setTimeout(() => setSyncStatus(''), 3000);
            }
        } catch {
            // API not available, image is safe in localStorage
        }
    };

    const syncAllToDb = async () => {
        if (localImages.length === 0) return;
        setSyncStatus('Syncing all images to cloud...');

        for (const img of localImages) {
            await syncToDb(img);
        }
        setSyncStatus('✅ All images synced!');
        fetchDbImages();
        setTimeout(() => setSyncStatus(''), 3000);
    };

    const handleDelete = async (image: GalleryImage) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        if (image.source === 'local' || image.id.startsWith('local_')) {
            // Remove from localStorage
            const updated = getLocalImages().filter(img => img.id !== image.id);
            saveLocalImages(updated);
            setLocalImages(updated);
        }

        if (image.source === 'db') {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await fetch(`/api/images/${image.id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (res.ok) {
                    setDbImages(dbImages.filter(img => img.id !== image.id));
                }
            } catch {
                alert('Failed to delete from cloud. Image may still appear after refresh.');
            }
        }
    };

    return (
        <div className="admin-page">
            <h2><Image size={24} /> Manage Gallery</h2>
            <p>Upload photos to your wedding gallery. Images are saved locally and synced to cloud when available.</p>

            <div className="upload-section">
                <label className="upload-btn">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        hidden
                    />
                    {isUploading ? 'Uploading...' : <><Upload size={18} /> Upload Photos</>}
                </label>

                {apiAvailable && localImages.length > 0 && (
                    <button onClick={syncAllToDb} className="upload-btn sync-btn">
                        <Cloud size={18} /> Sync All to Cloud
                    </button>
                )}

                {uploadError && <p className="error-msg">{uploadError}</p>}
                {syncStatus && <p className="status-msg">{syncStatus}</p>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#888' }}>
                <span><HardDrive size={14} style={{ verticalAlign: 'middle' }} /> Local: {localImages.length}</span>
                <span><Cloud size={14} style={{ verticalAlign: 'middle' }} /> Cloud: {dbImages.length}</span>
                <span>Total: {allImages.length}</span>
            </div>

            {isLoading ? <p>Loading images...</p> : (
                <div className="admin-gallery-grid">
                    {allImages.length === 0 && <p>No images uploaded yet.</p>}
                    {allImages.map(img => (
                        <div key={img.id} className="admin-img-card">
                            <img src={img.data} alt={img.caption} />
                            <div className="img-source-badge" title={img.source === 'local' ? 'Saved locally' : 'Saved to cloud'}>
                                {img.source === 'local' ? <HardDrive size={12} /> : <Cloud size={12} />}
                            </div>
                            <button
                                onClick={() => handleDelete(img)}
                                className="delete-btn"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
