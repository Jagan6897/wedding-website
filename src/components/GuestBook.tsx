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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
        setWishes(saved);
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setIsSubmitting(true);
        setSubmitSuccess(false);

        try {
            // Create URL parameters for Netlify form
            const formData = new URLSearchParams();
            formData.append('form-name', 'wishes');
            formData.append('name', name.trim());
            formData.append('message', message.trim());

            // POST to the current route ('/') so Netlify interceptions pick it up
            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });

            if (!res.ok) throw new Error('Failed to submit form');

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
            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Oh no! There was an error sending your wish. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="section guestbook-section" id="guestbook">
            <h2 className="section-title">Guest Book</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Leave your blessings, wishes, and love for the happy couple 💌
            </p>

            <form className="guestbook-form" onSubmit={handleSubmit} name="wishes" data-netlify="true">
                {/* Hidden input required for Netlify to link this JS form submission to the HTML form */}
                <input type="hidden" name="form-name" value="wishes" />
                
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    name="message"
                    rows={3}
                    placeholder="Write your message or blessing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit" className="guestbook-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Wishes 💕'}
                </button>
                {submitSuccess && (
                    <p style={{ color: 'var(--color-primary)', textAlign: 'center', marginTop: '1rem', fontWeight: 500 }}>
                        Thank you! Your wish has been sent to the couple completely. ✨
                    </p>
                )}
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
