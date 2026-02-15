import { WEDDING_CONFIG } from '../config';

export default function OurStory() {
    return (
        <section className="section story-section" id="story">
            <h2 className="section-title">Our Story</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Every love story is beautiful, but ours is our favorite ✨
            </p>

            <div className="timeline">
                {WEDDING_CONFIG.story.map((item, index) => (
                    <div
                        className="timeline-item"
                        key={index}
                        style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                    >
                        <div className="timeline-dot" />
                        <div className="timeline-date">{item.date}</div>
                        <h3 className="timeline-title">{item.title}</h3>
                        <p className="timeline-description">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
