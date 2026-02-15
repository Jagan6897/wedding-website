export default function Dashboard() {
    return (
        <div className="dashboard-content">
            <h1>Welcome, Admin! 🤵‍♂️👰‍♀️</h1>
            <p>Select a section from the sidebar to edit your wedding website content.</p>

            <div className="dashboard-cards">
                <div className="dash-card">
                    <h3>📷 Gallery Images</h3>
                    <p>Manage photos in your gallery.</p>
                </div>
                <div className="dash-card">
                    <h3>📖 Our Story</h3>
                    <p>Update your timeline milestones.</p>
                </div>
                <div className="dash-card">
                    <h3>🎥 Live Stream</h3>
                    <p>Update the YouTube/Zoom link.</p>
                </div>
            </div>
        </div>
    );
}
