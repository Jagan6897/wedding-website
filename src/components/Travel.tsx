import { Plane, Train, Hotel, Car } from 'lucide-react';
import { WEDDING_CONFIG } from '../config';

export default function Travel() {
    const { travel } = WEDDING_CONFIG;

    return (
        <section className="section travel-section" id="travel">
            <h2 className="section-title">Travel & Stay</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                Coming from out of town? Here's everything you need to plan your trip 🧳
            </p>

            <div className="travel-grid">
                <div className="travel-card">
                    <div className="travel-card-icon"><Plane size={32} color="var(--color-gold)" /></div>
                    <h3 className="travel-card-title">By Air ✈️</h3>
                    <div className="travel-card-content">
                        <p>{travel.airport}</p>
                    </div>
                </div>

                <div className="travel-card">
                    <div className="travel-card-icon"><Train size={32} color="var(--color-gold)" /></div>
                    <h3 className="travel-card-title">By Train 🚂</h3>
                    <div className="travel-card-content">
                        <p>{travel.railway}</p>
                    </div>
                </div>

                <div className="travel-card">
                    <div className="travel-card-icon"><Hotel size={32} color="var(--color-gold)" /></div>
                    <h3 className="travel-card-title">Where to Stay 🏨</h3>
                    <div className="travel-card-content">
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {travel.hotels.map((hotel, i) => (
                                <li key={i} style={{ padding: '4px 0' }}>• {hotel}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="travel-card">
                    <div className="travel-card-icon"><Car size={32} color="var(--color-gold)" /></div>
                    <h3 className="travel-card-title">Local Transport 🚕</h3>
                    <div className="travel-card-content">
                        <p>{travel.cabs}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
