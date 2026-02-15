import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Lock, LayoutDashboard, Calendar, Heart, MapPin, Users, Video, LogOut, Image } from 'lucide-react';

export default function AdminLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('adminToken', data.token); // In real app use httpOnly cookie
                setIsAuthenticated(true);
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    if (isLoading) return <div className="loading-screen">Loading...</div>;

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="admin-login-card">
                    <Lock size={48} className="admin-icon" />
                    <h2>Admin Access</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="admin-input"
                        />
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="admin-btn">Login</button>
                    </form>
                    <Link to="/" className="back-link">← Back to Website</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar" id='admin-sidebar'>
                <div className="admin-header">
                    <h3>Wedding Admin</h3>
                </div>
                <nav className="admin-nav">
                    <Link to="/admin" className="nav-item"><LayoutDashboard size={18} /> Dashboard</Link>
                    <Link to="/admin/story" className="nav-item"><Heart size={18} /> Our Story</Link>
                    <Link to="/admin/events" className="nav-item"><Calendar size={18} /> Events</Link>
                    <Link to="/admin/venue" className="nav-item"><MapPin size={18} /> Venue & Travel</Link>
                    <Link to="/admin/family" className="nav-item"><Users size={18} /> Family</Link>
                    <Link to="/admin/livestream" className="nav-item"><Video size={18} /> Live Stream</Link>
                    <Link to="/admin/images" className="nav-item"><Image size={18} /> Images</Link>
                </nav>
                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={18} /> Logout
                </button>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}
