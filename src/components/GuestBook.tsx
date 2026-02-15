import { useState, useEffect, type FormEvent } from 'react';

interface Wish {
    name: string;
    message: string;
    timestamp: string;
}

export default function GuestBook() {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
        setWishes(saved);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        const newWish: Wish = {
            name: name.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
        };

        const updated = [newWish, ...wishes];
        setWishes(updated);
        localStorage.setItem('wedding_wishes', JSON.stringify(updated));
        setName('');
        setMessage('');
    };

    return (
        <section className="section guestbook-section" id="guestbook">
            <h2 className="section-title">Guest Book</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Leave your blessings, wishes, and love for the happy couple 💌
            </p>

            <form className="guestbook-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    rows={3}
                    placeholder="Write your message or blessing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit" className="guestbook-submit">
                    Send Wishes 💕
                </button>
            </form>

            {wishes.length > 0 && (
                <div className="wishes-grid">
                    {wishes.map((wish, index) => (
                        <div className="wish-card" key={index}>
                            <p className="wish-message">"{wish.message}"</p>
                            <p className="wish-author">— {wish.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {wishes.length === 0 && (
                <p style={{
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic',
                }}>
                    Be the first to leave a blessing! ✨
                </p>
            )}
        </section>
    );
}
