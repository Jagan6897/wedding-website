import { useState, useEffect } from 'react';
import { Video, Save, Trash2 } from 'lucide-react';
import { WEDDING_CONFIG } from '../../config';

export default function ManageLiveStream() {
    const [liveUrl, setLiveUrl] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Load the latest value from database, not static config
        const fetchLatest = async () => {
            try {
                const res = await fetch('/api/content');
                if (res.ok) {
                    const data = await res.json();
                    if (data.liveStreamUrl !== undefined) {
                        setLiveUrl(data.liveStreamUrl);
                    }
                }
            } catch {
                // Fallback to static config
                setLiveUrl(WEDDING_CONFIG.liveStreamUrl);
            }
        };
        fetchLatest();
    }, []);

    const saveUrl = async (url: string) => {
        const token = localStorage.getItem('adminToken');
        const newConfig = { ...WEDDING_CONFIG, liveStreamUrl: url };
        const res = await fetch('/api/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content: newConfig })
        });
        return res.ok;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            const ok = await saveUrl(liveUrl);
            setMessage(ok ? '✅ Live stream link updated successfully!' : '❌ Failed to update link.');
        } catch {
            setMessage('❌ Error saving data.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to remove the livestream link? The page will show "Coming Soon" instead.')) return;

        setIsDeleting(true);
        setMessage('');

        try {
            const ok = await saveUrl('');
            if (ok) {
                setLiveUrl('');
                setMessage('🗑️ Live stream link removed. Page will show "Coming Soon".');
            } else {
                setMessage('❌ Failed to remove link.');
            }
        } catch {
            setMessage('❌ Error removing link.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="admin-page">
            <h2><Video size={24} /> Manage Live Stream</h2>
            <p>Update the YouTube or Zoom link for your wedding live stream.</p>

            <form onSubmit={handleSave} className="admin-form">
                <div className="form-group">
                    <label>Live Stream URL</label>
                    <input
                        type="url"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://youtube.com/live/..."
                        className="admin-input"
                    />
                    <small>Leave empty to show "Coming Soon"</small>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button type="submit" className="admin-btn" disabled={isSaving || isDeleting}>
                        {isSaving ? 'Saving...' : <><Save size={18} /> Update Link</>}
                    </button>

                    {liveUrl && (
                        <button
                            type="button"
                            className="admin-btn"
                            onClick={handleDelete}
                            disabled={isSaving || isDeleting}
                            style={{ background: '#dc3545', borderColor: '#dc3545' }}
                        >
                            {isDeleting ? 'Removing...' : <><Trash2 size={18} /> Delete Link</>}
                        </button>
                    )}
                </div>

                {message && <p className="status-msg">{message}</p>}
            </form>

            {liveUrl && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(212,168,83,0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
                    <strong>Current link:</strong>{' '}
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)', wordBreak: 'break-all' }}>
                        {liveUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

