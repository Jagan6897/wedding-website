import { useState, useEffect } from 'react';
import { Video, Save } from 'lucide-react';
import { WEDDING_CONFIG } from '../../config';

export default function ManageLiveStream() {
    const [liveUrl, setLiveUrl] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Load initial value from config
        setLiveUrl(WEDDING_CONFIG.liveStreamUrl);
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            // Update the config object locally first
            const newConfig = { ...WEDDING_CONFIG, liveStreamUrl: liveUrl };

            // Send to API
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newConfig })
            });

            if (res.ok) {
                setMessage('✅ Live stream link updated successfully!');
            } else {
                setMessage('❌ Failed to update link.');
            }
        } catch (error) {
            setMessage('❌ Error saving data.');
        } finally {
            setIsSaving(false);
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

                <button type="submit" className="admin-btn" disabled={isSaving}>
                    {isSaving ? 'Saving...' : <><Save size={18} /> Update Link</>}
                </button>

                {message && <p className="status-msg">{message}</p>}
            </form>
        </div>
    );
}
