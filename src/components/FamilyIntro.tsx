import { WEDDING_CONFIG } from '../config';

export default function FamilyIntro() {
    return (
        <section className="section family-section" id="family">
            <h2 className="section-title">Our Families</h2>
            <div className="mandala-divider" />
            <p className="section-subtitle">
                The beautiful people who made us who we are today 👨‍👩‍👧‍👦
            </p>

            <div className="family-grid">
                <div className="family-side">
                    <h3 className="family-side-title">Bride's Family</h3>
                    {WEDDING_CONFIG.brideFamily.map((member, index) => (
                        <div className="family-member" key={index}>
                            <div className="family-member-avatar">{member.emoji}</div>
                            <div className="family-member-name">{member.name}</div>
                            <div className="family-member-relation">{member.relation}</div>
                        </div>
                    ))}
                </div>

                <div className="family-side">
                    <h3 className="family-side-title">Groom's Family</h3>
                    {WEDDING_CONFIG.groomFamily.map((member, index) => (
                        <div className="family-member" key={index}>
                            <div className="family-member-avatar">{member.emoji}</div>
                            <div className="family-member-name">{member.name}</div>
                            <div className="family-member-relation">{member.relation}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
