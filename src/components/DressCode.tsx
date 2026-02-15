import { WEDDING_CONFIG } from '../config';

export default function DressCode() {
    const dressCodes = WEDDING_CONFIG.events.map((e) => ({
        emoji: e.emoji,
        event: e.name,
        suggestion: e.dressCode,
        color: e.dressColor,
    }));

    return (
        <section className="section dresscode-section" id="dresscode">
            <h2 className="section-title">What to Wear</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Dress your best for each celebration! Here's our suggested palette 👗
            </p>

            <div className="dresscode-grid">
                {dressCodes.map((item, index) => (
                    <div className="dresscode-item" key={index}>
                        <div className="dresscode-emoji">{item.emoji}</div>
                        <div className="dresscode-event">{item.event}</div>
                        <div className="dresscode-suggestion">
                            <span
                                className="dresscode-color"
                                style={{ backgroundColor: item.color }}
                            />
                            {item.suggestion}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
