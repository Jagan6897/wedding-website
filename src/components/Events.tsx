import { Calendar, MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '../config';

export default function Events() {
    return (
        <section className="section events-section" id="events">
            <h2 className="section-title">Wedding Events</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Join us for a week of celebrations, rituals, and unforgettable moments
            </p>

            <div className="events-grid">
                {WEDDING_CONFIG.events.map((event, index) => (
                    <div className="event-card" key={index}>
                        <div className="event-emoji">{event.emoji}</div>
                        <h3 className="event-name">{event.name}</h3>
                        <div className="event-date-time">
                            <Calendar size={16} />
                            <span>{event.date} • {event.time}</span>
                        </div>
                        <div className="event-venue">
                            <MapPin size={16} />
                            <span>{event.venue}</span>
                        </div>
                        <p className="event-description">{event.description}</p>
                        <div className="event-dresscode">
                            <span
                                className="dresscode-color"
                                style={{ backgroundColor: event.dressColor }}
                            />
                            {event.dressCode}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
