import { useState, useEffect } from 'react';
import { Image, Trash2, Upload } from 'lucide-react';

interface GalleryImage {
    id: string;
    category: string;
    caption: string;
    data: string;
    created_at: string;
}

export default function ManageGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/images');
            if (res.ok) {
                const data = await res.json();
                setImages(data);
            }
        } catch (error) {
            console.error('Failed to fetch images');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit size to 2MB to be safe with DB storage (Base64 adds overhead)
        if (file.size > 2 * 1024 * 1024) {
            setUploadError('File size too large (Max 2MB)');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;

            try {
                const token = localStorage.getItem('adminToken');
                const res = await fetch('/api/images', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        category: 'gallery',
                        data: base64,
                        caption: file.name
                    })
                });

                if (res.ok) {
                    fetchImages(); // Refresh list
                } else {
                    setUploadError('Upload failed');
                }
            } catch (error) {
                setUploadError('Error uploading file');
            } finally {
                setIsUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`/api/images/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setImages(images.filter(img => img.id !== id));
            }
        } catch (error) {
            alert('Failed to delete image');
        }
    };

    return (
        <div className="admin-page">
            <h2><Image size={24} /> Manage Gallery</h2>
            <p>Upload photos to your wedding gallery.</p>

            <div className="upload-section">
                <label className="upload-btn">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        hidden
                    />
                    {isUploading ? 'Uploading...' : <><Upload size={18} /> Upload New Photo</>}
                </label>
                {uploadError && <p className="error-msg">{uploadError}</p>}
            </div>

            {isLoading ? <p>Loading images...</p> : (
                <div className="admin-gallery-grid">
                    {images.length === 0 && <p>No images uploaded yet.</p>}
                    {images.map(img => (
                        <div key={img.id} className="admin-img-card">
                            <img src={img.data} alt={img.caption} />
                            <button
                                onClick={() => handleDelete(img.id)}
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
