import { useState, type FormEvent } from 'react';
import { WEDDING_CONFIG } from '../config';

interface RSVPData {
    name: string;
    email: string;
    guests: string;
    meal: string;
    events: string[];
    message: string;
}

export default function RSVP() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<RSVPData>({
        name: '',
        email: '',
        guests: '1',
        meal: 'veg',
        events: [],
        message: '',
    });

    const eventNames = WEDDING_CONFIG.events.map((e) => e.name);

    const handleEventToggle = (eventName: string) => {
        setFormData((prev) => ({
            ...prev,
            events: prev.events.includes(eventName)
                ? prev.events.filter((e) => e !== eventName)
                : [...prev.events, eventName],
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Store in localStorage (can be upgraded to API/database later)
        const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
        existing.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('wedding_rsvps', JSON.stringify(existing));

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section className="section rsvp-section" id="rsvp">
                <div className="rsvp-success">
                    <div className="rsvp-success-icon">🎉</div>
                    <h3>Thank You!</h3>
                    <p>We can't wait to celebrate with you. See you at the wedding! 💕</p>
                </div>
            </section>
        );
    }

    return (
        <section className="section rsvp-section" id="rsvp">
            <h2 className="section-title">RSVP</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Kindly let us know if you'll be joining the celebration
            </p>

            <form className="rsvp-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rsvp-name">Your Name *</label>
                    <input
                        id="rsvp-name"
                        type="text"
                        placeholder="Enter your full name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rsvp-email">Email Address</label>
                    <input
                        id="rsvp-email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rsvp-guests">Number of Guests</label>
                    <select
                        id="rsvp-guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="rsvp-meal">Meal Preference</label>
                    <select
                        id="rsvp-meal"
                        value={formData.meal}
                        onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
                    >
                        <option value="veg">🥬 Vegetarian</option>
                        <option value="nonveg">🍗 Non-Vegetarian</option>
                        <option value="jain">🥗 Jain</option>
                        <option value="vegan">🌱 Vegan</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Which events will you attend?</label>
                    <div className="checkbox-group">
                        {eventNames.map((name) => (
                            <label className="checkbox-label" key={name}>
                                <input
                                    type="checkbox"
                                    checked={formData.events.includes(name)}
                                    onChange={() => handleEventToggle(name)}
                                />
                                {name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="rsvp-message">Message for the Couple 💌</label>
                    <textarea
                        id="rsvp-message"
                        rows={3}
                        placeholder="Share your blessings or a message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Send RSVP ✨
                </button>
            </form>
        </section>
    );
}
